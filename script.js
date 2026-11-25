
const dataKuis = {
    "Matematika": [
        {
            soal: "Berapakah hasil dari 12 × 5?",
            pilihan: ["50", "60", "70", "80"],
            jawaban: "60"
        },
        {
            soal: "Berapakah hasil dari 100 ÷ 4?",
            pilihan: ["20", "25", "30", "40"],
            jawaban: "25"
        },
        {
            soal: "Berapakah hasil dari 15 + 25?",
            pilihan: ["30", "35", "40", "45"],
            jawaban: "40"
        }
    ],

    "IPA": [
        {
            soal: "Planet tempat manusia tinggal adalah?",
            pilihan: ["Mars", "Bumi", "Venus", "Jupiter"],
            jawaban: "Bumi"
        },
        {
            soal: "Organ tubuh untuk bernapas adalah?",
            pilihan: ["Jantung", "Paru-paru", "Lambung", "Ginjal"],
            jawaban: "Paru-paru"
        },
        {
            soal: "Sumber energi utama bagi bumi adalah?",
            pilihan: ["Bulan", "Angin", "Matahari", "Air"],
            jawaban: "Matahari"
        }
    ],

    "IPS": [
        {
            soal: "Apa ibu kota Indonesia?",
            pilihan: ["Bandung", "Jakarta", "Surabaya", "Medan"],
            jawaban: "Jakarta"
        },
        {
            soal: "Indonesia merdeka pada tanggal?",
            pilihan: ["17 Agustus 1945", "10 November 1945", "1 Juni 1945", "20 Mei 1908"],
            jawaban: "17 Agustus 1945"
        },
        {
            soal: "Benua terbesar di dunia adalah?",
            pilihan: ["Afrika", "Eropa", "Asia", "Australia"],
            jawaban: "Asia"
        }
    ],

    "Bahasa Indonesia": [
        {
            soal: "Sinonim kata 'indah' adalah?",
            pilihan: ["Jelek", "Cantik", "Buruk", "Kotor"],
            jawaban: "Cantik"
        },
        {
            soal: "Lawan kata 'rajin' adalah?",
            pilihan: ["Tekun", "Malas", "Pintar", "Aktif"],
            jawaban: "Malas"
        },
        {
            soal: "Kalimat tanya biasanya diakhiri tanda?",
            pilihan: [".", "!", "?", ","],
            jawaban: "?"
        }
    ],

    "Pengetahuan Umum": [
        {
            soal: "Berapa jumlah hari dalam satu minggu?",
            pilihan: ["5", "6", "7", "8"],
            jawaban: "7"
        },
        {
            soal: "Hewan yang dikenal sebagai raja hutan adalah?",
            pilihan: ["Harimau", "Singa", "Gajah", "Beruang"],
            jawaban: "Singa"
        },
        {
            soal: "Warna bendera Indonesia adalah?",
            pilihan: ["Merah Putih", "Biru Putih", "Merah Kuning", "Hijau Putih"],
            jawaban: "Merah Putih"
        }
    ],

    "Tebak-Tebakan": [
        {
            soal: "Apa yang punya gigi tetapi tidak bisa menggigit?",
            pilihan: ["Sisir", "Kucing", "Anjing", "Burung"],
            jawaban: "Sisir"
        },
        {
            soal: "Apa yang semakin diisi semakin ringan?",
            pilihan: ["Air", "Balon", "Batu", "Pasir"],
            jawaban: "Balon"
        },
        {
            soal: "Apa yang selalu naik tetapi tidak pernah turun?",
            pilihan: ["Hujan", "Umur", "Tangga", "Pesawat"],
            jawaban: "Umur"
        }
    ]
};

let kategoriAktif = "";
let nomorSekarang = 0;
let skor = 0;
let jumlahBenar = 0;

// Menampilkan kategori
function tampilkanKategori() {
    document.getElementById("home").classList.add("hidden");
    document.getElementById("kuis").classList.add("hidden");
    document.getElementById("hasil").classList.add("hidden");
    document.getElementById("kategori").classList.remove("hidden");

    const daftar = document.getElementById("daftarKategori");
    daftar.innerHTML = "";

    Object.keys(dataKuis).forEach(kategori => {
        const tombol = document.createElement("button");
        tombol.textContent = kategori;
        tombol.onclick = () => mulaiKuis(kategori);
        daftar.appendChild(tombol);
    });
}

// Memulai kuis
function mulaiKuis(kategori) {
    kategoriAktif = kategori;
    nomorSekarang = 0;
    skor = 0;
    jumlahBenar = 0;

    document.getElementById("kategori").classList.add("hidden");
    document.getElementById("kuis").classList.remove("hidden");

    tampilkanSoal();
}

// Menampilkan soal
function tampilkanSoal() {
    const soal = dataKuis[kategoriAktif][nomorSekarang];

    document.getElementById("nomorSoal").textContent =
        `Soal ${nomorSekarang + 1} dari ${dataKuis[kategoriAktif].length}`;

    document.getElementById("skor").textContent = `Skor: ${skor}`;
    document.getElementById("pertanyaan").textContent = soal.soal;
    document.getElementById("pesan").textContent = "";

    const pilihan = document.getElementById("pilihanJawaban");
    pilihan.innerHTML = "";

    document.getElementById("tombolLanjut").classList.add("hidden");

    soal.pilihan.forEach(jawaban => {
        const tombol = document.createElement("button");
        tombol.textContent = jawaban;

        tombol.onclick = () => periksaJawaban(jawaban, tombol);
        pilihan.appendChild(tombol);
    });
}

// Memeriksa jawaban
function periksaJawaban(jawaban, tombolDipilih) {
    const soal = dataKuis[kategoriAktif][nomorSekarang];
    const semuaTombol = document.querySelectorAll("#pilihanJawaban button");

    semuaTombol.forEach(tombol => tombol.disabled = true);

    if (jawaban === soal.jawaban) {
        skor += 10;
        jumlahBenar++;
        document.getElementById("pesan").textContent = "🎉 Benar! Hebat sekali!";
        tombolDipilih.style.backgroundColor = "#4caf50";
    } else {
        document.getElementById("pesan").textContent =
            `❌ Belum tepat. Jawaban yang benar: ${soal.jawaban}`;
        tombolDipilih.style.backgroundColor = "#e74c3c";
    }

    document.getElementById("skor").textContent = `Skor: ${skor}`;
    document.getElementById("tombolLanjut").classList.remove("hidden");
}

// Soal berikutnya
function soalBerikutnya() {
    nomorSekarang++;

    if (nomorSekarang < dataKuis[kategoriAktif].length) {
        tampilkanSoal();
    } else {
        tampilkanHasil();
    }
}

// Menampilkan hasil
function tampilkanHasil() {
    document.getElementById("kuis").classList.add("hidden");
    document.getElementById("hasil").classList.remove("hidden");

    const totalSoal = dataKuis[kategoriAktif].length;
    const nilai = Math.round((jumlahBenar / totalSoal) * 100);

    document.getElementById("nilaiAkhir").textContent =
        `Nilai kamu: ${nilai}`;

    document.getElementById("pesanHasil").textContent =
        `Kamu menjawab ${jumlahBenar} dari ${totalSoal} soal dengan benar.`;
}

// Kembali ke beranda
function kembaliKeAwal() {
    document.getElementById("kategori").classList.add("hidden");
    document.getElementById("kuis").classList.add("hidden");
    document.getElementById("hasil").classList.add("hidden");
    document.getElementById("home").classList.remove("hidden");
}
