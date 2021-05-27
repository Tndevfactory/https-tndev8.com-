/** @format */
import { motion } from "framer-motion";
import styled, { css } from "styled-components";
import chroma from "chroma-js";
import { ProdCtx, apiGet } from "../../contexts/ProductsContext";
import { Device } from "../devices/Device";

const Desktop = styled(motion.footer)`
  color: ${({ switchMode, ui }) =>
    switchMode
      ? chroma(ui.dark).luminance() < 0.4
        ? chroma(ui.dark).brighten(4)
        : chroma(ui.dark).darken(3)
      : chroma(ui.light).luminance() < 0.4
      ? chroma(ui.light).brighten(4)
      : chroma(ui.light).darken(3)};

  background: ${({ switchMode, ui }) =>
    switchMode ? chroma(ui.dark) : chroma(ui.light)};

  //min-height: 18vh;

  position: ${({ fixed }) => (fixed ? "fixed" : "static")};
  width: 100%;
  bottom: 0px;
  left: 0%;

  display: flex;
  flex-flow: column wrap;
  justify-content: flex-end;
  align-items: center;
 // gap: 35px;
  padding-bottom: 0.3em;
  padding-top: 0.3em;
  .footer_brand {
    h3 {
      font-family: ${({ ui }) => ui.navFont};
      text-transform: uppercase;
      font-weight: 600;
      font-size: 1.7em;
      color: ${({ switchMode, ui }) =>
        switchMode
          ? chroma(ui.dark).luminance() < 0.4
            ? chroma(ui.dark).brighten(5)
            : chroma(ui.dark).darken(3)
          : chroma(ui.light).luminance() < 0.4
          ? chroma(ui.light).brighten(5)
          : chroma(ui.light).darken(3)};
    }
  }
  .footer_copyright {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
     font-size: 1em;
    & span:nth-child(2) {
      font-weight: 600;
      color: ${({ switchMode, ui }) =>
        switchMode ? chroma(ui.dark).brighten(2) : chroma(ui.light).darken(2)};
    }
  }
`;

const Mobile = styled(Desktop)`
  @media (max-width: 600px) {
    position: static;
  }
`;

const Footer = ({ fixed }) => {
  const [prodMethods, prodStates] = ProdCtx();
  const { apiUpdate } = prodMethods;
  const { ui, switchMode, setSwitchMode } = prodStates;
  return (
    <Mobile ui={ui} switchMode={switchMode} fixed={fixed}>
      <div className="footer_brand">
        <h3>Soft-Paie</h3>
      </div>
      <div className="footer_copyright">
        <span>Iheb creation</span>
        <span>&copy;</span>
        <span>{new Date().getFullYear()}</span>
      </div>
    </Mobile>
  );
};

export default Footer;
