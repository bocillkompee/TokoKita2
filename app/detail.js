async function getProductDetail() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    if (!productId) {
        console.error('ID produk tidak ditemukan.');
        return;
    }

    try {
        const response = await fetch(
            `https://dummyjson.com/products/${productId}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const product = await response.json();

        const container = document.getElementById('product-detail');

        if (!container) {
            console.error('Element product-detail tidak ditemukan.');
            return;
        }

        const hargaIDR = (product.price * 18000).toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR'
        });

        container.innerHTML = `
            <div class="grid gap-8 md:grid-cols-2">

                <div class="flex items-center justify-center rounded-lg bg-white p-6">
                    <img
                        src="${product.thumbnail}"
                        alt="${product.title}"
                        class="max-h-96 w-full object-contain"
                    />
                </div>

                <div>
                    <p class="mb-2 text-sm uppercase text-gray-500">
                        ${product.category}
                    </p>

                    <h1 class="mb-4 text-3xl font-bold text-gray-800">
                        ${product.title}
                    </h1>

                    <p class="mb-4 text-2xl font-bold text-blue-600">
                        ${hargaIDR}
                    </p>

                    <p class="mb-6 leading-7 text-gray-600">
                        ${product.description}
                    </p>

                    <div class="mb-6 text-sm text-gray-500">
                        <p>Rating: ${product.rating ?? '-'}</p>
                        <p>Stock: ${product.stock ?? '-'}</p>
                        <p>Brand: ${product.brand ?? '-'}</p>
                    </div>

                    <button
                        onclick="addToCart(${product.id})"
                        class="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
                    >
                        Tambah ke Keranjang
                    </button>
                </div>

            </div>
        `;
    } catch (error) {
        console.error('Gagal mengambil detail produk:', error);

        const container = document.getElementById('product-detail');

        if (container) {
            container.innerHTML = `
                <p class="py-10 text-center text-red-500">
                    Gagal mengambil detail produk.
                </p>
            `;
        }
    }
}


// =========================
// TAMBAH PRODUK KE CART
// =========================
function addToCart(productId) {
    let cart = JSON.parse(
        localStorage.getItem('cart') || '[]'
    );

    const existingProduct = cart.find(
        product => product.id === productId
    );

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            id: productId,
            quantity: 1
        });
    }

    localStorage.setItem(
        'cart',
        JSON.stringify(cart)
    );

    showToast();
}


// =========================
// BUKA CART.HTML
// =========================
function keranjang() {
    window.location.href = 'cart.html';
}


// =========================
// TOAST
// =========================
function showToast() {
    const toast = document.getElementById('toast');

    if (!toast) {
        alert('Produk berhasil ditambahkan ke keranjang!');
        return;
    }

    toast.classList.remove(
        'translate-y-20',
        'opacity-0'
    );

    toast.classList.add(
        'translate-y-0',
        'opacity-100'
    );

    setTimeout(() => {
        toast.classList.remove(
            'translate-y-0',
            'opacity-100'
        );

        toast.classList.add(
            'translate-y-20',
            'opacity-0'
        );
    }, 2000);
}


getProductDetail();