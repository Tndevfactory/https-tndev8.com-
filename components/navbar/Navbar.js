/** @format */

import Switch from "../switch/Switch";
import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import Link from "next/link";
import chroma from "chroma-js";
import Image from "next/image";
import Drawer from "../drawer/Drawer1";
import { FaCog, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { Device } from "../devices/Device";
import { ProdCtx } from "../../contexts/ProductsContext";
import Cookies from "js-cookie";
import { useMutation } from "react-query";
import { useRouter } from "next/router";

const Desktop = styled(motion.header)`
  color: ${({ switchMode, ui }) =>
    switchMode
      ? chroma(ui.dark).luminance() < 0.4
        ? chroma(ui.dark).brighten(5)
        : chroma(ui.dark).darken(3)
      : chroma(ui.light).luminance() < 0.4
      ? chroma(ui.light).brighten(5)
      : chroma(ui.light).darken(3)};

  background: ${({ switchMode, ui }) =>
    switchMode ? chroma(ui.dark) : chroma(ui.light)};

  font-family: ${({ ui }) => ui.navFont};

  padding: 0.5em 0.8em;
  font-weight: 500;
  font-size: 1.7em;
  letter-spacing: 0.1px;
  text-transform: uppercase;
  //text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 999;
  width: 100%;
  top: 0;
  left: 0;
  .brand-zone {
    display: flex;
    align-items: center;
    gap: 5px;
    .brand {
      font-size: 2rem;
      &:hover {
        color: ${({ switchMode, ui }) =>
          switchMode
            ? chroma(ui.dark).luminance() < 0.4
              ? chroma(ui.dark).brighten(3)
              : chroma(ui.dark).darken(3)
            : chroma(ui.light).luminance() < 0.4
            ? chroma(ui.light).brighten(3)
            : chroma(ui.light).darken(3)};
      }
    }
  }
  .switch-zone {
    display: flex;
    align-items: center;
    gap: 15px;
    .config_link {
      font-size: 1.7rem;
      &:hover {
        color: ${({ switchMode, ui }) =>
          switchMode
            ? chroma(ui.dark).luminance() < 0.4
              ? chroma(ui.dark).brighten(3)
              : chroma(ui.dark).darken(3)
            : chroma(ui.light).luminance() < 0.4
            ? chroma(ui.light).brighten(3)
            : chroma(ui.light).darken(3)};
      }
    }
    .login_link {
      margin-top: 2px;
      font-size: 1.25em;
     
      color: ${({ switchMode, ui }) =>
        switchMode
          ? chroma(ui.dark).luminance() < 0.4
            ? chroma("green").brighten(1)
            : chroma("green").darken(1)
          : chroma(ui.light).luminance() < 0.4
          ? chroma("green").brighten(1)
          : chroma("green").darken(1)};
      &:hover {
        color: ${({ switchMode, ui }) =>
          switchMode
            ? chroma(ui.dark).luminance() < 0.4
              ? chroma(ui.dark).brighten(3)
              : chroma(ui.dark).darken(3)
            : chroma(ui.light).luminance() < 0.4
            ? chroma(ui.light).brighten(3)
            : chroma(ui.light).darken(3)};
      }
    }
    .logout_link {
      margin-top: 2px;
      font-size: 1.25em;
      
      color: ${({ switchMode, ui }) =>
        switchMode
          ? chroma(ui.dark).luminance() < 0.4
            ? chroma("red").brighten(1)
            : chroma("red").darken(1)
          : chroma(ui.light).luminance() < 0.4
          ? chroma("red").brighten(1)
          : chroma("red").darken(1)};

      &:hover {
        color: ${({ switchMode, ui }) =>
          switchMode
            ? chroma(ui.dark).luminance() < 0.4
              ? chroma(ui.dark).brighten(3)
              : chroma(ui.dark).darken(3)
            : chroma(ui.light).luminance() < 0.4
            ? chroma(ui.light).brighten(3)
            : chroma(ui.light).darken(3)};
      }
    }
  }
  .switcheur {
    margin-bottom: 5px;
  }
`;

const Mobile = styled(Desktop)`
  @media ${Device.mobile} {
    padding: 1em 1em;
    flex-flow: column wrap;
    align-items: flex-start;
    gap: 0.5em;
    .switch-zone {
      align-self: flex-end;
      gap: 95px;
    }
  }
`;

const Navbar = () => {
  const router = useRouter();
  const [prodMethods, prodStates] = ProdCtx();
  const { authMethods } = prodMethods;
  const { apiLogin, apiLogout, apiRegister } = authMethods;
  const {
    loader,
    setLoader,
    ui,
    notification,
    setNotification,
    switchMode,
    setSwitchMode,
  } = prodStates;
  const LogoutMutation = useMutation((values) => apiLogout(values));
  const [detectCookie, setDetectCookie] = useState("");

  React.useEffect(() => {
    setDetectCookie(Cookies.get("sp_token") ? Cookies.get("sp_token") : null);
  }, []);

  const handleLogout = () => {
    LogoutMutation.mutate();
  };

  if (LogoutMutation.isLoading) {
    //console.log("loading...");
  }

  if (LogoutMutation.isError) {
    console.log(LogoutMutation.error.message);
  }

  if (LogoutMutation.isSuccess) {
    // console.log("LogoutMutation.data");
    //console.log(LogoutMutation.data);

    Cookies.set("sp_token", "");
    Cookies.set("sp_role", "");
    Cookies.set("sp_id", "");
    //console.log('"sp_token",');

    //setLoader(false);
    router.push(`/`);
    //  console.log(LoginMutation.data.user.id);
  }
  return (
    <Mobile ui={ui} switchMode={switchMode}>
      <div className="brand-zone">
        <Drawer />
        <Link href="/">
          <a title="index" className="brand">
            soft-paie
          </a>
        </Link>

        <Image
          src="/img/logos/logo.png"
          alt="soft - paie logo"
          width={35}
          height={35}
        />
      </div>
      <div className="switch-zone">
        <Link href="/config">
          <a title="configuration" className="config_link">
            <FaCog />
          </a>
        </Link>
        {!detectCookie && (
          <Link href="/">
            <a title="login" className="login_link">
              <FaSignInAlt />
            </a>
          </Link>
        )}
        {detectCookie && (
          <a title="logout" className="logout_link" onClick={handleLogout}>
            <FaSignOutAlt />
          </a>
        )}
        <div className="switcheur">
          <Switch />
        </div>
      </div>
    </Mobile>
  );
};

export default Navbar;
