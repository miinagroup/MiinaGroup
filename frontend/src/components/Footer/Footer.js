import styles from "./Footer.module.css";

const Footer = () => {
    return <div className={styles.footer}>
<img src="/images/SubmarkRed.png" alt="Miina Plant" className={styles.logoPlant} />
<div className={styles.footerLinks}>
    <div>Copyright © Miina Group 2025</div>
    <div>Terms and Conditions</div>
    <div>Private Policy </div>
</div>
    </div>
}

export default Footer;