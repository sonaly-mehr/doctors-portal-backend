import prisma from '../../shared/prisma.js'

const createTimeSlot = async (timeSlot) => {
  const result = await prisma.timeSlots.create({
    data: timeSlot,
  })
  return result
}

const getAllTimeSlots = async () => {
  const result = await prisma.timeSlots.findMany()
  const total = await prisma.timeSlots.count()
  return {
    meta: {
      total,
    },
    data: result,
  }
}

const getSingleTimeSlot = async (id) => {
  const result = await prisma.timeSlots.findUnique({
    where: {
      id: id,
    },
  })
  return result
}

const updateTimeSlot = async (
  id,
  timeSlot,
) => {
  const result = await prisma.timeSlots.update({
    where: {
      id: id,
    },
    data: timeSlot,
  })
  return result
}

const deleteTimeSlot = async (id)=> {
  const result = await prisma.timeSlots.delete({
    where: {
      id: id,
    },
  })
  return result
}

export const timeSlotsServices = {
  createTimeSlot,
  getAllTimeSlots,
  getSingleTimeSlot,
  updateTimeSlot,
  deleteTimeSlot,
}
