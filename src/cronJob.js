import cron from "node-cron";
import Order from "./models/order.model.js";
import Service from "./models/service.model.js";
import Customer from "./models/customer.model.js";

import sendMAil from "./utils/send_mail.js";

cron.schedule("0 12 * * *", async () => {
  try {
    const today = new Date();
    const orders = await Order.findAll({
      include: [
        {
          model: Service,
          through: { attributes: [] },
        },
        {
          model: Customer,
        },
      ],
    });
    for (let order of orders) {
      for (let service of order.Services) {
        const expiryDate = new Date(order.purchase_date);
        expiryDate.setDate(expiryDate.getDate() + service.validity);

        const daysLeft = Math.ceil(
          (expiryDate - today) / (1000 * 60 * 60 * 24)
        );

        if ([3, 2, 1].includes(daysLeft)) {
          await sendMAil(
            order.Customer.email,
            service.name,
            expiryDate.toISOString().slice(0, 10),
            daysLeft
          );
        }
      }
    }
  } catch (error) {
    console.log("cron error", error);
  }
});
