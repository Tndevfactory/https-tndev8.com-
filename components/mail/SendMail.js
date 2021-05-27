import axios from "axios";
import { motion } from "framer-motion";
import React, { useState } from "react";
import styled, { css } from "styled-components";
import { ProdCtx, apiGet } from "../../contexts/ProductsContext";
import FormData from "form-data";
import { useQuery, useMutation, useQueryClient } from "react-query";

const Desktop = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 3px;
  align-items: center;
  flex-direction: column;
  width: 50%;
  background: green;
  form {
    display: flex;
    justify-content: center;
    gap: 3px;
    align-items: center;
    flex-direction: column;
    width: 50%;
    background: green;
  }
`;

const Mobile = styled(Desktop)`
  @media (min-width: 361px) and (max-width: 600px) {
    margin-top: 0.5rem;
  }
  @media (max-width: 360px) {
    margin-top: 0.5rem;
  }
`;

const SendMail = () => {
  let fd = new FormData();

  let cfg = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
    const [prodMethods, prodStates] = ProdCtx();
    const { mailMethods, profilMethods } = prodMethods;
    const { apiProfileUpdate } = profilMethods;
    const { apiSendMail } = mailMethods;


  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [file, setFile] = useState("");

  const SendMailMutation = useMutation((fd, cfg) => apiSendMail(fd, cfg));

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleBody = (e) => {
    setBody(e.target.value);
  };
  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  //   const Sender = async (fd, cfg) => {
  //     const data = await apiSendMail(fd, cfg);
  //     console.log(data);
  //   };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();

    fd.append("file", file);
    fd.append("title", title);
    fd.append("body", body);

    console.log(Array.from(fd));
    // Sender(fd, cfg);
    SendMailMutation.mutate(fd, cfg);
  };
    
  if (SendMailMutation.isLoading) {
    console.log("loading");
  }

  if (SendMailMutation.isError) {
    console.log("erreur server backend");
  }

  if (SendMailMutation.isSuccess) {
    console.log("EditerProfileMutation.data");
    console.log(SendMailMutation.data);
    SendMailMutation.reset();
  }

  return (
    <Mobile>
      <form onSubmit={handleSubmit} method="POST">
        <h3 htmlFor="file">send mail</h3>
        <div className="title">
          <label htmlFor="title">title</label>
          <input
            value={title}
            type="text"
            name="title"
            onChange={handleTitle}
          />
        </div>
        <div className="body">
          <label htmlFor="body">message</label>
          <input value={body} type="text" name="body" onChange={handleBody} />
        </div>
        <div>
          <input type="file" name="file" onChange={handleFile} />
        </div>
        <div>
          <button type="submit">send</button>
        </div>
      </form>
    </Mobile>
  );
};

export default SendMail;
