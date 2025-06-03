import { success_alert, error_alert } from "./alert.js";

const addService = document.getElementById("addServiceForm");

addService.onsubmit = (e) => {
  e.preventDefault();
  const name = document.getElementById("ServiceName").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const validity = document.getElementById("validity").value;
  if (!name || !description || !price || !validity) {
    error_alert("please fill all the fields");
    return;
  }
  const newService = {
    name,
    description,
    price,
    validity,
  };
  fetch(`/service/create`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(newService),
  })
    .then((res) => res.json())
    .then((data) => {
      if (
        data.message &&
        data.message.toLowerCase().includes("service created successfully")
      ) {
        success_alert(data.message);
        addService.reset();
      } else {
        error_alert(
          data.message || "Something went wrong while creating the service."
        );
      }
    })
    .catch(() => {
      error_alert("failed to create service, please try again later.");
    });
};
