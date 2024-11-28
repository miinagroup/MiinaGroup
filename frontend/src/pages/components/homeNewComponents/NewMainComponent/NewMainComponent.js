import styles from "./NewMainComponent.module.css";

const NewMainComponent = () => {
    return <div>
    <div className={styles.homeNew}>
      <video autoPlay loop muted playsInline preload="auto" className={`${styles.bgVid} desktop`}><source src={"https://ctladmin.b-cdn.net/video/Horizontal.CTL.main%20(1).mp4"} type="video/mp4" /></video>
      <video autoPlay loop muted playsInline preload="auto" className={`${styles.bgVid} ${styles.mobile}`}><source src={"https://ctladmin.b-cdn.net/video/Vertical.CTL.main%20(1).mp4"} type="video/mp4" /></video>
    </div> 
  </div>
}

export default NewMainComponent;