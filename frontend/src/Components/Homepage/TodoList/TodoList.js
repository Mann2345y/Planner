import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { HiOutlineStar } from "react-icons/hi";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import HeadBar from "./HeadBar";
import Create from "./Create";
import { useDispatch, useSelector } from "react-redux";
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
const TabsBlock = styled.div`
  height: 60vh;
  width: 100%;
  padding: 0 50px 0 10px;
  overflow-y: auto;
  margin-top: 50px;
  @media (max-width: 1366px) {
    height: fit-content;
    padding: 0 10px;
  }
`;
const EventTabBlock = styled.div`
  height: 100px;
  width: 100%;
  background: white;
  box-shadow: #d3d3d3 0px 1px 15px;
  margin: 25px 0;
  border: 1px solid rgb(240, 240, 240);
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  font-family: "Roboto Slab", sans-serif;
  padding-right: 50px;
  > div {
    height: 100%;
  }
  @media (max-width: 680px) {
    padding: 0 20px;
  }
  @media (max-width: 425px) {
    font-size: 0.8em;
  }
`;
const EventTextBlock = styled.div`
  width: 500px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  @media (max-width: 680px) {
    width: fit-content;
    h3:first-child {
      display: none;
    }
  }
`;
const EventButtons = styled.div`
  width: 220px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 680px) {
    width: 60%;
    justify-content: right;
  }
`;
const EventButton = styled.div`
  height: 50px;
  width: 50px;
  border: 2px solid #ff9371;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ff9371;
  cursor: pointer;
  transition: all 0.2s ease-in;
  &:hover {
    background: #ff9371;
    color: white;
  }
  @media (max-width: 680px) {
    height: 35px;
    width: 35px;
    margin-right: 10px;
  }
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
const TodoList = () => {
  const dispatch = useDispatch();
  const { data: plans, status } = useSelector((state) => state.plans);
  const [openEdit, setOpenEdit] = useState(false);
  const [todos, setTodos] = useState([]);
  const [currtodo, setCurrtodo] = useState({});
  useEffect(() => {
    if (Object.keys(plans).length > 0) {
      const todosArray = plans.filter((item) => item.typeOfData === "todo");
      setTodos(todosArray);
    }
  }, [plans]);
  useEffect(() => {
    console.log(currtodo);
  }, [currtodo]);
  return (
    <AnimatePresence>
      {openEdit ? (
        <Motion
          key="editpage"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Create setOpenEdit={setOpenEdit} currtodo={currtodo} />
        </Motion>
      ) : (
        <Motion
          key="noeditpage"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Wrapper>
            <HeadBar setOpenEdit={setOpenEdit} setCurrtodo={setCurrtodo} />
            <TabsBlock>
              {status === "loading" ? (
                <LoaderWrapper>
                  <Loader height="30%" width="30%" />
                </LoaderWrapper>
              ) : Object.keys(todos).length !== 0 ? (
                todos.map((item, index) => (
                  <EventTabBlock key={index}>
                    <EventTextBlock>
                      <h3>{item.date}</h3>
                      <h3>{item.title}</h3>
                    </EventTextBlock>
                    <EventButtons>
                      <EventButton>
                        <HiOutlineStar
                          size={window.innerWidth > 680 ? 28 : 18}
                        />
                      </EventButton>
                      <EventButton
                        onClick={() => {
                          setOpenEdit(true);
                          setCurrtodo(item);
                        }}
                      >
                        <FiEdit2 size={window.innerWidth > 680 ? 28 : 18} />
                      </EventButton>
                      <EventButton
                        onClick={() => dispatch(deletePlan(item._id))}
                      >
                        <FiTrash2 size={window.innerWidth > 680 ? 28 : 18} />
                      </EventButton>
                    </EventButtons>
                  </EventTabBlock>
                ))
              ) : (
                <NotFoundWrapper>
                  <NotFound>
                    No Lists Created, Click on Create button above to create
                    one.
                  </NotFound>
                </NotFoundWrapper>
              )}
            </TabsBlock>
          </Wrapper>
        </Motion>
      )}
    </AnimatePresence>
  );
};

export default TodoList;
