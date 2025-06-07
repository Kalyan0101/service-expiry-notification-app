import Service from "../models/service.model.js";

export const createService = async (req, res) => {
  const { name, description, price, validity } = req.body;
  const user_id = req.session?.user.id;
  console.log(validity, user_id);
  if (!user_id) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  try {
    console.log("creating service");
    const createdServices = await Service.create({
      name,
      description,
      price,
      validity,
      user_id,
    });
    if (!createdServices) {
      res.status(400).json({ message: "service not created" });
    }
    console.log("service created");
    console.log(createdServices);
    res.status(200).json({ message: "service created successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const getAllServices = async (req, res) => {
  // console.log(res);
  try {
    const allServices = await Service.findAll();

    if(allServices.length == 0) {
      return res.status(400).json({ success: 400, message: "could not found any services" });
    }

    res.status(200).json(allServices);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getServiceById = async (req, res) => {
  const serviceId = req.params.id;
  try {
    const oneServices = await Service.findOne({ where: { id: serviceId } });
    if (!oneServices) {
      res.status(400).json({ message: "could not found the services" });
      return;
    }
    res.status(200).json(oneServices);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateService = async (req, res) => {
  const serviceid = req.params.id;
  const data = req.body;
  try {
    const [updatedService] = await Service.update(data, {
      where: { id: serviceid },
    });
    if (!updatedService) {
      res.status(400).json({ message: "could not update the services" });
      return;
    }
    // const upService = await Service.findByPk(serviceid);
    res.status(200).json({ message: "service updated successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteService = async (req, res) => {
  const serviceid = req.params.id;
  try {
    const deletedServices = await Service.destroy({ where: { id: serviceid } });
    if (!deletedServices) {
      res.status(400).json({ message: "could not delete the service" });
      return;
    }
    res.status(200).json({ message: "service deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};
