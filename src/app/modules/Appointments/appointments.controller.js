import { appointmentServices } from "./appointments.services.js";

const bookAppointment = async (req, res, next) => {
  try {
    const { ...appoitmentDetails } = req.body;
    const appointment = await appointmentServices.bookAppointment(
      appoitmentDetails
    );
    res.status(200).json({
      status: "success",
      message: "Appointment created successfully",
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};

const startAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const appointment = await appointmentServices.startAppointment(id);
    res.status(200).json({
      status: "success",
      message: "Appointment started successfully",
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};

const cancelAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const appointment = await appointmentServices.cancelAppointment(id);
    res.status(200).json({
      status: "success",
      message: "Appointment Cancelled successfully",
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};
const finishAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const appointment = await appointmentServices.finishAppointment(id);
    res.status(200).json({
      status: "success",
      message: "Appointment completed successfully",
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};

const getAllAppointments = async (req, res, next) => {
  const { page = 1, limit = 8 } = req.query;
  try {
    const appointments = await appointmentServices.getAllAppointments(
      Number(page),
      Number(limit)
    );
    res.status(200).json({
      status: "success",
      message: "Appointments Fecthed successfully",
      meta: appointments.meta,
      data: appointments.data,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const appointment = await appointmentServices.getSingleAppointment(id);
    res.status(200).json({
      status: "success",
      message: "Appointment fetched successfully",
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};

const updateAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { ...appointmentData } = req.body;
    const appointment = await appointmentServices.updateAppointment(
      id,
      appointmentData
    );
    res.status(200).json({
      status: "success",
      message: "Appointment updated successfully",
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const appointment = await appointmentServices.deleteAppointment(id);
    res.status(200).json({
      status: "success",
      message: "Appointment deleted successfully",
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};

export const appointmentController = {
  bookAppointment,
  startAppointment,
  cancelAppointment,
  finishAppointment,
  getAllAppointments,
  getSingleAppointment,
  updateAppointment,
  deleteAppointment,
};
