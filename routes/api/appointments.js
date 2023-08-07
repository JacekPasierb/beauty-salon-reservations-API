const express = require("express");
const { listAppointments } = require("../../models/appointments");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const appointments = await listAppointments();
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error handling GET /api/appointments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {});

router.delete("/:id", async (req, res) => {});

module.exports = router;
