import emailjs from '@emailjs/browser';

// Service ID and Template IDs should be in environment variables
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const WELCOME_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_WELCOME_TEMPLATE_ID;
const MEMBERSHIP_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_MEMBERSHIP_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const sendWelcomeEmail = async (userData) => {
    if (!SERVICE_ID || !WELCOME_TEMPLATE_ID || !PUBLIC_KEY) {
        console.warn("EmailJS configuration missing. Welcome email not sent.");
        return;
    }

    const templateParams = {
        to_name: userData.name,
        to_email: userData.email,
        reply_to: "aete.india@gmail.com" // Replace with actual support email
    };

    try {
        await emailjs.send(SERVICE_ID, WELCOME_TEMPLATE_ID, templateParams, PUBLIC_KEY);
        console.log("Welcome email sent successfully!");
    } catch (error) {
        console.error("Failed to send welcome email:", error);
    }
};

export const sendMembershipEmail = async (userData, membershipType) => {
    if (!SERVICE_ID || !MEMBERSHIP_TEMPLATE_ID || !PUBLIC_KEY) {
        console.warn("EmailJS configuration missing. Membership email not sent.");
        return;
    }

    const templateParams = {
        to_name: userData.name,
        to_email: userData.email,
        membership_type: membershipType,
        application_id: userData.paymentId || "N/A",
        reply_to: "aete.india@gmail.com"
    };

    try {
        await emailjs.send(SERVICE_ID, MEMBERSHIP_TEMPLATE_ID, templateParams, PUBLIC_KEY);
        console.log("Membership confirmation email sent successfully!");
    } catch (error) {
        console.error("Failed to send membership email:", error);
    }
};
