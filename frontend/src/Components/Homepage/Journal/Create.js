import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../../Reusables/Button";
import InputBox from "../../../Reusables/InputBox";
import { useDispatch, useSelector } from "react-redux";
import Editor from "./Editor";
import { createPlan, updatePlan } from "../../../Redux/plansReducer";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 50px;
  display: flex;
  flex-direction: column;
  @media (max-width: 968px) {
    height: fit-content;
    padding: 20px;
    padding-bottom: 100px;
  }
`;
const ButtonsWrapper = styled.div`
  height: 60px;
  width: 500px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;
  @media (max-width: 600px) {
    width: 250px;
  }
`;
const FormWrapper = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  margin: 25px 0;
  @media (max-width: 968px) {
    height: fit-content;
    flex-direction: column;
  }
`;
const FormField = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  align-items: center;
  @media (max-width: 968px) {
    margin: 25px 0;
    width: 100%;
  }
`;
const Input = styled.input`
  height: 50px;
  width: 250px;
  border-radius: 5px;
  border: 2px solid #ff9371;
  padding: 20px;
  font-size: 1.2em;
  font-family: "Exo 2", sans-serif;
  position: relative;
  transition: all 0.2s ease-in;
  &:focus {
    outline: none;
    box-shadow: #ff9371 0px 1px 15px;
  }
  &::-webkit-calendar-picker-indicator {
    background: transparent;
    bottom: 0;
    color: transparent;
    cursor: pointer;
    height: auto;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
  }
`;
const Create = ({ setOpenEdit, currjournal }) => {
  const dispatch = useDispatch();
  const { data: user } = useSelector((state) => state.user);
  const [date, setDate] = useState(currjournal ? currjournal.date : "");
  const [title, setTitle] = useState(currjournal ? currjournal.title : "");
  const [content, setContent] = useState(
    currjournal ? currjournal.content : ""
  );
  const cancelHandler = () => {
    setOpenEdit(false);
  };
  const createHandler = () => {
    if (Object.keys(currjournal).length > 0) {
      dispatch(updatePlan(currjournal._id, title, content));
    } else {
      dispatch(
        createPlan("journal", title, content, false, false, user.id, date)
      );
    }
  };
  return (
    <Wrapper>
      <h1 style={{ alignSelf: "center" }}>Create New Journal</h1>
      <FormWrapper>
        <FormField>
          <h3 style={{ marginRight: "25px" }}>Title : </h3>
          <InputBox state={title} changeHandler={setTitle} round />
        </FormField>
        <FormField>
          <h3 style={{ marginRight: "25px" }}>Date : </h3>
          <Input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
            onKeyDown={(e) => e.preventDefault()}
          />{" "}
        </FormField>
      </FormWrapper>
      <Editor setContent={setContent} content={content} />
      <ButtonsWrapper>
        <Button clickHandler={createHandler}>Create</Button>
        <Button clickHandler={cancelHandler}>Cancel</Button>
      </ButtonsWrapper>
    </Wrapper>
  );
};

export default Create;
