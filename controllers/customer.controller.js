import Customer from '../models/customer.model.js'
import { async_handler } from '../utils/async_handler.js';

const addCustomer = async_handler( async (req, res) => {
  try {
  const { name, email, ph_number, country_id, state_id, city_id, user_id } = req.body;



    const customer = await Customer.create({
      name,
      email,
      ph_number,
      country_id,
      state_id,
      city_id,
      user_id,
    });
    
    if (!customer) {
      res.status(400).json({ message: "fail to insert the user" });
      return;
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

const getAllCustomer = async_handler (async (req, res) => {
  try {
    const customers = await Customer.findAll();
    if (!customers) {
      res.status(400).json({ message: "customer not available" });
    }
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

const getCustomerById = async_handler (async(req,res)=>{
  try {
  const customerid=req.params.id;
    const customer=await Customer.findAll({where:{id:customerid}});
    if(!customer){
      res.status(400).json("not found");
      return;
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).send(error)
  }
})

const updateCustomer = async_handler (async (req, res) => {
  try {
  const  customerid  = req.params.id; 
  const updateData = req.body;
    const [updated] = await Customer.update(updateData, { where: { id:customerid } });
    if (!updated) {
      return res.status(404).json({ message: "Customer not found or no changes made" });
    }
    const updatedCustomer = await Customer.findByPk(customerid);
    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const deleteCustomer = async_handler (async (req, res) => {
  try {
    const customerid = req.params.id;
    const deleted = await Customer.destroy({ where: { id: customerid } });
    if (!deleted) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export { addCustomer, getAllCustomer, getCustomerById, updateCustomer, deleteCustomer }


