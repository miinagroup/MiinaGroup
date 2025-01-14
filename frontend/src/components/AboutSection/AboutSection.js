import styles from "./AboutSection.module.css";

const AboutSection = () => {
    return <div className={styles.about} >
        <img className={styles.aboutImage} src="/svg/FamilyEmblemRed.svg" alt="Family Emblem Red" />
        <img className={styles.aboutImageArrow} src="/svg/arrow_narrow.svg" alt="Arrow" />
        <div className={styles.aboutImageText}>#Marni is a Family emblem is our symbol, our identity and our strong connection to Kuruma country, continuing and maintaining cultural practices is our responsibility to the Ngurra</div>
        <div className={styles.aboutWrapper}>
            <div className={styles.aboutInfo} id="about">
                <h1 className={styles.title}>WHO MIINA GROUP IS</h1>
                <p className={styles.text}>
                    Founded in 2021, Miina Group was created to capitalize on opportunities within the Robe River Kuruma Native Title lands and Rio Tinto Operations at Mesa A and Mesa J. Led by Howard Lockyer and Sherena Bin Hitam, the company aims to become a trusted provider of <b>mining & construction safety supplies</b>, machinery, equipment and small-scale rehabilitation services in the West Pilbara, working alongside other Aboriginal suppliers to meet industry demand. <br /> <br />
                    The name "Miina," derived from the Kuruma and Yindjibarndi word for the soft spinifex grass, symbolizes strength and resilience—traits the company aspires to embody. Miina’s mission is to steadily grow into a strong, dependable business that enriches and strengthens the community and land it serves. <br /> <br />
                    With deep cultural ties to the <span className={styles.strong}>Pilbara</span> region, Howard Lockyer, a descendant of the Kuruma, Yindjibarndi and Marthudunera people, brings a rich heritage of stewardship and cultural responsibility to the business. <span className={styles.strong}>His partner, Sherena Bin Hitam, heritage is of Bardi Jawi, of the Dampier Peninsula and Yawuru peoples of Broome in the Kimberley.  She too brings her strong cultural responsibilities, business acumen and commitment.</span> Miina Group integrates these values into its operations, ensuring respect for traditional practices whilst pursuing business ventures. <br /> <br />
                    Miina's future plans include staged development, starting in 2023/24, with a focus on business planning, industry engagement, and the responsible execution of mining operations. The company's strong foundation in mining knowledge and plant operations ensures its commitment to delivering reliable and culturally respectful services on Kuruma country and beyond.  <br /> <br />
                </p>
            </div>
            <div className={styles.aboutImages} >
                <img className={styles.aboutImagesOne} src="/images/image_about_2.jpg" alt="The Pannawonica area" />
                <img className={styles.aboutImagesTwo} src="/images/image_about_1.jpg" alt="The Pannawonica area" />
            </div>
        </div>
        <img className={styles.aboutImageBottom} src="/images/SubmarkGreen.png" alt="Submark Green" />
        <img className={styles.aboutImageArrowBottom} src="/svg/arrow_narrow_green.svg" alt="Arrow" />
        <div className={styles.aboutImageTextBottom}>Miina is named after the hardy perennial grass - Triodia Epactia, found throughout the Pilbara</div>
    </div>
}

export default AboutSection;