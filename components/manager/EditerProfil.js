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

const device = {
  mobile: `(max-width: 600px)`,

  tablet: `(min-width: 601px)`,

  desktop: `(min-width: 900px)`,
};

const ui = {
  dark: "#001d3d",
  light: "#00afb9",
};
const easing = [0.04, 0.62, 0.23, 0.98];

const EditerProfil_st = styled(motion.div)`
  // background-color: yellow;
  padding: 1rem 2rem;
  .breadcrumb {
    .breadcrumb_root {
      font-weight: 500;
      text-transform: capitalize;
      letter-spacing: 1px;
    }
    .breadcrumb_slash {
      margin: 0px 5px;
    }
    .breadcrumb_active {
      color: ${({ switchMode, ui }) =>
        switchMode ? chroma(ui.light).darken(1) : chroma(ui.dark).brighten(1)};
    }
  }

  .profile_grid {
    //background-color: green;
    display: grid;
    grid-template-columns: 1fr 1fr;
    //justify-items: center;

    .profile_grid_section {
      //background: blue;
      margin: 1rem;
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;
      .profile_grid_section_row {
        padding: 1rem;
        // background: red;
        display: grid;
        grid-template-columns: 100px 1fr;
        align-items: center;
        gap: 10px;
        label {
          color: ${({ switchMode, ui }) =>
            switchMode ? chroma(ui.dark) : chroma(ui.light)};
          font-weight: 500;
          text-transform: capitalize;
          font-size: 17px;
          &:after {
            content: " :";
          }
        }
        input {
          //background: pink;
          width: 100%;
          height: 35px;
          padding: 2px 1rem;
        }
        textarea {
          padding: 1rem;
        }
      }
      .profile_grid_section_btn {
        display: grid;
        // background: indigo;
        padding: 2px 3rem;
        grid-template-columns: 1fr;
        grid-template-rows: 68px;
        align-items: center;
        button {
          cursor: pointer;
          font-size: 18px;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: capitalize;
          // border: none;
          height: 45px;
          border-radius: 3px;
          transition: all 500ms ease;
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

        button:hover {
          background: ${({ switchMode, ui }) =>
            switchMode
              ? chroma(ui.dark).brighten(1)
              : chroma(ui.light).darken(1)};
        }
        .btn_annuler {
          margin-top: 52px;
        }
        .btn_valider {
          //background: green;
        }
      }
    }
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const EditerProfil = () => {
  const [prodMethods, prodStates] = ProdCtx();
  const { apiGet, apiDelete, apiUpdate } = prodMethods;
  const { ui, notification, setNotification, switchMode } = prodStates;

  const [sectionSelector, setSectionSelector] = useState("");

  return (
    <EditerProfil_st ui={ui} switchMode={switchMode}>
      <form className="profile_grid">
        <div className="profile_grid_section">
          <div className="profile_grid_section_row">
            <label htmlFor="">Nom</label>
            <input type="text" />
          </div>
          <div className="profile_grid_section_row">
            <label htmlFor="">Prenom</label>
            <input type="text" />
          </div>
          <div className="profile_grid_section_row">
            <label for="myfile">Ajouter Photo</label>
            <input type="file" id="myfile" name="myfile" />
          </div>
          <div className="profile_grid_section_btn">
            <button className="btn_annuler" type="reset">
              Annuler
            </button>
          </div>
        </div>
        <div className="profile_grid_section">
          <div className="profile_grid_section_row">
            <label htmlFor="">Telephone</label>
            <input type="text" />
          </div>
          <div className="profile_grid_section_row">
            <label htmlFor="">Adresse</label>
            <input type="text" />
          </div>
          <div className="profile_grid_section_row">
            <label htmlFor="">Biographie</label>
            <textarea id="bio" name="bio" rows="4" cols="50">
              bio employee Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Nobis omnis voluptatum sunt repudiandae. Dolorum suscipit
              rerum, hic vitae quisquam minima laudantium esse est, ipsa placeat
              blanditiis qui iusto maiores et.
            </textarea>
          </div>
          <div className="profile_grid_section_btn">
            <button className="btn_valider" type="submit">
              valider
            </button>
          </div>
        </div>
      </form>
    </EditerProfil_st>
  );
};

export default EditerProfil;
