/** @format */
import { motion } from "framer-motion";
import Button1 from "../buttons/Button1";
import DatePicker from "react-datepicker";
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
  FaUser,
  FaRegListAlt,
  FaRegMoneyBillAlt,
  FaRecycle,
  FaParking,
  FaSkating,
} from "react-icons/fa";

const Desktop = styled(motion.div)`
  min-width: 70vw;

  .form_conge {
    display: flex;
    flex-flow: column nowrap;
    gap: 5px;
  }
  .date_choice {
    display: flex;
    gap: 1rem;
    margin: 0.5rem 0rem 1rem 0rem;
  }

  label {
    display: block;
  }
  .cp_area {
    padding: 1rem;
    max-width: 50%;
    margin-bottom: 1rem;
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

const DemandeConges = () => {
  const [prodMethods, prodStates] = ProdCtx();
  const { apiGet, apiDelete, apiUpdate } = prodMethods;
  const { ui, notification, setNotification, switchMode } = prodStates;

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [sectionSelector, setSectionSelector] = useState("");
  
  return (
    <Mobile ui={ui} switchMode={switchMode}>
      <form className="form_conge" action="">
        <h3>Deposer un conge</h3>
        <div className="date_choice">
          <div className="start_date">
          
            <label for="start">Date de debut:</label>
            <input
              type="date"
              id="start"
              name="trip-start"
              value="2021-06-07"
              min={new Date()}
            />
          </div>
          <div className="end_date">
            {" "}
            <label for="end">Date de fin:</label>
            <input
              type="date"
              id="end"
              name="trip-end"
              value="2021-06-20"
              min={new Date()}
            />
          </div>
        </div>
        <label htmlFor="">Motif:</label>
        <textarea className="cp_area" id="cp" name="cp" rows="4" cols="5">
          bio employee Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Nobis omnis voluptatum sunt repudiandae. Dolorum suscipit rerum, hic
          vitae quisquam minima laudantium esse est, ipsa placeat blanditiis qui
          iusto maiores et.
        </textarea>
        <Button1 type="submit" disabled={false} width={5} height={2.2}>
          valider
        </Button1>
      </form>
    </Mobile>
  );
};

export default DemandeConges;
