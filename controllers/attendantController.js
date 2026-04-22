const Attendant = require("../models/Attendant");

const createAttendant = async (req, res) => {
  try {
    const attendant = await Attendant.create(req.body);
    res.status(201).json(attendant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAttendants = async (req, res) => {
  try {
    const attendants = await Attendant.find();
    res.json(attendants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createAttendant, getAttendants };