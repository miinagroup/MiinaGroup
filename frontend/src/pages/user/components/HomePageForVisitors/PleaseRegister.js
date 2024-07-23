import React from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const PleaseRegister = ({ show, handleClose, handleShow }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ border: "none" }}>
          <Modal.Title
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 30 }}
          >
            <img
              id="home_logo"
              src="/images/CTL-hex.png"
              alt=""
              className="rotate linear infinite ms-3"
            ></img>
            <img
              id="home_name"
              src="/images/CTL-hextext.png"
              alt=""
              className="hexagontext"
            ></img>
            {/* WELCOME TO CTL */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ textAlign: "center", fontWeight: "bold", fontSize: 25 }}
          className="pt-0"
        >
          PLEASE{" "}
          <a href="/login">
            <u className="">LOGIN</u>
          </a>{" "}
          OR{" "}
          <a href="/register">
            <u className="">REGISTER</u>
          </a>{" "}
          TO EXPLORE MORE
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PleaseRegister;
