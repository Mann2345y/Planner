import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Image = styled.div`
  height: 200px;
  width: 200px;
  background: url("./images/notFound.svg");
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  margin-bottom: 20px;
`;

const NotFound = ({ children }) => {
  return (
    <Wrapper>
      <Image />
      <h3>{children}</h3>
    </Wrapper>
  );
};

export default NotFound;
