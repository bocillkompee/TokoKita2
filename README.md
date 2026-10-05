# TokoKita

TokoKita adalah website e-commerce sederhana yang dibuat sebagai project pembelajaran untuk menerapkan HTML, CSS, JavaScript, Tailwind CSS, dan integrasi API.

Website ini menyediakan fitur katalog produk, detail produk, keranjang belanja, pencarian produk, serta sistem login dan register sederhana menggunakan LocalStorage.

## Demo

[Live Demo](https://bocillkompee.github.io/TokoKita2/)

## Fitur

* Menampilkan daftar produk dari API
* Pencarian produk
* Melihat detail produk
* Menambahkan produk ke keranjang
* Menambah dan mengurangi jumlah produk
* Menghapus produk dari keranjang
* Menghitung total item dan total harga
* Checkout sederhana
* Register akun
* Login dan logout
* Penyimpanan data menggunakan LocalStorage
* Responsive design

## Teknologi

* HTML5
* CSS3
* JavaScript
* Tailwind CSS
* Flowbite
* Lucide Icons
* DummyJSON API
* LocalStorage

## Struktur Project

```text
TokoKita/
├── app/
│   ├── app.js
│   ├── detail.js
│   └── cart.js
│
├── image/
│   └── fotoprofile.jpg
│
├── src/
│   └── output.css
│
├── index.html
├── detail.html
├── cart.html
├── package.json
└── README.md
```

## Halaman

### Home

Menampilkan daftar produk yang tersedia dan menyediakan fitur pencarian berdasarkan nama produk.

### Detail Produk

Menampilkan informasi lengkap dari produk yang dipilih, seperti:

* Gambar produk
* Nama produk
* Harga
* Kategori
* Deskripsi
* Rating
* Stock
* Brand

Pengguna juga dapat menambahkan produk ke keranjang.

### Keranjang

Halaman keranjang digunakan untuk mengelola produk yang telah dipilih.

Fitur yang tersedia:

* Melihat produk
* Menambah quantity
* Mengurangi quantity
* Menghapus produk
* Melihat total item
* Melihat total harga
* Checkout

## API

TokoKita menggunakan DummyJSON sebagai sumber data produk.

Endpoint yang digunakan:

```text
https://dummyjson.com/products
```

Untuk mengambil detail produk:

```text
https://dummyjson.com/products/{id}
```

## LocalStorage

TokoKita menggunakan LocalStorage browser untuk menyimpan beberapa data.

### Cart

Data keranjang disimpan menggunakan key:

```text
cart
```

Contoh struktur data:

```json
[
  {
    "id": 2,
    "quantity": 1
  }
]
```

### User

Data akun yang telah dibuat disimpan menggunakan key:

```text
users
```

User yang sedang login disimpan menggunakan:

```text
currentUser
```

## Cara Menjalankan

Clone repository:

```bash
git clone https://github.com/bocillkompee/TokoKita.git
```

Masuk ke folder project:

```bash
cd TokoKita
```

Install dependency:

```bash
npm install
```

Jalankan project menggunakan local development server.

Contohnya menggunakan Live Server pada Visual Studio Code.

Kemudian buka:

```text
http://127.0.0.1:5500
```

Port dapat berbeda tergantung konfigurasi Live Server.

## Catatan

Project ini dibuat untuk kebutuhan pembelajaran dan belum menggunakan backend database.

Data akun dan keranjang hanya disimpan pada LocalStorage browser sehingga data tidak tersinkronisasi antar perangkat atau browser.

## Author

**Arif Wardhana**

Web Developer & UI/UX Designer

GitHub:

https://github.com/bocillkompee
