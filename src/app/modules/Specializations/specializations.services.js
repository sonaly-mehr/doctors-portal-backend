import prisma from "../../shared/prisma.js";


const createSpecialization = async (specialization)=> {
    const result = await prisma.specialization.create({
        data: specialization
    });
    return result;
};

const getAllSpecializations = async () => {
    const result = await prisma.specialization.findMany();
    const total = await prisma.specialization.count();
    return {
        meta: {
            total
        },
        data: result
    };
};

const getSingleSpecialization = async (id) => {
    const result = await prisma.specialization.findUnique({
        where: {
            id: id
        }
    });
    return result;
};

const updateSpecialization = async (id, specialization) => {
    const result = await prisma.specialization.update({
        where: {
            id: id
        },
        data: specialization
    });
    return result;
};

const deleteSpecialization = async (id) => {
    const result = await prisma.specialization.delete({
        where: {
            id: id
        }
    });
    return result;
};

export const specializationServices = {
    createSpecialization,
    getAllSpecializations,
    getSingleSpecialization,
    updateSpecialization,
    deleteSpecialization
}