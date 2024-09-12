import { useEffect } from "react";

import { motion, useMotionValue, useTransform, animate, useAnimation } from "framer-motion";

import { useInView } from "react-intersection-observer";

import styles from "./NewTextBlock.module.css";

const NewTextBlock = ({title, subtitle, description, number, sign}) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, Math.round);

    const squareVariants = {
        visible: { opacity: 1},
        hidden: { opacity: 0 }
      };

    const controls = useAnimation();
    const [ref, inView] = useInView();
    useEffect(() => {
      if (inView) {
        controls.start("visible");
        const animation = animate(count, number, {
            duration: 2
          });
      }
    }, [controls, inView]);
  

    return <div className={styles.textBlock}>
            <div className={styles.titleTextBlock}>{sign}<motion.span ref={ref}
      animate={controls}  initial="hidden" variants={squareVariants} >{rounded}</motion.span>{title}</div>
            <hr />
            <div className={styles.subTitleTextBlock}>{subtitle}</div>
            <div className={styles.descriptionTextBlock}>{description}</div>
        </div>     
}

export default NewTextBlock;
