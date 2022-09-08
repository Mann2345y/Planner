import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { HiOutlineStar } from "react-icons/hi";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import HeadBar from "./HeadBar";
import Create from "./Create";
import { useDispatch, useSelector } from "react-redux";
import { deletePlan } from "../../../Redux/plansReducer";
import Loader from "../../../Reusables/Loader";
import NotFound from "../../../Reusables/NotFound";

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
const FilterBar = styled.div`
  height: 80px;
  width: 100%;
  display: flex;
  border-bottom: 1px solid #d3d3d3;
  position: relative;
  @media (max-width: 1366px) {
    margin-top: 25px;
  }
`;
const Filter = styled.div`
  height: 100%;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  @media (max-width: 680px) {
    width: 30%;
    font-size: 0.8em;
  }
`;
const Indicator = styled.div`
  height: 5px;
  width: 200px;
  background: red;
  transition: all 0.2s ease-in;
  position: absolute;
  bottom: 0;
  left: ${(props) => props.scrollValue}px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  @media (max-width: 680px) {
    width: 30%;
    left: ${(props) => props.scrollValue}%;
  }
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
const Events = () => {
  const dispatch = useDispatch();
  const [openEdit, setOpenEdit] = useState(false);
  const [scrollValue, setScrollValue] = useState(0);
  const [events, setEvents] = useState([]);
  const [currevent, setCurrevent] = useState({});
  const { data: plans, status } = useSelector((state) => state.plans);
  const sliderHandler = (optionNumber) => {
    if (optionNumber === 1) {
      setScrollValue(0);
    } else if (optionNumber === 2) {
      setScrollValue(window.innerWidth > 680 ? 200 : 30);
    } else if (optionNumber === 3) {
      setScrollValue(window.innerWidth > 680 ? 400 : 60);
    }
  };
  useEffect(() => {
    if (Object.keys(plans).length > 0) {
      const eventsArray = plans.filter((item) => item.typeOfData === "event");
      setEvents(eventsArray);
    }
  }, [plans]);
  return (
    <AnimatePresence>
      {openEdit ? (
        <Motion
          key="editpage"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Create setOpenEdit={setOpenEdit} currevent={currevent} />
        </Motion>
      ) : (
        <Motion
          key="noeditpage"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Wrapper>
            <HeadBar setOpenEdit={setOpenEdit} />
            <FilterBar>
              <Filter onClick={() => sliderHandler(1)}>
                <h3>All</h3>
              </Filter>
              <Filter onClick={() => sliderHandler(2)}>
                <h3>Upcoming</h3>
              </Filter>
              <Filter onClick={() => sliderHandler(3)}>
                <h3>Passed</h3>
              </Filter>
              <Indicator scrollValue={scrollValue} />
            </FilterBar>
            <TabsBlock>
              {status === "loading" ? (
                <LoaderWrapper>
                  <Loader height="30%" width="30%" />
                </LoaderWrapper>
              ) : Object.keys(events).length !== 0 ? (
                events.map((item, index) => (
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
                          setCurrevent(item);
                          setOpenEdit(true);
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
                    No Events Created, Click on Create button above to create
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

export default Events;
