document.addEventListener("DOMContentLoaded", function () {
    const editProfileBtn = document.getElementById("edit-profile-btn");
    const editProfileForm = document.querySelector(".edit-profile-form");

    if (editProfileBtn && editProfileForm) {
        editProfileBtn.addEventListener("click", function () {
            editProfileForm.classList.toggle("hidden");
        });
    }
});
