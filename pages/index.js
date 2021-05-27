/** @format */
import { motion } from "framer-motion";
import React, { useState } from "react";
import Head from "next/head";
import { useQuery, useMutation, useQueryClient } from "react-query";
import styled, { css } from "styled-components";
import { ProdCtx, apiGet } from "../contexts/ProductsContext";

import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Login1 from "../components/logins/Login1";
import chroma from "chroma-js";
import Loader1 from "../components/loader/Loader1";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";

const Desktop = styled(motion.div)`
  min-width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
`;

const Mobile = styled(Desktop)``;

// export async function getServerSideProps({ params: { id } }) {
//   const initialData = await apiProfileShowOne(id);
//   //const initialData = await axios.get(`/profiles/${id}`);
//   return { props: { initialData } };
// }

export default function Home() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [prodMethods, prodStates] = ProdCtx();
  const { apiGet } = prodMethods;
  const {
    initialDataHotssr,
    setInitialDataHotssr,
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
        <title> Connexion</title>
      </Head>

      <Mobile ui={ui} switchMode={switchMode}>
        <Navbar />
        {loader && <Loader1 />}
        <Login1 switchMode={switchMode} />
        <Footer fixed={true} />
      </Mobile>
    </>
  );
}
