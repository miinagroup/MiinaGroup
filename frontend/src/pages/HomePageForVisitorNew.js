import MainSection from "../components/home/MainSection/MainSection.js";
import AboutSection from "../components/home/AboutSection/AboutSection.js";
import TeamSection from "../components/home/TeamSection/TeamSection.js";
import ContactSection from "../components/home/ContactSection/ContactSection.js";
import PartnersSection from "../components/home/PartnersSection/PartnersSection.js";

const HomePageForVisitorNew = () => {   
  return <div style={{position: "relative"}}>
    <MainSection />
    <AboutSection />
    <TeamSection />
    <ContactSection />
    <PartnersSection />
    </div>
  }

export default HomePageForVisitorNew;
