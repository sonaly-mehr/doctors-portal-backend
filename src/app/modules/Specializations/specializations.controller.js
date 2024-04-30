import { specializationServices } from "./specializations.services.js";


const createSpecialization = async (req, res, next) => {
    try {
        const { ...specializationData } = req.body;
        const specialization = await specializationServices.createSpecialization(specializationData);
        res.status(200).json({
            status: 'success',
            message: 'Specialization created successfully',
            data: specialization
        });
    } catch (error) {
        next(error)
    }
};
const getAllSpecializations = async (req, res, next) => {
    try {
        const specializations = await specializationServices.getAllSpecializations();
        res.status(200).json({
            status: 'success',
            message: 'Specializations fetched successfully',
            data: specializations.data,
        });
    } catch (error) {
        next(error)
    }
};
const getSingleSpecialization = async (req, res, next) => {
    try {
        const { id } = req.params;
        const specialization = await specializationServices.getSingleSpecialization(id);
        res.status(200).json({
            status: 'success',
            message: 'Specialization fetched successfully',
            data: specialization
        });
    } catch (error) {
        next(error)
    }
};
const updateSpecialization = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { ...specializationData } = req.body;
        const specialization = await specializationServices.updateSpecialization(id, specializationData);
        res.status(200).json({
            status: 'success',
            message: 'Specialization updated successfully',
            data: specialization
        });
    } catch (error) {
        next(error)
    }
};
const deleteSpecialization = async (req, res, next) => {
    try {
        const { id } = req.params;
        const specialization = await specializationServices.deleteSpecialization(id);
        res.status(200).json({
            status: 'success',
            message: 'Specialization deleted successfully',
            data: specialization
        });
    } catch (error) {
        next(error)
    }
};


export const specializationController = {
    createSpecialization,
    getAllSpecializations,
    getSingleSpecialization,
    updateSpecialization,
    deleteSpecialization
}