document.addEventListener("DOMContentLoaded", function () {

    const exploreButton = document.querySelector(".hero .btn");

    if (exploreButton) {
        exploreButton.addEventListener("click", function () {
            console.log("Selamat datang di Desa Serindang!");
        });
    }

    const galleryImages = document.querySelectorAll(".gallery-item img");

    galleryImages.forEach(function (image) {

        image.addEventListener("click", function () {

            if (this.style.transform === "scale(1.05)") {
                this.style.transform = "scale(1)";
            } else {
                this.style.transform = "scale(1.05)";
            }

        });

    });

});