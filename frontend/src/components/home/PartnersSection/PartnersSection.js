import styles from "./PartnersSection.module.css";

const PartnersSection = () => {
     return <div className={styles.partners}>
        <h1 className={styles.title}>Miina Group Partners</h1>
        <div className={styles.partnersLogoWRapper}>
            <img className={styles.imgOne} src="./images/ABDWA.png" alt="ABDWA LOGO" />
            <img className={styles.imgTwo} src="./images/SN_Registered_ART.png" alt="SN REGISTERED ART" />
            <img  className={styles.imgThree} src="./images/ICN.png" alt="ICN LOGO" />
        </div>
        </div>
}

export default PartnersSection;