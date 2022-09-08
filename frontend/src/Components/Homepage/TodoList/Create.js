import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../Reusables/Button";
import InputBox from "../../../Reusables/InputBox";
import TaskTab from "./TaskTab";
import { createPlan, updatePlan } from "../../../Redux/plansReducer";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  > div {
    height: 450px;
    width: 100%;
    display: flex;
    margin-top: 50px;
    > div {
      height: 100%;
    }
  }
  @media (max-width: 968px) {
    > div {
      flex-direction: column;
      > div {
        width: 100%;
      }
    }
  }
  @media (max-width: 500px) {
    padding: 5px;
    height: fit-content;
    padding-bottom: 50px;
  }
`;
const LeftBlock = styled.div`
  padding: 20px;
  width: 35%;
`;
const FormField = styled.div`
  height: fit-content;
  width: 60%;
  margin: 15px 0;
  letter-spacing: 1px;
  h3 {
    font-family: "Roboto Slab", sans-serif;
    margin-bottom: 10px;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
`;
const RightBlock = styled.div`
  position: relative;
  padding: 0;
  width: 65%;
`;
const Input = styled(InputBox)``;

const Create = ({ setOpenEdit, currtodo }) => {
  const dispatch = useDispatch();
  const { data: user } = useSelector((state) => state.user);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [tasksArray, setTasksArray] = useState([]);
  const createHandler = () => {
    if (currtodo) {
      dispatch(updatePlan(currtodo._id, title, JSON.stringify(tasksArray)));
    } else {
      dispatch(
        createPlan(
          "todo",
          title,
          JSON.stringify(tasksArray),
          false,
          false,
          user.id,
          date
        )
      );
    }
  };
  useEffect(() => {
    if (Object.keys(currtodo).length > 0) {
      setTitle(currtodo.title);
      setDate(currtodo.date);
      setTasksArray(JSON.parse(currtodo.content));
    }
  }, []);

  return (
    <Wrapper>
      <h1>Create New To-Do List</h1>
      <div>
        <LeftBlock>
          <FormField>
            <h3>Title : </h3>
            <InputBox state={title} changeHandler={setTitle} round />
          </FormField>
          <FormField>
            <h3>Date : </h3>
            <Input
              type="date"
              state={date}
              changeHandler={setDate}
              onKeyDown={(e) => e.preventDefault()}
              round
            />
          </FormField>
          <Button margin none clickHandler={createHandler}>
            {Object.keys(currtodo).length > 0 ? "Update List" : "Create List"}
          </Button>
          <Button margin none clickHandler={() => setOpenEdit(false)}>
            Cancel
          </Button>
        </LeftBlock>
        <RightBlock>
          <TaskTab tasksArray={tasksArray} setTasksArray={setTasksArray} />
        </RightBlock>
      </div>
    </Wrapper>
  );
};

export default Create;
