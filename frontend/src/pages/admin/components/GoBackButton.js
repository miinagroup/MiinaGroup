import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const GoBackButton = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };
  return (
    <Button className="CTL_btn" onClick={goBack}>
      Go Back
    </Button>
  );
};

export default GoBackButton;
