import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import chroma from "chroma-js";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "react-query";

const Alert2_st = styled(motion.div)`
  position: absolute;
  top: 85px;
  left: 0;
  width: 100%;
  background-color: ${({ alertType }) =>
    alertType === "fail"
      ? chroma("crimson")
      : alertType === "success"
      ? chroma("seagreen")
      : "transparent"};
  color: white;
  font-weight: 600;
  font-size: 1.3em;
  display: grid;
  place-items: center;
  padding: 0.5rem;

  height: 3rem;
`;
const easing = [0.04, 0.62, 0.23, 0.98];
const variants = {
  initial: {
    y: "-100px",
  },
  animate: {
    y: 0,
    transition: {
      duration: 1,
      ease: easing,
    },
  },
  exit: { opacity: 0 },
};

export default function Alert2({ msg, setMsg }) {
  const { msgAlert, typeAlert } = msg;
  const y = useMotionValue(-100);
  const opacity = useTransform(y, [-100, 0], [0, 1]);

  React.useEffect(() => {
    setTimeout(() => {
      setMsg("");
    }, 3000);
  }, []);

  return (
    <Alert2_st
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ y, opacity }}
      alertType={typeAlert}
    >
      <p>{msgAlert}</p>
    </Alert2_st>
  );
}
