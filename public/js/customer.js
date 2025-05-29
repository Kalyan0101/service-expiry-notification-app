const search = document.getElementById("search");
const userTableBody = document.getElementById("userTableBody");

search.addEventListener("keypress", async(e) => {

    // 13 => Enter

    if (e.keyCode === 13) {
        userTableBody.innerHTML = "";
        await all_customer(search.value);
    }
})

search.addEventListener("keyup", async (e) => {
    if(search.value == ""){
        userTableBody.innerHTML = "";
        await all_customer();
    }
})

window.delete_user = (id) => {

    console.log(id);
    
}

const all_customer = async (user_email = "") => {

    fetch(`/all_user${user_email ? `?user_email=${user_email}` : ""}`)
    .then(res => res.json())
    .then(data => {
        data.users?.map((user, i) => {
            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td class="p-2">${i+1}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>Admin</td>
                <td>
                    <i class="fa-solid fa-pen-to-square text-blue-500"></i>
                    <i class="fa-solid fa-trash text-red-500 cursor-pointer" onclick="delete_user(${user.id})"></i>
                </td>
            `
            userTableBody.appendChild(tr)
        })
    })
}
// all_customer()