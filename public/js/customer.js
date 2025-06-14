import { editConfirmation, success_alert, error_alert } from "./alert.js";
const search = document.getElementById("search");
const customerTableBody = document.getElementById("customerTableBody");

search.addEventListener("keypress", async (e) => {
  // 13 => Enter

  if (e.keyCode === 13) {
    customerTableBody.innerHTML = "";
    await all_customer(search.value);
  }
});

search.addEventListener("keyup", async (e) => {
  if (search.value == "") {
    customerTableBody.innerHTML = "";
    await all_customer();
  }
});

window.delete_user = (id) => {
  console.log(id);
};

const all_customer = async (customerName = "") => {
  fetch(`/customer/getCustomerByName${customerName ? `?name=${customerName}` : ""}`)
    .then((res) => res.json())
    .then((data) => {

      if(data.success / 100 >= 3){
        customerTableBody.innerHTML = "No Customer Registered Yet.";
        return;
      }
      
      customerTableBody.innerHTML = "";

      const Customerpromise = data.map((customer, i) => {
        return getServices(customer.id).then((serviceData) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td class="p-2">${i+1}</td>
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.ph_number}</td>
            <td>${serviceData}</td>                 
            <td>
              <i 
                class="fa-solid fa-eye text-blue-500 cursor-pointer" 
                onclick='window.show_customer(${JSON.stringify(customer).replace(/'/g, "\\'")})'>
              </i>
              <i 
                class="fa-solid fa-pen-to-square text-blue-500 cursor-pointer" 
                onclick='window.edit_Customer(${JSON.stringify(customer)})'>
              </i>
              <i 
                class="fa-solid fa-trash text-red-500 cursor-pointer" 
                onclick="window.delete_customer(${customer.id})">
              </i>
            </td>
          `;
          return tr;
        });
      });
      Promise.all(Customerpromise)
        .then((trs) => {
          trs.forEach((tr) => {
            customerTableBody.appendChild(tr);
          });
        })
        .catch((err) => {
          console.log("error fetching customers", err);
        });
    })
    .catch((err) => {
      console.log("error fetching customers", err);
      customerTableBody.innerHTML = `<tr><td colspan="6" class="text-center">Error fetching customers</td></tr>`;
    });
};
all_customer();

const editModal = document.getElementById("editCustomerModal");
const cancelModal = document.getElementById("closeEditCustomerModal");

cancelModal.onclick = () => {
  editModal.classList.add("hidden");
};

window.edit_Customer = (customer) => {
  document.getElementById("edit_name").value = customer.name;
  document.getElementById("edit_ph_number").value = customer.ph_number;
  document.getElementById("edit_address").value = customer.address;
  document.getElementById("edit_customer_id").value = customer.id;
  editModal.classList.remove("hidden");
};
editCustomerForm.onsubmit = (e) => {
  e.preventDefault();
  editConfirmation("Are you sure you want to edit this customer?").then(
    (res) => {
      if (res) {
        try {
          const customer_id = document.getElementById("edit_customer_id").value;
          const data = {
            name: document.getElementById("edit_name").value,
            ph_number: document.getElementById("edit_ph_number").value,
            address: document.getElementById("edit_address").value,
          };
          fetch(`/customer/edit_customer/${customer_id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((res) => res.json())
            .then((cust) => {
              if (cust.message) {
                editModal.classList.add("hidden");
                all_customer();
                success_alert(cust.message);
              } else {
                error_alert(
                  "something went wrong during editing the customer."
                );
              }
            });
        } catch (error) {
          error_alert("server error");
        }
      }
    }
  );
};

const getServices = (customer_id) => {
  return fetch(`/customer/getservices/${customer_id}`)
    .then((res) => res.json())
    .then((data) => {
      if(data.success / 100 >= 3){
        return "No service yet.";
      }
      
      if (data.length > 0) {
        return data.map((service) => service.name).join(", ");
      } else {
        return "No services";
      }
    })
    .catch((err) => {
      console.log(err);
      return "No service";
    });
};

//show the whole detail of the customer
window.show_customer = async (customer) => {
  let countryName = customer.country_id;
  let stateName = customer.state_id;
  let cityName = customer.city_id;

  try {
    const countryRes = await fetch(`/api/getcountry/${customer.country_id}`);
    if (countryRes.ok) {
      const country = await countryRes.json();
      console.log(country);
      countryName = country[0]?.name || countryName;
    }
    const stateRes = await fetch(`/api/getstate/${customer.state_id}`);
    if (stateRes.ok) {
      const state = await stateRes.json();
      console.log(state);
      stateName = state[0]?.name || stateName;
    }
    const cityRes = await fetch(`/api/get/city/${customer.city_id}`);
    if (cityRes.ok) {
      const city = await cityRes.json();
      console.log(city);
      cityName = city[0]?.name || cityName;
    }
  } catch (err) {
    // Optionally log error or show a message
    console.error("Error fetching location names:", err);
  }
  console.log(countryName, stateName, cityName);
  const detailhtml = `
    <p><strong>Name:</strong> ${customer.name}</p>
    <p><strong>Email:</strong> ${customer.email}</p>
    <p><strong>Gender:</strong> ${customer.gender}</p>
    <p><strong>Address:</strong> ${customer.address}</p>
    <p><strong>Phone Number:</strong> ${customer.ph_number}</p>
    <p><strong>Country:</strong> ${countryName}</p>
    <p><strong>State:</strong> ${stateName}</p>
    <p><strong>City:</strong> ${cityName}</p>
    <p><strong>User ID:</strong> ${customer.user_id}</p>
  `;

  document.getElementById("customerDetailContent").innerHTML = detailhtml;
  document.getElementById("customerDetailModal").classList.remove("hidden");
};

document.getElementById("closeCustomerDetailModal").onclick = () => {
  document.getElementById("customerDetailModal").classList.add("hidden");
};
// delete the customer

window.delete_customer = async (id) => {
  editConfirmation("Are you sure you want to delete this customer?").then(
    async (res) => {
      if (res) {
        try {
          const response = await fetch(`/customer/deletecustomer/${id}`, {
            method: "DELETE",
          });
          if (response.ok) {
            success_alert("Customer deleted successfully");
            all_customer();
          } else {
            error_alert("Failed to delete customer");
          }
        } catch (error) {
          error_alert("Error deleting customer: " + error.message);
        }
      }
    }
  );
};
