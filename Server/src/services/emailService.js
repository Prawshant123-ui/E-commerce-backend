const transporter = require("../config/mail");

const sendEmail = async ({
    to,
    subject,
    html,
}) => {
    try {
        await transporter.sendMail({
            from: process.env.MAIL_FROM,
            to,
            subject,
            html,
        });

        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error("Email Error:", error.message);

        throw new Error("Unable to send email.");
    }
};

module.exports = {
    sendEmail,
};