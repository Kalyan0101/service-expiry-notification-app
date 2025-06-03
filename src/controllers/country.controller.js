import Country from "../models/country.model.js";

export const createCountry = async (req, res) => {
  const contries = req.body;
  try {
    const country_name = await Country.bulkCreate(contries);
    if (!country_name) {
      res.status(400).json({ message: "fail to create countries" });
      return;
    }
    res.status(200).json(country_name);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
export const getAllCountry = async (req, res) => {
  try {
    const countries = await Country.findAll();
    if (!countries) {
      res.status(400).json({ message: "fail to get the countries" });
      return;
    }
    res.status(200).json(countries);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getCountryById = async (req, res) => {
  const id = req.params.id;
  try {
    const country = await Country.findAll({ where: { id: id } });
    if (!country) {
      res.status(400).json({ message: "fail to get the country" });
      return;
    }
    res.status(200).json(country);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
