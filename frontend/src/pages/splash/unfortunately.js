import React from "react";
import './SplashPage.css'

const Unfortunately = () => {
  return (
    <>
    <div className="green-line"></div>
      <div className="d-flex justify-content-center align-items-center unfortunatelyPage ">
        <button
          type="button"
          className="btn btn-primary btnUnfor"
          data-toggle="modal"
          data-target="#exampleModalCenter"
        >
          A Message from CTL
        </button>
      </div>

      <div
        className="modal fade unfortunately_modal"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content unfortunately_modal_content">
            <div className="modal-body">
              <p className="">
                Thank you for submitting your application to register your interest in our company. 
                <br/>
                We have received a large number of applications. However, due to our commitment to delivering exceptional service to our current clients, ensuring a consistent supply of all our product lines, and maintaining competitive pricing, we regret to inform you that we are unable to accept new clients at this time. Nonetheless, we appreciate your interest and would like to keep your information on file. 
                <br/>
                We will reach out to you when we feel that we can provide you with the same level of service that we offer to our current clients.
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Unfortunately;
