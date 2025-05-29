const success_alert = (message = "Login Successfull.") => {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({
        icon: "success",
        title: message
    });
}

const error_alert = (message = "Something went Wrong!") => {
    Swal.fire({
        icon: "error",
        title: "Error",
        text: message
    });
}

const confirmation = async () => {
    const result = await Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Logout"
    })

    return result.isConfirmed;
}

export { success_alert, error_alert, confirmation };