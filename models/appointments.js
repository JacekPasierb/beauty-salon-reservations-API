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

const getAppointmentsByDate = async (date) => {
  try {
    const appointmentsData = await listAppointments();
    const filteredAppointments = appointmentsData.filter((appointment) => {
      return appointment.appointmentDateTime.startsWith(date);
    });
    return filteredAppointments;
  } catch (error) {
    console.error("Błąd podczas pobierania rezerwacji:", error);
  }
};
const getAppointmentsByDateTime = async (dateTime) => {
  try {
    const appointmentsData = await listAppointments();
    const filteredAppointments = appointmentsData.filter((appointment) => {
      return appointment.appointmentDateTime.startsWith(dateTime);
    });
    return filteredAppointments;
  } catch (error) {
    console.error("Błąd podczas pobierania rezerwacji:", error);
  }
};

const getAppointmentsByClientName = async (firstName, lastName) => {
  try {
    const appointmentsData = await listAppointments();
    const filteredAppointments = appointmentsData.filter((appointment) => {
      return (
        appointment.client.firstName.toLowerCase() ===
          firstName.toLowerCase() &&
        appointment.client.lastName.toLowerCase() === lastName.toLowerCase()
      );
    });

    return filteredAppointments;
  } catch (error) {
    throw new Error("Błąd podczas pobierania rezerwacji.");
  }
};

const getAppointmentsByCosmeticianName = async (firstName, lastName) => {
  try {
    const appointmentsData = await listAppointments();
    const filteredAppointments = appointmentsData.filter((appointment) => {
      return (
        appointment.cosmetician.firstName.toLowerCase() ===
          firstName.toLowerCase() &&
        appointment.cosmetician.lastName.toLowerCase() ===
          lastName.toLowerCase()
      );
    });

    return filteredAppointments;
  } catch (error) {
    throw new Error("Błąd podczas pobierania rezerwacji.");
  }
};

const deleteAppointment = async (appointmentsId) => {};

const addAppointment = async (newAppointment) => {};

module.exports = {
  listAppointments,
  getAppointmentsByDate,
  getAppointmentsByDateTime,
  getAppointmentsByClientName,
  getAppointmentsByCosmeticianName,
  deleteAppointment,
  addAppointment,
};
