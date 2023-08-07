const path = require("path");
const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");

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

const addAppointment = async (newAppointment) => {
  try {
    const newId = uuidv4();

    const appointment = {
      id: newId,
      ...newAppointment,
    };

    const appointmentsData = await listAppointments();
    appointmentsData.push(appointment);
    const filePath = path.join(__dirname, "appointments.json");
    await fs.writeFile(
      filePath,
      JSON.stringify(appointmentsData, null, 2),
      "utf-8"
    );
    return appointment;
  } catch (error) {
    throw new Error("Błąd podczas dodawania rezerwacji.");
  }
};

const deleteAppointment = async (appointmentId) => {
  try {
    const appointmentsData = await listAppointments();
    const index = appointmentsData.findIndex(
      (appointment) => appointment.id === appointmentId
    );

    if (index !== -1) {
      appointmentsData.splice(index, 1);
      const filePath = path.join(__dirname, "appointments.json");
      await fs.writeFile(
        filePath,
        JSON.stringify(appointmentsData, null, 2),
        "utf-8"
      );
      return true;
    } else {
      console.error("Rezerwacja o podanym identyfikatorze nie istnieje.");
      return false;
    }
  } catch (error) {
    throw new Error("Błąd");
  }
};

module.exports = {
  listAppointments,
  getAppointmentsByDate,
  getAppointmentsByDateTime,
  getAppointmentsByClientName,
  getAppointmentsByCosmeticianName,
  deleteAppointment,
  addAppointment,
};
