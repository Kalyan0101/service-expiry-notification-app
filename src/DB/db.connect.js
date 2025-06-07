import { db_object } from "./index.js";
import "../models/associations.js";

const db_connect = async () => {
  try {
    await db_object.authenticate();
    // await db_object.sync({ force: true });

  } catch (error) {
    console.log(`connection Error: ${error}`);
  }
};

export default db_connect;
