import prisma from '../../shared/prisma.js'

const getAllMedicalProfiles = async () => {
  const result = await prisma.medicalProfile.findMany({
  })
  const total = await prisma.medicalProfile.count()
  return {
    meta: {
      total,
    },
    data: result,
  }
}

const getSingleMedicalProfile = async (
  id,
) => {
  const result = await prisma.medicalProfile.findUnique({
    where: {
      id: id,
    },
    include: {
        patient: true,
    }
  })
  return result
}

const updateMedicalProfile = async (
  id,
  medicalProfile,
) => {
  const result = await prisma.medicalProfile.update({
    where: {
      id: id,
    },
    data: medicalProfile,
  })
  return result
}

const deleteMedicalProfile = async (id) => {
  const result = await prisma.medicalProfile.delete({
    where: {
      id: id,
    },
  })
  return result
}

export const medicalProfileServices = {
  getAllMedicalProfiles,
  getSingleMedicalProfile,
  updateMedicalProfile,
  deleteMedicalProfile,
}