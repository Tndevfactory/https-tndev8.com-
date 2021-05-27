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
import { ProdCtx, apiGet } from "../../contexts/ProductsContext";

const device = {
  mobile: `(max-width: 600px)`,

  tablet: `(min-width: 601px)`,

  desktop: `(min-width: 900px)`,
};

const ui = {
  dark: "#001d3d",
  light: "#00afb9",
};

const Alert_st = styled(motion.div)`
  position: absolute;
  top: 85px;
  left: 0;
  width: 100%;
  background-color: ${({ alertType }) =>
    alertType === "fail"
      ? chroma("red").brighten(1)
      : alertType === "success"
      ? chroma("green").brighten(1)
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

const Alert1 = () => {
  const [prodMethods, prodStates] = ProdCtx();
  const { apiGet, apiDelete, apiUpdate } = prodMethods;
  const { notification, setNotification, switchMode } = prodStates;

  const { notifType, notifMsg } = notification;

  const [showPassword, setShowPassword] = useState(false);
  const y = useMotionValue(-100);
  const opacity = useTransform(y, [-100, 0], [0, 1]);

  React.useEffect(() => {
    setTimeout(() => {
      setNotification({
        notifType: "",
        notifMsg: "",
      });
    }, 3000);
  }, [notification]);

  return (
    <Alert_st
      switchMode={switchMode}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ y, opacity }}
      alertType={notifType}
    >
      <p>{notifMsg}</p>
    </Alert_st>
  );
};

export default Alert1;
