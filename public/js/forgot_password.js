const my_form = document.getElementById('myForm');
const otp_field = document.getElementById('otp_field');
const email = document.getElementById('email');
const submit_btn = document.getElementById('submit_btn');


let is_otp_send = false;

my_form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const form_data = new FormData(my_form);
    const form_data_object = Object.fromEntries(form_data.entries());

    const data = await get_otp(form_data_object);

    otp_field.style.display = "flex"
    email.setAttribute("disabled", true);
    submit_btn.innerHTML = "Check OTP";
    
    console.log(data);
    
})

const get_otp = async (data) => {
    try {
        const res = await fetch("/auth/forgot_password", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })

        return await res.json();

    } catch (error) {
        console.log(error);       
        
    }
}