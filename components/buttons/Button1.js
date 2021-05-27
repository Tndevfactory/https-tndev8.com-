import React, { useState } from "react";
import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import Link from "next/link";
import chroma from "chroma-js";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Device } from "../devices/Device";
import { ProdCtx, apiGet } from "../../contexts/ProductsContext";

const Desktop = styled(motion.button)`
  padding: 0.2em 0.3em;
  position: relative;
  display: inline-block;
  letter-spacing: 0.04em;
  font-weight: 500;
  border-radius: 6px;

  height: ${({ height }) => height + "rem"};
  width: ${({ width }) => width + "rem"};

  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  border: none;
  transition: background 0.3s;

  background: ${({ disabled, switchMode, ui }) =>
    disabled
      ? switchMode
        ? chroma("gray").brighten(1.5)
        : chroma("gray").brighten(2.5)
      : switchMode
      ? chroma(ui.dark)
      : chroma(ui.light)};

  color: ${({ disabled, switchMode, ui }) =>
    disabled
      ? switchMode
        ? chroma("gray").brighten(0.5)
        : chroma("gray").brighten(1)
      : switchMode
      ? chroma(ui.dark).luminance() < 0.4
        ? chroma(ui.dark).brighten(5)
        : chroma(ui.dark).darken(3)
      : chroma(ui.light).luminance() < 0.4
      ? chroma(ui.light).brighten(5)
      : chroma(ui.light).darken(3)};

  &:hover {
    background: ${({ disabled, switchMode, ui }) =>
      disabled
        ? switchMode
          ? chroma("gray").brighten(1.5)
          : chroma("gray").brighten(2.5)
        : switchMode
        ? chroma(ui.dark).luminance() < 0.4
          ? chroma(ui.dark).brighten(1)
          : chroma(ui.dark).darken(1)
        : chroma(ui.light).luminance() < 0.4
        ? chroma(ui.light).brighten(1)
        : chroma(ui.light).darken(1)};

    color: ${({ disabled, switchMode, ui }) =>
      disabled
        ? switchMode
          ? chroma("gray").brighten(0.5)
          : chroma("gray").brighten(1)
        : switchMode
        ? chroma(ui.dark).luminance() < 0.4
          ? chroma(ui.dark).brighten(5)
          : chroma(ui.dark).darken(3)
        : chroma(ui.light).luminance() < 0.4
        ? chroma(ui.light).brighten(5)
        : chroma(ui.light).darken(3)};
  }
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
  .children {
    font-size: 0.85em;
    text-transform: capitalize;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }
`;

const Mobile = styled(Desktop)`
  @media (min-width: 375px) and (max-width: 600px) {
    height: ${({ height }) => height - 0.4 + "rem"};
    width: ${({ width }) => width - 1.7 + "rem"};
    .children {
      font-size: 0.6em;
    }
  }
  @media (min-width: 361px) and (max-width: 374px) {
    height: ${({ height }) => height - 0.4 + "rem"};
    width: ${({ width }) => width - 1.7 + "rem"};
    .children {
      font-size: 0.6em;
    }
  }
  @media (max-width: 360px) {
    height: ${({ height }) => height - 0.4 + "rem"};
    width: ${({ width }) => width - 1.7 + "rem"};
    .children {
      font-size: 0.6em;
    }
  }
`;

const Button1 = ({ children, height, width, disabled, proceed }) => {
  const [prodMethods, prodStates] = ProdCtx();
  const { apiGet, apiDelete, apiUpdate } = prodMethods;
  const { ui, notification, setNotification, switchMode, setSwitchMode } =
    prodStates;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Mobile
      ui={ui}
      disabled={disabled}
      switchMode={switchMode}
      height={height}
      width={width}
      onClick={proceed || null}
    >
      <span className="children">{children}</span>
    </Mobile>
  );
};

export default Button1;
