import { editConfirmation, success_alert, error_alert } from "./alert.js";
const serviceTableBody = document.getElementById("serviceTableBody");
const editModal = document.getElementById("editModal");
const editForm = document.getElementById("editServiceForm");

const all_Services = () => {
  fetch(`/service/getall`)
    .then((res) => res.json())
    .then((data) => {
      serviceTableBody.innerHTML = ""; // Clear previous rows
      data.allServices?.map((service, i) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td class="p-2">${i + 1}</td>
          <td>${service.name}</td>
          <td>${service.description}</td>
          <td>${service.price}</td>
          <td>${service.validity}</td>
          <td>${service.user_id}</td>
          <td>
            <i class="fa-solid fa-pen-to-square text-blue-500 cursor-pointer"
               onclick='window.edit_service(${JSON.stringify(service)})'></i>
               <i class="fa-solid fa-trash text-red-500 cursor-pointer"
               onclick="window.delete_service(${service.id})"></i>
           
          </td>
        `;
        serviceTableBody.appendChild(tr);
      });
    });
};
all_Services();
window.edit_service = (service) => {
  editConfirmation("do you want to edit this service?").then((res) => {
    if (res) {
      document.getElementById("edit_id").value = service.id;
      document.getElementById("edit_name").value = service.name;
      document.getElementById("edit_description").value = service.description;
      document.getElementById("edit_price").value = service.price;
      document.getElementById("edit_validity").value = service.validity;
      document.getElementById("edit_user_id").value = service.user_id;
      editModal.classList.remove("hidden");
    }
  });
};

document.getElementById("closeEditModal").onclick = () => {
  editModal.classList.add("hidden");
};

document.getElementById("editModalCloseBtn").onclick = () => {
  editModal.classList.add("hidden");
};

//editing the srvice

editForm.onsubmit = (e) => {
  e.preventDefault();
  editConfirmation("Are you sure you want to edit this service?").then(
    (res) => {
      if (res) {
        const id = document.getElementById("edit_id").value;
        const updatedService = {
          name: document.getElementById("edit_name").value,
          description: document.getElementById("edit_description").value,
          price: document.getElementById("edit_price").value,
          validity: document.getElementById("edit_validity").value,
          user_id: document.getElementById("edit_user_id").value,
        };
        fetch(`/service/update/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedService),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.message) {
              editModal.classList.add("hidden");
              all_Services();
              success_alert(data.message);
            } else {
              error_alert("Something went wrong while updating the service.");
            }
          });
      }
    }
  );
};

window.delete_service = (id) => {
  editConfirmation("Are you sure you want to delete this service?").then(
    (res) => {
      if (res) {
        fetch(`/service/delete/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.message) {
              success_alert(data.message);
              all_Services();
            } else {
              error_alert("Something went wrong while deleting the service.");
            }
          });
      }
    }
  );
};
