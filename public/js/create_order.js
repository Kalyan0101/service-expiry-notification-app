import { error_alert, success_alert } from "./alert.js";

const customer = document.getElementById("customer");
const add_service_btn = document.getElementById("add-service-btn");
const my_form = document.getElementById("my_form");


// all customer
; (() => {
    fetch(`/customer/getCustomerByName`)
        .then(res => res.json())
        .then((data) => {

            if (data.success / 100 >= 3) {
                success_alert("No customer Found\nRedirect to customer page", "error");

                setTimeout(() => {
                    window.location.href = "/customer";
                }, 2000)

                return;
            }

            data?.map(item => {
                const option = document.createElement("option");
                option.setAttribute("value", item.id);
                option.setAttribute("data-email", item.email);
                option.innerText = item.name;

                customer.appendChild(option);
            })
        })
})();

customer.addEventListener("change", function () {
    const selectedOption = this.options[this.selectedIndex]
    const email = selectedOption.getAttribute("data-email")

    document.getElementById("email").value = email;
});

let serviceRowCounter = 0
add_service_btn.addEventListener("click", () => {

    serviceRowCounter++;

    const template = document.getElementById("service-template").firstElementChild.cloneNode(true);
    const select = template.querySelector(".service");
    select.setAttribute("name", `service_${serviceRowCounter}`);

    fetch(`/service/getall`)
    .then(res => res.json())
    .then(data => {

        if (data.success / 100 >= 3) {
            success_alert("No service registered yet.\nRedirect to service page.", "error");
            setTimeout(() => {
                window.location.href = "/service";
            }, 2000)
        }

        data.map(item => {
            const option = document.createElement("option");
            option.setAttribute("value", item.id);
            option.setAttribute("data-price", item.price);
            option.setAttribute("data-validity", item.validity);
            option.innerText = item.name;

            select.appendChild(option);
        });
    });

    select.addEventListener("change", function () {

        const selectedOption = this.options[this.selectedIndex]
        const validity = selectedOption.getAttribute("data-validity");
        const price = selectedOption.getAttribute("data-price");

        const inputs = template.querySelectorAll("input");

        inputs[0].value = validity;
        inputs[1].value = price;
    })

    document.getElementById("service-container").appendChild(template);
})

my_form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(my_form);


    let values = [];
    let isDuplicate = false;

    for(const [key, value] of formData){

        if(!key.startsWith("service_")) continue;

        if(values.includes(value)){
            isDuplicate = true;
            break;
        }
        values.push(value);        
    }

    if(isDuplicate){
        error_alert("Can't choose same service multiple times!!!");
        document.getElementById("service-container").innerHTML = "";
        return;
    }

    fetch(`/order/create_order`, {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);

        if (data.success / 100 >= 3) {
            error_alert(data.message);
            return
        }

        success_alert(data.message)

        window.location.href = "/order";
    })
})