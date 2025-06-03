import { success_alert, error_alert } from "./alert.js";

// Populate countries
async function setupCountryStateCityDropdowns() {
  const countrySelect = document.getElementById("country");
  const stateSelect = document.getElementById("state");
  const citySelect = document.getElementById("city");
  if (!countrySelect || !stateSelect || !citySelect) return;

  try {
    const res = await fetch("/api/getcountries");
    const countries = await res.json();
    countrySelect.innerHTML = `<option value="">Select...</option>`;
    countries.forEach((element) => {
      countrySelect.innerHTML += `<option value="${element.id}">${element.name}</option>`;
    });
  } catch {
    countrySelect.innerHTML = `<option value="">Error loading countries</option>`;
  }

  countrySelect.addEventListener("change", async (e) => {
    const country_id = e.target.value;
    if (!country_id) {
      stateSelect.innerHTML = `<option value="">Select...</option>`;
      citySelect.innerHTML = `<option value="">Select...</option>`;
      return;
    }
    try {
      const res = await fetch(`/api/getstates/${country_id}`);
      const states = await res.json();
      //   console.log(states);
      stateSelect.innerHTML = `<option value="">Select...</option>`;
      states.forEach((state) => {
        stateSelect.innerHTML += `<option value="${state.id}">${state.name}</option>`;
      });
      citySelect.innerHTML = `<option value="">Select...</option>`;
    } catch {
      stateSelect.innerHTML = `<option value="">Error loading states</option>`;
      citySelect.innerHTML = `<option value="">Error loading cities</option>`;
    }
  });

  stateSelect.addEventListener("change", async (e) => {
    const state_id = e.target.value;
    if (!state_id) {
      citySelect.innerHTML = `<option value="">Select...</option>`;
      return;
    }
    try {
      const res = await fetch(`/api/getcity/${state_id}`);
      const cities = await res.json();
      citySelect.innerHTML = `<option value="">Select...</option>`;
      cities.forEach((city) => {
        citySelect.innerHTML += `<option value="${city.id}">${city.name}</option>`;
      });
    } catch {
      citySelect.innerHTML = `<option value="">Error loading cities</option>`;
    }
  });
}

setupCountryStateCityDropdowns();

// Populate services
const populateServices = () => {
  const serviceSelect = document.getElementById("service");
  if (!serviceSelect) return;
  fetch("/service/getall")
    .then((res) => res.json())
    .then((services) => {
      serviceSelect.innerHTML = `<option value="">Select...</option>`;
      services.allServices.forEach((service) => {
        serviceSelect.innerHTML += `<option value="${service.id}">${service.name}</option>`;
      });
    })
    .catch(() => {
      serviceSelect.innerHTML = `<option value="">Error loading services</option>`;
    });
};

populateServices();

const addCustomerForm = document.getElementById("addCustomerForm");

addCustomerForm.onsubmit = async (e) => {
  e.preventDefault();
  const name = document.getElementById("fullname").value;
  const email = document.getElementById("email").value;
  const ph_number = document.getElementById("ph_number").value;
  const country_id = document.getElementById("country").value;
  const state_id = document.getElementById("state").value;
  const city_id = document.getElementById("city").value;
  const gender = document.querySelector('input[name="gender"]:checked')?.value;
  const address = document.getElementById("address_line").value;
  const service_id = document.getElementById("service").value;

  if (
    !name ||
    !email ||
    !ph_number ||
    !country_id ||
    !state_id ||
    !city_id ||
    !gender ||
    !address ||
    !service_id
  ) {
    error_alert("Please fill all the fields");
    return;
  }
  const newCustomer = {
    name,
    email,
    ph_number,
    country_id,
    state_id,
    city_id,
    gender,
    address,
    service_id,
  };
  try {
    const res = await fetch(`/customer/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCustomer),
    });
    const data = await res.json();
    // console.log(data);
    if (res.ok) {
      success_alert(data.message);
      //   console.log(data.message);
      addCustomerForm.reset();
    } else {
      error_alert(data.message);
      console.log(data.message);
    }
  } catch (error) {
    error_alert("Network error, please try again later");
  }
};
