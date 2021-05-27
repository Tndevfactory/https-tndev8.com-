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
  FaRegEdit,
  FaTrashAlt,
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
    font-weight: 500;
    font-size: 0.9em;
    letter-spacing: 0.5px;
    font-family: ${({ ui }) => ui.navFont};
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
    background: rgba(250, 250, 250, 0.8);
    transition: all 0.2s;
    cursor: pointer;
    & > * {
      width: 9%;
    }
    &:hover {
      box-shadow: 0.31px 1px 0.5px 1px rgba(0, 0, 0, 0.2);
    }

    .photo_id {
      margin-left: 25px;
      width: 3%;
      border: 0.7px solid #ddd;
      border-radius: 50%;
      box-shadow: 0.2px 0.2px 0.6px 0.4px;
      border: 0.51px solid #888;
      ${({ switchMode, ui }) =>
        switchMode ? chroma(ui.dark) : chroma(ui.light)};
    }
    .photo_id_img {
      border-radius: 50%;
    }
    .manager_name {
      .manager_name_select {
        width: 100%;
        padding: 0.15em 0.12em;
        font-size: 0.9em;
        color: #333;
        background: rgba(250, 250, 250, 0.9);
        border: 0.1px solid rgba(200, 200, 200, 0.8);
        &:focus {
          outline: none;
          border: 1px solid #999;
        }
      }
    }
    .role_name {
      margin-left: -20px;
      .role_name_select {
        width: 80%;
        padding: 0.15em 0.12em;
        font-size: 0.9em;
        color: #333;
        background: rgba(250, 250, 250, 0.9);
        border: 0.1px solid rgba(200, 200, 200, 0.8);
        &:focus {
          outline: none;
          border: 1px solid #999;
        }
      }
    }
    .active_state {
      .active_state_select {
        width: 60%;
        padding: 0.15em 0.12em;
        font-size: 0.9em;
        color: #333;
        background: rgba(250, 250, 250, 0.9);
        border: 0.1px solid rgba(200, 200, 200, 0.8);
        &:focus {
          outline: none;
          border: 1px solid #999;
        }
      }
    }
    .editer {
      margin-left: -25px;
    }
    .supprimer {
      margin-left: -24px;
      margin-right: -13px;
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

const GestionEmployees = ({ setSelectSection }) => {
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
        <div>Photo </div>
        <div>Nom </div>
        <div>Manager</div>
        <div>Role</div>
        <div>Actif</div>
        <div>Editer</div>
        <div>Supprimer</div>
      </div>
      {/* start row  */}
      <div className="row">
        <div className="photo_id">
          <Image
            src="/img/profil/profil.jpg"
            alt="employee"
            layout="responsive"
            quality={65}
            height={30}
            width={30}
            className="photo_id_img"
          />
        </div>
        <div className="employee_name">Belhaj-ali Slim</div>
        <div className="manager_name">
          <select
            className="manager_name_select"
            name="managerName"
            id="managerName"
          >
            <option value="">Belkahla Iheb</option>
            <option value="">Bekalj samira</option>
            <option value="">Elhthili Fethi</option>
          </select>
        </div>
        <div className="role_name">
          <select className="role_name_select" name="roleName_" id="roleName_">
            <option value=""> Employee</option>
            <option value=""> Manager</option>
          </select>
        </div>
        <div className="active_state">
          <select
            className="active_state_select"
            name="activeState"
            id="activeState"
          >
            <option value=""> Actif</option>
            <option value=""> Inactif</option>
          </select>
        </div>

        <div className="editer">
          <Button1
            proceed={() => setSelectSection("DetailsView")}
            type="submit"
            disabled={false}
            width={1.8}
            height={1.3}
            className="editer_button"
          >
            <FaRegEdit />
          </Button1>
        </div>

        <div className="supprimer">
          <Button1
            proceed={null}
            type="submit"
            disabled={false}
            width={1.8}
            height={1.3}
            className="supprimer_button"
          >
            <FaTrashAlt />
          </Button1>
        </div>
      </div>
      {/* end row  */}

      {/* start row  */}
      <div className="row">
        <div className="photo_id">
          <Image
            src="/img/profil/profil.jpg"
            alt="employee"
            layout="responsive"
            quality={65}
            height={30}
            width={30}
            className="photo_id_img"
          />
        </div>
        <div className="employee_name">Belhaj-ali Slim</div>
        <div className="manager_name">
          <select
            className="manager_name_select"
            name="managerName"
            id="managerName"
          >
            <option value="">Belkahla Iheb</option>
            <option value="">Bekalj samira</option>
            <option value="">Elhthili Fethi</option>
          </select>
        </div>
        <div className="role_name">
          <select className="role_name_select" name="roleName_" id="roleName_">
            <option value=""> Employee</option>
            <option value=""> Manager</option>
          </select>
        </div>
        <div className="active_state">
          <select
            className="active_state_select"
            name="activeState"
            id="activeState"
          >
            <option value=""> Actif</option>
            <option value=""> Inactif</option>
          </select>
        </div>

        <div className="editer">
          <Button1
            proceed={() => setSelectSection("DetailsView")}
            type="submit"
            disabled={false}
            width={1.8}
            height={1.3}
            className="editer_button"
          >
            <FaRegEdit />
          </Button1>
        </div>

        <div className="supprimer">
          <Button1
            proceed={null}
            type="submit"
            disabled={false}
            width={1.8}
            height={1.3}
            className="supprimer_button"
          >
            <FaTrashAlt />
          </Button1>
        </div>
      </div>
      {/* end row  */}

      {/* start row  */}
      <div className="row">
        <div className="photo_id">
          <Image
            src="/img/profil/profil.jpg"
            alt="employee"
            layout="responsive"
            quality={65}
            height={30}
            width={30}
            className="photo_id_img"
          />
        </div>
        <div className="employee_name">Belhaj-ali Slim</div>
        <div className="manager_name">
          <select
            className="manager_name_select"
            name="managerName"
            id="managerName"
          >
            <option value="">Belkahla Iheb</option>
            <option value="">Bekalj samira</option>
            <option value="">Elhthili Fethi</option>
          </select>
        </div>
        <div className="role_name">
          <select className="role_name_select" name="roleName_" id="roleName_">
            <option value=""> Employee</option>
            <option value=""> Manager</option>
          </select>
        </div>
        <div className="active_state">
          <select
            className="active_state_select"
            name="activeState"
            id="activeState"
          >
            <option value=""> Actif</option>
            <option value=""> Inactif</option>
          </select>
        </div>

        <div className="editer">
          <Button1
            proceed={null}
            type="submit"
            disabled={false}
            width={1.8}
            height={1.3}
            className="editer_button"
          >
            <FaRegEdit />
          </Button1>
        </div>

        <div className="supprimer">
          <Button1
            proceed={null}
            type="submit"
            disabled={false}
            width={1.8}
            height={1.3}
            className="supprimer_button"
          >
            <FaTrashAlt />
          </Button1>
        </div>
      </div>
      {/* end row  */}
    </Mobile>
  );
};

export default GestionEmployees;
