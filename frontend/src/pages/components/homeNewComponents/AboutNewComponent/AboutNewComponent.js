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
          start: "top top",
          end: "+=50%",
          scrub: 1,
        },
      });
  
      tlImages
      .to("#aboutSection", {
        duration: 1,
        opacity: 1,
        y: 0,
      })
      .fromTo("#aboutSection #first", { y: 60 }, { y: 0 }, "<")
      .fromTo("#aboutSection #second img", { y: 60 }, { y: 0 }, "<");

    });

    mm.add("(max-width: 1024px)", () => {
      const tlImages = gsap.timeline({
        scrollTrigger: {
          trigger: ".aboutNew",
          start: "top 70%",
          end: "+=50%",
          scrub: 1,
        },
      });
  
      tlImages
      .to("#aboutSection", {
        duration: 1,
        opacity: 1,
        y: 0,
      })
      .fromTo("#aboutSection #first", { y: 60 }, { y: 0 }, "<")
      .fromTo("#aboutSection #second img", { y: 60 }, { y: 0 }, "<");
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
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
        </div>
        <div className={styles.aboutNewRight} id="aboutSection">
              <div id="first">
                <img src="/images/about_1.png" className={styles.aboutNewFirstImg}></img>
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
