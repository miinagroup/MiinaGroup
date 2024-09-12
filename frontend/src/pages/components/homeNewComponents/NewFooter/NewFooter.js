import { Popover, OverlayTrigger } from "react-bootstrap";

import styles from "./NewFooter.module.css";

const NewFooter = () => {
  const popoverGoogle = (
    <Popover id="popover-basic">
      <Popover.Body>
        <img
          src="/Android_QR_code.png"
          alt="Android QR Code"
          style={{ width: "150px" }}
        />
      </Popover.Body>
    </Popover>
  );

  const popoverApple = (
    <Popover id="popover-basic" style={{ marginRight: "30px" }}>
      <Popover.Body>
        <img
          src="/Apple_QR_code.png"
          alt="Apple QR Code"
          style={{ width: "150px" }}
        />
      </Popover.Body>
    </Popover>
  );
    return <div className={styles.newFooter} id="footer">
        
<div className={styles.footerWrapper}>
    <div>
      <div className={styles.footerTitle}>Service</div>
      <div className={styles.newListFooter}>
        <div><a id="goods_return" href="/goodsreturnform" target="_blank">Warranty</a></div>
        <div> <a id="goods_return" href="/pdfpreview?/CTL_Credit-Application-Form.pdf" target="_blank">Credit Application Form<i class="bi bi-file-pdf"></i></a></div>
        <div><a id="goods_return" href="/pdfpreview?/CTL_Australia_Supplier_Code_of_Conduct.pdf" target="_blank">CTL Supplier Code of Conduct<i class="bi bi-file-pdf"></i></a></div>
    </div>
    </div>

    <div className={styles.newFooterHelpCenter}>
        <div className={styles.footerTitle}>Help Center</div>
        <div className={styles.newListFooter}>
        <div><a id="terms_conditions" href="/TermsConditions" target="_blank">Terms &amp; Conditions</a></div>
        <div><a id="privacy_policy" href="/privacypolicy" target="_blank">Privacy Policy</a></div>
        </div>
        
    <div className={styles.copyright}>
            <div className={styles.logo_container}>
            <img
                src="/images/CTL-hex.png"
                alt="CTL Australia Mining Supplier"
                className="rotate linear infinite"
            ></img>
    </div>
    </div>
    </div>

    <div>
        <div className={styles.footerTitle}>Contact Us</div>
        <div className={styles.newListFooter}>
            <span><a id="contact_sales" href="mailto:sales@ctlaus.com">sales@ctlaus.com</a></span>
            <span><a id="contact_accounts" href="mailto:accounts@ctlaus.com">accounts@ctlaus.com</a></span>
        </div>
        <div className={styles.footerBtns}>
                <OverlayTrigger trigger="click" placement="top" overlay={popoverGoogle} rootClose={true}>
                    <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-google-play" viewBox="0 0 16 16">
                        <path d="M14.222 9.374c1.037-.61 1.037-2.137 0-2.748L11.528 5.04 8.32 8l3.207 2.96zm-3.595 2.116L7.583 8.68 1.03 14.73c.201 1.029 1.36 1.61 2.303 1.055zM1 13.396V2.603L6.846 8zM1.03 1.27l6.553 6.05 3.044-2.81L3.333.215C2.39-.341 1.231.24 1.03 1.27" />
                    </svg>
                    </div>
                </OverlayTrigger>
                <OverlayTrigger trigger="click" placement="top" overlay={popoverApple} rootClose={true}>
                    <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-apple" viewBox="0 0 16 16">
                        <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282" />
                        <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282" />
                    </svg>
                    </div>
                </OverlayTrigger>
                <a href="https://au.linkedin.com/company/ctl-australia" className={styles.linkedin} target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                    </svg>
                </a>
                <a href="https://www.youtube.com/channel/UCSjLghhjS4uux47MYagM5bw" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-youtube" viewBox="0 0 16 16">
                    <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
                    </svg>
                </a>
        </div>
    </div>
</div>
    <div className={styles.copyrightText}>Copyright © 2024 All Rights Reserved by Problematic Media.</div>
</div>
}

export default NewFooter;
