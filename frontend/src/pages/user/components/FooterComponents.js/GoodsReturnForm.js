import React from "react";

const GoodsReturnForm = () => {
  return (
    <div className="container">
      <br />
      <h1 className="service">Returns and Refund Policy:</h1>
      <p>
        At CTL Australia, we are dedicated to providing our customers with
        exceptional service and quality products. We understand that sometimes a
        product may not fully meet your needs or expectations. In these
        instances, we offer a comprehensive returns and refund policy to ensure
        your satisfaction.
      </p>
      <p>
        <strong>Faulty or Damaged Goods:</strong> In the event you receive a
        product that is faulty, damaged, or not as described, please contact us
        within 14 days of receipt to arrange a return. Upon return, the product
        will be assessed, and if deemed faulty, a replacement, repair, or refund
        will be provided depending on your preference and the product's
        availability.
      </p>
      <p>
        <strong>Process for Returns:</strong> To initiate a return, please fill
        out the Goods Return Form available on our website. This form is crucial
        for processing your return quickly and efficiently. Please provide a
        detailed description of the issue and whether you seek a replacement,
        repair, or refund.
      </p>
      <p>
        Once the form is completed, please send it to us via email at{" "}
        <a id="contact_sales" href="mailto:sales@ctlaus.com" style={{ textDecoration: "underline" }} className="minerals_price" >
          sales@ctlaus.com
        </a>{" "}
        or include it with your returned item shipped to our postal address.
        Upon receiving your return, we will process it promptly and communicate
        the outcome via email or phone.
      </p>
      <p>
        <strong>Exclusions:</strong> Please note that certain items may be
        excluded from our returns policy due to hygiene, safety, or other
        specific reasons. These exclusions will be clearly listed on the product
        page.
      </p>
      <p>
        <strong>Contact Us:</strong> Should you have any questions about our
        returns and refund policy or the returns process, please do not hesitate
        to contact us at{" "}
        <a id="contact_sales" href="mailto:sales@ctlaus.com" style={{ textDecoration: "underline" }} className="minerals_price" >
          sales@ctlaus.com
        </a>
        . Our team is here to support you every step of the way.
      </p>
      <a
        href="/pdfpreview?/Goods-Return-Form.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary btn-block mt-4 CTL_btn p-1 ps-2 pe-2"
      >
        Download Goods Return Form{" "}
        <i className="bi bi-file-earmark-pdf-fill"></i>
      </a>
    </div>
  );
};

export default GoodsReturnForm;
