import { adminServices } from "./admins.services.js";

const createAdmin = async (req, res, next) => {
    try {
        const { ...adminData } = req.body;
        const admin = await adminServices.createAdmin(adminData);
        res.status(200).json({
            status: 'success',
            message: 'Admin created successfully',
            data: admin
        });
    } catch (error) {
        next(error)
    }
};

const getAllAdmins = async (req, res, next) => {
    try {
        const admins = await adminServices.getAllAdmins();
        res.status(200).json({
            status: 'success',
            message: 'Admins fetched successfully',
            data: admins.data,
        });
    } catch (error) {
        next(error)
    }
};

const getSingleAdmin = async (req, res, next) => {
    try {
        const { id } = req.params;
        const admin = await adminServices.getSingleAdmin(id);
        res.status(200).json({
            status: 'success',
            message: 'Admin fetched successfully',
            data: admin
        });
    } catch (error) {
        next(error)
    }
};

const updateAdmin = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { ...adminData } = req.body;
        const admin = await adminServices.updateAdmin(id, adminData);
        res.status(200).json({
            status: 'success',
            message: 'Admin updated successfully',
            data: admin
        });
    } catch (error) {
        next(error)
    }
};

const deleteAdmin = async (req, res, next) => {
    try {
        const { id } = req.params;
        const admin = await adminServices.deleteAdmin(id);
        res.status(200).json({
            status: 'success',
            message: 'Admin deleted successfully',
            data: admin
        });
    } catch (error) {
        next(error)
    }
};

export const adminController = {
    createAdmin,
    getAllAdmins,
    getSingleAdmin,
    updateAdmin,
    deleteAdmin
}
