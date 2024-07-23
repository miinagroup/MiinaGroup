import React from "react";
import './SplashPage.css'
import { useEffect, useState } from "react";


const Unfortunately = () => {

/*   useEffect(() => {
    const myModal = new window.bootstrap.Modal(document.getElementById('exampleModalCenter'), {
      backdrop: 'static', 
      keyboard: false 
    });
    myModal.show();
  }, []); */

  return (
    <>
      <div className="d-flex justify-content-center align-items-center CTLunfortunately ">
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
            {/* <div className="modal-header p-1">
              <h5 className="modal-title ms-2" id="exampleModalLongTitle">
                Thanks for register with us!
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div> */}
            <div className="modal-body">
              <p className="">
                {/* Thank you for your application to register your interest in our
                company. We have received a large number of applications,
                however due to delivering exceptional service to our current
                clients, delivering a continuation of supply on all of our
                product lines and maintaining a competitive pricing structure we
                are unable to bring on any new clients at this stage. This is
                not to say that in the future we would not be interested in
                securing your business. We will keep your information on hand
                and contact you at a time that we feel best suited to deliver
                you and your business the same service as detailed above. */}

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
