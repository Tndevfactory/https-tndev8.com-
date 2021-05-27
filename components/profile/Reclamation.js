/** @format */
import { motion } from "framer-motion";
import Button1 from "../buttons/Button1";

import React, { useState } from "react";
import Head from "next/head";
import Breadcrumb1 from "../breadcrumbs/Breadcrumb1";
import { useQuery, useMutation, useQueryClient } from "react-query";
import styled, { css } from "styled-components";
import { ProdCtx, apiGet } from "../../contexts/ProductsContext";
import { Device } from "../../components/devices/Device";
import Register1 from "../../components/registers/Register1";
import Alert1 from "../../components/alerts/Alert1";
import Loader from "../../components/loader/Loader1";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Image from "next/image";
import Link from "next/link";
import chroma from "chroma-js";
import { format, compareAsc } from "date-fns";
import Select from "react-select";

import {
  FaUser,
  FaRegListAlt,
  FaRegMoneyBillAlt,
  FaRecycle,
  FaParking,
  FaSkating,
} from "react-icons/fa";

const options = [
  { value: "erreur", label: "Erreur salaire" },
  { value: "Retard", label: "Retard de versement" },
  { value: "Information", label: "Information erronee" },
];

const Desktop = styled(motion.div)`
  min-width: 70vw;

  .form_recla {
    display: flex;
    flex-flow: column nowrap;
    gap: 5px;
  }
  .recla_select {
    max-width: 40%;
    gap: 1rem;
    margin: 0.5rem 0rem 1rem 0rem;
  }
  .recla_raison {
    max-width: 50%;
    display: flex;
    flex-flow: column nowrap;
    margin-bottom: 1rem;
    .recla_area {
      padding: 1rem;
    }
  }
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

const Reclamation = () => {
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
      <form className="form_recla" action="">
        <h3>Deposer une reclamation</h3>
        <div className="recla_select">
          <label htmlFor="">Motif:</label>
          <Select options={options} />
        </div>
        <div className="recla_raison">
          <label htmlFor="">Raison:</label>
          <textarea
            className="recla_area"
            id="recla"
            name="recla"
            rows="4"
            cols="5"
          >
            bio employee Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Nobis omnis voluptatum sunt repudiandae. Dolorum suscipit
            rerum, hic vitae quisquam minima laudantium esse est, ipsa placeat
            blanditiis qui iusto maiores et.
          </textarea>
        </div>
        <Button1 type="submit" disabled={false} width={5} height={2.2}>
          valider
        </Button1>
      </form>
    </Mobile>
  );
};

export default Reclamation;
