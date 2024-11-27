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
          start: "top 80%",
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
              At CTL Australia, we are dedicated to redefining the standard in mining supply. Based in Western Australia, we are proud to deliver tailored, innovative solutions that empower mining operations to excel. Our mission is simple: to provide exceptional service, build lasting partnerships, and grow alongside our clients.
                <br /> <br />
                With a growing client base and an ever-expanding supplier network, CTL Australia collaborates with businesses that share our unwavering commitment to quality, reliability, and exceptional customer care. Every supplier we partner with is carefully selected to align with our core values, ensuring we consistently deliver the highest level of service and products to our clients.
                <br /> <br />
                Innovation and continuous improvement are at the heart of what we do. Whether its through our paperless uniform ordering systems, comprehensive PPE and glove matrix, or our streamlined ordering platform, we are always striving to be better than yesterday. Our goal is to simplify processes, enhance safety, and provide the tools and resources that mining companies need to thrive.
                <br /> <br />
                At CTL Australia, we dont just adapt to the demands of the industry — we anticipate them. We are committed to growing with your company, forging a partnership that evolves alongside your needs and drives success into the future.
                Together, lets break boundaries, achieve more, and build a stronger future for the mining industry. CTL Australia — where service meets excellence.
                </p>
        </div>
        <div className={styles.aboutNewRight} id="aboutSection">
              <div id="first" className={styles.aboutFirstSectionWrapper}>
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
