const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const department_routes = require("./departmentRoutes");
const appointment_routes = require("./appointmentRoutes");
const image_routes = require("./imageRoutes");
const scheduleRoutes = require("./schedule");
const userRoutes = require("./user");
const authRoutes = require("./auth");
const appointmentHistoryRoutes = require("./appointmentHistory");
const { checkToken } = require("../middlewares/checkToken");
var morgan = require("morgan");

app.use("/uploads", express.static(path.join(__dirname, "../../uploads")));

app.use(morgan("combined"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/api/users", checkToken, userRoutes);
app.use("/auth", authRoutes);
app.use("/api", checkToken, department_routes);
app.use("/api", checkToken, scheduleRoutes);
app.use("/api", checkToken, appointmentHistoryRoutes);
app.use("/api", checkToken, appointment_routes);
app.use("/api", checkToken, image_routes);

module.exports = app;
