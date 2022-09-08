import React from "react";
import styled from "styled-components";

const Buttons = styled.div`
  height: 50px;
  width: 180px;
  border-radius: 25px;
  background: #ff9371;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: ${(props) => (props.margin ? "25px 0" : "0")};
  h3 {
    font-family: "Josefin Sans", sans-serif;
    font-weight: 400;
    font-size: 1.1em;
  }
  @media (max-width: 600px) {
    width: ${(props) => (props.short ? "100px" : "180px")};
    font-size: 0.9em;
  }
  @media (max-width: 968px) {
    display: ${(props) => (props.none ? "none" : "flex")};
  }
`;

const Button = ({ clickHandler, children, margin, none, short }) => {
  return (
    <Buttons onClick={clickHandler} margin={margin} none={none} short={short}>
      <h3>{children}</h3>
    </Buttons>
  );
};

export default Button;
