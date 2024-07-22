const nodemailer = require("nodemailer");
const OTP = require("../models/Otp");

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.Email_Otp_true,
    pass: process.env.Email_Otp_Password_true,
  },
});

// Controller function for sending OTP email
exports.sendOtpEmail = async (req, res) => {
  const { email } = req.body;
  console.log(email);

  if (!email) {
    return res.status(400).json({ error: "Email address is required." });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);

  // Add custom HTML styling to the email
  const mailOptions = {
    from: "transporttaxsolutions@gmail.com",
    to: email,
    subject: "Email OTP Verification",
    html: `
      <div style="font-family: Arial, sans-serif;">
        <p style="font-size: 18px; color: #333; font-weight: bold;">
          This is Transport Tax Solutions
        </p>
        <p style="font-size: 14px; color: #333;">
          The OTP for your verification is:
        </p>
        <p style="font-size: 28px; color: green; font-weight: bold;">
          ${otp}
        </p>
      </div>
    `,
  };

  const otpEntry = new OTP({ phoneNumber: email, otp });
  await otpEntry.save();
  console.log("From the send SMS");
  console.log(otpEntry);

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(`Error sending email to ${email}:`, error);
      return res
        .status(500)
        .json({ error: `Email could not be sent. backend ${res}` });
    } else {
      console.log(`Email sent to ${email}:`, info.response);
      otpEntry();
      return res.status(200).json({ message: "Email sent successfully." });
    }
  });
};

// Controller function for verifying OTP
exports.verifyOtp = async (req, res) => {
  let { email, otp } = req.body;
  console.log("Request email:", email, "Request OTP:", otp);

  // Normalize email and OTP
  email = email.toLowerCase().trim();
  otp = String(otp).trim();

  try {
    const otpEntry = await OTP.findOne({
      phoneNumber: email,
      otp: otp,
    });
    console.log("Database entry:", otpEntry);

    try {
      const allOTPs = await OTP.find({});
      console.log("All OTP records:", allOTPs);
    } catch (error) {
      console.error("Error retrieving OTP records:", error);
    }

    if (!otpEntry) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    await OTP.deleteOne({ _id: otpEntry._id });
    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error during OTP verification:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};
