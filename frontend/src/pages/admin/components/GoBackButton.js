import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "../AdminPagesStyles.module.css";

const GoBackButton = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };
  return (
    <Button className={styles.btnGreenColor} onClick={goBack}>
      Go Back
    </Button>
  );
};

export default GoBackButton;
