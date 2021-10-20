const express = require("express");
const router = express.Router();


/* GET home page. */
const studentRoutes = require("./students.api");
router.use("/students", studentRoutes);

module.exports = router;
