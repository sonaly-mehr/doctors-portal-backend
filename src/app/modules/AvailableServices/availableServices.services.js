import prisma from "../../shared/prisma.js";

const createAvailableService = async (availableService) => {
  const result = await prisma.availableService.create({
    data: availableService,
  });
  return result;
};

const getAllAvailableServices = async ( page, limit, filtersData) => {
  const filterConditions = [];

  if (filtersData.slotDate) {
    filterConditions.push({
      slotDate: {
        equals: filtersData.slotDate,
      },
    });
  }
  const result = await prisma.availableService.findMany({
    where: {
      AND: [
        {
          slotDate: {
            equals: filtersData.slotDate,
            mode: "insensitive",
          },
        },
      ],
    },
    include: {
      service: {
        include: {
          specialization: {
            include: {
              doctors: {
                include: {
                  availability: true,
                },
              },
            },
          },
        },
      },
      appointments: {
        include: {
          patient: true,
          payment: true,
        },
      },
      availableDoctor: {
        include: {
          doctor: {
            include: {
              specialization: true,
            },
          },
          // availableServices: true
        },
      },

      slot: true,
    },
    take: limit,
    skip: (page - 1) * limit,
  });
  const total = await prisma.availableService.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleAvailableService = async (id) => {
  const result = await prisma.availableService.findUnique({
    where: {
      id: id,
    },
    include: {
      service: {
        include: {
          specialization: {
            include: {
              doctors: {
                include: {
                  availability: true,
                },
              },
            },
          },
        },
      },
      appointments: {
        include: {
          patient: true,
          payment: true,
        },
      },
      availableDoctor: true,
      slot: true,
    },
  });
  return result;
};

const updateAvailableService = async (id, availableService) => {
  const result = await prisma.availableService.update({
    where: {
      id: id,
    },
    data: availableService,
  });
  return result;
};

const deleteAvailableService = async (id) => {
  const result = await prisma.availableService.delete({
    where: {
      id: id,
    },
  });
  return result;
};

export const availableServiceServices = {
  createAvailableService,
  getAllAvailableServices,
  getSingleAvailableService,
  updateAvailableService,
  deleteAvailableService,
};
