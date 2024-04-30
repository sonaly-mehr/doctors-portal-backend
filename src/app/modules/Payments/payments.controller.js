import { paymentServices } from "./payments.services.js";

const createPayment = async (req, res, next) => {
  try {
    const { ...paymentData } = req.body;
    const payment = await paymentServices.createPayment(paymentData);
    res.status(200).json({
      status: "success",
      message: "Payment created successfully",
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};

const getAllPayments = async (req, res, next) => {
  try {
    const payments = await paymentServices.getAllPayments();
    res.status(200).json({
      status: "success",
      message: "Payments fetched successfully",
      data: payments.data,
    });
  } catch (error) {
    next(error);
  }
};

const getSinglePayment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payment = await paymentServices.getSinglePayment(id);
    res.status(200).json({
      status: "success",
      message: "Payment fetched successfully",
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};

const updatePayment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { ...paymentData } = req.body;
    const payment = await paymentServices.updatePayment(id, paymentData);
    res.status(200).json({
      status: "success",
      message: "Payment updated successfully",
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};

const deletePayment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payment = await paymentServices.deletePayment(id);
    res.status(200).json({
      status: "success",
      message: "Payment deleted successfully",
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};

export const paymentController = {
  createPayment,
  getAllPayments,
  getSinglePayment,
  updatePayment,
  deletePayment,
};
