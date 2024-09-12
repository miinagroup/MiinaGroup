import styles from "./NewMainComponent.module.css";

const NewMainComponent = () => {
    return <div>
    <div className={styles.homeNew}>
      <video autoPlay loop muted className={styles.bgVid}> <source src={"https://ctladmin.b-cdn.net/video/CTL%20Australia%20Main.mp4"} type="video/mp4" /> </video>
    </div>
  </div>
}

export default NewMainComponent;