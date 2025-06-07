import State from "../models/state.model.js";

//controller for creating multiple satates
export const createState = async (req, res) => {
  const states = req.body;
  try {
    const createdStates = await State.bulkCreate(states);
    if (!createdStates) {
      res.status(400).json({ message: "states not created" });
      return;
    }
    res.status(200).json(createdStates);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
//controller for get  state by id
export const getStates = async (req, res) => {
  const countryid = req.params.countryid;
  try {
    const states = await State.findAll({ where: { country_id: countryid } });
    if (!states || states.length === 0) {
      res.status(400).json({ message: "fail to get the states" });
      return;
    }
    res.status(200).json(states);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
export const getStatesById = async (req, res) => {
  const id = req.params.id;
  try {
    const states = await State.findAll({ where: { id: id } });
    if (!states || states.length === 0) {
      res.status(400).json({ message: "fail to get the states" });
      return;
    }
    res.status(200).json(states);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
