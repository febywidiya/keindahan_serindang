const API_URL = "MASUKKAN_URL_APPS_SCRIPT_KAMU";

const dataTable = document.getElementById("dataTable");

async function loadData() {

    try {

        const response = await fetch(API_URL);

        const data = await response.json();

        dataTable.innerHTML = "";

        data.forEach(item => {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${item.id}</td>

                <td>${item.nama}</td>

                <td>${item.kategori}</td>

                <td>${item.deskripsi}</td>

                <td>
                    ${
                        item.gambar
                        ? `<img src="${item.gambar}" class="data-image">`
                        : "-"
                    }
                </td>

                <td>

                    <button
                        class="admin-btn btn-edit"
                        onclick="editData(${item.id})">
                        Edit
                    </button>

                    <button
                        class="admin-btn btn-hapus"
                        onclick="hapusData(${item.id})">
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


document
    .getElementById("dataForm")
    .addEventListener("submit", function(e) {

        e.preventDefault();

        const data = {

            id: document.getElementById("id").value,

            nama: document.getElementById("nama").value,

            kategori: document.getElementById("kategori").value,

            deskripsi: document.getElementById("deskripsi").value,

            gambar: document.getElementById("gambar").value

        };

        console.log(data);

        alert("Data berhasil disiapkan!");

        this.reset();

    });


function editData(id) {

    alert("Fitur edit untuk ID " + id + " akan dihubungkan ke Google Sheets.");

}


function hapusData(id) {

    const yakin = confirm(
        "Apakah kamu yakin ingin menghapus data ID " + id + "?"
    );

    if (yakin) {

        alert(
            "Fitur hapus untuk ID " + id +
            " akan dihubungkan ke Google Sheets."
        );

    }

}


loadData();
