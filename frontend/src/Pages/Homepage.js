import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import Events from "../Components/Homepage/Events/Events";
import Journal from "../Components/Homepage/Journal/Journal";
import Notes from "../Components/Homepage/Notes/Notes";
import TodoList from "../Components/Homepage/TodoList/TodoList";
import SideBar from "../Components/Homepage/SideBar";
import EditProfile from "../Components/Homepage/EditProfile";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Motion = styled(motion.div)`
  height: 100%;
  width: 100%;
  position: absolute;
`;

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  @media (max-width: 1366px) {
    flex-direction: column;
  }
`;
const ContentBlock = styled.div`
  height: 100%;
  width: calc(100vw - 400px);
  position: relative;
  @media (max-width: 1366px) {
    width: 100%;
  }
`;

const Homepage = () => {
  const navigate = useNavigate();
  const [openEvent, setOpenEvent] = useState(true);
  const [openJournal, setOpenJournal] = useState(false);
  const [openNotes, setOpenNotes] = useState(false);
  const [openTodo, setOpenTodo] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const { data: user } = useSelector((state) => state.user);
  const openEventpage = () => {
    setOpenEvent(true);
    setOpenJournal(false);
    setOpenNotes(false);
    setOpenTodo(false);
    setOpenProfile(false);
  };
  const openJournalpage = () => {
    setOpenEvent(false);
    setOpenJournal(true);
    setOpenNotes(false);
    setOpenTodo(false);
    setOpenProfile(false);
  };
  const openNotespage = () => {
    setOpenEvent(false);
    setOpenJournal(false);
    setOpenNotes(true);
    setOpenTodo(false);
    setOpenProfile(false);
  };
  const openTodopage = () => {
    setOpenEvent(false);
    setOpenJournal(false);
    setOpenNotes(false);
    setOpenTodo(true);
    setOpenProfile(false);
  };
  const openProfilepage = () => {
    setOpenEvent(false);
    setOpenJournal(false);
    setOpenNotes(false);
    setOpenTodo(false);
    setOpenProfile(true);
  };
  useEffect(() => {
    if (Object.keys(user).length === 0) {
      navigate("/");
    }
  }, [user, navigate]);
  return (
    <Wrapper>
      <SideBar
        openEventpage={openEventpage}
        openJournalpage={openJournalpage}
        openNotespage={openNotespage}
        openTodopage={openTodopage}
        openProfilepage={openProfilepage}
      />
      <ContentBlock>
        <AnimatePresence>
          {openEvent && (
            <Motion
              key="event"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Events />
            </Motion>
          )}
          {openJournal && (
            <Motion
              key="journal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Journal />
            </Motion>
          )}
          {openNotes && (
            <Motion
              key="notes"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Notes />
            </Motion>
          )}
          {openTodo && (
            <Motion
              key="todo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <TodoList />
            </Motion>
          )}
          {openProfile && (
            <Motion
              key="profile"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <EditProfile />
            </Motion>
          )}
        </AnimatePresence>
      </ContentBlock>
    </Wrapper>
  );
};

export default Homepage;
