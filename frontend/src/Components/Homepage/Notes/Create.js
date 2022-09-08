import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { createPlan, updatePlan } from "../../../Redux/plansReducer";
import InputBox from "../../../Reusables/InputBox";
import Button from "../../../Reusables/Button";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 50px;
  display: flex;
  flex-direction: column;
  @media (max-width: 425px) {
    padding: 20px;
  }
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
  textarea {
    height: 250px;
    width: 400px;
    border: 2px solid #ff9371;
    border-radius: 5px;
    padding: 10px;
    color: black;
    font-family: "Montserrat", sans-serif;
    font-size: 1.2em;
    resize: none;
    transition: all 0.2s ease-in;
    &:focus {
      outline: none;
      box-shadow: #ff9371 0px 1px 15px;
    }
    @media (max-width: 600px) {
      width: 100%;
    }
  }
  @media (max-width: 600px) {
    width: 100%;
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

const Create = ({ setOpenEdit, currnote }) => {
  const dispatch = useDispatch();
  const { data: user } = useSelector((state) => state.user);
  const [title, setTitle] = useState(currnote ? currnote.title : "");
  const [note, setNote] = useState(currnote ? currnote.content : "");
  const cancelHandler = () => {
    setOpenEdit(false);
  };
  const createHandler = () => {
    if (currnote) {
      dispatch(updatePlan(currnote._id, title, note));
    } else {
      dispatch(createPlan("note", title, note, false, false, user.id));
    }
  };
  return (
    <Wrapper>
      <h1 style={{ alignSelf: "center" }}>Create New Note</h1>
      <FormField>
        <h3>Title : </h3>
        <InputBox state={title} changeHandler={setTitle} round />
      </FormField>
      <FormField>
        <h3>Note : (Max 50 Words...) </h3>
        <textarea
          maxLength="200"
          value={note}
          onChange={(e) => {
            setNote(e.target.value);
          }}
        />
      </FormField>

      <ButtonsWrapper>
        <Button clickHandler={createHandler}>
          {currnote ? "Update" : "Create"}
        </Button>
        <Button clickHandler={cancelHandler}>Cancel</Button>
      </ButtonsWrapper>
    </Wrapper>
  );
};

export default Create;
