const data = {};
const express = require("express");
const router = express.Router();
const { limitStudent, deleteMatchId, updateStudentInfo } = require("../controllers/students.controller")

router.get("/", limitStudent); //with a limit query
// router.post("/", createPostHandler);
router.put("/:id", updateStudentInfo);
router.delete("/:id", deleteMatchId);

module.exports = router;