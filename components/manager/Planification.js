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
  .row_plan1 {
    padding: 1rem;
    .form_plan {
      display: flex;
      gap: 5px;
    }
  }
  .row_fixed_plan {
    width: 100%;
    padding: 1rem 4.3rem 1rem 0.5rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
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
  .row_plan {
    margin: 0.3rem 0rem 0.3rem 0rem;
    width: 100%;
    padding: 0.6rem 0rem 0.6rem 0.6rem;
    padding: 1rem 4.3rem 1rem 0.5rem;
    display: flex;
    align-items: center;
    flex-flow: column nowrap;
    background: rgba(0, 0, 0, 0.1);

    .visible {
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .btn_switcher {
        cursor: pointer;
        padding: 0.1rem 0.3rem;
        border-radius: 3px;
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
        & :hover {
          background: ${({ switchMode, ui }) =>
            switchMode
              ? chroma(ui.dark).brighten(1)
              : chroma(ui.light).darken(1)};
        }
      }
    }

    .hidden {
      width: 80%;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      flex-flow: column nowrap;

      .day {
        width: 60%;
        margin: 0.4rem 0rem 0.3rem 0rem;
        padding: 0.6rem 0.5rem 0.6rem 0.5rem;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        background: rgba(250, 250, 250, 0.8);
        & > * {
          width: 50%;
        }
      }
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

const Planification = () => {
  const [prodMethods, prodStates] = ProdCtx();
  const { apiGet, apiDelete, apiUpdate } = prodMethods;
  const { ui, notification, setNotification, switchMode } = prodStates;

  const [planvisible, setPlanVisible] = useState(false);

  const handlePlan = (e) => {
    if (planvisible !== e.target.id) {
      setPlanVisible(e.target.id);
    } else {
      setPlanVisible(false);
    }
  };

  return (
    <Mobile ui={ui} switchMode={switchMode}>
      <div className="row_plan1">
        <form className="form_plan" action="">
          <input type="text" />
          <Button1 type="submit" disabled={false} width={7} height={2.2}>
            rechercher
          </Button1>
        </form>
      </div>

      <div className="row_fixed_plan">
        <div>Semaines</div>
        <div>Mois</div>
        <div>Annee</div>
        <div>details</div>
      </div>

      <div className="row_plan">
        <div className="visible">
          <span>03</span>
          <span>03</span>
          <span>2021</span>

          <button className="btn_switcher" id="03" onClick={handlePlan}>
            details
          </button>
        </div>

        {planvisible === "03" && (
          <div className="hidden ">
            <div className="day">
              <span>Lundi</span>
              <span>8h</span>
              <span>12h</span>
              <span>13h</span>
              <span>18h</span>
            </div>
            <div className="day">
              <span>Mardi</span>
              <span>8h</span>
              <span>12h</span>
              <span>13h</span>
              <span>18h</span>
            </div>
            <div className="day">
              <span>Mercredi</span>
              <span>8h</span>
              <span>12h</span>
              <span>13h</span>
              <span>18h</span>
            </div>
            <div className="day">
              <span>Jeudi</span>
              <span>8h</span>
              <span>12h</span>
              <span>13h</span>
              <span>18h</span>
            </div>
            <div className="day">
              <span>Vendredi</span>
              <span>8h</span>
              <span>12h</span>
              <span>13h</span>
              <span>18h</span>
            </div>
            <div className="day">
              <span>Samedi</span>
              <span>off</span>
              <span>off</span>
              <span>off</span>
              <span>off</span>
            </div>
            <div className="day">
              <span>Dimanche</span>
              <span>off</span>
              <span>off</span>
              <span>off</span>
              <span>off</span>
            </div>
          </div>
        )}
      </div>
      <div className="row_plan">
        <div className="visible">
          <span>04</span>
          <span>03</span>
          <span>2021</span>

          <button className="btn_switcher" id="04" onClick={handlePlan}>
            details
          </button>
        </div>

        {planvisible === "04" && (
          <div className="hidden ">
            <div className="day">
              <span>Lundi</span>
              <span>8h</span>
              <span>12h</span>
              <span>13h</span>
              <span>18h</span>
            </div>
            <div className="day">
              <span>Mardi</span>
              <span>8h</span>
              <span>12h</span>
              <span>13h</span>
              <span>18h</span>
            </div>
            <div className="day">
              <span>Mercredi</span>
              <span>8h</span>
              <span>12h</span>
              <span>13h</span>
              <span>18h</span>
            </div>
            <div className="day">
              <span>Jeudi</span>
              <span>8h</span>
              <span>12h</span>
              <span>13h</span>
              <span>18h</span>
            </div>
            <div className="day">
              <span>Vendredi</span>
              <span>8h</span>
              <span>12h</span>
              <span>13h</span>
              <span>18h</span>
            </div>
            <div className="day">
              <span>Samedi</span>
              <span>off</span>
              <span>off</span>
              <span>off</span>
              <span>off</span>
            </div>
            <div className="day">
              <span>Dimanche</span>
              <span>off</span>
              <span>off</span>
              <span>off</span>
              <span>off</span>
            </div>
          </div>
        )}
      </div>
    </Mobile>
  );
};

export default Planification;
