import { serviceServices } from "./services.services.js";

const createService = async (req, res, next) => {
    try {
        const { ...serviceData } = req.body;
        const service = await serviceServices.createService(serviceData);
        res.status(200).json({
            status: 'success',
            message: 'Service created successfully',
            data: service
        });
    } catch (error) {
        next(error)
    }
};

const getAllServices = async (req, res, next) => {
    const { page = 1, limit = 8, searchTerm = ''} = req.query
    try {
        const services = await serviceServices.getAllServices(Number(page), Number(limit), searchTerm);
        res.status(200).json({
            status: 'success',
            message: 'Services fetched successfully',
            meta: services.meta,
            data: services.data,
        });
    } catch (error) {
        next(error)
    }
};

const getSingleService = async (req, res, next) => {
    try {
        const { id } = req.params;
        const service = await serviceServices.getSingleService(id);
        res.status(200).json({
            status: 'success',
            message: 'Service fetched successfully',
            data: service
        });
    } catch (error) {
        next(error)
    }
};

const updateService = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { ...serviceData } = req.body;
        const service = await serviceServices.updateService(id, serviceData);
        res.status(200).json({
            status: 'success',
            message: 'Service updated successfully',
            data: service
        });
    } catch (error) {
        next(error)
    }
};

const deleteService = async (req, res, next) => {
    try {
        const { id } = req.params;
        const service = await serviceServices.deleteService(id);
        res.status(200).json({
            status: 'success',
            message: 'Service deleted successfully',
            data: service
        });
    } catch (error) {
        next(error)
    }
};

export const serviceController = {
    createService,
    getAllServices,
    getSingleService,
    updateService,
    deleteService
}
