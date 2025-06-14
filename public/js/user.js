import { confirmation, success_alert, error_alert } from "./alert.js"

const search = document.getElementById("search");
const userTableBody = document.getElementById("userTableBody");

search.addEventListener("keypress", async (e) => {

    // 13 => Enter

    if (e.keyCode === 13) {
        userTableBody.innerHTML = "";
        await all_user(search.value);
    }
})

search.addEventListener("keyup", async (e) => {
    if (search.value == "") {
        userTableBody.innerHTML = "";
        await all_user();
    }
})

window.delete_user = (user_id) => {
    confirmation("Delete")
    .then(res => {
        if (res) {
            console.log(user_id);
            fetch(`/user/delete_user?user_id=${user_id}`)
            .then(res => res.json())
            .then(data => {

                if (data.success / 100 >= 3) {
                    error_alert(data.message)
                    return
                }
                success_alert(data.message)

                setTimeout(() => {
                    window.location.href = "/user";
                }, 1000)
            });
        }
    });
}

window.update_user = (user_id) => {
    window.location.href = `/user/update_user?user_id=${user_id}`
}

const all_user = async (user_email = "") => {
    fetch(`/user/all_user${user_email ? `?user_email=${user_email}` : ""}`)
        .then(res => res.json())
        .then(users => {
            users?.map((user, i) => {
                const tr = document.createElement('tr');

                tr.innerHTML = `
                <td class="p-2">${i + 1}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.is_admin ? "Yes" : "No"}</td>
                <td>
                    <i class="fa-solid fa-pen-to-square text-blue-500 cursor-pointer hover:scale-125 mr-2" onclick="update_user('${user.id}')"></i>
                    ${window.user_id != user.id && user.is_admin ? `
                        <i class="fa-solid fa-trash text-red-500 cursor-pointer hover:scale-125" onclick="delete_user(${user.id})"></i>
                    ` : ""}
                </td>
            `
                userTableBody.appendChild(tr)
            })
        })
}
all_user();