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


    // FORM ADUAN
    const ADUAN_SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbzROGv2ZQEvoxUoHd57DLXNNBZoqdY2sZ93XTLyyTkB-FxP0Y6ymRmu1b9IqsqCSKRo2w/exec";

    const aduanForm = document.getElementById("aduanForm");
    const aduanMessage = document.getElementById("aduanMessage");

    if (aduanForm) {
        aduanForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const submitButton = aduanForm.querySelector(
                "button[type='submit']"
            );

            submitButton.disabled = true;
            submitButton.textContent = "Mengirim...";

            const formData = new FormData(aduanForm);

            try {
                await fetch(ADUAN_SCRIPT_URL, {
                    method: "POST",
                    mode: "no-cors",
                    body: new URLSearchParams(formData)
                });

                aduanMessage.textContent =
                    "Aduan berhasil dikirim. Terima kasih sudah menyampaikan laporan.";

                aduanMessage.style.color = "#315b45";

                aduanForm.reset();

            } catch (error) {
                aduanMessage.textContent =
                    "Aduan gagal dikirim. Silakan coba lagi.";

                aduanMessage.style.color = "#b33a3a";

                console.error("Error:", error);

            } finally {
                submitButton.disabled = false;
                submitButton.textContent = "Kirim Aduan →";
            }
        });
    }

});
