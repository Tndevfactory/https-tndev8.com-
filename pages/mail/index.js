/** @format */
import { motion } from "framer-motion";
import React from "react";
import Head from "next/head";
import styled, { css } from "styled-components";
import SendMail from "../../components/mail/SendMail";
import { ProdCtx, apiProfileShowOne } from "../../contexts/ProductsContext";
import Loader1 from "../../components/loader/Loader1";

const Desktop = styled(motion.div)`
  min-width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  gap: 3em;
  align-items: center;
  flex-flow: column nowrap;
`;

const Mobile = styled(Desktop)`
  @media (min-width: 361px) and (max-width: 600px) {
    margin-top: 0.5rem;
  }
  @media (max-width: 360px) {
    margin-top: 0.5rem;
  }
`;

export default function SendMailPage() {
  const queryClient = useQueryClient();
  const [prodMethods, prodStates] = ProdCtx();
  const { apiGet } = prodMethods;
  const {
    initialDataHotssr1,
    setInitialDataHotssr1,
    loader,
    setLoader,
    ui,
    switchMode,
  } = prodStates;

  return (
    <>
      <Head>
        <meta name="description" content="software of paie" />
        <meta name="author" content="ch" />
        <meta name="og:title" property="og:title" content="soft paie" />
        <meta name="twitter:card" content="soft paie" />
        <meta name="robots" content="index, follow" />
        <title> sendmail</title>
      </Head>

      <Mobile>
        {loader && <Loader1 />}
        <SendMail />
      </Mobile>
    </>
  );
}
