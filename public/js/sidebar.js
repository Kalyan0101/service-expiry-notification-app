import { success_alert, error_alert, confirmation } from "./alert.js"

const logout_btn = document.getElementById("logout");

logout_btn.addEventListener("click", async () => {

    confirmation()
    .then((res) => {
        
        if(res){
            fetch("/auth/logout",{
                credentials: "include"
            })
            .then(data => data.json())
            .then(() => {
                window.location.href = "/auth/login"
            })
        }
    })
})