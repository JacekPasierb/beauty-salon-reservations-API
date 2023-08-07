const path = require("path");
const fs = require("fs/promises");

const listAppointments = async () => {
  try {
    const filePath = path.join(__dirname, "appointments.json");
    const fileContent = await fs.readFile(filePath, { encoding: "utf8" });
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading appointments file:", error);
    return [];
  }
};

const deleteAppointment = async (appointmentsId) => {};

const addAppointment = async (newAppointment) => {};

module.exports = {
  listAppointments,
  deleteAppointment,
  addAppointment,
};
