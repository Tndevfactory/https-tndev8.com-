import axios from "axios";
import { motion } from "framer-motion";
import React, { useState } from "react";
import styled, { css } from "styled-components";
import { ProdCtx, apiGet } from "../../contexts/ProductsContext";
import FormData from "form-data";
import { useQuery, useMutation, useQueryClient } from "react-query";
import Button1 from "../buttons/Button1";
import { FaRegEnvelope } from "react-icons/fa";

const Desktop = styled(motion.div)`
  min-width: 60vw;
  // background: green;

  color: #333;
  font-size: 0.99em;
  .mass_mail {
    display: flex;
    gap: 1em;
  }

  .selector {
    color: #333;
    cursor: pointer;
    display: flex;
    padding: 0 0.5em;
    align-items: center;
    justify-content: center;
    outline-color: none;
    border-radius: 6px;
    background: #fff;
    &:focus {
      outline: none;
      background: #fff;
    }
  }
  .mass_mail_comment {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #333;
  }
  .report {
    margin-top: 2em;
    h2 {
      font-size: 1.1em;
      border-bottom: 0.31px solid #888;
      border-top: 0.31px solid #888;
    }
    padding: 1em;
    text-align: center;

    .email_status {
      display: flex;
      justify-content: space-around;
      gap: 5px;
      h2 {
        // color: white;
        margin-bottom: -1px;
        font-size: 1.1em;
        border: none;
      }
      & > * {
        margin-top: 1em;
        display: flex;
        flex-direction: column;
        background: #eee;
        border-radius: 6px;
        justify-content: center;
        flex-basis: 25em;
        padding: 1em;
        gap: 6px;
        border: 1px solid #aaa;
        box-shadow: 1px 1px 3px 0.1px rgba(0, 0, 0, 0.3);
        span {
          font-size: 0.9em;
        }
      }
      .email_success {
        color: seagreen;
      }
      .email_fail {
        color: crimson;
      }
    }
  }

  .report_text {
    margin-top: 1em;
    padding: 1em;
    h4 {
      margin-bottom: -4px;
      color: #333;
      font-size: 1em;
    }
    span {
      margin-left: 1em;
      color: #333;
      font-size: 0.9em;
    }
  }
`;

const Mobile = styled(Desktop)`
  @media (min-width: 361px) and (max-width: 600px) {
  }
  @media (max-width: 360px) {
  }
`;

const MassMail = () => {
  let cfg = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const [prodMethods, prodStates] = ProdCtx();
  const { mailMethods } = prodMethods;
  const { apiMassSender } = mailMethods;

  const [yearM, setYearM] = useState("");
  const [monthM, setMonthM] = useState("");

  const MassSend = async (yearM, monthM) => {
    const data = await apiMassSender(yearM, monthM);
    console.log("data inside axios");
    console.log(data);
  };

  const handleChangeYear = (e) => {
    setYearM(e.target.value);
  };
  const handleChangeMonth = (e) => {
    setMonthM(e.target.value.toString());
  };

  const handleMassSend = (e) => {
    e.preventDefault();
    MassSend(yearM, monthM);
  };

  return (
    <Mobile>
      <div className="mass_mail">
        <select
          className="selector"
          onChange={handleChangeYear}
          value={yearM}
          name="yearM"
          id="yearM"
        >
          <option> Choisir annee</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
        </select>

        <select
          onChange={handleChangeMonth}
          value={monthM}
          className="selector"
          name="monthM"
          id="monthM"
        >
          <option> Choisir mois</option>
          <option value="01">janvier</option>
          <option value="02">fevrier</option>
          <option value="03">mars</option>
          <option value="04">avril</option>
          <option value="05">mai</option>
          <option value="06">juin</option>
          <option value="07">juillet</option>
          <option value="08">aout</option>
          <option value="09">septembre</option>
          <option value="10">octobre</option>
          <option value="11">novembre</option>
          <option value="12">decembre</option>
        </select>

        <Button1
          proceed={handleMassSend}
          disabled={false}
          width={6.8}
          height={2}
        >
          <span>Envoyer </span>
          <FaRegEnvelope />
        </Button1>
        {/* <button onClick={handleMassSend}>
          <span>Envoyer </span>
          <FaRegEnvelope />
        </button> */}
        <div className="mass_mail_comment">
          <span>
            Le salaire du mois x est envoyé avec succés, ci-dessous les détails:
          </span>
        </div>
      </div>
      <div className="details">
        <div className="report">
          <h2>Rapport</h2>
          <div className="email_status">
            <div className="email_success">
              <h2>Succes</h2>
              <span>lorem888@jjjj.com</span>
              <span>lorem888@jjjj.com</span>
              <span>lorem888@jjjj.com</span>
            </div>
            <div className="email_fail">
              <h2>Echec</h2>
              <span>lorem888@jjjj.com</span>
              <span>lorem888@jjjj.com</span>
              <span>lorem888@jjjj.com</span>
            </div>
          </div>
        </div>
        <div className="report_text">
          <h4>Synthese:</h4>
          <span>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae
            soluta atque enim explicabo eius nobis iste!
          </span>
        </div>
      </div>
    </Mobile>
  );
};

export default MassMail;
