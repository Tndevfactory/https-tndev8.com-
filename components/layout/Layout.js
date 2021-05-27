/** @format */
import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import Link from "next/link";
import chroma from "chroma-js";
import React from "react";

import { ProdCtx } from "../../contexts/ProductsContext";

import { Device } from "../devices/Device";
import Alert1 from "../alerts/Alert1";
import Loader from "../loader/Loader1";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";

const Desktop = styled(motion.div)`
  background: ${({ switchMode, ui }) =>
    switchMode ? chroma("#ddd").darken(1) : chroma("#ddd")};
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Mobile = styled(Desktop)`
  //large screen
  @media (min-width: 1920px) {
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
  @media (min-width: 375px) and (max-width: 600px) {
  }

  @media (min-width: 361px) and (max-width: 374px) {
  }
  @media (max-width: 360px) {
  }
`;

const Layout = ({ children }) => {
  const [prodMethods, prodStates] = ProdCtx();
  const {} = prodMethods;
  const {
    ui,
    loader,
    notification,
    setNotification,
    switchMode,
    setSwitchMode,
  } = prodStates;
  // console.log("loader");
  // console.log(loader);
  return (
    <>
      <Navbar />

      <main>
        <Mobile ui={ui} switchMode={switchMode}>
          {notification.notifType !== "" ? <Alert1 /> : null}
          {loader ? <Loader /> : null}

          {children}
        </Mobile>
      </main>

      <Footer setSwitchMode={setSwitchMode} switchMode={switchMode} />
    </>
  );
};

export default Layout;
