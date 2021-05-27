import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Loader from "react-loader-spinner";
import Link from "next/link";
import chroma from "chroma-js";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { ProdCtx, apiGet } from "../../contexts/ProductsContext";

const Loader_st = styled(motion.div)`
  position: absolute;
  display: flex;
  justify-content: flex-end;

  width: 10%;
  top: 90px;
  margin-right: 50px;
  z-index: 10;
  left: 0;
  width: 100%;
  color: black;
  //background: yellow;
  font-weight: 600;
  font-size: 1.3em;
  padding: 1em;
  .lll {
    // background: red;
    margin-right: 50px;
  }
`;

const Loader1 = () => {
  const [prodMethods, prodStates] = ProdCtx();
  const { apiGet, apiDelete, apiUpdate } = prodMethods;
  const { ui, setLoader, loader, setNotification, switchMode } = prodStates;

  const [showPassword, setShowPassword] = useState(false);
  const y = useMotionValue(-100);
  const opacity = useTransform(y, [-100, 0], [0, 1]);

  React.useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 500);
  }, []);

  return (
    <Loader_st ui={ui} switchMode={switchMode}>
      <Loader
        type="Bars"
        color={switchMode ? ui.dark : ui.light}
        height={70}
        width={70}
        timeout={500} //3 secs
        className="loader_1"
      />
    </Loader_st>
  );
};

export default Loader1;
