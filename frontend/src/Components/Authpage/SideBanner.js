import React from "react";
import styled from "styled-components";
import { BsFillSuitHeartFill } from "react-icons/bs";

const Wrapper = styled.div`
  height: 100%;
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #ff697c;
  text-align: center;
  background: linear-gradient(
    90deg,
    hsla(29, 92%, 70%, 1) 0%,
    hsla(0, 87%, 73%, 1) 100%
  );
  h1 {
    font-family: "Arizonia", cursive;
    font-size: 6em;
    margin-top: 50px;
    @media (max-width: 1366px) {
      font-size: 4em;
    }
    @media (max-width: 768px) {
      display: none;
    }
  }
  p {
    font-size: 1.2em;
  }
  @media (max-width: 768px) {
    height: 300px;
    width: 100%;
    position: absolute;
  }
`;
const Image = styled.div`
  height: 300px;
  width: 300px;
  background: url("/images/bg.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  transform: rotateY(180deg);
  @media (max-width: 768px) {
    display: none;
  }
`;
const TextWrapper = styled.div`
  height: fit-content;
  width: fit-content;
  display: flex;
  margin-top: 15px;
  align-items: baseline;
  @media (max-width: 768px) {
    display: none;
  }
`;

const SideBanner = () => {
  return (
    <Wrapper>
      <Image />
      <h1>Planner ...</h1>
      <TextWrapper>
        <p>One stop daily planner, created with love.</p>
        <BsFillSuitHeartFill
          size={24}
          color="#D22B2B"
          style={{ margin: "0 5px" }}
        />
        <BsFillSuitHeartFill size={24} color="#800080" />
      </TextWrapper>
    </Wrapper>
  );
};

export default SideBanner;
