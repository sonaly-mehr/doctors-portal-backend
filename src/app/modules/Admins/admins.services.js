import prisma from "../../shared/prisma.js";

const createAdmin = async (admin)=> {
    const result = await prisma.admin.create({
        data: admin
    });
    return result;
};

const getAllAdmins = async () => {
    const result = await prisma.admin.findMany();
    const total = await prisma.admin.count();
    return {
        meta: {
            total
        },
        data: result
    };
};

const getSingleAdmin = async (id) => {
    const result = await prisma.admin.findUnique({
        where: {
            id: id
        }
    });
    return result;
};

const updateAdmin = async (id, admin) => {
    const result = await prisma.admin.update({
        where: {
            id: id
        },
        data: admin
    });
    return result;
};

const deleteAdmin = async (id)=> {
    const result = await prisma.admin.delete({
        where: {
            id: id
        }
    });
    return result;
};

export const adminServices = {
    createAdmin,
    getAllAdmins,
    getSingleAdmin,
    updateAdmin,
    deleteAdmin
}
