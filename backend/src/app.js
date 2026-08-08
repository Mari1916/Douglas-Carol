const express = require("express");
const cors = require("cors");
const path = require("path");

const presenteRoutes = require("./routes/presenteRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// API
app.use("/api/presentes", presenteRoutes);

// Frontend
app.use(express.static(path.join(__dirname, "../../frontend")));

module.exports = app;