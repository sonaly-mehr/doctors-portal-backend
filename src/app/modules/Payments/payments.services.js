import prisma from "../../shared/prisma.js";

const getAllPayments = async ()=> {
    const result = await prisma.payment.findMany();
    const total = await prisma.payment.count();
    return {
        meta: {
            total
        },
        data: result
    };
};

const getSinglePayment = async (id) => {
    const result = await prisma.payment.findUnique({
        where: {
            id: id
        }
    });
    return result;
};

const updatePayment = async (id, payment) => {
    const result = await prisma.payment.update({
        where: {
            id: id
        },
        data: payment
    });
    return result;
};

const deletePayment = async (id) => {
    const result = await prisma.payment.delete({
        where: {
            id: id
        }
    });
    return result;
};

export const paymentServices = {
    getAllPayments,
    getSinglePayment,
    updatePayment,
    deletePayment
}