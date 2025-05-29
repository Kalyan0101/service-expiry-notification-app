const search = document.getElementById("search");
const userTableBody = document.getElementById("userTableBody");

search.addEventListener("keypress", async(e) => {

    // 13 => Enter

    if (e.keyCode === 13) {
        userTableBody.innerHTML = "";
        await all_user(search.value);
    }
})

search.addEventListener("keyup", async (e) => {
    if(search.value == ""){
        userTableBody.innerHTML = "";
        await all_user();
    }
})

window.delete_user = (id) => {

    console.log(id);
    
}

window.update_user = ( email ) => {

    console.log(email);

}

const all_user = async (user_email = "") => {

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
                    <i class="fa-solid fa-pen-to-square text-blue-500" onclick="update_user('${user.email}')"></i>
                    <i class="fa-solid fa-trash text-red-500 cursor-pointer" onclick="delete_user(${user.id})"></i>
                </td>
            `
            userTableBody.appendChild(tr)
        })
    })
}
all_user()