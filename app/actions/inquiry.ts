"use server";

import nodemailer from "nodemailer";

export interface InquirySubmission {
  name: string;
  email: string;
  phone: string;
  message: string;
  procedureSlug: string;
  procedureTitle: string;
}

export async function submitInquiryAction(data: InquirySubmission) {
  // Validate incoming parameters
  if (!data.name || !data.email || !data.phone || !data.message) {
    return {
      success: false,
      error: "All fields are required. Please check your inputs.",
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return {
      success: false,
      error: "Invalid email address format.",
    };
  }

  const zohoUser = process.env.ZOHO_EMAIL_USER || "contact@auromil.com";
  const zohoPass = process.env.ZOHO_EMAIL_PASS;

  try {
    console.log("Processing inquiry on server side:", data);

    if (zohoPass) {
      // Create SMTP transporter for Zoho Mail
      // Note: smtp.zoho.com is default. For Zoho EU use smtp.zoho.eu, for Zoho IN use smtp.zoho.in
      const transporter = nodemailer.createTransport({
        host: "smtp.zoho.in",
        port: 465,
        secure: true, // true for port 465 (SSL)
        auth: {
          user: zohoUser,
          pass: zohoPass, // Zoho App Password (not account primary password)
        },
      });

      // Send mail
      await transporter.sendMail({
        from: `"Auromil Portal" <${zohoUser}>`,
        to: zohoUser, // Send the details to contact@auromil.com
        replyTo: data.email, // Allow directly replying to patient
        subject: `[New Inquiry] ${data.procedureTitle} - ${data.name}`,
        text: `
New Patient Inquiry Received:
-----------------------------
Procedure: ${data.procedureTitle} (${data.procedureSlug})
Patient Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}

Message / Symptoms Description:
${data.message}

--
Auromil Care Coordination Portal
        `,
      });
      console.log("Email successfully sent via Zoho SMTP.");
    } else {
      console.warn("ZOHO_EMAIL_PASS env variable not set. Email dispatch bypassed.");
    }

    return {
      success: true,
      message: "Your inquiry has been successfully received by our care coordinators.",
    };
  } catch (error: any) {
    console.error("Inquiry submission error on server:", error);
    return {
      success: false,
      error: error.message || "An unexpected error occurred on the server. Please try again or contact us directly.",
    };
  }
}
