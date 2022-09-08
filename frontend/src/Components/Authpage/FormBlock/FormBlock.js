import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const Motion = styled(motion.div)`
  position: absolute;
  height: 100%;
  width: 100%;
`;
const Wrapper = styled.div`
  height: 100%;
  width: 60%;
  position: relative;
  @media (max-width: 768px) {
    height: 600px;
    width: 70%;
    left: 15%;
    top: 150px;
    background: white;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
  }
`;
const FormBlock = () => {
  const [open, setOpen] = useState(true);
  return (
    <Wrapper>
      <AnimatePresence>
        {open ? (
          <Motion
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LoginForm setOpen={setOpen} />
          </Motion>
        ) : (
          <Motion
            key="signup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SignupForm setOpen={setOpen} />
          </Motion>
        )}
      </AnimatePresence>
    </Wrapper>
  );
};

export default FormBlock;
