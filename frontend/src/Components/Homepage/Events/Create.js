import React, { useState } from "react";
import styled from "styled-components";
import InputBox from "../../../Reusables/InputBox";
import Button from "../../../Reusables/Button";
import { useSelector, useDispatch } from "react-redux";
import { GiCheckMark } from "react-icons/gi";
import { createPlan, updatePlan } from "../../../Redux/plansReducer";
const Check = styled(GiCheckMark)`
  font-size: 18px;
  transition: all 0.2s ease-in;
  opacity: ${(props) => (props.open ? "1" : "0")};
`;
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 50px;
  display: flex;
  flex-direction: column;
  @media (max-width: 968px) {
    h1 {
      margin-bottom: 50px;
    }
    height: fit-content;
    padding: 0 5% 100px 5%;
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
    height: 150px;
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
    @media (max-width: 425px) {
      width: 100%;
    }
  }
  @media (max-width: 425px) {
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
const ButtonsWrapper = styled.div`
  height: 60px;
  width: 500px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;
  @media (max-width: 600px) {
    width: 300px;
  }
`;

const Create = ({ setOpenEdit, currevent }) => {
  const dispatch = useDispatch();
  const { data: userData } = useSelector((state) => state.user);
  const [title, setTitle] = useState(currevent ? currevent.title : "");
  const [date, setDate] = useState(currevent ? currevent.date : "");
  const [desc, setDesc] = useState(currevent ? currevent.content : "");
  const [open, setOpen] = useState(currevent ? currevent.sendRemind : false);
  const cancelHandler = () => {
    setOpenEdit(false);
  };
  const createHandler = () => {
    if (currevent) {
      dispatch(updatePlan(currevent._id, title, desc, open));
    } else {
      dispatch(
        createPlan(
          "event",
          title,
          desc,
          false,
          open ? true : false,
          userData.id,
          date
        )
      );
    }
  };

  return (
    <Wrapper>
      <h1 style={{ alignSelf: "center" }}>Create New Event</h1>
      <FormField>
        <h3>Title : </h3>
        <InputBox state={title} changeHandler={setTitle} round />
      </FormField>
      <FormField>
        <h3>Date : </h3>
        <Input
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
          onKeyDown={(e) => e.preventDefault()}
        />
      </FormField>
      <FormField>
        <h3>Description : </h3>
        <textarea
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        />
      </FormField>
      <RadioField>
        <RadioBlock onClick={() => setOpen(!open)} open={open}>
          <Check open={open} />
        </RadioBlock>
        <h3>Remind Via Email</h3>
      </RadioField>
      <ButtonsWrapper>
        <Button clickHandler={createHandler}>
          {currevent ? "Update" : "Create"}
        </Button>
        <Button clickHandler={cancelHandler}>Cancel</Button>
      </ButtonsWrapper>
    </Wrapper>
  );
};

export default Create;
