const { Service } = require("../models/service.model");

// @desc Create a new service
// @route POST /api/services
const createService = async (req, res) => {
  try {
    const { serviceType, quantity, price } = req.body;

    if (!serviceType || !quantity || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const total = quantity * price;
    const service = await Service.create({ serviceType, quantity, price, total });

    res.status(201).json({
      message: "Service created successfully",
      service,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Get all services
// @route GET /api/services
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Get a single service by ID
// @route GET /api/services/:id
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Update a service
// @route PUT /api/services/:id
const updateService = async (req, res) => {
  try {
    const { serviceType, quantity, price } = req.body;

    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });

    service.serviceType = serviceType || service.serviceType;
    service.quantity = quantity || service.quantity;
    service.price = price || service.price;
    service.total = service.quantity * service.price;

    await service.save();

    res.json({
      message: "Service updated successfully",
      service,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Delete a service
// @route DELETE /api/services/:id
const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });

    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
};
