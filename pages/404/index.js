/** @format */
import { motion } from "framer-motion";
import Head from "next/head";
import styled, { css } from "styled-components";
import NotFound from "../../components/404/NotFound";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import React, { useState } from "react";
import { useRouter } from "next/router";
import chroma from "chroma-js";
import Loader1 from "../../components/loader/Loader1";
import { ProdCtx, apiProfileShowOne } from "../../contexts/ProductsContext";
import Cookies from "js-cookie";
import { FaChevronLeft, FaRegArrowAltCircleLeft } from "react-icons/fa";

const Desktop = styled(motion.div)`
  min-width: 100%;
  min-height: 80vh;
  display: flex;
  justify-content: center;
  gap: 3em;
  align-items: center;
  flex-flow: column nowrap;
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
`;

const Mobile = styled(Desktop)`
  @media (min-width: 361px) and (max-width: 600px) {
    margin-top: 0.5rem;
  }
  @media (max-width: 360px) {
    margin-top: 0.5rem;
  }
`;

export default function NotFoundPage() {
  const router = useRouter();
  const [prodMethods, prodStates] = ProdCtx();
  const { apiUpdate } = prodMethods;
  const { ui, setUi, switchMode, loader, setLoader, setSwitchMode } = prodStates;
  return (
    <>
      <Head>
        <meta name="description" content="software of paie" />
        <meta name="author" content="ch" />
        <meta name="og:title" property="og:title" content="soft paie" />
        <meta name="twitter:card" content="soft paie" />
        <meta name="robots" content="index, follow" />
        <title> 404</title>
      </Head>

      <Mobile ui={ui} switchMode={switchMode}>
        <Navbar />
        {loader && <Loader1 />}
        <NotFound />
        <Footer fixed={true} />
      </Mobile>
    </>
  );
}
