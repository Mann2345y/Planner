import React, { useState } from "react";
import styled from "styled-components";
import { BsCalendar2Date as FcPlanner } from "react-icons/bs";
import { createUser } from "../../../Redux/userReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;
const PlannerIcon = styled.div`
  height: 100px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: rgb(255, 147, 113, 0.7);
  margin-bottom: 5%;
  @media (max-height: 680px) {
    height: 75px;
    width: 75px;
  }
`;
const Input = styled.input`
  height: 40px;
  width: 250px;
  background: rgb(0, 0, 0, 0.1);
  border: none;
  margin: 2% 0;
  border-radius: 10px;
  padding: 0 20px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: rgb(80, 80, 80);
  }
`;
const LoginButton = styled.button`
  height: 50px;
  width: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2% 0;
  border-radius: 10px;
  background: linear-gradient(
    90deg,
    hsla(29, 92%, 70%, 1) 0%,
    hsla(0, 87%, 73%, 1) 100%
  );
  border: none;
  outline: none;
  cursor: pointer;
`;
const SigninText = styled.div`
  position: absolute;
  bottom: 2%;
  display: flex;
  p {
    margin-right: 5px;
  }
`;
const SignupForm = ({ setOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const createHandler = () => {
    if (password === confPassword) {
      dispatch(createUser(name, email, password));
      navigate("/home");
    }
  };
  return (
    <Wrapper>
      <PlannerIcon>
        <FcPlanner size={49} />
      </PlannerIcon>
      <h2 style={{ marginBottom: "10px" }}>Welcome To Planner !!</h2>
      <Input
        placeholder="Enter Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Enter Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Enter Your Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        placeholder="Confirm Your Password"
        value={confPassword}
        onChange={(e) => setConfPassword(e.target.value)}
      />
      <LoginButton onClick={createHandler}>
        <h4>Sign Up</h4>
      </LoginButton>
      <SigninText>
        <p>Already have a account,</p>
        <p
          style={{ color: "#ff9371", cursor: "pointer" }}
          onClick={() => setOpen(true)}
        >
          Log In
        </p>
      </SigninText>
    </Wrapper>
  );
};

export default SignupForm;
