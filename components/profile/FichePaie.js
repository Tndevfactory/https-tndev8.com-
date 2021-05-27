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

import {
  FaDownload,
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
      gap: 2px;
    }
    input {
      border: 1px #bbb solid;
      border-radius: 5px;
      padding: 0em 1em;
      height: 2em;
      &:focus {
        border: 1px #888 solid;
        outline: none;
      }
    }
  }
  .row_fixed {
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;

    width: 100%;
    padding: 0.3em;
    display: flex;
    font-size: 0.9em;
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
    margin: 0.3em 0em 0.3em 0em;
    width: 100%;
    padding: 0.3em;
    font-size: 0.9em;
    display: flex;
    border: solid 1px #999;
    justify-content: space-around;
    align-items: center;
    background: rgba(0, 0, 0, 0.1);
    transition: all 0.2s;
    cursor: pointer;
    & > * {
      width: 8%;
    }
    &:hover {
      box-shadow: 0.31px 1px 0.5px 1px rgba(0, 0, 0, 0.2);
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

const FichePaie = ({ data }) => {
  const [prodMethods, prodStates] = ProdCtx();
  const { pdfMethods } = prodMethods;
  const { apiPdf, downloadPdf } = pdfMethods;

  const { ui, notification, setNotification, switchMode } = prodStates;

  const [sectionSelector, setSectionSelector] = useState("");
  const breadcrumb = {
    root: "Employee",
    active: "Fiche de paie",
  };

  const handlePdf = async () => {
    let res = await apiPdf();

    const file = new Blob([res], { type: "application/pdf" });
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  };

  const handleDowloadPdf = async (year, month, id) => {
    let res = await downloadPdf(year, month, id);

    const file = new Blob([res], { type: "application/pdf" });
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  };
  return (
    <Mobile ui={ui} switchMode={switchMode}>
      <div className="row_search">
        <form className="form_search">
          <input type="text" />
          <Button1 type="submit" disabled={false} width={6} height={2}>
            Rechercher
          </Button1>
        </form>
      </div>
      <div className="row_fixed">
        <div>Mois</div>
        <div>Annee</div>
        <div>Télécharger</div>
      </div>

      <div className="row">
        <div>Mai</div>
        <div>2021</div>

        <div>
          <Button1
            proceed={() => handleDowloadPdf("2021", "05", data?.user.id)}
            type="submit"
            disabled={false}
            width={1.8}
            height={1.3}
          >
            <FaDownload />
          </Button1>
        </div>
      </div>
      <div className="row">
        <div>Avril</div>
        <div>2021</div>

        <div>
          <Button1
            proceed={() => handleDowloadPdf("2021", "04", data?.user.id)}
            type="submit"
            disabled={false}
            width={1.8}
            height={1.3}
          >
            <FaDownload />
          </Button1>
        </div>
      </div>
      <div className="row">
        <div>Mars</div>
        <div>2021</div>

        <div>
          <Button1
            proceed={() => handleDowloadPdf("2021", "03", data?.user.id)}
            type="submit"
            disabled={false}
            width={1.8}
            height={1.3}
          >
            <FaDownload />
          </Button1>
        </div>
      </div>

      <div className="row">
        <div>Fevrier</div>
        <div>2021</div>

        <div>
          <Button1
            proceed={() => handleDowloadPdf("2021", "02", data?.user.id)}
            type="submit"
            disabled={false}
            width={1.8}
            height={1.3}
          >
            <FaDownload />
          </Button1>
        </div>
      </div>
      <div className="row">
        <div>Janvier</div>
        <div>2021</div>

        <div>
          <Button1
            proceed={() => handleDowloadPdf("2021", "01", data?.user.id)}
            type="submit"
            disabled={false}
            width={1.8}
            height={1.3}
          >
            <FaDownload />
          </Button1>
        </div>
      </div>
    </Mobile>
  );
};

export default FichePaie;
