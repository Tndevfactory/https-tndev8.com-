/** @format */
import { motion } from "framer-motion";
import React from "react";
import Head from "next/head";
import { useQuery, useMutation, useQueryClient } from "react-query";
import styled, { css } from "styled-components";
import { ProdCtx, apiProfileShowOne } from "../../contexts/ProductsContext";
import Register1 from "../../components/registers/Register1";
import Loader1 from "../../components/loader/Loader1";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";

const Desktop = styled(motion.div)`
  min-width: 100%;
  min-height: 100vh;
  //background-color:pink;
  display: flex;
  justify-content: center;
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

// export const getServerSideProps = async () => {
//   const dt = await apiGet();

//   return { props: { dt } };
// };{ dt }

export default function Register() {
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
        <title> Inscription</title>
      </Head>

      <Mobile ui={ui} switchMode={switchMode}>
        <Navbar />
        {loader && <Loader1 />}

        <Register1 switchMode={switchMode} />
        <Footer fixed={true} />
      </Mobile>
    </>
  );
}
