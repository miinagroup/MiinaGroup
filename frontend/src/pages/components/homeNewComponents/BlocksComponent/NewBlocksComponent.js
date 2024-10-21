import { useState, useEffect, useRef, useCallback } from 'react';
import { Row, Col, Card, Carousel } from "react-bootstrap";
import ReactPlayer from "react-player";
import gsap from 'gsap';

import NewTextBlock from "../NewTextBlock/NewTextBlock";


import styles from "./NewBlocksComponent.module.css";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger)

const ImageRotator = ({ images }) => {
    const [currentImages, setCurrentImages] = useState([]);
  
    useEffect(() => {
      const getRandomImages = () => {
        if (images?.length < 2) {
          console.warn('Not enough images to display.');
          return [];
        }
  
        let firstIndex = Math.floor(Math.random() * images?.length);
        let secondIndex;
        do {
          secondIndex = Math.floor(Math.random() * images?.length);
        } while (secondIndex === firstIndex); // Ensure different images
  
        return [images[firstIndex], images[secondIndex]];
      };
  
      setCurrentImages(getRandomImages());
  
      const intervalId = setInterval(() => {
        setCurrentImages(getRandomImages());
      }, 2000);
  
  
      return () => clearInterval(intervalId);
    }, [images]);
  
    if (currentImages.length === 0) {
      return <div>Loading...</div>;
    }
  
    return (
    <>
        {currentImages.map((image, index) => {
          if(image.redirectURL !== " ") {
            return <div key={index} className={styles.newBlockItem}><a href={image.redirectURL} className={styles.promotionBlockNewImage}>
            <img
            src={image.image}
            alt={`Displayed ${index}`}
            className={styles.promotionBlockNewImage}
          />
            </a></div>
          }

          return <div key={index}className={styles.newBlockItem}><img
          src={image.image}
          alt={`Displayed ${index}`}
          className={styles.promotionBlockNewImage}
        /></div>
        }
        )}
        </>
    );
  };

const NewBlocksComponent = ({blocks}) => {
    const [topArray, setFirstArray] = useState({});
    const [bottomArray, setSecondArray] = useState({});
    const [videos, setVideos] = useState();
    const [images, setImages] = useState();
    const [index, setIndex] = useState(0);
    const [ isControl, setIsControl ] = useState(false)
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex)
    }
    
    const handleEnded = () => {
      const nextIndex = (index + 1) % videos.length;
      setIndex(nextIndex)
    }
  
    const handleMouseEnter = () => {
      setIsControl(true)
    }
  
    const handleMouseLeave = () => {
      setIsControl(false)
    }

    let mm = gsap.matchMedia();

useGSAP(() => {
  mm.add("(min-width: 1025px)", () => {
     const tlBlocks = gsap.timeline({
    scrollTrigger: {
      trigger: "#blocks",
      start: "top 80%",
      end: "bottom 35%",
      scrub: true,
      once: true,
    },
  });


  tlBlocks
      .fromTo(
        ".topLine",
        { xPercent: -100 },
        { duration: 0.5, xPercent: 0 }
      )
      .fromTo(
        ".bottomLine",
        { xPercent: 100 },
        { duration: 0.5, xPercent: 0 }, 
        0
      ); 
  });
}, [])  

      useEffect(() => {
        const videos = blocks?.detail?.filter(block => block.description?.includes("video"));
        const images = blocks?.detail?.filter(block => block.description?.includes("upper") || block.description?.includes("bottom"));

        setVideos(videos);
        setImages(images);

        if (videos?.length === 2 && images?.length === 6) {
          setFirstArray({"video": videos[0], "images": [...images.slice(0, 3)]});
          setSecondArray({"images": [...images.slice(3, 6)], "video": videos[1]});
      } else {
          console.error('Expected 2 videos and 6 images');
      }
      }, [blocks])

    return <div className={styles.blocksNew} id="blocks"> 
    <div className={`topLine`}>
      <div className={`${styles.promotionBlockTopNew} ${styles.desktop}`}>
              <div className={`${styles.promotionBlockNewVideo} ${styles.newBlockItem}`}>
                <video src={bottomArray.video?.image} controls autoPlay muted loop/>
              </div>
              {bottomArray.images && <ImageRotator images={bottomArray.images} />}
              <div className={styles.textBlock}><NewTextBlock sign={"+"} title="k" number={150} subtitle="products" description="available for order" />   </div>
    </div>
    </div>

    <div className={`bottomLine`}>
      <div className={`${styles.promotionBlockTopNew} ${styles.desktop}`}>
      <div className={styles.textBlock}><NewTextBlock sign={"+"} title="k" number={1} subtitle="suppliers" description="national & international" />  </div> 
          {topArray.images && <ImageRotator images={topArray.images} />}
          <div  className={`${styles.promotionBlockNewVideo} ${styles.newBlockItem}`}>
                <video src={topArray.video?.image} controls autoPlay muted loop />
              </div>
      </div>
   </div>

   <div className={styles.mobile}>
      <div className={styles.top_block}  >
                <Carousel className={styles.carousel} touch activeIndex={index} onSelect={handleSelect} indicators={false}>
                        {videos?.map((block, idx) => {
                          return <Carousel.Item key={idx} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
                            <ReactPlayer
                              url={block.image}
                              width="100%"
                              pip={true}
                              controls={isControl}
                              muted
                              playing={index === idx}
                              onEnded={handleEnded}
                              className={styles.promotional_video}
                              playsinline
                            />

                          </Carousel.Item>
                        })}
                </Carousel>
            </div>
      <div className={styles.mobileNewBlockTexts}>
        <div className={styles.textBlock}><NewTextBlock sign={"+"} title="k" number={150} subtitle="products" description="available for order" />   </div>
        <div className={styles.textBlock}><NewTextBlock sign={"+"} title="k" number={1} subtitle="suppliers" description="national & international" />  </div> 
      </div>
      <div className={styles.mobileNewBlockImages}>
        {bottomArray.images && <ImageRotator images={bottomArray.images} />}
        {topArray.images && <ImageRotator images={topArray.images} />}
      </div>
   </div>
</div>

}

export default NewBlocksComponent;
