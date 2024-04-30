import prisma from "../../shared/prisma.js";

const bookAppointment = async (appoitmentDetails) => {
  const {
    patientName,
    phoneNumber,
    email,
    patientId,
    availableServiceId,
    appointmentDate,
  } = appoitmentDetails;
  //checking if the available service exist
  const availableService = await prisma.availableService.findUnique({
    where: {
      id: availableServiceId,
    },
  });

  if (!availableService) {
    throw new Error("This service is not available");
  }
  if (availableService.availableSeats === 0) {
    throw new Error("This service is fully booked");
  }

  const booking = await prisma.$transaction(async (transactionClient) => {
    const appointment = await transactionClient.appointment.create({
      data: {
        patientName,
        phoneNumber,
        email,
        patientId,
        availableServiceId,
        appointmentDate,
        status: "pending",
      },
    });

    await transactionClient.availableService.update({
      where: {
        id: availableServiceId,
      },
      data: {
        availableSeats: availableService.availableSeats - 1,
        isBooked: availableService.availableSeats - 1 === 0 ? true : false,
      },
    });

    const payment = await transactionClient.payment.create({
      data: {
        amount: availableService.fees,
        paymentStatus: "pending",
        appointmentId: appointment.id,
      },
    });

    return {
      appointment: appointment,
      payment: payment,
    };
  });

  return booking;
};
const cancelAppointment = async (appointmentId) => {
  const appointment = await prisma.appointment.findUnique({
    where: {
      id: appointmentId,
    },
  });

  if (!appointment) {
    throw new Error("Appointment does not exist");
  }

  if (appointment.status === "cancelled") {
    throw new Error("Appointment has already been cancelled");
  }

  if (appointment.status === "finished") {
    throw new Error("Appointment has already been completed");
  }

  const cancelledAppointment = await prisma.$transaction(
    async (transactionClient) => {
      const appointmentToCancel = await transactionClient.appointment.update({
        where: {
          id: appointmentId,
        },
        data: {
          status: "cancelled",
        },
      });

      const availableService =
        await transactionClient.availableService.findUnique({
          where: {
            id: appointment.availableServiceId,
          },
        });

      await transactionClient.availableService.update({
        where: {
          id: appointment.availableServiceId,
        },
        data: {
          availableSeats: {
            increment: 1,
          },

          isBooked:
            availableService && availableService.availableSeats + 1 > 0
              ? false
              : true,
        },
      });

      await transactionClient.payment.update({
        where: {
          appointmentId,
        },
        data: {
          paymentStatus: "cancelled",
        },
      });

      return {
        appointment: appointmentToCancel,
      };
    }
  );

  return cancelledAppointment;
};

const startAppointment = async (appointmentId) => {
  const appointment = await prisma.appointment.findUnique({
    where: {
      id: appointmentId,
    },
  });

  if (!appointment) {
    throw new Error("Appointment does not exist");
  }

  if (appointment.status === "cancelled") {
    throw new Error("Appointment has already been cancelled");
  }

  if (appointment.status === "finished") {
    throw new Error("Appointment has already been completed");
  }

  const appointmentToStart = await prisma.appointment.update({
    where: {
      id: appointmentId,
    },
    data: {
      status: "started",
    },
  });

  if (!appointmentToStart) {
    await transactionClient.payment.update({
      where: {
        appointmentId,
      },
      data: {
        paymentStatus: "refund",
      },
    });
  }

  return appointmentToStart;
};

const finishAppointment = async (appointmentId) => {
  const appointment = await prisma.appointment.findUnique({
    where: {
      id: appointmentId,
    },
  });

  if (!appointment) {
    throw new Error("Appointment does not exist");
  }

  if (appointment.status === "cancelled") {
    throw new Error("Appointment has already been cancelled");
  }

  if (appointment.status === "finished") {
    throw new Error("Appointment has already been completed");
  }

  const appointmentToFinish = await prisma.appointment.update({
    where: {
      id: appointmentId,
    },
    data: {
      status: "completed",
    },
  });

  return appointmentToFinish;
};

const getAllAppointments = async (page, limit) => {
  const result = await prisma.appointment.findMany({
    include: {
      payment: true,
      availableService: {
        include: {
          service: true,
        },
      },
    },
    take: limit,
    skip: (page - 1) * limit,
  });
  const total = await prisma.appointment.count();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleAppointment = async (id) => {
  const result = await prisma.appointment.findUnique({
    where: {
      id: id,
    },
    include:{
      availableService: {
      include: {
        service: true,
      },
    }
    }
  });
  return result;
};

const updateAppointment = async (id, appointment) => {
  const result = await prisma.appointment.update({
    where: {
      id: id,
    },
    data: appointment,
  });
  return result;
};

const deleteAppointment = async (id) => {
  const deleteApponitment = await prisma.$transaction(
    async (transactionClient) => {
      const deletePayment = await transactionClient.payment.delete({
        where: {
          appointmentId: id,
        },
      });
      const deleteBooking = await transactionClient.appointment.delete({
        where: {
          id: id,
        },
      });

      return {
        deleteBooking: deleteBooking,
        deletePayment: deletePayment,
      };
    }
  );

  return deleteApponitment;
};

export const appointmentServices = {
  bookAppointment,
  cancelAppointment,
  startAppointment,
  finishAppointment,
  getAllAppointments,
  getSingleAppointment,
  updateAppointment,
  deleteAppointment,
};
