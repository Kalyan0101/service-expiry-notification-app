import { error_alert, success_alert } from './alert.js'

const form = document.getElementById("my_form");
const error_msg = document.getElementById("error_msg");

// check both password are matching
c_password.addEventListener("keyup", () => {    
    const password = document.getElementById("password");
    const c_password = document.getElementById("c_password");

    if(password.value !== c_password.value){
        error_msg.innerHTML = "*** confirm password is not matching";
        return;
    }
    error_msg.innerHTML = "";
})

// update user details
form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const form_data = new FormData(form);

    fetch(`/user/update_user`, {
        method: "POST",
        body: form_data,        
    })
    .then(res => res.json())
    .then(data => {       

        if(data.success / 100 >= 3){
            error_alert(data.message)
            return
        }
        success_alert(data.message)

        setTimeout(() => {
            window.location.href = "/user";
        }, 1000)
    });
});