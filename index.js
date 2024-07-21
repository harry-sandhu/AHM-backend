const express = require("express");
const connectDB = require("./config/db");
const excelDataRoutes = require("./routes/excelxDataRoutes");
const consignmentRoutes = require("./routes/consignmentRoutes");
const userRoutes = require("./routes/userRoutes");
const OTPRoutes = require("./routes/OTPRoutes");
const cors = require("cors");

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());

// Enable CORS
app.use(cors());

// Routes
app.use("/excelData", excelDataRoutes);
app.use("/api", consignmentRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/OTP", OTPRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
