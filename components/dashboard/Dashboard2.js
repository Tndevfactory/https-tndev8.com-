/** @format */
import { motion } from "framer-motion";
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
import Cookies from "js-cookie";
import { format, compareAsc } from "date-fns";
import { useRouter } from "next/router";
import FichePaie from "../../components/profile/FichePaie";
import Information from "../../components/profile/Information";
import DemandeConge from "../../components/profile/DemandeConge";
import EditerProfil from "../../components/profile/EditerProfil";
import Planification from "../../components/profile/Planification";
import Reclamation from "../../components/profile/Reclamation";
import Default from "../../components/profile/Default";
import {
  FaInfoCircle,
  FaUserShield,
  FaUser,
  FaRegListAlt,
  FaRegMoneyBillAlt,
  FaRecycle,
  FaParking,
  FaSkating,
  FaUserCog,
} from "react-icons/fa";

const font = "17rem";

const Desktop = styled(motion.div)`
  padding: 6em 0em 1em 0em;
  display: flex;

  & > * {
    display: inline-block;
    min-height: 80vh;
    border-radius: 5px;
    padding: 0.5rem 2rem;

    background: rgba(240, 240, 240, 0.9);
    border: 3px ForestGreen solid;
  }

  .fixed-drawer {
    background: rgba(255, 255, 255, 0.9);
    min-width: 18%;
    margin: 0rem 0.5rem 0rem 0.5rem;
  }
  .manager {
    display: flex;
    margin: 1rem 0rem;
    gap: 7px;
    font-weight: 700;
    text-transform: uppercase;
    font-family: ${({ ui }) => ui.navFont};
    /* font-size: ${({ font1 }) => font1}; */
    font-size: calc(1.2 * 1.2 * 100%);
    color: ${({ switchMode, ui }) =>
      switchMode ? chroma(ui.dark) : chroma(ui.light)};
    position: relative;
    &:after {
      position: absolute;
      bottom: 0;
      height: 5px;
      width: calc(0.72 * 1.2 * 100%);
      background: green;
      border-right: 1px white;
      content: "";
    }
  }

  .manager_logo {
  }
  .manager_title {
  }

  .img-profile {
    width: 40%;
    border: 1px solid #ddd;
    border-radius: 50%;
    box-shadow: 0.2px 0.2px 0.6px 0.4px
      ${({ switchMode, ui }) =>
        switchMode ? chroma(ui.dark) : chroma(ui.light)};
  }
  .img {
    border-radius: 50%;
  }
  .date {
    font-size: 17px;

    margin: 1rem 0rem 1rem 0.5rem;
    .date_label {
      font-weight: 600;
    }
    .date_time {
    }
  }

  .profil_username {
    margin: 0.7em 0em 0em 0em;
    .profil_username_label {
      font-size: calc(0.72 * 1.3 * 100%);
      font-weight: 450;
      color: inherit;
    }
    .profil_username_value {
      font-size: calc(0.72 * 1.4 * 100%);
      text-transform: capitalize;
      font-weight: 400;
      color: ${({ switchMode, ui }) =>
        switchMode ? chroma(ui.dark) : chroma(ui.light)};
    }
  }
  .profil_role {
    margin: 0.1em 0em 0em 0em;
    .profil_role_label {
      font-size: calc(0.72 * 1.3 * 100%);
      font-weight: 450;
      color: inherit;
    }
    .profil_role_value {
      font-size: calc(0.72 * 1.4 * 100%);
      font-weight: 400;
      text-transform: capitalize;
      color: ${({ switchMode, ui }) =>
        switchMode ? chroma(ui.dark) : chroma(ui.light)};
    }
  }
  .section {
    margin: 1rem 0rem 0.5rem 0rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 7px;
    cursor: pointer;
    font-size: 17px;
    &:hover {
      color: ${({ switchMode, ui }) =>
        switchMode
          ? chroma(ui.dark).luminance() < 0.4
            ? chroma(ui.dark).brighten(1)
            : chroma(ui.dark).darken(1)
          : chroma(ui.light).luminance() < 0.4
          ? chroma(ui.light).brighten(1)
          : chroma(ui.light).darken(1)};
    }
  }
  .notification {
    position: relative;
  }
  .notification_badge {
    position: absolute;
    top: -8px;
    right: -15px;
    background-color: red;
    color: white;
    padding: 2px;
    width: 21px;
    height: 21px;
    font-weight: 600;
    font-size: 11px;
    text-align: center;
    border-radius: 50%;
  }
  .fiche_de_paie {
  }

  .bread-crumb {
    margin: 1rem 0rem 1rem 0.5rem;
  }
  .dash-content {
    // min-height: 66vh;
    //background: rgba(255, 255, 255, 0.9);
    min-width: 83%;
  }
  .dash-content-place {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .component {
    align-self: flex-start;
  }
`;

const Mobile = styled(Desktop)`
  //large screen
  @media (min-width: 1920px) {
    & > * {
      min-height: 80vh;
    }

    .fixed-drawer {
      min-width: 16%;
      margin: 0rem 0.5rem 0rem 0.5rem;
    }
    .manager {
      margin: 1rem 0rem;
      gap: 7px;
      font-weight: 700;
      font-size: calc(1.2 * 1.4 * 100%);

      &:after {
        bottom: 0;
        height: 5px;
        width: calc(0.72 * 1.3 * 100%);
      }
    }
    .img-profile {
      width: 40%;
    }
    .date {
      font-size: calc(0.72 * 1.4 * 100%);
      margin: 1rem 0rem 1rem 0.5rem;
    }
    .section {
      margin: 1em 0em 0.5em 0em;
      gap: 7px;
      font-size: calc(0.72 * 1.4 * 100%);
    }
    .bread-crumb {
      margin: 1rem 0rem 1rem 0.5rem;
    }
    .dash-content {
      min-width: 82%;
    }
  }

  @media (min-width: 1536px) and (max-width: 1919px) {
    & > * {
      min-height: 75vh;
    }
    .fixed-drawer {
      min-width: 20%;
      margin: 0rem 0.5rem 0rem 0.5rem;
    }
    .dash-content {
      min-width: 77%;
    }
  }

  @media (min-width: 1440px) and (max-width: 1535px) {
    & > * {
      min-height: 76.5vh;
    }
    .fixed-drawer {
      min-width: 20%;
      margin: 0rem 0.5rem 0rem 0.5rem;
    }
    .dash-content {
      min-width: 78%;
    }
  }
  @media (min-width: 1366px) and (max-width: 1439px) {
    & > * {
      min-height: 72vh;
    }
    .fixed-drawer {
      min-width: 20%;
      margin: 0rem 0.5rem 0rem 0.5rem;
    }
    .manager {
      margin: 1rem 0rem;
      gap: 7px;
      font-weight: 700;
      font-size: calc(1.2 * 1 * 100%);

      &:after {
        bottom: 0;
        height: 5px;
        width: calc(0.72 * 1.1 * 100%);
      }
    }
    .img-profile {
      width: 40%;
    }
    .date {
      font-size: calc(0.72 * 1.1 * 100%);
      margin: 1rem 0rem 1rem 0.5rem;
    }
    .section {
      margin: 1rem 0rem 0.5rem 0rem;
      gap: 7px;
      font-size: calc(0.72 * 1.25 * 100%);
    }
    .bread-crumb {
      margin: 1rem 0rem 1rem 0.5rem;
    }
    .dash-content {
      min-width: 78%;
    }
  }
  @media (min-width: 1280px) and (max-width: 1365px) {
    & > * {
      min-height: 70.5vh;
    }
    .fixed-drawer {
      min-width: 21%;
      margin: 0rem 0.5rem 0rem 0.5rem;
    }
    .manager {
      margin: 1rem 0rem;
      gap: 7px;
      font-weight: 700;
      font-size: calc(1.2 * 1 * 100%);

      &:after {
        bottom: 0;
        height: 5px;
        width: calc(0.72 * 1.1 * 100%);
      }
    }
    .dash-content {
      min-width: 74%;
    }
    .section {
      margin: 0.8em 0em 0.5em 0em;
      gap: 5px;
      font-size: calc(0.72 * 1.25 * 100%);
    }
  }

  //mobile

  @media (max-width: 600px) {
    .fixed-drawer {
      display: none;
    }
  }
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

export default function Dashboard2() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id } = router.query;

  const [prodMethods, prodStates] = ProdCtx();
  const { profilMethods } = prodMethods;
  const {
    apiProfileStore,
    apiProfileShowOne,
    apiProfileUpdate,
    apiProfileDelete,
  } = profilMethods;

  const {
    initialDataHotssr1,
    setInitialDataHotssr1,
    connectedRole,
    setConnectedRole,
    connectedId,
    setConnectedId,
    ui,
    switchMode,
    DOMAIN,
  } = prodStates;
  const [selectSection, setSelectSection] = useState("");

  const [profilManager, setProfilManager] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    adresse: "",
    file: "",
    role: "",
  });

  const { isLoading, error, data, isFetching } = useQuery(
    ["dashboard2", id],
    () => apiProfileShowOne(id),
    {
      initialData: initialDataHotssr1,
      initialStale: true,
    }
  );

  if (isLoading) {
    console.log("loading");
  }
  if (error) {
    console.log("error");
  }
  //------------
  console.log(data);
  //-------------
  const [check, setCheck] = useState({
    cid: Cookies.get("sp_id") || 0,
    role: Cookies.get("sp_role") || 0,
    token: Cookies.get("sp_token") || 0,
  });
  React.useEffect(() => {
    if (Number(check.cid) !== Number(id)) {
      Cookies.set("sp_token", "");
      Cookies.set("sp_role", "");
      Cookies.set("sp_id", "");
      router.push(`/`);
    }
    return () => console.log("");
  }, [id]);

  React.useEffect(() => {
    setProfilManager({
      nom: data?.user.nom,
      prenom: data?.user.prenom,
      email: data?.user.email,
      telephone: data?.user.gsm,
      adresse: data?.user.adresse,
      file: data?.user.file,
      role: data?.role,
    });
    return () => {
      console.log("");
    };
  }, [data]);
  return (
    <>
      <Head>
        <meta name="description" content="software of paie" />
        <meta name="author" content="ch" />
        <meta name="og:title" property="og:title" content="soft paie" />
        <meta name="twitter:card" content="soft paie" />
        <meta name="robots" content="index, follow" />
        <title> Manager {profilManager.nom}</title>
      </Head>

      <Mobile ui={ui} switchMode={switchMode} font1={font}>
        <aside className="fixed-drawer">
          <div className="manager">
            <div className="manager_logo">
              <FaUserShield />
            </div>
            <div className="manager_title">manager zone</div>
          </div>
          <div className="date">
            <span className="date_label">Date:</span>{" "}
            <span className="date_time">
              {format(new Date(), "dd-MM-yyyy' 'HH:mm:ss")}
            </span>
          </div>
          <div className="img-profile">
            <Image
              src={`${DOMAIN}/${
                profilManager.file === null
                  ? "uploads/users/default/user.jpg"
                  : profilManager.file
              }`}
              alt={profilManager.nom}
              layout="responsive"
              quality={65}
              height={30}
              width={30}
              className="img"
            />
          </div>
          <div className="profil_username">
            <span className="profil_username_label">Nom: </span>
            <span className="profil_username_value">{`${profilManager.nom} ${profilManager.prenom}`}</span>
          </div>
          <div className="profil_role">
            <span className="profil_role_label">Role: </span>
            <span className="profil_role_value">{profilManager.role}</span>
          </div>
          <div
            className="section editer_profil "
            onClick={() => setSelectSection("notification")}
          >
            <FaInfoCircle />
            <span className="notification">
              Notifications
              <span className="notification_badge">22</span>
            </span>
          </div>

          <div
            className="section editer_profil "
            onClick={() => setSelectSection("profil")}
          >
            <FaUser />
            <span>Manager profil</span>
          </div>
          <div
            className="section fiche_de_paie "
            onClick={() => setSelectSection("paie")}
          >
            <FaRegListAlt />
            <span>Fiche de paie</span>
          </div>
          <div
            className="section conge "
            onClick={() => setSelectSection("conge")}
          >
            <FaUserCog />
            <span>Gérer équipe</span>
          </div>
          <div
            className="section reclamation "
            onClick={() => setSelectSection("reclamation")}
          >
            <FaRecycle />
            <span>Congés et reclamations</span>
          </div>
          <div
            className="section planification "
            onClick={() => setSelectSection("planification")}
          >
            <FaParking />
            <span>Planification</span>
          </div>
        </aside>
        <div className="dash-content">
          <div className="bread-crumb">
            <Breadcrumb1
              setSelectSection={setSelectSection}
              content={{ root: "manager", active: selectSection }}
            />
          </div>
          <div className="dash-content-place">
            {selectSection === "" && (
              <div className="component_default">
                <Default setSelectSection={setSelectSection} />
              </div>
            )}
            {selectSection === "informations" && (
              <div className="component component_informations">
                <Information />
              </div>
            )}
            {selectSection === "conge" && (
              <div className="component component_conge">
                <DemandeConge />
              </div>
            )}
            {selectSection === "reclamation" && (
              <div className="component component_reclamation">
                <Reclamation />
              </div>
            )}
            {selectSection === "paie" && (
              <div className="component component_paie">
                <FichePaie />
              </div>
            )}
            {selectSection === "planification" && (
              <div className="component component_planification">
                <Planification />
              </div>
            )}
            {selectSection === "profil" && (
              <div className="component component_profil">
                <EditerProfil />
              </div>
            )}
          </div>
        </div>
      </Mobile>
    </>
  );
}
