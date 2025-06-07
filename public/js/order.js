import { confirmation } from "./alert.js";

const search = document.getElementById("search");
const userTableBody = document.getElementById("orderTableBody");

search.addEventListener("keypress", async (e) => {

    // 13 => Enter

    if (e.keyCode === 13) {
        userTableBody.innerHTML = "";
        await all_order(search.value);  
    }
})

search.addEventListener("keyup", async () => {
    if (search.value == "") {
        userTableBody.innerHTML = "";
        await all_order();
    }
})

window.delete_order = (order_id) => {
    confirmation("Delete")
    .then(res => {
        if (res) {
            fetch(`/order/delete_order?order_id=${order_id}`)
            .then(res => res.json())
            .then(data => {
                window.location.reload();
            })
        }
    });
}

window.update_order = (email) => {
    console.log(email);
}

// all orders
const all_order = async (idORnumber = "") => {
    fetch(`/order/all_order${idORnumber ? `?idORnumber=${encodeURIComponent(idORnumber)}` : "" }`)
    .then(res => res.json())
    .then(data => {

        if(data?.length === 0){
            userTableBody.innerHTML = "<strong>No order found!</strong>"
        }

        data?.map((order, i) => {

            const date = new Date(order.purchase_date);
            const { Services } = order;

            let service_name = "";
            let service_validity = "";

            Services.map(service => {
                service_name += `${service.name}, `;
                service_validity += `${service.validity}, `;
            });

            const tr = document.createElement('tr');
            tr.innerHTML = `
            <td class="p-2">#${order.id}</td>
            <td>${order.Customer?.name}</td>
            <td>${order.Customer?.ph_number}</td>
            <td>${date.toLocaleString("en-IN", { dateStyle: "long", timeStyle: "short" })}</td>
            <td>${service_name}</td>
            <td>${order.User?.name}</td>
            <td>${service_validity}</td>
            <td>
                <i class="fa-solid fa-pen-to-square text-blue-500 cursor-pointer hover:scale-125" onclick="update_order('${order.email}')"></i>
                <i class="fa-solid fa-trash text-red-500 cursor-pointer ml-5 hover:scale-125" onclick="delete_order(${order.id})"></i>
            </td>`;
            userTableBody.appendChild(tr);
        });
    });
};
all_order();