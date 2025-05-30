const error_alert = (message = "Something went Wrong!") => {
    Swal.fire({
        icon: "error",
        title: "Error",
        text: message
    });
}

export { error_alert };