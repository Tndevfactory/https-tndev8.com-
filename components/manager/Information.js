/** @format */
import { motion } from "framer-motion";
import Button1 from "../buttons/Button1";

import React, { useState } from "react";
import Head from "next/head";
import Breadcrumb1 from "../breadcrumbs/Breadcrumb1";
import { useQuery, useMutation, useQueryClient } from "react-query";
import styled, { css } from "styled-components";
import { ProdCtx, apiGet } from "../../contexts/ProductsContext";
import { Device } from "../devices/Device";
import Register1 from "../registers/Register1";
import Alert1 from "../alerts/Alert1";
import Loader from "../loader/Loader1";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import Image from "next/image";
import Link from "next/link";
import chroma from "chroma-js";
import { format, compareAsc } from "date-fns";

import {
  FaUser,
  FaRegListAlt,
  FaRegMoneyBillAlt,
  FaRecycle,
  FaParking,
  FaSkating,
} from "react-icons/fa";

const Desktop = styled(motion.div)`
  min-width: 70vw;
  margin: 0.8rem 1rem 0.3rem 0rem;
  .row_info {
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    gap: 1rem;
  }
  .inf {
    width: 100%;
    display: flex;
    gap: 1rem;
    & > *:first-child {
      font-weight: 600;
    }
  }
`;

const Mobile = styled(Desktop)`
  @media (min-width: 375px) and (max-width: 600px) {
    padding: 9rem 0rem 1rem 0rem;
  }

  @media (min-width: 361px) and (max-width: 374px) {
    padding: 9rem 0rem 1rem 0rem;
  }
  @media (max-width: 360px) {
    padding: 9rem 0rem 1rem 0rem;
  }
`;

const Information = () => {
  const [prodMethods, prodStates] = ProdCtx();
  const { apiGet, apiDelete, apiUpdate } = prodMethods;
  const { ui, notification, setNotification, switchMode } = prodStates;

  const [sectionSelector, setSectionSelector] = useState("");
  const breadcrumb = {
    root: "Employee",
    active: "Fiche de paie",
  };
  return (
    <Mobile ui={ui} switchMode={switchMode}>
      <div className="row_info">
        <div className="inf">
          <span>Date de recrutement: </span>
          <span>12/12/2018</span>
        </div>
        <div className="inf">
          <span>Anciennete: </span>
          <span>34 mois</span>
        </div>
        <div className="inf">
          <span>Poste actuel: </span>
          <span>comptable</span>
        </div>
        <div className="inf">
          <span>Taux horaire: </span>
          <span>4.5 Tnd</span>
        </div>
        <div className="inf">
          <span>Nombre d'enfants: </span>
          <span>3</span>
        </div>
      </div>
    </Mobile>
  );
};

export default Information;
