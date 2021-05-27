import React, { useState, useRef, useEffect } from "react";
import Cookies from "js-cookie";
import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import Link from "next/link";
import chroma from "chroma-js";
import Image from "next/image";
import { ProdCtx, apiGet } from "../../contexts/ProductsContext";
import useSound from "use-sound";

const Switch_st = styled(motion.div)`
  display: inline-block;

  .switch {
    position: relative;
    display: inline-block;
    top: 10px;
    width: 59px;
    height: 28px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ switchMode, ui }) =>
      switchMode
        ? chroma(ui.light).luminance() < 0.4
          ? chroma(ui.light).brighten(1)
          : chroma(ui.light).darken(1)
        : chroma(ui.dark).luminance() < 0.4
        ? chroma(ui.dark).brighten(1)
        : chroma(ui.dark).darken(1)};
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background: ${({ switchMode, ui }) =>
      switchMode
        ? chroma(ui.light).luminance() < 0.4
          ? chroma(ui.light).brighten(1)
          : chroma(ui.light).darken(1)
        : chroma(ui.dark).luminance() < 0.4
        ? chroma(ui.dark).brighten(1)
        : chroma(ui.dark).darken(1)};
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(30px);
    -ms-transform: translateX(30px);
    transform: translateX(30px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 39px;
  }

  .slider.round:before {
    border-radius: 50%;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Switch = () => {
  const [prodMethods, prodStates] = ProdCtx();
  const { apiGet, apiDelete, apiUpdate } = prodMethods;
  const {
    ui,
    setUi,
    notification,
    setNotification,
    switchMode,
    setSwitchMode,
  } = prodStates;

  const [playSound] = useSound("/sounds/click.mp3", { volume: 0.25 });

  const [checked, setCheked] = useState(false);
  const handleSwitch = () => {
    setCheked(!checked);
    playSound();
    setSwitchMode(!switchMode);
    setUi({
      ...ui,
       dark: Cookies.get("dark") || "#7b2cbf",
      light: Cookies.get("light") || "#001d3d",
    });
  };
  return (
    <Switch_st ui={ui} switchMode={switchMode}>
      <label className="switch">
        <input type="checkbox" checked={checked} onChange={handleSwitch} />
        <span className="slider round"></span>
      </label>
    </Switch_st>
  );
};

export default Switch;
