const express = require("express");
const {
  createProgram,
  getAllPrograms,
  getProgramById,
  updateProgram,
  deleteProgram,
} = require("../controllers/program.controller");

const {authenticate} = require("../middlewares/authenticate");
const {authorize} = require("../middlewares/authorize");

const router = express.Router();

// Only admin can manage programs
router.post("/", authenticate, authorize("admin"), createProgram);
router.get("/", authenticate, getAllPrograms);
router.get("/:id", authenticate, getProgramById);
router.put("/:id", authenticate, authorize("admin"), updateProgram);
router.delete("/:id", authenticate, authorize("admin"), deleteProgram);

module.exports = router;
