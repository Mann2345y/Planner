import React, { useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { BsTrash, BsUpload, BsSave, BsKey } from "react-icons/bs";
import { TbEdit } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import InputBox from "../../Reusables/InputBox";
import { removeUser, updateUser } from "../../Redux/userReducer";
import { useNavigate } from "react-router-dom";

const ButtonMotion = styled(motion.div)`
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const FormMotion = styled(motion.div)`
  height: 100%;
  width: 100%;
  position: absolute;
`;
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    align-self: flex-start;
  }
  > div {
    width: fit-content;
  }
`;
const ImageEditWrapper = styled.div`
  width: 500px;
  height: 180px;
  display: flex;
`;
const Image = styled.div`
  height: 150px;
  width: 150px;
  background: url("/images/user.png");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  border-radius: 50%;
  margin-top: 25px;
`;
const ButtonsWrapper = styled.div`
  height: 60px;
  width: 350px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;
const ImageButtons = styled(ButtonsWrapper)`
  height: 100%;
  flex-direction: column;
  justify-content: center;
  div {
    margin-bottom: 20px;
  }
`;
const Buttons = styled.div`
  height: 40px;
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2.5px;
  border: 2px solid #ff9371;
  cursor: pointer;
  transition: all 0.2s ease-in;
  position: relative;
  &:hover {
    background: #ff9371;
  }
  h5 {
    margin-left: 10px;
  }
`;
const FormWrapper = styled.div`
  margin: 30px 0;
  height: 160px;
  width: 500px;
  display: flex;
  flex-direction: column;
  position: relative;
`;
const FormField = styled.div`
  height: 60px;
  width: 400px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  h5 {
    width: fit-content;
  }
`;
const BigButton = styled(Buttons)`
  width: 250px;
`;
const BigButtonWrapper = styled(ButtonsWrapper)`
  height: 200px;
  flex-direction: column;
  align-items: center;
`;
const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: user } = useSelector((state) => state.user);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState();
  const [confPassword, setConfPassword] = useState();
  const [openEdit, setOpenEdit] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [editPassword, setEditPassword] = useState(true);
  const saveHandler = () => {
    setOpenEdit(false);
    setEditProfile(false);
    setEditPassword(false);
    if (editProfile) {
      dispatch(updateUser(user.id, name, email));
    } else {
      if (password === confPassword) {
        dispatch(updateUser(user.id, password));
      }
    }
  };
  return (
    <Wrapper>
      <h1>Edit Profile</h1>
      <div>
        <ImageEditWrapper>
          <Image />
          <ImageButtons>
            <Buttons>
              <BsTrash size={21} />
              <h5>Delete</h5>
            </Buttons>
            <Buttons>
              <BsUpload size={21} />
              <h5>Update</h5>
            </Buttons>
          </ImageButtons>
        </ImageEditWrapper>
        <FormWrapper>
          {openEdit ? (
            <FormMotion
              key="openedit"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {editProfile && (
                <>
                  <FormField>
                    <h5>Name</h5>
                    <InputBox
                      state={name}
                      changeHandler={setName}
                      disabled={false}
                    />
                  </FormField>
                  <FormField>
                    <h5>Email</h5>
                    <InputBox
                      state={email}
                      changeHandler={setEmail}
                      disabled={false}
                    />
                  </FormField>
                </>
              )}
              {editPassword && (
                <>
                  <FormField>
                    <h5>Password</h5>
                    <InputBox
                      state={password}
                      changeHandler={setPassword}
                      disabled={false}
                    />
                  </FormField>
                  <FormField>
                    <h5>Confirm Password</h5>
                    <InputBox
                      state={confPassword}
                      changeHandler={setConfPassword}
                      disabled={false}
                    />
                  </FormField>
                </>
              )}
            </FormMotion>
          ) : (
            <>
              <FormField>
                <h5>Name</h5>
                <InputBox
                  state={name}
                  changeHandler={setName}
                  disabled={true}
                />
              </FormField>
              <FormField>
                <h5>Email</h5>
                <InputBox
                  state={email}
                  changeHandler={setEmail}
                  disabled={true}
                />
              </FormField>
            </>
          )}
        </FormWrapper>
        <BigButtonWrapper>
          <BigButton>
            <AnimatePresence>
              {openEdit ? (
                <ButtonMotion
                  key="openeditprofilepassword"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={saveHandler}
                >
                  <BsSave size={21} />
                  <h5>Save Changes</h5>
                </ButtonMotion>
              ) : (
                <ButtonMotion
                  key="closeeditpasswordprofile"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => {
                    setOpenEdit(true);
                    setEditProfile(true);
                    setEditPassword(false);
                  }}
                >
                  <TbEdit size={21} />
                  <h5>Edit Profile</h5>
                </ButtonMotion>
              )}
            </AnimatePresence>
          </BigButton>
          <h5>or</h5>
          <BigButton>
            {openEdit ? (
              <ButtonMotion
                key="openedit"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpenEdit(false)}
              >
                <AiOutlineCloseSquare size={21} />
                <h5>Cancel</h5>
              </ButtonMotion>
            ) : (
              <ButtonMotion
                key="notesedit"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => {
                  setOpenEdit(true);
                  setEditProfile(false);
                  setEditPassword(true);
                }}
              >
                <BsKey size={21} />
                <h5>Change Password</h5>
              </ButtonMotion>
            )}
          </BigButton>
          <h5>or</h5>
          <BigButton
            onClick={() => {
              dispatch(removeUser(user.id));
              navigate("/");
            }}
          >
            <BsTrash size={21} />
            <h5>Delete Account</h5>
          </BigButton>
        </BigButtonWrapper>
      </div>
    </Wrapper>
  );
};

export default EditProfile;
