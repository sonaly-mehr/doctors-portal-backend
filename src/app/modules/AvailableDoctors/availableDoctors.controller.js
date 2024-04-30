import { availableDoctorServices } from "./availableDoctors.services.js";

const createAvailableDoctor = async (req, res, next) => {
  try {
    const { ...availableDoctorData } = req.body;
    const availableDoctor = await availableDoctorServices.createAvailableDoctor(
      availableDoctorData
    );
    res.status(200).json({
      status: "success",
      message: "Available Doctor created successfully",
      data: availableDoctor,
    });
  } catch (error) {
    next(error);
  }
};

const getAllAvailableDoctors = async (req, res, next) => {
  const {page = 1, limit = 3, searchTerm=""} = req.query;
  try {
    const availableDoctors =
      await availableDoctorServices.getAllAvailableDoctors(Number(page),Number(limit),searchTerm);
    res.status(200).json({
      status: "success",
      message: "Available Doctors fetched successfully",
      meta: availableDoctors.meta,
      data: availableDoctors.data,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleAvailableDoctor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const availableDoctor =
      await availableDoctorServices.getSingleAvailableDoctor(id);
    res.status(200).json({
      status: "success",
      message: "Available Doctor fetched successfully",
      data: availableDoctor,
    });
  } catch (error) {
    next(error);
  }
};

const updateAvailableDoctor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { ...availableDoctorData } = req.body;
    const availableDoctor = await availableDoctorServices.updateAvailableDoctor(
      id,
      availableDoctorData
    );
    res.status(200).json({
      status: "success",
      message: "Available Doctor updated successfully",
      data: availableDoctor,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAvailableDoctor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const availableDoctor = await availableDoctorServices.deleteAvailableDoctor(
      id
    );
    res.status(200).json({
      status: "success",
      message: "Available Doctor deleted successfully",
      data: availableDoctor,
    });
  } catch (error) {
    next(error);
  }
};

export const availableDoctorController = {
  createAvailableDoctor,
  getAllAvailableDoctors,
  getSingleAvailableDoctor,
  updateAvailableDoctor,
  deleteAvailableDoctor,
};
