import React from "react";
import styled from "styled-components";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineSearch } from "react-icons/ai";

const Wrapper = styled.div`
  height: 120px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 100px;
  > div {
    height: 100%;
    display: flex;
    width: 60%;
    align-items: center;
    justify-content: space-between;
  }
  @media (max-width: 1366px) {
    height: fit-content;
    padding-right: 0;
  }
  @media (max-width: 600px) {
    flex-direction: column;
    h1 {
      margin-bottom: 25px;
    }
    > div {
      margin: 25px 0;
      width: 100%;
    }
  }
`;

const SearchBar = styled.div`
  height: 50px;
  width: 400px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  @media (max-width: 854px) {
    width: 250px;
  }
  @media (max-width: 425px) {
    height: 35px;
    width: 200px;
  }
`;
const SearchInput = styled.input`
  height: 50px;
  width: 350px;
  padding: 0 20px;
  font-size: 1em;
  border: 2px solid #ff7b77;
  font-family: "Montserrat", sans-serif;
  &::placeholder {
    color: rgb(80, 80, 80);
    font-family: "Montserrat", sans-serif;
  }
  &:focus {
    outline: none;
  }
  @media (max-width: 854px) {
    width: 200px;
  }
  @media (max-width: 425px) {
    height: 35px;
    width: 165px;
    padding: 0 10px;
    &::placeholder {
      font-size: 0.9em;
    }
    font-size: 0.9em;
  }
`;
const SearchButton = styled.div`
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ff7b77;
  cursor: pointer;
  @media (max-width: 425px) {
    height: 35px;
    width: 35px;
  }
`;
const CreateButton = styled.div`
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ff7b77;
  border-radius: 50%;
  cursor: pointer;
  @media (max-width: 425px) {
    height: 35px;
    width: 35px;
  }
`;

const HeadBar = ({ setOpenEdit }) => {
  return (
    <Wrapper>
      <h1>Journal</h1>
      <div>
        <SearchBar>
          <SearchInput placeholder="Search For Journal ..." type="text" />
          <SearchButton>
            <AiOutlineSearch size={window.innerWidth > 425 ? 28 : 21} />
          </SearchButton>
        </SearchBar>
        <CreateButton onClick={() => setOpenEdit(true)}>
          <FiEdit2 size={window.innerWidth > 425 ? 24 : 14} />
        </CreateButton>
      </div>
    </Wrapper>
  );
};

export default HeadBar;
