import db_object from "./db.config.js";
import "../models/associations.js";

const db_connect = async() => {
    try {
        await db_object.authenticate();
        const sync = await db_object.sync({ alter: true });

        // console.log(`\n\nsync: ${ JSON.stringify(sync) }`);
        
    } catch (error) {
        console.log(`connect: ${error}`);
    }
}

export default db_connect;