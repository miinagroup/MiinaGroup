import { useState, useEffect, useContext, useId } from "react";
import axios from "axios";
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import AccordionContext from 'react-bootstrap/AccordionContext';

import styles from "./newRequestFormComponent.module.css";

const typeEnquiry = [
    {
        type: "General request",
        value: "general"
    },
    {
        type: "Quote for a product or service",
        value: "quote"
    }
]

const frequentlyAskedQuestions = [
    {
        question: "How can I contact customer service?",
        answer: "We understand that the mining industry never stops, and neither should your supplier. Our team is available 24/7, from Monday to Sunday, to support your needs anytime, day or night. You can reach our customer service team by phone, email, or through the contact form on our website."
    },
    {
        question: "What safety standards do your products meet?",
        answer: "All of our products meet or exceed industry safety standards. We ensure that our equipment is compliant with relevant regulations and guidelines to ensure the safety of operators and workers."
    },
    {
        question: "Do you offer international shipping?",
        answer: "Yes, we can arrange international shipping for our products. Shipping costs and logistics will be discussed and agreed upon at the time of the order."
    },
    {
        question: "What is your return policy?",
        answer: "Our return policy depends on the nature of the product and the circumstances of the return. Generally, we accept returns of equipment within a specified period if it is defective or not as described."
    }
]

const NewRequestFormComponent = () => {
    const [isProductQuote, setIsProductQuote] = useState(false);
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();
    const [selectedOption, setSelectedOption] = useState('select');
    const [ isSent, setIsSent ] = useState(false);
    const [ isSending, setIsSending ] = useState(false);

    useEffect(() => {
        if (selectedOption === "quote") {
            setIsProductQuote(true)
        } else {
           setIsProductQuote(false) 
        }
    }, [selectedOption])

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        setSelectedFile(e.target.files[0])
    }

    function CustomToggle({ children, eventKey, callback }) {
        const { activeEventKey } = useContext(AccordionContext);
        const decoratedOnClick = useAccordionButton(
          eventKey,
          () => callback && callback(eventKey),
        );
      
        const isCurrentEventKey = activeEventKey === eventKey;
  
        return (
          <button type="button" className={styles.acc_btn} onClick={decoratedOnClick}>
            <span className={isCurrentEventKey ? styles.svg_rotate : styles.svg_rotate_back}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
              </svg>
            </span>
            {children}
          </button>
        );
      }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          };
        
        const form = e.target;
        const formData = new FormData(form);
        formData.append("file", selectedFile);

        const res = await axios.post(
            "/api/sendemail/sendRequest",
            formData,
            config
          );
      
          setIsSending(true)
          if(res.status === 200) {
            setIsSent(true)
          }
    }

    const sendNewRequest = () => {
        setIsSent(false);
        setIsSending(false)
    }
    
    return <div className={styles.newRequestForm} id="request">
        <div className={styles.newRequestFormWrapper}>
        <h2>Send Enquiry</h2>
    {/* <div > */}
        {!isSent ? <form className={styles.requestForm} method="post" onSubmit={handleSubmit}>
            <div className={styles.nameEmail}>
                <div>
                   <label>Name</label>
                    <input name="name" required></input> 
                </div>
                <div>
                    <label>Email</label>
                    <input name="email" required></input>
                </div>
            </div>
            
            <div className={styles.typeEnquiry}>
                <div className={styles.typeEnquiryInput}>
                    <label >Enquiry Type</label>
                    <select  
                    name="categoryTypeSelectId" 
                    value={selectedOption}
                    onChange={e => setSelectedOption(e.target.value)} >
                        {typeEnquiry.map((option, index) => {
                            return <option key={index} value={option.value}>{option.type}</option>
                        })}
                    </select>  
                </div>
                
                {isProductQuote && <div className={styles.typeEnquiryFields}>
                    <label>Product Name*</label>
                    <input required name="productName"></input>
                    <label>Brand / Product code / SKU</label>
                    <input name="brand"></input>
                    <label>Image</label>
                    <input type="file" name="file" onChange={onSelectFile} accept="image/*"></input>
                    {selectedFile &&  <img className={styles.selectedFileImg} src={preview} /> }
                    </div>}
                </div>
                <label>Description</label>
                <textarea name="textarea"></textarea>
            
                <button className={styles.newRequestFormBtn} type="submit">{!isSending ? "Send Enquiry" : "Sending..."}</button>
        </form> 
        : <div className={styles.newRequestSent}>
            <p>Your request has been sent. We will contact you within 24 hours.</p>
            <button onClick={sendNewRequest} className={styles.newRequestFormBtn}>Send another request</button>
            </div>}
    {/* </div> */}

        </div>
        <div className={styles.frequentlyAskedQuestions}>
            <h2>Frequently Asked Questions</h2>
            <Accordion defaultActiveKey="0" className={styles.categories_list}>
                {frequentlyAskedQuestions.map((item, index) => (
                  <div className={styles.accordionItem} key={index}>
                    <CustomToggle eventKey={index}>                    
                        <span className={styles.acc_btn_name}>{item.question}</span>
                    </CustomToggle>
                    <Accordion.Collapse eventKey={index} >
                      <div className={styles.acc_body}>{item.answer}</div>
                    </Accordion.Collapse>
                  </div>
                ))}
              </Accordion>  

        </div>
    </div>
}

export default NewRequestFormComponent;
