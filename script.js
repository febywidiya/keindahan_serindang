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


    // DATABASE GOOGLE SHEETS
    const API_URL = "https://script.google.com/macros/s/AKfycbz1q21wg5wWgY_Lsxtu0YyEdJv9Ir2QhBHHl33iZHaQ_i5CuqGYwhRSLQ7qY9h7VRGK3g/exec";

    fetch(API_URL)
        .then(response => response.json())
        .then(data => {

            console.log("Data berhasil:", data);

            const container = document.getElementById("data-container");

            container.innerHTML = "";

            data.forEach(function (item) {

                const card = document.createElement("div");

                card.className = "card";

                card.innerHTML = `
                    <span>🌿</span>
                    <h3>${item.nama}</h3>
                    <p><strong>${item.kategori}</strong></p>
                    <p>${item.deskripsi}</p>
                `;

                container.appendChild(card);

            });

        })
        .catch(error => {

            console.error("Gagal mengambil data:", error);

            document.getElementById("data-container").innerHTML =
                "<p>Data gagal dimuat.</p>";

        });

});
