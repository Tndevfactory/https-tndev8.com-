import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Link from "next/link";
import chroma from "chroma-js";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useMutation } from "react-query";
import { ProdCtx, apiGet } from "../../contexts/ProductsContext";
import Button1 from "../buttons/Button1";
import Cookies from "js-cookie";
import Alert2 from "../alerts/Alert2";

const Desktop = styled(motion.div)`
  min-width: 30vw;
  height: auto;
  //margin-top:15em;

  .form_container {
    width: 100%;
    box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.5);
    background-color: rgba(255, 255, 255, 0.75);
    padding: 1rem;
    border-radius: 2%;
    display: flex;
    flex-flow: column wrap;
  }
  .title {
    font-size: 1.5rem;
    text-transform: capitalize;
    text-align: center;
    margin-bottom: 1rem;
    color: ${({ switchMode, ui }) =>
      switchMode
        ? chroma(ui.dark).luminance() < 0.4
          ? chroma(ui.dark).brighten(1)
          : chroma(ui.dark).darken(1)
        : chroma(ui.light).luminance() < 0.4
        ? chroma(ui.light).brighten(1)
        : chroma(ui.light).darken(1)};
  }
  .label {
    font-weight: 400;
    margin-top: 6px;
  }
  input {
    width: 100%;
    height: 34px;
    padding: 1px 0.7rem;
    border: 1px solid;
    border-radius: 2%;
  }
  .zone_password {
    position: relative;
    .show_password {
      position: absolute;
      top: 7px;
      right: 15px;
      cursor: pointer;
    }
  }
  .error {
    color: crimson;
    font-size: 13px;
    font-weight: 500;
    font-style: italic;
    margin-left: 4px;
    margin-bottom: 5px;
  }
  .btn {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .register_phrase {
    align-self: flex-end;
    font-size: 0.8em;
    a {
      font-size: 0.87em;
      font-weight: 500;
      cursor: pointer;
      &:hover {
        color: ${({ switchMode, ui }) =>
          switchMode ? chroma(ui.dark) : chroma(ui.light)};
      }
    }
  }
`;

const Mobile = styled(Desktop)`
  //large screen
  @media (min-width: 1920px) {
    height: auto;
    //margin-top:15em;
    min-width: 25%;
  }

  @media (min-width: 1536px) and (max-width: 1919px) {
  }

  @media (min-width: 1440px) and (max-width: 1535px) {
  }
  @media (min-width: 1366px) and (max-width: 1439px) {
    //margin-top:10em;
  }
  @media (min-width: 1280px) and (max-width: 1365px) {
  }

  //mobile

  @media (min-width: 375px) and (max-width: 600px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column nowrap;
    .form_container {
      margin-top: 30px;
      margin-bottom: 0.3rem;
      .title {
        font-size: 1.5rem;
      }
      .btn {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .register_phrase {
        align-self: flex-end;
        font-size: 9px;
        a {
          font-size: 1em;
          font-weight: 500;
          cursor: pointer;
          &:hover {
            color: ${({ switchMode, ui }) =>
              switchMode ? chroma(ui.dark) : chroma(ui.light)};
          }
        }
      }
    }
  }

  @media (min-width: 361px) and (max-width: 374px) {
    margin-top: 180px;
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column nowrap;
    width: 60vh;
    .form_container {
      width: 88%;
      margin-top: 10px;
      margin-bottom: 0.5rem;

      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      .btn {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .register_phrase {
          font-size: 9px;
          a {
            font-size: 10px;
            font-weight: 500;
            cursor: pointer;
            &:hover {
              color: ${({ switchMode, ui }) =>
                switchMode ? chroma(ui.dark) : chroma(ui.light)};
            }
          }
        }
      }
    }
  }
  @media (max-width: 360px) {
    margin-top: 180px;
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column nowrap;

    width: 60vh;
    .form_container {
      width: 95%;
      margin-top: 10px;
      margin-bottom: 0.5rem;
      .title {
        font-size: 1.5rem;
      }
      .btn {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .register_phrase {
          font-size: 10px;
          a {
            font-size: 11px;
            font-weight: 500;
            cursor: pointer;
            &:hover {
              color: ${({ switchMode, ui }) =>
                switchMode ? chroma(ui.dark) : chroma(ui.light)};
            }
          }
        }
      }
    }
  }
`;

const Login1 = () => {
  const router = useRouter();
  const [prodMethods, prodStates] = ProdCtx();
  const { authMethods } = prodMethods;
  const { apiLogin, apiLogout, apiRegister } = authMethods;

  const {
    initialDataHotssr,
    setInitialDataHotssr,
    loader,
    setLoader,
    ui,
    notification,
    setNotification,
    switchMode,
    setSwitchMode,
    connectedRole,
    setConnectedRole,
    connectedId,
    setConnectedId,
  } = prodStates;

  const [credential, setCredential] = useState({
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState({
    msgAlert: "",
    typeAlert: "",
  });

  let m = "";
  let loaderM = "";

  const handleOnchange = (e) => {
    credential.passwordError = "";
    credential.emailError = "";
    setCredential({
      ...credential,
      [e.target.name]: e.target.value,
    });
  };

  const handleValidate = () => {
    let errorFlag = false;

    if (credential.email.length === 0) {
      setCredential({
        ...credential,
        emailError: "champ obligatoire",
      });
      errorFlag = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credential.email)) {
      setCredential({
        ...credential,
        emailError: "mauvais format",
      });
      errorFlag = true;
    } else if (credential.password.length < 6) {
      setCredential({
        ...credential,
        passwordError:
          "mot de passe doit etre au moins de longeur de 6 caracteres ",
      });
      errorFlag = true;
    }

    if (errorFlag) {
      return false;
    } else {
      return true;
    }
  };
  const LoginMutation = useMutation((values) => apiLogin(values));

  const handleSubmit = (e) => {
    e.preventDefault();

    // setNotification({ notifType: "fail", notifMsg: "ttt000000" });

    if (handleValidate()) {
    //  console.log("all data verified before sent");
      LoginMutation.mutate({
        email: credential.email,
        password: credential.password,
      });
    } else {
      //console.log(" data not completed before sent");
      LoginMutation.reset();
    }
  };

  if (LoginMutation.isLoading) {
    loaderM = "loading";
   // console.log("loading...");
  }

  if (LoginMutation.isError) {
   // console.log(LoginMutation.error.message);
    m = LoginMutation.error.message;
  }

  if (LoginMutation.isSuccess) {
    //console.log(LoginMutation.error.message);
    if (LoginMutation.data.message === "erreur authentification") {
      m = LoginMutation.data.message;

      //  console.log("mmmm");
      // console.log(m);
    } else if (LoginMutation.data.message !== "erreur authentification") {
      Cookies.set("sp_token", LoginMutation.data.access_token);
      Cookies.set("sp_role", LoginMutation.data.role);
      Cookies.set("sp_id", LoginMutation.data.user.id);
      // setConnectedRole(Cookies.get("sp_role"));
      // setConnectedId(Cookies.get("sp_id"));
      // console.log(LoginMutation.data);
      LoginMutation.reset();
    }

    if (LoginMutation.data.role === "employe") {
      // console.log("employee redirect");
      //console.log(LoginMutation.data);

      router.push(`/employee/${LoginMutation.data.user.id}`);
    }
    if (LoginMutation.data.role === "admin") {
      //console.log("admin redirect");
      router.push(`/admin/${LoginMutation.data.user.id}`);
    }
    if (LoginMutation.data.role === "manager") {
      //console.log("manager redirect");
      router.push(`/manager/${LoginMutation.data.user.id}`);
    }
  }

  React.useEffect(() => {
    setMsg({ msgAlert: m, typeAlert: "fail" });
    return () => {console.log('')}
  }, [m]);
  React.useEffect(() => {
    if (loaderM !== "") setLoader(true);
    if (m !== "") setLoader(false);
     return () => {console.log('')}
  }, [loaderM, m]);
  return (
    <Mobile ui={ui} switchMode={switchMode}>
      {m && <Alert2 msg={msg} setMsg={setMsg} />}
      <form className="form_container" onSubmit={handleSubmit}>
        <div className="title">connexion</div>

        <div className="label">Adresse email:</div>
        <input
          name="email"
          type="email"
          autoComplete="true"
          value={credential.email}
          onChange={handleOnchange}
        />
        <div className="error">
          {credential.emailError && credential.emailError}
        </div>
        <div className="label">Mot de passe:</div>
        <div className="zone_password">
          <input
            name="password"
            autoComplete="true"
            value={credential.password}
            onChange={handleOnchange}
            type={showPassword ? "text" : "password"}
          />
          <div
            className="show_password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </div>
        </div>
        <div className="error">
          {credential.passwordError && credential.passwordError}
        </div>
        <div className="btn">
          <Button1 type="submit" disabled={false} width={7} height={2.2}>
            se connecter
          </Button1>
        </div>
        <div className="register_phrase">
          Vous n'avez pas de compte, veuillez
          <Link href="/register">
            <a title="register"> s'inscrire</a>
          </Link>
        </div>
      </form>
    </Mobile>
  );
};

export default Login1;
