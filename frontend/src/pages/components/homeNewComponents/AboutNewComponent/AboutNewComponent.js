import { useRef } from "react";

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import NewTextBlock from "../NewTextBlock/NewTextBlock";
import NewButton from "../NewButton/NewButton";

import styles from "./AboutNewComponent.module.css";

gsap.registerPlugin(ScrollTrigger);

const AboutNewComponent = ({setIsOpenModal}) => {
  const container = useRef(null);
  const imagesRef = useRef([]);

  let mm = gsap.matchMedia();

  useGSAP( () => {

    mm.add("(min-width: 1025px)", () => {

      const tlImages = gsap.timeline({
        scrollTrigger: {
          trigger: ".aboutNew",
          start: "top 50%",
          // end: "+=50%",
          scrub: 1,
        },
      });
  
      tlImages
      .to("#aboutSection", {
        duration: 1,
        opacity: 1,
        // y: 0,
      })
      // .fromTo("#aboutSection #first", { y: 60 }, { y: 0 }, "<")
      // .fromTo("#aboutSection #second img", { y: 60 }, { y: 0 }, "<");

    });

    mm.add("(max-width: 1024px)", () => {
      const tlImages = gsap.timeline({
        scrollTrigger: {
          trigger: ".aboutNew",
          start: "top 90%",
          // end: "+=50%",
          scrub: 1,
        },
      });
  
      tlImages
      .to("#aboutSection", {
        duration: 1,
        opacity: 1,
        y: 0,
      })
      // .fromTo("#aboutSection #first", { y: 60 }, { y: 0 }, "<")
      // .fromTo("#aboutSection #second img", { y: 60 }, { y: 0 }, "<");
    });
  
}, [])

    return <>
        <div className={`aboutNew ${styles.aboutNew}`} id="about">
      <div className={styles.aboutNewWrapper} >
        <div className={styles.aboutNewFirstBlock}>
            <div className={styles.aboutNewLogo}>
              <img
                id="home_name"
                src="/images/CTL_HEADING_3.png"
                alt="CTL Australia Mining Supplier"
                className={styles.aboutNewCtlLogo}
              ></img>
            </div>
              <p className={styles.aboutNewText}>
                CTL Australia has secured a preferred supplier agreement with a few large Western Australian mining companies, we are servicing all their sites, underground, open pit and processing plants throughout Western Australia. We are providing an online mining portal which has gone live for our existing clients and we would really appreciate the opportunity to stock and supply your products and accessories to our mining clients and for the companies to view online.
                <br /> <br />
                We are based in Perth and have been providing our clients with premium products in a swift time frame at some of the best prices in the industry, to ensure a streamlined ordering process from our end direct to the client we need to align ourselves with a company that can provide the same service and to secure a competitive sales and terms of trade agreement.
              </p>
        </div>
        <div className={styles.aboutNewRight} id="aboutSection">
              <div id="first">
                <div className={styles.aboutNewFirstImg}><img src="/images/about_1_2.png"></img></div>
                <div className={styles.aboutNewSecondBlock}>
                <NewTextBlock  sign={"+"} title={""} number={200} subtitle="categories" description="available for order" />

                <img src="/images/about_2.png" className={styles.aboutNewSecondImg}></img>
                </div>
              </div>
              <div  className={styles.aboutNewThirdBlock} id="second">
              <NewTextBlock sign={"+"} title={"k"} number={400} subtitle="parts" description="available for order" />   
              <div><img src="/images/about_3.png" className={styles.aboutNewSecondImg} ></img></div>
              </div>
        </div>
      </div>
    </div>
    </>
}

export default AboutNewComponent;
