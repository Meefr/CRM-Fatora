const { Program } = require("../models/program.model");

// @desc Create a new program
// @route POST /api/programs
const createProgram = async (req, res) => {
  try {
    const { title, description, active } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const program = await Program.create({ title, description, active });
    res.status(201).json({
      message: "Program created successfully",
      program,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Get all programs
// @route GET /api/programs
const getAllPrograms = async (req, res) => {
  try {
    const programs = await Program.find();
    res.json(programs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Get a program by ID
// @route GET /api/programs/:id
const getProgramById = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) return res.status(404).json({ message: "Program not found" });
    res.json(program);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Update a program
// @route PUT /api/programs/:id
const updateProgram = async (req, res) => {
  try {
    const { title, description, active } = req.body;

    const program = await Program.findById(req.params.id);
    if (!program) return res.status(404).json({ message: "Program not found" });

    if (title) program.title = title;
    if (description) program.description = description;
    if (typeof active === "boolean") program.active = active;

    await program.save();

    res.json({
      message: "Program updated successfully",
      program,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Delete a program
// @route DELETE /api/programs/:id
const deleteProgram = async (req, res) => {
  try {
    const program = await Program.findByIdAndDelete(req.params.id);
    if (!program) return res.status(404).json({ message: "Program not found" });

    res.json({ message: "Program deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createProgram,
  getAllPrograms,
  getProgramById,
  updateProgram,
  deleteProgram,
};
