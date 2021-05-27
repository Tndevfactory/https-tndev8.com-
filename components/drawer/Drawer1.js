import React, { useState } from "react";
import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import Link from "next/link";
import chroma from "chroma-js";
import { FaEyeSlash, FaEye, FaBars } from "react-icons/fa";
import { Device } from "../devices/Device";
import { ProdCtx } from "../../contexts/ProductsContext";

const Desktop = styled(motion.nav)`
  display: none;
`;

const Mobile = styled(Desktop)`
  @media ${Device.mobile} {
    display: inline-block;

    span {
      margin: 0 4px;
      color: ${({ switchMode, ui }) =>
        switchMode
          ? chroma(ui.dark).luminance() < 0.4
            ? chroma(ui.dark).brighten(4)
            : chroma(ui.dark).darken(3)
          : chroma(ui.light).luminance() < 0.4
          ? chroma(ui.light).brighten(4)
          : chroma(ui.light).darken(3)};
      .bars_icon {
        font-size: 1.3rem;
        transition: all 0.5s ease;
        cursor: pointer;
        &:hover {
          color: ${({ switchMode, ui }) =>
            switchMode
              ? chroma(ui.dark).brighten(1)
              : chroma(ui.light).darken(1)};
        }
      }
    }
    .d_block {
      display: inline-block;
      width: 30vh;
      min-height: 100vh;
      background: white;
      font-size: 1rem;
      position: absolute;
      top: 150px;
      left: -300px;

      padding: 0.3rem 0rem 0rem 0.5rem;
      z-index: 999;
      .d_block_content {
        color: black;
        ul {
          li {
            list-style: none;
            margin: 0.6rem 0px;
          }
        }
      }
    }
  }
`;

const Drawer1 = () => {
  const [prodMethods, prodStates] = ProdCtx();
  const { apiGet, apiDelete, apiUpdate } = prodMethods;
  const {
    ui,
    notification,
    setNotification,
    switchMode,
    setSwitchMode,
  } = prodStates;

  const [openDrawer, setOpenDrawer] = useState(false);
  const variants = {
    animate: {
      x: openDrawer ? 300 : -300,
      transition: {
        duration: 1,
        type: "tween",
      },
    },
  };
  // console.log("openDrawer");
  // console.log(openDrawer);
  return (
    <Mobile openDrawer={openDrawer} ui={ui} switchMode={switchMode}>
      <span title="drawer">
        <FaBars
          className="bars_icon"
          onClick={() => setOpenDrawer(!openDrawer)}
        />
      </span>
      <motion.div className="d_block" variants={variants} animate="animate">
        <div className="d_block_content">
          <ul>
            <li>
              <Link href="/">
                <a> editer profil</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a> calcul salaire</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a> deposer reclamation</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a> demander conge</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a> Fiche de paie</a>
              </Link>
            </li>
          </ul>
        </div>
      </motion.div>
    </Mobile>
  );
};

export default Drawer1;
