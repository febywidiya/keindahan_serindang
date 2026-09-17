// ==========================================
// URL GOOGLE APPS SCRIPT
// ==========================================

const API_URL =
"https://script.google.com/macros/s/AKfycbyxixXPgm970xPYDTOuExKGCa5gfER8zlf8Nu1Wr40A1FdpWocxXQnSdf0PBg-U7V4N/exec";


// ==========================================
// PASSWORD ADMIN
// ==========================================

const PASSWORD_ADMIN = "admin123";


// ==========================================
// LOGIN
// ==========================================

function loginAdmin() {

    const password =
        document.getElementById("passwordAdmin").value;

    if (password === PASSWORD_ADMIN) {

        sessionStorage.setItem(
            "adminLogin",
            "true"
        );

        document.getElementById(
            "loginAdmin"
        ).style.display = "none";

        document.getElementById(
            "halamanAdmin"
        ).style.display = "block";

        loadData();
        loadAduan();

    } else {

        document.getElementById(
            "loginError"
        ).textContent =
            "❌ Password salah!";

    }

}


// ==========================================
// LOGOUT
// ==========================================

function logoutAdmin() {

    sessionStorage.removeItem(
        "adminLogin"
    );

    location.reload();

}


// ==========================================
// CEK LOGIN
// ==========================================

window.addEventListener(
    "DOMContentLoaded",
    function () {

        const sudahLogin =
            sessionStorage.getItem(
                "adminLogin"
            );

        if (sudahLogin === "true") {

            document.getElementById(
                "loginAdmin"
            ).style.display = "none";

            document.getElementById(
                "halamanAdmin"
            ).style.display = "block";

            loadData();
            loadAduan();

        }

    }
);


// ==========================================
// ELEMENT
// ==========================================

const dataTable =
    document.getElementById("dataTable");

const aduanTable =
    document.getElementById("aduanTable");

const dataForm =
    document.getElementById("dataForm");

const submitBtn =
    document.getElementById("submitBtn");

const cancelBtn =
    document.getElementById("cancelBtn");

const formTitle =
    document.getElementById("formTitle");

const dataStatus =
    document.getElementById("dataStatus");


// ==========================================
// STATUS EDIT
// ==========================================

let sedangEdit = false;


// ==========================================
// LOAD DATA DESA
// ==========================================

async function loadData() {

    dataTable.innerHTML = `
        <tr>
            <td colspan="6" style="text-align:center;">
                Memuat data...
            </td>
        </tr>
    `;

    try {

        const response =
            await fetch(API_URL);

        const data =
            await response.json();

        dataTable.innerHTML = "";

        if (
            !Array.isArray(data) ||
            data.length === 0
        ) {

            dataTable.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align:center;">
                        Belum ada data.
                    </td>
                </tr>
            `;

            return;
        }


        data.forEach(item => {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${item.id || ""}
                </td>

                <td>
                    ${item.nama || ""}
                </td>

                <td>
                    ${item.kategori || ""}
                </td>

                <td>
                    ${item.deskripsi || ""}
                </td>

                <td>

                    ${
                        item.gambar

                        ?

                        `<img
                            src="${item.gambar}"
                            class="gambar-preview"
                            onerror="this.style.display='none'">
                        `

                        :

                        "-"
                    }

                </td>


                <td class="aksi">

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
                    Gagal mengambil data dari Google Sheets.
                </td>
            </tr>
        `;

    }

}


// ==========================================
// TAMBAH / EDIT DATA
// ==========================================

dataForm.addEventListener(
    "submit",
    async function (e) {

        e.preventDefault();

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


        submitBtn.disabled = true;

        submitBtn.textContent =
            "Menyimpan...";


        try {

            await fetch(
                API_URL,
                {
                    method: "POST",
                    mode: "no-cors",
                    body: JSON.stringify(data)
                }
            );


            if (sedangEdit) {

                alert(
                    "Data berhasil diubah!"
                );

            } else {

                alert(
                    "Data berhasil ditambahkan!"
                );

            }


            resetForm();

            loadData();


        } catch (error) {

            console.error(error);

            alert(
                "Terjadi kesalahan saat menyimpan data."
            );

        }


        submitBtn.disabled = false;

    }
);


// ==========================================
// EDIT DATA
// ==========================================

async function editData(id) {

    try {

        const response =
            await fetch(API_URL);

        const data =
            await response.json();

        const item =
            data.find(
                x =>
                    String(x.id) ===
                    String(id)
            );


        if (!item) {

            alert(
                "Data tidak ditemukan."
            );

            return;

        }


        document.getElementById("id").value =
            item.id || "";

        document.getElementById("nama").value =
            item.nama || "";

        document.getElementById("kategori").value =
            item.kategori || "";

        document.getElementById("deskripsi").value =
            item.deskripsi || "";

        document.getElementById("gambar").value =
            item.gambar || "";


        sedangEdit = true;


        formTitle.textContent =
            "Edit Data";

        submitBtn.textContent =
            "💾 Simpan Perubahan";


        submitBtn.classList.remove(
            "btn-tambah"
        );

        submitBtn.classList.add(
            "btn-edit"
        );


        cancelBtn.style.display =
            "inline-block";


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


    } catch (error) {

        console.error(error);

        alert(
            "Gagal mengambil data."
        );

    }

}


// ==========================================
// HAPUS DATA
// ==========================================

async function hapusData(id) {

    const yakin =
        confirm(
            "Apakah kamu yakin ingin menghapus data ID " +
            id +
            "?"
        );


    if (!yakin) {
        return;
    }


    try {

        await fetch(
            API_URL,
            {
                method: "POST",
                mode: "no-cors",
                body: JSON.stringify({

                    tabel: "Data",

                    action: "hapus",

                    id: id

                })
            }
        );


        alert(
            "Data berhasil dihapus!"
        );


        loadData();


    } catch (error) {

        console.error(error);

        alert(
            "Gagal menghapus data."
        );

    }

}


// ==========================================
// BATAL EDIT
// ==========================================

cancelBtn.addEventListener(
    "click",
    function () {

        resetForm();

    }
);


// ==========================================
// RESET FORM
// ==========================================

function resetForm() {

    dataForm.reset();

    sedangEdit = false;

    formTitle.textContent =
        "Tambah Data";

    submitBtn.textContent =
        "+ Tambah Data";


    submitBtn.classList.remove(
        "btn-edit"
    );

    submitBtn.classList.add(
        "btn-tambah"
    );


    cancelBtn.style.display =
        "none";

    dataStatus.textContent = "";

}


// ==========================================
// LOAD ADUAN
// ==========================================

async function loadAduan() {

    aduanTable.innerHTML = `
        <tr>
            <td colspan="9" style="text-align:center;">
                Memuat aduan...
            </td>
        </tr>
    `;


    try {

        const response =
            await fetch(
                API_URL +
                "?sheet=Aduan"
            );


        const data =
            await response.json();


        aduanTable.innerHTML = "";


        if (
            !Array.isArray(data) ||
            data.length === 0
        ) {

            aduanTable.innerHTML = `
                <tr>
                    <td colspan="9" style="text-align:center;">
                        Belum ada aduan.
                    </td>
                </tr>
            `;

            return;

        }


        data.forEach(item => {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${item.id || ""}
                </td>


                <td>
                    <strong>
                        ${item.token || "-"}
                    </strong>
                </td>


                <td>
                    ${item.nama || ""}
                </td>


                <td>
                    ${item.email || ""}
                </td>


                <td>
                    ${item.kategori || "-"}
                </td>


                <td>
                    ${item.judul || "-"}
                </td>


                <td>
                    ${item.aduan || ""}
                </td>


                <td>
                    ${item.tanggal || ""}
                </td>


                <td class="tanggapan-box">

                    ${
                        item.tanggapan

                        ?

                        `<span class="sudah">
                            ${item.tanggapan}
                        </span>`

                        :

                        `<span class="belum">
                            Belum ditanggapi
                        </span>`
                    }

                    <br><br>

                    <button
                        class="admin-btn btn-edit"
                        onclick="beriTanggapan('${item.id}')">

                        💬 Tanggapi

                    </button>


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
                <td colspan="9" style="text-align:center;">
                    Gagal mengambil data aduan.
                </td>
            </tr>
        `;

    }

}


// ==========================================
// TANGGAPAN ADMIN
// ==========================================

async function beriTanggapan(id) {

    const tanggapan =
        prompt(
            "Masukkan tanggapan untuk aduan ID " +
            id +
            ":"
        );


    if (tanggapan === null) {
        return;
    }


    if (
        tanggapan.trim() === ""
    ) {

        alert(
            "Tanggapan tidak boleh kosong."
        );

        return;

    }


    try {

        await fetch(
            API_URL,
            {
                method: "POST",
                mode: "no-cors",
                body: JSON.stringify({

                    tabel: "Aduan",

                    action: "tanggapan",

                    id: id,

                    tanggapan:
                        tanggapan

                })
            }
        );


        alert(
            "Tanggapan berhasil disimpan!"
        );


        loadAduan();


    } catch (error) {

        console.error(error);

        alert(
            "Gagal menyimpan tanggapan."
        );

    }

}


// ==========================================
// HAPUS ADUAN
// ==========================================

async function hapusAduan(id) {

    const yakin =
        confirm(
            "Apakah kamu yakin ingin menghapus aduan ID " +
            id +
            "?"
        );


    if (!yakin) {
        return;
    }


    try {

        await fetch(
            API_URL,
            {
                method: "POST",
                mode: "no-cors",
                body: JSON.stringify({

                    tabel: "Aduan",

                    action: "hapus",

                    id: id

                })
            }
        );


        alert(
            "Aduan berhasil dihapus!"
        );


        loadAduan();


    } catch (error) {

        console.error(error);

        alert(
            "Gagal menghapus aduan."
        );

    }

}
