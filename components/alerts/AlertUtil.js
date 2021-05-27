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

const Desktop = styled(motion.div)`
  position: absolute;
  top: 85px;
  left: 0;
  width: 100%;
  background-color: ${({ atype, AlertRun }) =>
  AlertRun ?  atype === 'info' ? chroma("blue").brighten(1)
    : atype === 'fail' ? chroma("red").brighten(1)
      : atype === 'success'? chroma("green").brighten(1): 'transparent' : 'transparent'
 };
  color: white;
  font-weight: 600;
  font-size: 1.3em;
  display: flex;
  justify-content: center;
  padding: 0.5em;
  height: 3em;
`;


const Mobile = styled(Desktop)`

  @media (min-width: 375px) and (max-width: 600px) {
    
  }
  @media (min-width: 361px) and (max-width: 374px) {
  
  }
  @media (max-width: 360px) {
  
  }
`;

const easing = [ 0.04, 0.62, 0.23, 0.98 ];

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

export default function AlertUtil({alertRun}) {
const {msgAlert, alertType}=alertRun
  const [ spAlert, setSpAlert ] = useState(true)
  const [ spAlertMsg, setSpAlertMsg ] = useState(msgAlert)
  const [ spAlertType, setSpAlertType ] = useState(alertType)
  
  const y = useMotionValue(-100);
  const opacity = useTransform(y, [-100, 0], [0, 1]);

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     setSpAlert(false);
  //   }, 3000);
  // }, []);

  return (
    <Mobile
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={ { y, opacity } }
      atype={ spAlertType }
      AlertRun={spAlert}
   
    >
      <p>{ spAlertMsg}</p>
    </Mobile>
  );
}
