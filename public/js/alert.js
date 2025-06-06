const success_alert = (message = "Login Successfull.", icon = "success") => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  Toast.fire({
    icon,
    title: message,
  });
};

const error_alert = (message = "Something went Wrong!") => {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: message,
  });
};

const confirmation = async (text = 'Logout') => {
    const result = await Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: text
    })

  return result.isConfirmed;
};

function editConfirmation(message = "Are you sure?") {
  return Swal.fire({
    title: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
    cancelButtonText: "Cancel",
  }).then((result) => result.isConfirmed);
}
export { success_alert, error_alert, confirmation, editConfirmation };
