/** @format */
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import axios from "axios";
import Button1 from "../buttons/Button1";
import DatePicker from "react-datepicker";
import React, { useState } from "react";
import Head from "next/head";
import Breadcrumb1 from "../breadcrumbs/Breadcrumb1";
import { useRouter } from "next/router";
import { queryCache, useQuery, useMutation, useQueryClient } from "react-query";
import styled, { css } from "styled-components";
import { ProdCtx, apiProfileShowOne } from "../../contexts/ProductsContext";
import Image from "next/image";
import Link from "next/link";
import chroma from "chroma-js";
import FormData from "form-data";
import AlertUtil from "../../components/alerts/AlertUtil";
import LoaderUtil from "../../components/loader/LoaderUtil";
import Alert2 from "../alerts/Alert2";

import {
  FaInfoCircle,
  FaCheck,
  FaUpload,
  FaUser,
  FaRegListAlt,
  FaRegMoneyBillAlt,
  FaRecycle,
  FaParking,
  FaSkating,
} from "react-icons/fa";

const Desktop = styled(motion.div)`
  display: flex;
  flex-direction: column;

  .alert_localy {
    background: transparent;
    height: 2em;
    span {
      min-width: 100%;
      background: ${({ ok }) =>
        ok === true
          ? chroma("seagreen")
          : ok === false
          ? chroma("crimson")
          : "transparent"};
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.15em 0.1em;
      font-size: 1em;
      font-family: ${({ ui }) => ui.navFont};
      letter-spacing: 1px;
      display: flex;
      gap: 3px;
      justify-content: center;
      align-items: center;
    }
  }

  .form_profil {
    display: flex;
    flex-flow: column nowrap;
    gap: 16px;
    background-color: rgba(0, 0, 0, 0.05);
    border: #bbb 1px solid;
    padding: 1em;
    border-radius: 12px;
  }

  label {
    display: block;
    font-weight: 500;
    margin-bottom: 0.2rem;
    font-family: ${({ ui }) => ui.navFont};
    color: #888;
    letter-spacing: 1px;
  }
  input {
    width: 100%;
    height: 1.9em;
    padding: 1px 0.7rem;
    border: 1px solid #bbb;
    border-radius: 3%;
    color: #444;
    &:focus {
      outline: none;
      border: 1px solid #999;
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

  .profil_adresse {
    min-width: 30vw;
    .label_adresse {
    }
    .profil_area {
      width: 100%;
      //background: red;
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

const easing = [0.04, 0.62, 0.23, 0.98];
const variants = {
  initial: {
    x: "-500px",
  },
  animate: {
    x: 0,
    transition: {
      delay: 0.51,
      x: { type: "spring", stiffness: 100 },
    },
  },
  exit: { opacity: 0 },
};

export default function Profil() {
  const queryClient = useQueryClient();

  const [typeA, setTypeA] = useState("initialType");
  const [msgA, setMsgA] = useState("initialMsg");

  let loader_spy = false;

  const router = useRouter();
  const { id } = router.query;

  const [prodMethods, prodStates] = ProdCtx();
  const { mailMethods, profilMethods } = prodMethods;
  const {
    apiProfileUpdateMutation,
    apiProfileShowAll,
    apiProfileStore,
    apiProfileShowOne,
    apiProfileUpdate,
    apiProfileDelete,
  } = profilMethods;

  const { apiSendMail } = mailMethods;

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
  } = prodStates;

  // query city
  const { isSuccess, isLoading, refetch, error, data, isFetching } = useQuery(
    ["editerProfil1"],
    () => apiProfileShowOne(id),
    {
      initialData: initialDataHotssr,
      initialStale: true,
      // enabled: false,
    }
  );

  // query test

  if (isLoading) {
    loader_spy = true;
  }

  if (error) {
    // alert_spy_content = error.message;
    // alert_spy_type = "fail";
  }
  if (isSuccess) {
    // alert_spy_content = "action reussite";
    // alert_spy_type = "success";
  }

  const [credentialP, setCredentialP] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    telephone: "",
    adresse: "",

    nomError: "",
    prenomError: "",
    emailError: "",
    telephoneError: "",
    adresseError: "",
    passwordError: "",
  });

  const [file, setFile] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const handleOnChange = (e) => {
    credentialP.nomError = "";
    credentialP.prenomError = "";
    credentialP.emailError = "";
    credentialP.telephoneError = "";
    credentialP.adresseError = "";

    setCredentialP({
      ...credentialP,
      [e.target.name]: e.target.value,
    });
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleValidate = () => {
    let errorFlag = false;

    if (credentialP.nom.length === 0) {
      setCredentialP({
        ...credentialP,
        nomError: "champ obligatoire",
      });
      errorFlag = true;
    } else if (credentialP.prenom.length === 0) {
      setCredentialP({
        ...credentialP,
        prenomError: "champ obligatoire",
      });
      errorFlag = true;
    } else if (credentialP.email.length === 0) {
      setCredentialP({
        ...credentialP,
        emailError: "champ obligatoire",
      });
      errorFlag = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentialP.email)) {
      setCredentialP({
        ...credentialP,
        emailError: "mauvais format",
      });
      errorFlag = true;
    } else if (credentialP.telephone.length === 0) {
      setCredentialP({
        ...credentialP,
        telephoneError: "champ obligatoire",
      });
      errorFlag = true;
    } else if (credentialP.adresse.length === 0) {
      setCredentialP({
        ...credentialP,
        adresseError: "champ obligatoire",
      });
      errorFlag = true;
    } else if (credentialP.password.length === 0) {
      setCredentialP({
        ...credentialP,
        passwordError: "champ obligatoire",
      });
      errorFlag = true;
    }

    if (errorFlag) {
      return false;
    } else {
      return true;
    }
  };

  let cfg = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  // use when no file to handle
  // const mutationU = useMutation(() => apiProfileUpdateMutation(id, values), {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries("dashboard1");
  //     queryClient.invalidateQueries("editerProfil1");
  //   },
  // });

  //----used traditionnal axios with file--img formData--used for update only------------
  const [updRes, setUpdRes] = useState({ ok: "", response: "" });

  const upd = async (id, fd, cfg) => {
    let res = await apiProfileUpdate(id, fd, cfg);
    queryClient.invalidateQueries("dashboard1");
    queryClient.resetQueries("dashboard1", { exact: true });
    return res;
  };

  //-----------------------------------------------

  const handleSubmit = (e) => {
    e.preventDefault();
    //-------------------------------------------
    const fd = new FormData();
    Object.keys(credentialP).map((key) => {
      if (credentialP[key] !== "") {
        fd.append(key, credentialP[key]);
      }
    });

    fd.append("file", file);
    fd.append("_method", "put"); // spoof method laravel

    // upd(id, fd, cfg);

    upd(id, fd, cfg)
      .then((res) => {
        if (res.ok) {
          setUpdRes({ ok: res.ok, response1: res.response });
          console.log(res.response, res.ok);
          console.log(res);
        } else {
          setUpdRes({
            ok: res.ok,
            response2: "Impossible d'éffectuer la modification",
          });
        }
      })
      .catch((err) => console.log(err));

    // //-------------------------------------------
    // values = {
    //   nom: "hfaied",
    //   prenom: "abdkerim",
    //   email: "hfaied@soft-paie.tn",
    //   password: "password",
    //   telephone: "55 345 567",
    //   adresse: "tunis",
    // };

    // console.log(values);
    // mutationU.mutate(fd, cfg);
    // queryClient.invalidateQueries("dashboard1");
    // queryClient.resetQueries("dashboard1", { exact: true });
    // mutationCache.clear();
    // queryCache.clear();
  };

  // sync data

  React.useEffect(() => {
    setCredentialP({
      nom: data?.user.nom,
      prenom: data?.user.prenom,
      email: data?.user.email,
      telephone: data?.user.gsm,
      adresse: data?.user.adresse,
    });

    return () => {
      console.log("");
    };
  }, [data]);

  React.useEffect(() => {
    if (loader_spy) setLoader(true);

    return () => {
      console.log("unsubscribe  loader spy");
    };
  }, [loader_spy]);
  React.useEffect(() => {
    setTimeout(() => setUpdRes({ ok: "", response: "" }), 2800);
    return () => {
      console.log("unsubscribe  information message");
    };
  }, [updRes.ok]);

  //animation
  const x = useMotionValue(-500);
  const opacity = useTransform(x, [-500, 0], [0, 1]);

  return (
    <Mobile ok={updRes.ok} ui={ui} switchMode={switchMode}>
      <motion.div className="alert_localy">
        <AnimatePresence exitBeforeEnter>
          <motion.span
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ x, opacity }}
          >
            {updRes.ok === true ? (
              <>
                mise a jour effectuee <FaCheck />
              </>
            ) : updRes.ok === false ? (
              <>
                erreur! impossible d'effectuer la modification <FaInfoCircle />
              </>
            ) : null}
          </motion.span>
        </AnimatePresence>
      </motion.div>

      <form className="form_profil" onSubmit={handleSubmit}>
        <div className="profil_nom">
          <label htmlFor="nom">Nom:</label>
          <input
            autoComplete="false"
            value={credentialP.nom}
            type="text"
            name="nom"
            onChange={handleOnChange}
          />
          <div className="error">
            {credentialP.nomError && credentialP.nomError}
          </div>
        </div>

        <div className="profil_prenom">
          <label htmlFor="prenom">Prenom:</label>
          <input
            autoComplete="false"
            value={credentialP.prenom}
            type="text"
            name="prenom"
            onChange={handleOnChange}
          />
          <div className="error">
            {credentialP.prenomError && credentialP.prenomError}
          </div>
        </div>
        <div className="profil_email">
          <label htmlFor="email">Email:</label>
          <input
            autoComplete="false"
            value={credentialP.email}
            type="email"
            name="email"
            onChange={handleOnChange}
          />
          <div className="error">
            {credentialP.emailError && credentialP.emailError}
          </div>
        </div>
        <div className="profil_email">
          <label htmlFor="email">Password:</label>
          <input
            autoComplete="false"
            value={credentialP.password}
            type="password"
            name="password"
            onChange={handleOnChange}
          />
          <div className="error">
            {credentialP.passwordError && credentialP.passwordError}
          </div>
        </div>

        <div className="profil_telephone">
          <label htmlFor="telephone">Telephone:</label>
          <input
            autoComplete="false"
            value={credentialP.telephone}
            type="text"
            name="telephone"
            onChange={handleOnChange}
          />
          <div className="error">
            {credentialP.telephoneError && credentialP.telephoneError}
          </div>
        </div>

        <div className="profil_adresse">
          <label className="label_adresse" htmlFor="adresse">
            Adresse:
          </label>
          <input
            autoComplete="false"
            value={credentialP.adresse}
            type="text"
            name="adresse"
            onChange={handleOnChange}
          />
          <div className="error">
            {credentialP.adresseError && credentialP.adresseError}
          </div>
        </div>

        <div className="profil_avatar">
          <label htmlFor="avatar">Photo profil:</label>
          <input
            autoComplete="false"
            type="file"
            name="file"
            onChange={handleFile}
          />

          <div className="error">
            {credentialP.fileError && credentialP.fileError}
          </div>
        </div>

        <Button1 type="submit" disabled={false} width={8} height={2.2}>
          Valider
        </Button1>
      </form>
    </Mobile>
  );
}
