const my_form = document.getElementById('myForm');
const otp_row = document.getElementById('otp_row');
const email_field = document.getElementById('email');
const otp_field = document.getElementById('otp');
const submit_btn = document.getElementById('submit_btn');
const password_tray = document.getElementById('password_tray');
const password = document.getElementById('password');
const c_password = document.getElementById('c_password');

password.addEventListener("keypress", () => {
    c_password.value = "";
    error_msg.innerHTML = "";
})

// check both password are matching
c_password.addEventListener("keyup", () => {
    const password = document.getElementById("password");
    const c_password = document.getElementById("c_password");

    if (password.value !== c_password.value) {
        error_msg.innerHTML = "*** confirm password is not matching";
        return;
    }
    error_msg.innerHTML = "";
})

let is_otp_send = false;
submit_btn.addEventListener("click", async () => {

    if (submit_btn.type !== "submit") {

        if (!is_otp_send) {
            is_otp_send = true;
            const email = email_field.value;
            const res = await get_otp({ email: email });

            if (res.success === 200) {
                otp_row.classList.remove("hidden");
                otp_row.classList.add("flex");

                email_field.setAttribute("readOnly", true);
                submit_btn.innerText = "Check OTP";
            }

        } else {
            const email = email_field.value;
            const otp = otp_field.value;

            const res = await get_otp({ email: email, otp: otp });

            if (res.success === 200) {
                otp_row.classList.remove("flex");
                otp_row.classList.add("hidden");

                password_tray.classList.remove("hidden");
                password_tray.classList.add("flex");

                otp_field.disabled = true;

                submit_btn.innerText = "Submit";

                submit_btn.type = "submit";
            }
        }
        console.log("click");
    }
});

my_form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log(email, password);

    fetch(`/auth/reset_password`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);

        if(data.success === 200){
            window.location.href = "/auth/login";
        }
    });

    console.log("submit");
});

const get_otp = async (data) => {
    try {
        const res = await fetch("/auth/forgot_password", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await res.json();

    } catch (error) {
        console.log(error);

    };
};