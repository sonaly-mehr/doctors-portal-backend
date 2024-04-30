import prisma from "../../shared/prisma.js";

const createPatient = async (patient, medicalProfile) => {
  const result = await prisma.$transaction(async (transactionCLient) => {
    const createPatient = await transactionCLient.patient.create({
      data: patient,
    });
    const createMedicalProfile = await transactionCLient.medicalProfile.create({
      data: {
        ...medicalProfile,
        patientId: createPatient.id,

        profileStatus: "active",
      },
    });
    return {
      patient: createPatient,
      medicalProfile: createMedicalProfile,
    };
  });
  return result;
};

const getAllPatients = async (page, limit, searchTerm) => {
  const result = await prisma.patient.findMany({
    where: {
      OR: [
        {
          fullName: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
      ],
    },
    include: {
      appointments: true,
      medicalProfile: true,
    },
    take: limit,
    skip: (page - 1) * limit,
  });
  const total = await prisma.patient.count();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSinglePatient = async (id) => {
  const result = await prisma.patient.findUnique({
    where: {
      id: id,
    },
    include: {
      appointments: {
        include: {
          availableService: {
            include: {
              service: true,
            },
          },
          payment: true,
        },
      },
      medicalProfile: true,
    },
  });
  return result;
};

const updatePatient = async (id, patient) => {
  const result = await prisma.patient.update({
    where: {
      id: id,
    },
    data: patient,
  });
  return result;
};

const deletePatient = async (id) => {
  const result = await prisma.patient.delete({
    where: {
      id: id,
    },
  });
  return result;
};

export const patientServices = {
  createPatient,
  getAllPatients,
  getSinglePatient,
  updatePatient,
  deletePatient,
};
