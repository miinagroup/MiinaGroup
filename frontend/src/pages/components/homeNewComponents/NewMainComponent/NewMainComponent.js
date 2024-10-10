import styles from "./NewMainComponent.module.css";

const NewMainComponent = () => {
    return <div>
    <div className={styles.homeNew}>
      <video autoPlay loop muted playsInline preload="auto" className={`${styles.bgVid} desktop`}><source src={"https://ctladmin.b-cdn.net/video/Sequence%2001.mp4"} type="video/mp4" /></video>
      <video autoPlay loop muted playsInline preload="auto" className={`${styles.bgVid} mobile`}><source src={"https://ctladmin.b-cdn.net/video/Phone.mp4"} type="video/mp4" /></video>
    </div> 
  </div>
}

export default NewMainComponent;