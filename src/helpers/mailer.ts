import User from "@/models/userModel"; // Import the User model
import bcryptjs from "bcryptjs"; // Import bcryptjs library for password hashing
import nodemailer from "nodemailer"; // Import nodemailer for sending emails

// Define a function to send emails
export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // Hash the user ID to generate a unique token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    // Depending on the email type, update user information accordingly
    if (emailType === "VERIFY") {
      // Update user information for email verification
      const usertoken = await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: new Date(Date.now() + 360000), // Set token expiry time
        },
      });
      console.log(usertoken, "set token to db in send email");
    } else if (emailType === "RESET") {
      // Update user information for password reset
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgetPasswordToken: hashedToken,
          forgetPasswordTokenExpiry: new Date(Date.now() + 360000), // Set token expiry time
        },
      });
    }

    // Create a nodemailer transport object
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io", // SMTP host
      port: 2525, // SMTP port
      auth: {
        user: "620321fe24a85e", // Mailtrap username
        pass: "7a72c981ac91e0", // Mailtrap password
      },
    });

    // Define email options
    const mailOptions = {
      from: "vikashkumhar13@gmail.com", // Sender email address
      to: email, // Recipient email address
      subject:
        emailType === "VERIFY"
          ? "Email for Verification" // Subject for email verification
          : "Email for Resetting Password", // Subject for password reset
      // HTML content of the email
      html: `<p>Click <a href ="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "Verify your email" : "Reset your password"
      } or copy and paste the link below in your browser. <br/>
      ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
      </p>`,
    };

    // Send the email using nodemailer
    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse; // Return mail response
  } catch (error: any) {
    // If an error occurs during the process, throw an error
    throw new Error(error.message);
  }
};
