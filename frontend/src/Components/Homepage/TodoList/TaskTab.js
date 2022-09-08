import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { RiMenuAddFill } from "react-icons/ri";
import { GiCheckMark } from "react-icons/gi";
import InputBox from "../../../Reusables/InputBox";
import Button from "../../../Reusables/Button";

const Motion = styled(motion.div)`
  height: 100%;
  width: 100%;
  position: absolute;
  > div {
    padding: 20px;
  }
`;
const Check = styled(GiCheckMark)`
  font-size: 18px;
  transition: all 0.2s ease-in;
  opacity: ${(props) => (props.open ? "1" : "0")};
`;
const Wrapper = styled.div`
  height: 80px;
  width: 100%;
  margin: 25px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in;
  box-shadow: rgba(100, 100, 111, 0.3) 0px 7px 15px 0px;
  cursor: pointer;
  @media (max-width: 500px) {
    h3 {
      font-size: 0.8em;
    }
  }
`;
const IconWrapper = styled.div`
  height: 35px;
  width: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ff9371;
  border-radius: 5px;
  margin-right: 25px;
`;
const FormField = styled.div`
  height: fit-content;
  width: 60%;
  margin: 25px 0;
  letter-spacing: 1px;
  h3 {
    font-family: "Roboto Slab", sans-serif;
    margin-bottom: 5px;
  }
`;
const EditForm = styled.div`
  height: 100%;
  width: 100%;
  padding: 20px;
`;
const RadioField = styled(FormField)`
  display: flex;
  align-items: center;
  h3 {
    margin: 0;
    margin-left: 25px;
  }
`;
const RadioBlock = styled.div`
  height: 30px;
  width: 30px;
  border: 2px solid #ff9371;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in;
  box-shadow: ${(props) => (props.open ? " #ff9371 0px 1px 15px" : "none")};
`;
const ButtonWrapper = styled.div`
  margin-top: 50px;
`;
const TabsWrapper = styled.div`
  height: 300px;
  width: 100%;
  overflow-y: auto;
  padding-left: 10px;
  padding-right: 25px;
  margin: 20px 0;
`;
const Tabs = styled(Wrapper)``;
const NoTasksWrapper = styled.div`
  height: 300px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const HideButtons = styled.div`
  @media (min-width: 968px) {
    display: none;
  }
`;
const TaskTab = ({ tasksArray, setTasksArray }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [taskname, setTaskname] = useState("");
  const createTaskHandler = () => {
    const newTask = {
      title: taskname,
      isCompleted: isCheck,
    };
    setTasksArray([...tasksArray, newTask]);
    setOpenEdit(false);
  };
  const removeTaskHandler = (index) => {
    const tasksCopy = [...tasksArray];
    tasksCopy.splice(index, 1);
    setTasksArray([...tasksCopy]);
  };
  return (
    <>
      <AnimatePresence>
        {openEdit ? (
          <Motion
            key="openedittask"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <EditForm>
              <FormField>
                <h3>Task</h3>
                <InputBox state={taskname} changeHandler={setTaskname} />
              </FormField>
              <RadioField>
                <RadioBlock onClick={() => setIsCheck(!isCheck)} open={isCheck}>
                  <Check open={isCheck} />
                </RadioBlock>
                <h3>Task Completed ? </h3>
              </RadioField>
              <ButtonWrapper>
                <Button clickHandler={createTaskHandler}>Create Task</Button>
                <Button margin clickHandler={() => setOpenEdit(false)}>
                  Cancel
                </Button>
              </ButtonWrapper>
            </EditForm>
          </Motion>
        ) : (
          <Motion
            key="closeedittask"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div>
              <Wrapper onClick={() => setOpenEdit(true)}>
                <IconWrapper>
                  <RiMenuAddFill size={21} />
                </IconWrapper>
                <h3>Create New Task</h3>
              </Wrapper>
              <h3>Created Tasks : </h3>
              <TabsWrapper>
                {tasksArray.length > 0 ? (
                  tasksArray.map((item, index) => (
                    <Tabs key={index} onClick={() => removeTaskHandler(index)}>
                      <h3>{item.title}</h3>
                    </Tabs>
                  ))
                ) : (
                  <NoTasksWrapper>
                    <h3> No tasks Created ! </h3>
                  </NoTasksWrapper>
                )}
              </TabsWrapper>
            </div>
            <HideButtons>
              <Button margin>Save List</Button>
              <Button margin clickHandler={() => setOpenEdit(false)}>
                Cancel
              </Button>
            </HideButtons>
          </Motion>
        )}
      </AnimatePresence>
    </>
  );
};

export default TaskTab;
