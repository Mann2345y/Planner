import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEdit } from "react-icons/ai";
import { BsTrash } from "react-icons//bs";
import styled from "styled-components";
import HeadBar from "./HeadBar";
import Create from "./Create";
import Loader from "../../../Reusables/Loader";
import NotFound from "../../../Reusables/NotFound";
import { deletePlan } from "../../../Redux/plansReducer";

const Motion = styled(motion.div)`
  height: 100%;
  width: 100%;
  position: absolute;
`;
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 25px;
`;
const NotesWrapper = styled.div`
  height: 70%;
  width: 100%;
  margin-top: 50px;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 968px) {
    height: fit-content;
  }
`;
const Note = styled.div`
  height: 170px;
  width: 250px;
  border: 6px double #ff9371;
  border-radius: 25px;
  position: relative;
  padding: 20px;
  margin: 25px;
  h3 {
    font-size: 1.2em;
  }
  @media (max-width: 968px) {
    height: 150px;
    width: 100%;
    padding: 25px;
  }
  @media (max-width: 425px) {
    padding: 10px;
    h3 {
      font-size: 0.9em;
    }
  }
`;
const EditButton = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background: linear-gradient(
    90deg,
    hsla(29, 92%, 70%, 1) 0%,
    hsla(0, 87%, 73%, 1) 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
`;
const NotFoundWrapper = styled.div`
  height: 100%;
  width: 100%;
`;
const LoaderWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ButtonsWrapper = styled.div`
  height: 40px;
  width: 40%;
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 10px;
  right: 10px;
`;
const Notes = () => {
  const dispatch = useDispatch();
  const { data: plans, status } = useSelector((state) => state.plans);
  const [openEdit, setOpenEdit] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currnote, setCurrnote] = useState({});
  useEffect(() => {
    if (Object.keys(plans).length > 0) {
      const notesArray = plans.filter((item) => item.typeOfData === "note");
      setNotes(notesArray);
    }
  }, [plans]);
  return (
    <>
      <AnimatePresence>
        {openEdit ? (
          <Motion
            key="notesedit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Create setOpenEdit={setOpenEdit} currnote={currnote} />
          </Motion>
        ) : (
          <Motion
            key="notnotesedit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Wrapper>
              <HeadBar setOpenEdit={setOpenEdit} />
              <NotesWrapper>
                {status === "loading" ? (
                  <LoaderWrapper>
                    <Loader height="30%" width="30%" />
                  </LoaderWrapper>
                ) : Object.keys(notes).length !== 0 ? (
                  notes.map((item, index) => (
                    <Note key={index}>
                      <h3>{item.content.slice(0, 40)}...</h3>
                      <ButtonsWrapper>
                        <EditButton
                          onClick={() => dispatch(deletePlan(item._id))}
                        >
                          <BsTrash size={21} />
                        </EditButton>
                        <EditButton
                          onClick={() => {
                            setOpenEdit(true);
                            setCurrnote(item);
                          }}
                        >
                          <AiOutlineEdit size={21} />
                        </EditButton>
                      </ButtonsWrapper>
                    </Note>
                  ))
                ) : (
                  <NotFoundWrapper>
                    <NotFound>
                      No Notes Created, Click on Create button above to create
                      one.
                    </NotFound>
                  </NotFoundWrapper>
                )}
              </NotesWrapper>
            </Wrapper>
          </Motion>
        )}
      </AnimatePresence>
    </>
  );
};

export default Notes;
