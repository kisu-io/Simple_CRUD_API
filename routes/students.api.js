const data = {};
const express = require("express");
const router = express.Router();
const { limitStudent, deleteMatchId, updateStudentInfo, createStudentHandler } = require("../controllers/students.controller")

router.get("/", limitStudent); //with a limit query
router.post("/", createStudentHandler);
router.put("/:id", updateStudentInfo);
router.delete("/:id", deleteMatchId);

module.exports = router;