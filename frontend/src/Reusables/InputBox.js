import React from "react";
import styled from "styled-components";

const Input = styled.input`
  height: 50px;
  width: 250px;
  padding: 0 15px;
  border: 2px solid #ff9371;
  transition: all 0.2s ease-in;
  font-family: "Montserrat", sans-serif;
  transition: all 0.2s ease-in;
  border-radius: ${(props) => (props.round ? "5px" : "0")};
  &::placeholder {
    color: black;
  }
  &:focus {
    outline: none;
    box-shadow: #ff9371 0px 1px 15px;
  }
  &:disabled {
    background: rgb(230, 230, 230);
    border: none;
    color: black;
  }
`;

const InputBox = ({
  placeholder,
  state,
  changeHandler,
  round,
  type,
  disabled,
}) => {
  return (
    <Input
      round={round}
      placeholder={placeholder}
      value={state}
      onChange={(e) => changeHandler(e.target.value)}
      type={type}
      disabled={disabled}
    />
  );
};

export default InputBox;
