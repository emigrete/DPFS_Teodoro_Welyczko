document.addEventListener("DOMContentLoaded", function () {
    const description = document.querySelector(".description");
    const viewMoreBtn = document.querySelector(".view-more-btn");

    if (description && viewMoreBtn) {
        viewMoreBtn.addEventListener("click", function () {
            description.classList.toggle("expanded");
            if (description.classList.contains("expanded")) {
                viewMoreBtn.textContent = "Ver menos";
            } else {
                viewMoreBtn.textContent = "Ver más";
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const decreaseBtn = document.querySelector(".decrease");
    const increaseBtn = document.querySelector(".increase");
    const quantityInput = document.querySelector("input[name='quantity']");

    decreaseBtn.addEventListener("click", () => {
        if (quantityInput.value > 1) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
        }
    });

    increaseBtn.addEventListener("click", () => {
        quantityInput.value = parseInt(quantityInput.value) + 1;
    });
});

