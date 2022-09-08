import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  BsJournals as Journal,
  BsCalendar2Event as Event,
} from "react-icons/bs";
import { BiNote as Note } from "react-icons/bi";
import { RiTodoLine as Todo } from "react-icons/ri";
import { FiUser as Profile, FiLogOut as Logout } from "react-icons/fi";
import { FiMenu as Menu } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../Redux/userReducer";

const Wrapper = styled.div`
  height: 100%;
  width: 350px;
  background: linear-gradient(
    90deg,
    hsla(29, 92%, 70%, 1) 0%,
    hsla(0, 87%, 73%, 1) 100%
  );
  box-shadow: rgba(0, 0, 0, 0.5) 0px 5px 15px;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 1366px) {
    display: none;
  }
`;
const Image = styled.div`
  height: 150px;
  width: 150px;
  border-radius: 50%;
  background: url("/images/user.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  margin-bottom: 30px;
  @media (max-width: 1280px) {
    height: 120px;
    width: 120px;
  }
`;
const MiddleBlock = styled.div`
  height: 240px;
  width: 100%;
  position: relative;
  margin-bottom: 10px;
  @media (max-width: 1080px) {
    width: 300px;
  }
`;
const OptionsWrapper = styled.div`
  height: 240px;
  width: 100%;
  position: absolute;
  top: 0;
`;
const Option = styled.div`
  height: 50px;
  width: 250px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  padding-left: 30%;
  cursor: pointer;
  h3 {
    font-family: "Montserrat", sans-serif;
    font-weight: 600;
    margin-left: 15px;
  }
`;
const Slider = styled.div`
  height: 50px;
  width: 250px;
  background: white;
  position: absolute;
  transform: translateY(${(props) => props.scrollValue}px);
  top: 0;
  left: 35px;
  transition: all 0.2s ease-in;
  border-radius: 10px 10px 10px 0;
  &:before {
    content: " ";
    height: 25px;
    width: 25px;
    background: white;
    position: absolute;
    top: 50px;
    transform: rotateX(180deg);
  }
  &:after {
    content: " ";
    height: 25px;
    width: 25px;
    background: #ffa96a;
    position: absolute;
    top: 50px;
    border-top-left-radius: 25px;
    transform: rotateX(0deg);
  }
  @media (max-width: 1280px) {
    width: 200px;
  }
  @media (max-width: 1080px) {
    left: 50px;
  }
`;
const BottomMenu = styled(MiddleBlock)`
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const BottomOption = styled(Option)`
  width: fit-content;
  padding: 0 25px;
  border-radius: 25px;
  transition: all 0.2s ease-in;
  &:hover {
    background: white;
  }
  h4 {
    font-family: "Montserrat", sans-serif;
    font-weight: 600;
    margin-left: 20px;
  }
`;
const NavBar = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #d3d3d3;
  > div {
    height: 100%;
    width: fit-content;
    position: relative;
    display: flex;
  }
  @media (min-width: 1366px) {
    display: none;
  }
  @media (max-width: 968px) {
    display: none;
  }
`;
const NavSlider = styled.div`
  height: 5px;
  width: 150px;
  position: absolute;
  bottom: 0;
  background: #ff9371;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  transition: all 0.2s ease-in;
  transform: translateX(${(props) => props.scroll}px);
  @media (max-width: 968px) {
    width: 80px;
  }
`;
const NavBlocks = styled.div`
  height: 100%;
  width: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h4 {
    margin-top: 15px;
  }
  @media (max-width: 968px) {
    flex-direction: row;
    width: fit-content;
    height: 60px;
    h4 {
      margin: 0;
      margin-left: 10px;
    }
  }
`;
const MobileNav = styled.div`
  @media (min-width: 969px) {
    display: none;
  }
`;
const MobileNavButton = styled.div`
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #ff9371;
  border-radius: 5px;
  margin: 10px;
`;
const SlideMenu = styled.div`
  height: 450px;
  min-width: 300px;
  background: red;
  position: absolute;
  top: 60px;
  left: 10px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in;
  transform-origin: top;
  background: linear-gradient(
    90deg,
    hsla(29, 92%, 70%, 1) 0%,
    hsla(0, 87%, 73%, 1) 100%
  );
  border-radius: 10px;
  transform: scaleY(${(props) => (props.open ? "1" : "0")});
`;

const SideBar = ({
  openEventpage,
  openJournalpage,
  openNotespage,
  openTodopage,
  openProfilepage,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [scrollValue, setScrollValue] = useState(0);
  const [navscroll, setNavscroll] = useState(0);
  const [opensmallnav, setOpensmallnav] = useState(false);
  const clickHandler = (optionNumber) => {
    if (optionNumber === 1) {
      openEventpage();
      setScrollValue(0);
      setNavscroll(0);
      setOpensmallnav(false);
    } else if (optionNumber === 2) {
      openJournalpage();
      setScrollValue(60);
      setNavscroll(150);
      setOpensmallnav(false);
    } else if (optionNumber === 3) {
      openNotespage();
      setScrollValue(120);
      setNavscroll(300);
      setOpensmallnav(false);
    } else if (optionNumber === 4) {
      openTodopage();
      setScrollValue(180);
      setNavscroll(450);
      setOpensmallnav(false);
    }
  };
  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate("/");
  };
  return (
    <>
      <Wrapper>
        <Image />
        <MiddleBlock>
          <Slider scrollValue={scrollValue}></Slider>
          <OptionsWrapper>
            <Option onClick={() => clickHandler(1)}>
              <Event size={28} />
              <h3>Events</h3>
            </Option>
            <Option onClick={() => clickHandler(2)}>
              <Journal size={28} />
              <h3>Journal</h3>
            </Option>
            <Option onClick={() => clickHandler(3)}>
              <Note size={28} />
              <h3>Notes</h3>
            </Option>
            <Option onClick={() => clickHandler(4)}>
              <Todo size={28} />
              <h3>To-Do List</h3>
            </Option>
          </OptionsWrapper>
        </MiddleBlock>
        <BottomMenu>
          <BottomOption onClick={openProfilepage}>
            <Profile size={21} />
            <h4>Profile</h4>
          </BottomOption>
          <BottomOption onClick={logoutHandler}>
            <Logout size={21} style={{ transform: "rotateY(180deg)" }} />
            <h4>Log Out</h4>
          </BottomOption>
        </BottomMenu>
      </Wrapper>

      <NavBar>
        <div>
          <NavSlider scroll={navscroll} />
          <NavBlocks onClick={() => clickHandler(1)}>
            <Event size={21} />
            <h4>Events</h4>
          </NavBlocks>
          <NavBlocks onClick={() => clickHandler(2)}>
            <Journal size={21} />
            <h4>Journal</h4>
          </NavBlocks>
          <NavBlocks onClick={() => clickHandler(3)}>
            <Note size={21} />
            <h4>Notes</h4>
          </NavBlocks>
          <NavBlocks onClick={() => clickHandler(4)}>
            <Todo size={21} />
            <h4>To - Do List</h4>
          </NavBlocks>
        </div>
        <div>
          <NavBlocks onClick={openProfilepage}>
            <Profile size={21} />
            <h4>Profile</h4>
          </NavBlocks>
          <NavBlocks onClick={logoutHandler}>
            <Logout size={21} />
            <h4>Log Out</h4>
          </NavBlocks>
        </div>
      </NavBar>

      <MobileNav>
        <MobileNavButton onClick={() => setOpensmallnav(!opensmallnav)}>
          <Menu size={21} />
        </MobileNavButton>
        <SlideMenu open={opensmallnav}>
          <div>
            <NavBlocks onClick={() => clickHandler(1)}>
              <Event size={21} />
              <h4>Events</h4>
            </NavBlocks>
            <NavBlocks onClick={() => clickHandler(2)}>
              <Journal size={21} />
              <h4>Journal</h4>
            </NavBlocks>
            <NavBlocks onClick={() => clickHandler(3)}>
              <Note size={21} />
              <h4>Notes</h4>
            </NavBlocks>
            <NavBlocks onClick={() => clickHandler(4)}>
              <Todo size={21} />
              <h4>To - Do List</h4>
            </NavBlocks>
            <NavBlocks onClick={openProfilepage}>
              <Profile size={21} />
              <h4>Profile</h4>
            </NavBlocks>
            <NavBlocks onClick={logoutHandler}>
              <Logout size={21} />
              <h4>Log Out</h4>
            </NavBlocks>
          </div>
        </SlideMenu>
      </MobileNav>
    </>
  );
};

export default SideBar;
