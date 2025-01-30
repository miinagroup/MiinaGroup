const nodemailer = require("nodemailer");

module.exports.sendVerificationEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "mail.miinagroup.com.au",
      //host: "mail.vps4.dezyne.net",
      port: 587,
      secure: false,
      auth: {
        user: process.env.NOREPLY,
        pass: process.env.NOREPLYPASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: process.env.NOREPLY,
      to: email,
      subject: subject,
      text: text,
      html: `
      <div style="margin:0;padding:0">
  <div style="background-color:#f1f2ed">
    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      border="0"
      style="background-color:#f1f2ed"
    >
      <tbody>
        <tr>
          <td width="17">&nbsp;</td>
          <td valign="top" align="center">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tbody>
                <tr>
                  <td valign="top" align="center">
                    <table
                      align="center"
                      width="594"
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                    >
                      <tbody>
                        <tr>
                          <td width="17">&nbsp;</td>
                          <td width="560" valign="top" align="center">
                            <table
                              width="100%"
                              cellpadding="0"
                              cellspacing="0"
                              border="0"
                              style="padding-top:10px"
                            >
                              <tbody>
                                <tr></tr>

                                <tr>
                                  <td width="100%" height="62">
                                    &nbsp;
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                          <td width="17">&nbsp;</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td valign="top" align="center">
                    <table
                      align="center"
                      width="594"
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                      style="background-color:#ffffff"
                    >
                      <tbody>
                        <tr>
                          <td width="17">&nbsp;</td>
                          <td width="560" valign="top" align="center">
                            <table
                              width="100%"
                              cellpadding="0"
                              cellspacing="0"
                              border="0"
                            >
                              <tbody>
                                <tr>
                                  <td width="100%" valign="top" align="center">
                                  <br />
                                      <img
                                        src="https://minadmin.b-cdn.net/website/PrimaryLogoColour.png"
                                        align="center"
                                        border="0"
                                        width="200"
                                        height="100"
                                        alt="Miina Group"
                                        style="outline:none;text-decoration:none;display:block;font-size:8px;line-height:100%"
                                        class="CToWUd"
                                        data-bit="iit"
                                      />
                                  </td>
                                </tr>

                                <tr>
                                  <td width="17">&nbsp;</td>
                                </tr>
                                <tr>
                                  <td width="17">&nbsp;</td>
                                </tr>
                                <tr>
                                  <td width="100%" valign="top" align="left">
                                    <div style="font-family:'Helvetica Light',Helvetica,Arial,sans-serif;font-size:14px;color:#000000;line-height:20px">
                                      <span style="font-size:14px;font-weight:normal;color:#000000">
                                        <b>
                                        <br />
                                        Thank you for registering with us,
                                        <br />
                                        </b>
                                        <br />
                                        <br />
                                        Please click on the following button to verify your email:
                                        <br />
                                        <br />
                                        <br />
                                        <a href="${text}" style="padding:8px 15px; color: white; background: #1e4881; text-decoration:none;">Verify</a>
                                        <br />
                                        <br />
                                        <br />
                                         This verify link has
                                        been sent because someone is attempting
                                        to reset password for account: <b> ${email} </b>.
                                        If this was not you, please
                                        contact 
                                        <a
                                          href="mailto:Enquiries@miinagroup.com.au"
                                          target="_blank"
                                        >
                                          Enquiries@miinagroup.com.au
                                        </a>.
                                        <br />
                                        <br />
                                        <b>
                                            Thank you,
                                            <br />
                                            Miina Group
                                            <br />
                                            <br />
                                            <br />
                                        </b>
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>

    <font face="arial,helvetica,sans-serif" size="2">
      <hr>
        CAUTION: This <span class="il">email</span> and files included in its
        transmission are solely intended for the use of the addressee(s) and may
        contain information that is confidential and privileged. If you receive
        this <span class="il">email</span> in error, please advise us
        immediately and delete it without copying the contents contained within.
        Miina Group do not accept
        liability for the views expressed within or the consequences of any
        computer viruses that may be transmitted with this email. The contents are also subject to copyright. No part of it should be reproduced, adapted or transmitted
        without the written consent of the copyright owner.
      </hr>
    </font>
    <div class="yj6qo"></div>
  </div>
</div>`,
    });
    console.log("email sent successfully");
  } catch (error) {
    console.log("email not sent!");
    console.log(error);
    return error;
  }
};

module.exports.sendResetPasswordEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "mail.miinagroup.com.au",
      port: 587,
      secure: false,
      auth: {
        user: process.env.NOREPLY,
        pass: process.env.NOREPLYPASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: process.env.NOREPLY,
      to: email,
      subject: subject,
      text: text,
      html: `
      <div style="margin:0;padding:0">
  <div style="background-color:#f1f2ed">
    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      border="0"
      style="background-color:#f1f2ed"
    >
      <tbody>
        <tr>
          <td width="17">&nbsp;</td>
          <td valign="top" align="center">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tbody>
                <tr>
                  <td valign="top" align="center">
                    <table
                      align="center"
                      width="594"
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                    >
                      <tbody>
                        <tr>
                          <td width="17">&nbsp;</td>
                          <td width="560" valign="top" align="center">
                            <table
                              width="100%"
                              cellpadding="0"
                              cellspacing="0"
                              border="0"
                              style="padding-top:10px"
                            >
                              <tbody>
                                <tr></tr>

                                <tr>
                                  <td width="100%" height="62">
                                    &nbsp;
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                          <td width="17">&nbsp;</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td valign="top" align="center">
                    <table
                      align="center"
                      width="594"
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                      style="background-color:#ffffff"
                    >
                      <tbody>
                        <tr>
                          <td width="17">&nbsp;</td>
                          <td width="560" valign="top" align="center">
                            <table
                              width="100%"
                              cellpadding="0"
                              cellspacing="0"
                              border="0"
                            >
                              <tbody>
                                <tr>
                                  <td width="100%" valign="top" align="center">
                                  <br />
                                      <img
                                        src="https://minadmin.b-cdn.net/website/PrimaryLogoColour.png"
                                        align="center"
                                        border="0"
                                        width="200"
                                        height="100"
                                        alt="Miina Group"
                                        style="outline:none;text-decoration:none;display:block;font-size:8px;line-height:100%"
                                        class="CToWUd"
                                        data-bit="iit"
                                      />
                                  </td>
                                </tr>

                                <tr>
                                  <td width="17">&nbsp;</td>
                                </tr>
                                <tr>
                                  <td width="17">&nbsp;</td>
                                </tr>
                                <tr>
                                  <td width="100%" valign="top" align="left">
                                    <div style="font-family:'Helvetica Light',Helvetica,Arial,sans-serif;font-size:14px;color:#000000;line-height:20px">
                                      <span style="font-size:14px;font-weight:normal;color:#000000">
                                        <b>
                                        <br />
                                        We have received a request to reset your password,
                                        <br />
                                        </b>  
                                        <br />
                                        <br />
                                        Please click on the following button to reset your password:
                                        <br />
                                        <br />
                                        <br />
                                        <a href="${text}" style="padding:8px 15px; color: white; background: #1e4881; text-decoration:none;">Reset Password</a>
                                        <br />
                                        <br />
                                        <br />
                                        This verify link has
                                        been sent because someone is attempting
                                        to reset password for account: <b> ${email} </b>.
                                        If this was not you, please
                                        contact 
                                        <a
                                          href="mailto:Enquiries@miinagroup.com.au"
                                          target="_blank"
                                        >
                                          Enquiries@miinagroup.com.au
                                        </a>.
                                        <br />
                                        <br />
                                        <b>
                                            Thank you,
                                            <br />
                                            Miina Group
                                            <br />
                                            <br />
                                            <br />
                                        </b>
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>

    <font face="arial,helvetica,sans-serif" size="2">
      <hr>
        CAUTION: This <span class="il">email</span> and files included in its
        transmission are solely intended for the use of the addressee(s) and may
        contain information that is confidential and privileged. If you receive
        this <span class="il">email</span> in error, please advise us
        immediately and delete it without copying the contents contained within.
        Miina Group do not accept
        liability for the views expressed within or the consequences of any
        computer viruses that may be transmitted with this email. The contents are also subject to copyright. No part of it should be reproduced, adapted or transmitted
        without the written consent of the copyright owner.
      </hr>
    </font>
    <div class="yj6qo"></div>
  </div>
</div>`,
    });

    console.log("Reset password email sent successfully");
  } catch (error) {
    console.log("Reset password email not sent!");
    console.log(error);
    return error;
  }
};

