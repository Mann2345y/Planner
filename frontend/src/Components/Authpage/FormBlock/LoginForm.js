import React, { useState } from "react";
import styled from "styled-components";
import { BsCalendar2Date } from "react-icons/bs";
import { authUser } from "../../../Redux/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
const LoginForm = ({ setOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, status } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (status === "success" && Object.keys(data).length > 0) {
      navigate("/home");
    }
  }, [status, data, navigate]);

  const authHandler = () => {
    dispatch(authUser(email, password));
  };
  return (
    <Wrapper>
      <PlannerIcon>
        <BsCalendar2Date size={49} />
      </PlannerIcon>
      <h2>Hello, Again !!</h2>
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
      <LoginButton onClick={authHandler}>
        <h4>Log In</h4>
      </LoginButton>
      <SigninText>
        <p>Does not have an account,</p>
        <p
          style={{ color: "#ff9371", cursor: "pointer" }}
          onClick={() => setOpen(false)}
        >
          Sign Up
        </p>
      </SigninText>
    </Wrapper>
  );
};

export default LoginForm;
