import prisma from "../../shared/prisma.js";

const createAvailableDoctor = async (availableDoctor)=> {
    const result = await prisma.availableDoctor.create({
        data: availableDoctor
    });
    return result;
};

const getAllAvailableDoctors = async (page, limit, searchTerm) => {
    const result = await prisma.availableDoctor.findMany({
        include: {
            doctor: {
                // include: {
                //     fullName: {
                //         where: {
                //             fullName: {
                //                 contains: searchTerm,
                //                 mode: "insensitive"
                //             }
                //         },
                //     }
                // },
 
                include: {
                    availability: {
                        include: {
                            slot: true
                        }
                    },
                    specialization: {
                        include: {
                            services: true
                        }
                    },
                }
            },
            availableServices: {
                include: {
                    service: true,
                    slot: true

                }
            },
            slot: true
        },
        take: limit,
        skip: (page - 1) * limit,
    });
    const total = await prisma.availableDoctor.count();
    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };
};

const getSingleAvailableDoctor = async (id)=> {
    const result = await prisma.availableDoctor.findUnique({
        where: {
            id: id
        },
        include: {
            doctor: {
                include: {
                    availability: {
                        include: {
                            slot: true
                        }
                    },
                    specialization: {
                        include: {
                            services: true
                        }
                    },
                }
            },
            availableServices: {
                include: {
                    service: true,
                    slot: true

                }
            },
            slot: true
        }
    });
    return result;
};

const updateAvailableDoctor = async (id, availableDoctor)=> {
    const result = await prisma.availableDoctor.update({
        where: {
            id: id
        },
        data: availableDoctor
    });
    return result;
};

const deleteAvailableDoctor = async (id)=> {
    const result = await prisma.availableDoctor.delete({
        where: {
            id: id
        }
    });
    return result;
};

export const availableDoctorServices = {
    createAvailableDoctor,
    getAllAvailableDoctors,
    getSingleAvailableDoctor,
    updateAvailableDoctor,
    deleteAvailableDoctor
}
