import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import Link from "next/link";
import chroma from "chroma-js";
import Image from "next/image";
import {
  FaUser,
  FaRegListAlt,
  FaRegMoneyBillAlt,
  FaMugHot,
  FaRecycle,
  FaParking,
  FaSkating,
} from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { ProdCtx, apiGet } from "../../contexts/ProductsContext";

const easing = [0.04, 0.62, 0.23, 0.98];

const Desktop = styled(motion.div)`
  //min-width: 40%;
  // background: violet;
  //padding: 2rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1.4rem;

  & > * {
    font-size: calc(0.72 * 1.3 * 100%);
    width: 25%;
    max-width: 25%;
    min-height: 13vh;
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
    border-radius: 5px;
    padding: 1.5rem 0.5rem;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: all 0.5s;
    box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.5);
    &:hover {
      box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.5);
    }
  }
  .icon {
    font-size: 2rem;
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
    //background: violet;
    gap: 1.1rem;

    & > * {
      font-size: calc(0.72 * 1.2 * 100%);
      max-width: 25%;
      min-height: 13vh;
      padding: 1.6rem 1.5rem;
    }
    .icon {
      font-size: 2rem;
    }
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

const Defaultss = ({ setSelectSection }) => {
  const [prodMethods, prodStates] = ProdCtx();
  const { apiGet, apiDelete, apiUpdate } = prodMethods;
  const { ui, notification, setNotification, switchMode } = prodStates;

  return (
    <Mobile ui={ui} switchMode={switchMode}>
      <div className="editer_profil" onClick={() => setSelectSection("profil")}>
        <span className="editer_profil_logo">
          <FaUser className="icon" />
        </span>
        <span className="editer_profil_title">Editer Profil</span>
      </div>
      <div className="fiche_paie" onClick={() => setSelectSection("paie")}>
        <span className="editer_profil_logo">
          <FaRegListAlt className="icon" />
        </span>
        <span className="editer_profil_title">Fiche de Paie</span>
      </div>
      <div
        className="calcul_salaire"
        onClick={() => setSelectSection("informations")}
      >
        <span className="editer_profil_logo">
          <FaRegMoneyBillAlt className="icon" />
        </span>
        <span className="editer_profil_title">Information</span>
      </div>
      <div className="demande_conge" onClick={() => setSelectSection("conge")}>
        <span className="editer_profil_logo">
          <FaSkating className="icon" />
        </span>
        <span className="editer_profil_title">Demande de Conge</span>
      </div>
      <div
        className="gestion_reclamation"
        onClick={() => setSelectSection("reclamation")}
      >
        <span className="editer_profil_logo">
          <FaRecycle className="icon" />
        </span>
        <span className="editer_profil_title">Gestion de Reclamation</span>
      </div>
      <div
        className="consulter_planification"
        onClick={() => setSelectSection("planification")}
      >
        <span className="editer_profil_logo">
          <FaParking className="icon" />
        </span>
        <span className="editer_profil_title">Consulter Planification</span>
      </div>
    </Mobile>
  );
};

export default Defaultss;
