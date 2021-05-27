/** @format */

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import styled, { css } from "styled-components";
import chroma from "chroma-js";
import { ProdCtx, apiGet } from "../../contexts/ProductsContext";
import { Device } from "../devices/Device";
import { SketchPicker } from "react-color";
import Cookies from "js-cookie";

import { FaChevronLeft, FaRegArrowAltCircleLeft } from "react-icons/fa";

const Desktop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2em;
  min-width: 30%;
  padding: 1em;
  .back {
    color: red;
    cursor: pointer;
  }
  .back_icon {
    color: ${({ switchMode, ui }) =>
      switchMode ? chroma(ui.dark) : chroma(ui.light)};
    font-size: 0.9em;
  }
  .back_text {
    color: #222;
    margin-left: 4px;
    transition: all 0.5s;
    &:hover {
      text-shadow: 0.51px 0.41px 0.91px rgba(0, 0, 0, 0.5);
    }
  }
  .block {
    z-index: 1;
    display: flex;
    justify-content: space-around;
    gap: 3em;
    h3 {
      text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.3);
      text-align: center;
      text-transform: capitalize;
      color: ${({ switchMode, ui }) =>
        switchMode
          ? chroma(ui.dark).luminance() < 0.4
            ? chroma(ui.dark).brighten(5)
            : chroma(ui.dark).darken(3)
          : chroma(ui.light).luminance() < 0.4
          ? chroma(ui.light).brighten(5)
          : chroma(ui.light).darken(3)};
    }
    .dark {
      background: ${({ switchMode, ui }) =>
        switchMode ? chroma(ui.dark) : "transparent"};

      padding: 1.5em;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-flow: column wrap;
      cursor: pointer;
      box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.5);
      transition: box-shadow 0.1s linear;
      &:hover {
        box-shadow: 1px 1px 5px 4px rgba(0, 0, 0, 0.5);
      }

      .dark_picker {
        display: block;
        cursor: pointer;
      }
    }
    .light {
      background: ${({ switchMode, ui }) =>
        switchMode ? "transparent" : chroma(ui.light)};
      padding: 1.5em;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-flow: column wrap;
      cursor: pointer;
      box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.5);
      transition: box-shadow 0.1s linear;
      &:hover {
        box-shadow: 1px 1px 5px 4px rgba(0, 0, 0, 0.5);
      }
      .light_picker {
        display: block;
        cursor: pointer;
      }
    }
  }
`;

const Mobile = styled(Desktop)`
  //large screen
  @media (min-width: 1920px) {
    .block {
    }
  }

  @media (min-width: 1536px) and (max-width: 1919px) {
  }

  @media (min-width: 1440px) and (max-width: 1535px) {
  }
  @media (min-width: 1366px) and (max-width: 1439px) {
  }
  @media (min-width: 1280px) and (max-width: 1365px) {
  }

  //mobile
  @media (max-width: 600px) {
    .block {
      z-index: 1;
      display: flex;
      flex-flow: column wrap;
      justify-content: space-around;
      gap: 16px;
    }
  }
  @media (min-width: 375px) and (max-width: 600px) {
  }

  @media (min-width: 361px) and (max-width: 374px) {
  }
  @media (max-width: 360px) {
  }
`;

const Config1 = () => {
  const router = useRouter();
  const [prodMethods, prodStates] = ProdCtx();
  const { apiUpdate } = prodMethods;
  const { ui, setUi, switchMode, setSwitchMode } = prodStates;

  const handleChangeDark = (color) => {
    setUi({
      ...ui,
      dark: color.hex,
    });
    Cookies.set("dark", color.hex);
  };
  const handleChangeLight = (color) => {
    setUi({
      ...ui,
      light: color.hex,
    });
    Cookies.set("light", color.hex);
  };

  const handleDarkClick = () => {
    if (!switchMode) {
      setSwitchMode(true);
      // console.log("dark click");
      // console.log(switchMode);
    }
  };
  const handlelightClick = () => {
    if (switchMode) {
      setSwitchMode(false);
      // console.log("lightclick");
      // console.log(switchMode);
    }
  };

  return (
    <Mobile ui={ui} switchMode={switchMode}>
      <h2 className="back" onClick={() => router.back()}>
        <FaRegArrowAltCircleLeft className="back_icon" />
        <span className="back_text">Retour</span>
      </h2>
      <div className="block">
        <div className="dark" onClick={handleDarkClick}>
          <h3>{switchMode ? "theme Actif" : "theme secondaire"}</h3>
          <SketchPicker
            color={ui.dark}
            className="dark_picker"
            onChangeComplete={handleChangeDark}
          />
        </div>
        <div className="light" onClick={handlelightClick}>
          <h3>{!switchMode ? "theme Actif" : "theme secondaire"}</h3>
          <SketchPicker
            color={ui.light}
            className="light_picker"
            onChangeComplete={handleChangeLight}
          />
        </div>
      </div>
    </Mobile>
  );
};

export default Config1;
