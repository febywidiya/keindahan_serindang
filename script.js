const API_URL = "https://script.google.com/macros/s/AKfycbyxixXPgm970xPYDTOuExKGCa5gfER8zlf8Nu1Wr40A1FdpWocxXQnSdf0PBg-U7V4N/exec";

document.addEventListener("DOMContentLoaded", function () {

    // ===============================
    // TOMBOL JELAJAHI DESA
    // ===============================

    const exploreButton =
        document.querySelector(".hero .btn");

    if (exploreButton) {
        exploreButton.addEventListener("click", function () {
            console.log("Selamat datang di Desa Serindang!");
        });
    }


    // ===============================
    // GALERI FOTO
    // ===============================

    const galleryImages =
        document.querySelectorAll(".gallery-item img");

    galleryImages.forEach(function (image) {

        image.style.cursor = "pointer";

        image.addEventListener("click", function () {

            if (this.style.transform === "scale(1.05)") {
                this.style.transform = "scale(1)";
            } else {
                this.style.transform = "scale(1.05)";
            }

        });

    });


    // ===============================
    // FORM ADUAN DESA
    // ===============================

    const aduanForm =
        document.getElementById("aduanForm");

    const aduanMessage =
        document.getElementById("aduanMessage");

    if (aduanForm) {

        aduanForm.addEventListener("submit", async function (event) {

            event.preventDefault();

            const submitButton =
                aduanForm.querySelector(
                    "button[type='submit']"
                );

            submitButton.disabled = true;
            submitButton.textContent = "Mengirim...";

            const formData =
                new FormData(aduanForm);

            const data = {

                tabel: "Aduan",

                action: "tambah",

                id: Date.now(),

                nama:
                    formData.get("nama") || "",

                email:
                    formData.get("email") || "",

                aduan:
                    formData.get("aduan") || "",

                tanggal:
                    new Date().toLocaleString("id-ID")

            };


            try {

                await fetch(API_URL, {

                    method: "POST",

                    mode: "no-cors",

                    body: JSON.stringify(data)

                });


                aduanMessage.textContent =
                    "Aduan berhasil dikirim. Terima kasih sudah menyampaikan laporan.";

                aduanMessage.style.color =
                    "#315b45";

                aduanForm.reset();


            } catch (error) {

                console.error("Error:", error);

                aduanMessage.textContent =
                    "Aduan gagal dikirim. Silakan coba lagi.";

                aduanMessage.style.color =
                    "#b33a3a";

            } finally {

                submitButton.disabled = false;

                submitButton.textContent =
                    "Kirim Aduan →";

            }

        });

    }


    // ===============================
    // ADMIN DATA
    // ===============================

    if (document.getElementById("dataTable")) {
        loadData();
    }

    if (document.getElementById("aduanTable")) {
        loadAduan();
    }

});


// ===============================
// LOAD DATA
// ===============================

async function loadData() {

    const dataTable =
        document.getElementById("dataTable");

    if (!dataTable) return;

    try {

        const response =
            await fetch(API_URL);

        const data =
            await response.json();

        dataTable.innerHTML = "";

        data.forEach(function (item) {

            const row =
                document.createElement("tr");

            row.innerHTML = `

                <td>${item.id || ""}</td>

                <td>${item.nama || ""}</td>

                <td>${item.kategori || ""}</td>

                <td>${item.deskripsi || ""}</td>

                <td>
                    ${
                        item.gambar
                        ? `<img src="${item.gambar}"
                                class="gambar-preview"
                                width="80">`
                        : "-"
                    }
                </td>

                <td>

                    <button
                        class="admin-btn btn-edit"
                        onclick="editData('${item.id}')">

                        Edit

                    </button>

                    <button
                        class="admin-btn btn-hapus"
                        onclick="hapusData('${item.id}')">

                        Hapus

                    </button>

                </td>

            `;

            dataTable.appendChild(row);

        });

    } catch (error) {

        console.error(error);

        dataTable.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center;">
                    Gagal mengambil data.
                </td>
            </tr>
        `;

    }

}


// ===============================
// TAMBAH / EDIT DATA
// ===============================

let sedangEdit = false;

const dataForm =
    document.getElementById("dataForm");

if (dataForm) {

    dataForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const data = {

            tabel: "Data",

            action:
                sedangEdit
                ? "edit"
                : "tambah",

            id:
                document.getElementById("id").value,

            nama:
                document.getElementById("nama").value,

            kategori:
                document.getElementById("kategori").value,

            deskripsi:
                document.getElementById("deskripsi").value,

            gambar:
                document.getElementById("gambar").value

        };


        try {

            await fetch(API_URL, {

                method: "POST",

                mode: "no-cors",

                body: JSON.stringify(data)

            });


            alert(
                sedangEdit
                ? "Data berhasil diubah!"
                : "Data berhasil ditambahkan!"
            );


            dataForm.reset();

            sedangEdit = false;

            document.getElementById("formTitle").textContent =
                "Tambah Data";

            document.getElementById("submitBtn").textContent =
                "+ Tambah Data";

            document.getElementById("cancelBtn").style.display =
                "none";


            setTimeout(loadData, 1000);


        } catch (error) {

            console.error(error);

            alert("Gagal menyimpan data.");

        }

    });

}


// ===============================
// EDIT DATA
// ===============================

async function editData(id) {

    const response =
        await fetch(API_URL);

    const data =
        await response.json();

    const item =
        data.find(function (x) {
            return String(x.id) === String(id);
        });


    if (!item) {

        alert("Data tidak ditemukan.");

        return;

    }


    document.getElementById("id").value =
        item.id;

    document.getElementById("nama").value =
        item.nama;

    document.getElementById("kategori").value =
        item.kategori;

    document.getElementById("deskripsi").value =
        item.deskripsi;

    document.getElementById("gambar").value =
        item.gambar || "";


    sedangEdit = true;


    document.getElementById("formTitle").textContent =
        "Edit Data";

    document.getElementById("submitBtn").textContent =
        "Simpan Perubahan";

    document.getElementById("cancelBtn").style.display =
        "inline-block";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ===============================
// HAPUS DATA
// ===============================

async function hapusData(id) {

    const yakin =
        confirm(
            "Apakah kamu yakin ingin menghapus data ID " +
            id +
            "?"
        );


    if (!yakin) return;


    try {

        await fetch(API_URL, {

            method: "POST",

            mode: "no-cors",

            body: JSON.stringify({

                tabel: "Data",

                action: "hapus",

                id: id

            })

        });


        alert("Data berhasil dihapus!");

        setTimeout(loadData, 1000);


    } catch (error) {

        console.error(error);

        alert("Gagal menghapus data.");

    }

}


// ===============================
// LOAD ADUAN
// ===============================

async function loadAduan() {

    const aduanTable =
        document.getElementById("aduanTable");

    if (!aduanTable) return;


    try {

        const response =
            await fetch(
                API_URL + "?sheet=Aduan"
            );

        const data =
            await response.json();


        aduanTable.innerHTML = "";


        data.forEach(function (item) {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>${item.id || ""}</td>

                <td>${item.nama || ""}</td>

                <td>${item.email || ""}</td>

                <td>${item.aduan || ""}</td>

                <td>${item.tanggal || ""}</td>

                <td>

                    <button
                        class="admin-btn btn-hapus"
                        onclick="hapusAduan('${item.id}')">

                        Hapus

                    </button>

                </td>

            `;


            aduanTable.appendChild(row);

        });


    } catch (error) {

        console.error(error);

        aduanTable.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center;">
                    Gagal mengambil data aduan.
                </td>
            </tr>
        `;

    }

}


// ===============================
// HAPUS ADUAN
// ===============================

async function hapusAduan(id) {

    const yakin =
        confirm(
            "Hapus aduan ID " + id + "?"
        );


    if (!yakin) return;


    try {

        await fetch(API_URL, {

            method: "POST",

            mode: "no-cors",

            body: JSON.stringify({

                tabel: "Aduan",

                action: "hapus",

                id: id

            })

        });


        alert("Aduan berhasil dihapus!");

        setTimeout(loadAduan, 1000);


    } catch (error) {

        console.error(error);

        alert("Gagal menghapus aduan.");

    }

}


// ===============================
// BATAL EDIT
// ===============================

const cancelBtn =
    document.getElementById("cancelBtn");

if (cancelBtn) {

    cancelBtn.addEventListener("click", function () {

        dataForm.reset();

        sedangEdit = false;

        document.getElementById("formTitle").textContent =
            "Tambah Data";

        document.getElementById("submitBtn").textContent =
            "+ Tambah Data";

        cancelBtn.style.display =
            "none";

    });

}
