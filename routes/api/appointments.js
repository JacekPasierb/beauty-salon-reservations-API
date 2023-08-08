const express = require("express");
const Joi = require("joi");

const appointmentSchema = Joi.object({
  client: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
      .pattern(
        /^(\+\d{2,3}\s?)?(\d{3}[\s-]?\d{3}[\s-]?\d{3}|\d{2}[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2})$/
      )
      .required(),
  }).required(),

  appointmentDateTime: Joi.string().isoDate().required(),

  service: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
  }).required(),

  cosmetician: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  }).required(),
});

const {
  listAppointments,
  getAppointmentsByDate,
  getAppointmentsByClientName,
  getAppointmentsByCosmeticianName,
  addAppointment,
  deleteAppointment,
} = require("../../models/appointments");

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

router.get("/by-date", async (req, res) => {
  try {
    const date = req.query.date;
    const time = req.query.time;
    const dateTime = time ? `${date}T${time}` : `${date}` ;
  

    const appointmentsDate = await getAppointmentsByDate(dateTime);
    res.status(200).json(appointmentsDate);
  } catch (error) {
    console.error("Error handling GET /api/appointments/by-date", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/by-client", async (req, res) => {
  try {
    const firstName = req.query.firstName;
    const lastName = req.query.lastName;

    const appointments = await getAppointmentsByClientName(firstName, lastName);
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error handling GET /api/appointments/by-client", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/by-cosmetician", async (req, res) => {
  try {
    const firstName = req.query.firstName;
    const lastName = req.query.lastName;

    const appointmentsByCosmetician = await getAppointmentsByCosmeticianName(
      firstName,
      lastName
    );
    res.status(200).json(appointmentsByCosmetician);
  } catch (error) {
    console.error("Error handling GET /api/appointments/by-cosmetician", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newAppointment = req.body;
    const { error } = appointmentSchema.validate(newAppointment);
    if (error) {
      return res
        .status(400)
        .json({ message: "Validation error", details: error.details });
    }
    const addedAppointment = await addAppointment(newAppointment);
    res.status(201).json(addedAppointment);
  } catch (error) {
    console.error("Error handling POST /api/appointments", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const appointmentId = req.params.id;

    const isDeleted = await deleteAppointment(appointmentId);
    if (isDeleted) {
      return res.status(200).json({ message: "contact deleted" });
    } else {
      return res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.error("Error handling DELETE /api/appointments/:id", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
