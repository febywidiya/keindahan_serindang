// ==========================================
// GOOGLE APPS SCRIPT
// ==========================================

const API_URL =
    "https://script.google.com/macros/s/AKfycbyxixXPgm970xPYDTOuExKGCa5gfER8zlf8Nu1Wr40A1FdpWocxXQnSdf0PBg-U7V4N/exec";


// ==========================================
// SAAT HALAMAN SELESAI DIMUAT
// ==========================================

document.addEventListener("DOMContentLoaded", function () {


    // ==========================================
    // TOMBOL JELAJAHI DESA
    // ==========================================

    const exploreButton =
        document.querySelector(".hero .btn");

    if (exploreButton) {

        exploreButton.addEventListener("click", function () {

            console.log(
                "Selamat datang di Desa Serindang!"
            );

        });

    }


    // ==========================================
    // GALERI FOTO
    // ==========================================

    const galleryImages =
        document.querySelectorAll(".gallery-item img");

    galleryImages.forEach(function (image) {

        image.style.cursor = "pointer";

        image.addEventListener("click", function () {

            if (
                this.style.transform ===
                "scale(1.05)"
            ) {

                this.style.transform =
                    "scale(1)";

            } else {

                this.style.transform =
                    "scale(1.05)";

            }

        });

    });


    // ==========================================
    // FORM ADUAN DESA
    // ==========================================

    const aduanForm =
        document.getElementById("aduanForm");

    const aduanMessage =
        document.getElementById("aduanMessage");


    if (aduanForm) {

        aduanForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                const submitButton =
                    aduanForm.querySelector(
                        "button[type='submit']"
                    );


                submitButton.disabled = true;

                submitButton.textContent =
                    "Mengirim...";


                // ===============================
                // AMBIL DATA FORM
                // ===============================

                const nama =
                    document.getElementById("nama").value;

                const email =
                    document.getElementById("email").value;

                const kategori =
                    document.getElementById("kategori").value;

                const judul =
                    document.getElementById("judul").value;

                const deskripsi =
                    document.getElementById("deskripsi").value;


                // ===============================
                // DATA YANG DIKIRIM
                // ===============================

                const data = {

                    tabel: "Aduan",

                    action: "tambah",

                    id: Date.now(),

                    nama: nama,

                    email: email,

                    aduan:
                        "Kategori: " +
                        kategori +
                        " | Judul: " +
                        judul +
                        " | Isi: " +
                        deskripsi,

                    tanggal:
                        new Date().toLocaleString("id-ID")

                };


                // ===============================
                // KIRIM KE GOOGLE SHEETS
                // ===============================

                try {

                    await fetch(
                        API_URL,
                        {
                            method: "POST",

                            mode: "no-cors",

                            body:
                                JSON.stringify(data)
                        }
                    );


                    // ===============================
                    // PESAN BERHASIL
                    // ===============================

                    if (aduanMessage) {

                        aduanMessage.textContent =
                            "Aduan berhasil dikirim. Terima kasih sudah menyampaikan laporan.";

                        aduanMessage.style.color =
                            "#315b45";

                    }


                    // Kosongkan form

                    aduanForm.reset();


                } catch (error) {

                    console.error(
                        "Error:",
                        error
                    );


                    if (aduanMessage) {

                        aduanMessage.textContent =
                            "Aduan gagal dikirim. Silakan coba lagi.";

                        aduanMessage.style.color =
                            "#b33a3a";

                    }

                }


                // ===============================
                // KEMBALIKAN TOMBOL
                // ===============================

                submitButton.disabled =
                    false;

                submitButton.textContent =
                    "Kirim Aduan →";

            }
        );

    }

});
