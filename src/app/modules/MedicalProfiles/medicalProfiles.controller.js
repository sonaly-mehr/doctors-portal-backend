import { medicalProfileServices } from "./medicalProfiles.services.js";

const getAllMedicalProfiles = async (req, res, next) => {
    try {
        const medicalProfiles = await medicalProfileServices.getAllMedicalProfiles();
        res.status(200).json({
            status: 'success',
            message: 'Medical Profiles fetched successfully',
            data: medicalProfiles.data,
        });
    } catch (error) {
        next(error)
    }
};

const getSingleMedicalProfile = async (req, res, next) => {
    try {
        const { id } = req.params;
        const medicalProfile = await medicalProfileServices.getSingleMedicalProfile(id);
        res.status(200).json({
            status: 'success',
            message: 'Medical Profile fetched successfully',
            data: medicalProfile
        });
    } catch (error) {
        next(error)
    }
};

const updateMedicalProfile = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { ...medicalProfileData } = req.body;
        const medicalProfile = await medicalProfileServices.updateMedicalProfile(id, medicalProfileData);
        res.status(200).json({
            status: 'success',
            message: 'Medical Profile updated successfully',
            data: medicalProfile
        });
    } catch (error) {
        next(error)
    }
};

const deleteMedicalProfile = async (req, res, next) => {
    try {
        const { id } = req.params;
        const medicalProfile = await medicalProfileServices.deleteMedicalProfile(id);
        res.status(200).json({
            status: 'success',
            message: 'Medical Profile deleted successfully',
            data: medicalProfile
        });
    } catch (error) {
        next(error)
    }
};

export const medicalProfileController = {
    getAllMedicalProfiles,
    getSingleMedicalProfile,
    updateMedicalProfile,
    deleteMedicalProfile
}