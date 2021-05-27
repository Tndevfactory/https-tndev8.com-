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
  .row_search {
    padding: 1rem;
    .form_search {
      display: flex;
      gap: 5px;
    }
  }
  .row_fixed {
    width: 100%;
    padding: 1rem;
    display: flex;
    justify-content: space-around;
    background: ${({ switchMode, ui }) =>
      switchMode ? chroma(ui.dark) : chroma(ui.light)};

    color: ${({ switchMode, ui }) =>
      switchMode
        ? chroma(ui.dark).luminance() < 0.4
          ? chroma(ui.dark).brighten(5)
          : chroma(ui.dark).darken(3)
        : chroma(ui.light).luminance() < 0.4
        ? chroma(ui.light).brighten(5)
        : chroma(ui.light).darken(3)};
  }
  .row {
    margin: 0.3rem 0rem 0.3rem 0rem;
    width: 100%;
    padding: 0.6rem;

    display: flex;
    justify-content: space-around;
    align-items: center;
    background: rgba(0, 0, 0, 0.1);
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

const FichePaie = () => {
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
      <div className="row_search">
        <form className="form_search" action="">
          <input type="text" />
          <Button1 type="submit" disabled={false} width={7} height={2.2}>
            rechercher
          </Button1>
        </form>
      </div>
      <div className="row_fixed">
        <div>Mois</div>
        <div>Annee</div>

        <div>Telecharger</div>
      </div>

      <div className="row">
        <div>Mars</div>
        <div>2021</div>

        <div>
          <Button1 type="submit" disabled={false} width={6} height={2}>
            telecharger
          </Button1>
        </div>
      </div>
      <div className="row">
        <div>Mars</div>
        <div>2021</div>

        <div>
          <Button1 type="submit" disabled={false} width={6} height={2}>
            telecharger
          </Button1>
        </div>
      </div>
      <div className="row">
        <div>Mars</div>
        <div>2021</div>

        <div>
          <Button1 type="submit" disabled={false} width={6} height={2}>
            telecharger
          </Button1>
        </div>
      </div>
    </Mobile>
  );
};

export default FichePaie;
