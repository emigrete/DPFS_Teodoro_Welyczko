document.addEventListener("DOMContentLoaded", function() {
    let navbar = document.getElementById("navbar");

    window.addEventListener("scroll", function() {
        if (window.scrollY > 150) {  // Cuando bajas 150px
            navbar.classList.add("sticky");
        } else {
            navbar.classList.remove("sticky");
        }
    });
});
