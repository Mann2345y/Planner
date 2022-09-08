import React from "react";
import styled from "styled-components";
import SideBanner from "../Components/Authpage/SideBanner";
import FormBlock from "../Components/Authpage/FormBlock/FormBlock";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("./images/loginbg4.jpg");
  background-size: cover;
  @media (max-width: 768px) {
    background: none;
    height: auto;
  }
`;
const InnerWrapper = styled.div`
  height: 80%;
  width: 90%;
  display: flex;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  background: white;
  position: relative;
  @media (max-width: 768px) {
    flex-direction: column;
    height: fit-content;
    width: 100%;
    box-shadow: none;
  }
`;

const Authpage = () => {
  return (
    <Wrapper>
      <InnerWrapper>
        <SideBanner />
        <FormBlock />
      </InnerWrapper>
    </Wrapper>
  );
};

export default Authpage;
