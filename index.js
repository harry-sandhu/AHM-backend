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

// Enable CORS for all origins
app.use(cors());

// Middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is working");
});

app.get("/test-cors", (req, res) => {
  res.json({ message: "CORS is working" });
});

// Routes
app.use("/excelData", excelDataRoutes);
app.use("/api", consignmentRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/OTP", OTPRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
