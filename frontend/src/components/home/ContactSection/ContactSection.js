import { useState } from "react";
import styles from "./ContactSection.module.css";

const ContactSection = () => {
    const [ isSent, setIsSent ] = useState(false);
    const [ isSending, setIsSending ] = useState(false);

    return <div className={styles.contacts} id="request">
        <img src="/images/FamilyEmblemCream.png" alt="Family Emblem" className={styles.backgroundEmblem} />
        <div className={styles.contactsAcknowledgement}>
            <div className={styles.logoTaglineWrapper}>
                <img src="/svg/PrimaryLogoColour.svg" alt="Miina Group Logo" className={styles.logo} />
                <div className={styles.tagline}>Walking and Working on Country, safely</div>
            </div>
            <p className={styles.acknowledgement}>
                Miina Group acknowledges the traditional owners and custodians of country throughout Australia and acknowledges their continuing connection to land, waters and community. We pay our respects to the people, the cultures and the elders past, present and emerging.
            </p> 
        </div>
        <h1 className={styles.title}>Contact us</h1>
        <div className={styles.subtitle}>
        Didn't find what you're looking for?<br />
        We're keen to answer your questions.
        </div>

                {!isSent ? <form className={styles.requestForm} method="post" 
                // onSubmit={handleSubmit}
                >
                    <div>
                        <label>Name</label>
                        <input name="name" required placeholder="Full Name"></input>
                    </div>
                    
                     <div>
                        <label>Email address</label>
                        <input name="email" required placeholder="Email address"></input>
                     </div>

                     <div>
                        <label>Phone</label>
                        <input name="email" required placeholder="(+61) 400 000 000"></input>  
                     </div>

                     <div>
                        <label>Message</label>
                        <textarea name="textarea" placeholder="Please enter your message"></textarea>
                     </div>
                    
                    <button className={styles.newRequestFormBtn} type="submit">{!isSending ? "Send Enquiry" : "Sending..."}</button>
                </form> 
                : <div className={styles.newRequestSent}>
                    <p>Your request has been sent. We will contact you within 24 hours.</p>
                    <button 
                    // onClick={sendNewRequest} 
                    className={styles.newRequestFormBtn}>Send another request</button>
                    </div>}
        
    </div>
}

export default ContactSection;