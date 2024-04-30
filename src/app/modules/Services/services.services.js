import prisma from '../../shared/prisma.js'

const createService = async (service) => {
    const result = await prisma.service.create({
        data: service,
    })
    return result
}

const getAllServices = async (page,
    limit,
    searchTerm,) => {
    const result = await prisma.service.findMany({
        where: {
            name: {
                contains: searchTerm,
                mode: "insensitive"
            }
        },
        include: {
            availableServices: {
                include: {
                    slot: true
                }
            },
            specialization: {
                include: {
                    doctors: true
                }
            }
        },
        take: limit,
        skip: (page - 1) * limit,
    })
    const total = await prisma.service.count()
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    }
}

const getSingleService = async (id) => {
    const result = await prisma.service.findUnique({
        where: {
            id: id,
        },
        include: {
            specialization: true
        }
    })
    return result
}

const updateService = async (
    id,
    service
) => {
    const result = await prisma.service.update({
        where: {
            id: id,
        },
        data: service,
    })
    return result
}

const deleteService = async (id) => {
    const result = await prisma.service.delete({
        where: {
            id: id,
        },
    })
    return result
}

export const serviceServices = {
    createService,
    getAllServices,
    getSingleService,
    updateService,
    deleteService,
}
