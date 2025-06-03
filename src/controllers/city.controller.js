import City from "../models/city.model.js";

export const createCity = async (req, res) => {
  const cities = req.body;
  try {
    const createdCities = await City.bulkCreate(cities);
    if (!createCity || createdCities.length === 0) {
      res.status(400).json("city not created");
    }
    res.status(200).json(createdCities);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getCitiesByState = async (req, res) => {
  const stateid = req.params.id;
  try {
    const cities = await City.findAll({ where: { state_id: stateid } });
    if (!cities || cities.length === 0) {
      return res
        .status(404)
        .json({ message: "No cities found for this state" });
    }
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getCitiesById = async (req, res) => {
  const Id = req.params.id;
  try {
    const cities = await City.findAll({ where: { id: Id } });
    if (!cities || cities.length === 0) {
      return res
        .status(404)
        .json({ message: "No cities found for this state" });
    }
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
