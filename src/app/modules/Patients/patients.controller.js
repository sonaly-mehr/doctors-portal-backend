import { patientServices } from './patients.services.js'

const createPatient = async (
  req,
  res,
  next,
) => {
  try {
    const { medicalProfile, ...patientData } = req.body
    const patient = await patientServices.createPatient(
      patientData,
      medicalProfile,
    )
    res.status(200).json({
      status: 'success',
      message: 'Patient created successfully',
      data: patient,
    })
  } catch (error) {
    next(error)
  }
}

const getAllPatients = async (
  req,
  res,
  next,
) => {
  const { page = 1, limit = 8, searchTerm = ''} = req.query
  try {
    const patients = await patientServices.getAllPatients(Number(page), Number(limit), searchTerm)
    res.status(200).json({
      status: 'success',
      message: 'Patients fetched successfully',
      meta: patients.meta,
      data: patients.data,
    })
  } catch (error) {
    next(error)
  }
}

const getSinglePatient = async (
  req,
  res,
  next,
) => {
  try {
    const { id } = req.params
    const patient = await patientServices.getSinglePatient(id)
    res.status(200).json({
      status: 'success',
      message: 'Patient fetched successfully',
      data: patient,
    })
  } catch (error) {
    next(error)
  }
}

const updatePatient = async (
  req,
  res,
  next,
) => {
  try {
    const { id } = req.params
    const { ...patientData } = req.body
    const patient = await patientServices.updatePatient(id, patientData)
    res.status(200).json({
      status: 'success',
      message: 'Patient updated successfully',
      data: patient,
    })
  } catch (error) {
    next(error)
  }
}

const deletePatient = async (
  req,
  res,
  next,
) => {
  try {
    const { id } = req.params
    const patient = await patientServices.deletePatient(id)
    res.status(200).json({
      status: 'success',
      message: 'Patient deleted successfully',
      data: patient,
    })
  } catch (error) {
    next(error)
  }
}

export const patientController = {
  createPatient,
  getAllPatients,
  getSinglePatient,
  updatePatient,
  deletePatient,
}