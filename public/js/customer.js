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
      customerTableBody.innerHTML = "";
      data?.map((customer, i) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
              <td class="p-2">${i + 1}</td>
              <td>${customer.name}</td>
              <td>${customer.email}</td>
              <td>${customer.ph_number}</td>
              
              
              <td>
                  
                 <i class="fa-solid fa-eye text-blue-500 cursor-pointer"
              onclick='window.show_customer(${JSON.stringify(customer).replace(
                /'/g,
                "\\'"
              )})'></i>
                  <i class="fa-solid fa-trash text-red-500 cursor-pointer"
   onclick="window.delete_customer(${customer.id})"></i>
              </td>
          `;
        customerTableBody.appendChild(tr);
      });
    });
};
all_customer();

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
