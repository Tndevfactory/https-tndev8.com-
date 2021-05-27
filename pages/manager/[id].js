/** @format */
import { motion } from "framer-motion";
import React from "react";
import Head from "next/head";
import { useQuery, useMutation, useQueryClient } from "react-query";
import styled, { css } from "styled-components";
import { ProdCtx, apiProfileShowOne } from "../../contexts/ProductsContext";
import { Device } from "../../components/devices/Device";
import Register1 from "../../components/registers/Register1";

import Loader1 from "../../components/loader/Loader1";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Image from "next/image";
import Link from "next/link";
import chroma from "chroma-js";
import { format, compareAsc } from "date-fns";
import Dashboard2 from "../../components/dashboard/Dashboard2";
import FichePaie from "../../components/profile/FichePaie";
import Information from "../../components/profile/Information";
import DemandeConge from "../../components/profile/DemandeConge";
import EditerProfil from "../../components/profile/EditerProfil";
import Planification from "../../components/profile/Planification";
import Reclamation from "../../components/profile/Reclamation";
import Default from "../../components/profile/Default";
import {
  FaUser,
  FaRegListAlt,
  FaRegMoneyBillAlt,
  FaRecycle,
  FaParking,
  FaSkating,
} from "react-icons/fa";

const Desktop = styled(motion.div)`
  min-width: 100%;
  min-height: 100vh;
  display: flex;
  // justify-content: center;
  //align-items: center;
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

export async function getServerSideProps({ params: { id } }) {
  const initialData = await apiProfileShowOne(id);
  //const initialData = await axios.get(`/profiles/${id}`);
  return { props: { initialData } };
}
export default function Manager({ initialData }) {
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

  setInitialDataHotssr1(initialData);
  // console.log("initialData");
  // console.log(initialDataHotssr);
  return (
    <>
      <Head>
        <meta name="description" content="software of paie" />
        <meta name="author" content="ch" />
        <meta name="og:title" property="og:title" content="soft paie" />
        <meta name="twitter:card" content="soft paie" />
        <meta name="robots" content="index, follow" />
        <title> Manager</title>
      </Head>

      <Mobile ui={ui} switchMode={switchMode}>
        <Navbar />
        {loader && <Loader1 />}

        <Dashboard2 switchMode={switchMode} />
        <Footer fixed={false} />
      </Mobile>
    </>
  );
}
