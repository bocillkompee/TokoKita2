let cart = JSON.parse(
    localStorage.getItem('cart') || '[]'
);


// =========================
// LOAD CART
// =========================
async function loadCart() {
    const container = document.getElementById('cart-container');

    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="bg-white border border-gray-200 rounded-lg p-8 text-center">
                <p class="text-gray-500 mb-4">
                    Keranjang masih kosong.
                </p>

                <a
                    href="index.html"
                    class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                >
                    Belanja Sekarang
                </a>
            </div>
        `;

        updateSummary();
        return;
    }

    container.innerHTML = '';

    for (const item of cart) {
        try {
            const response = await fetch(
                `https://dummyjson.com/products/${item.id}`
            );

            if (!response.ok) {
                continue;
            }

            const product = await response.json();

            const hargaIDR = (
                product.price * 18000
            ).toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR'
            });

            const subtotal = (
                product.price *
                18000 *
                item.quantity
            ).toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR'
            });

            container.innerHTML += `
                <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-4">

                    <div class="flex gap-4">

                        <div class="w-24 h-24 flex-shrink-0">
                            <img
                                src="${product.thumbnail}"
                                alt="${product.title}"
                                class="w-full h-full object-contain"
                            >
                        </div>

                        <div class="flex-1">

                            <h3 class="font-semibold text-gray-800 mb-2">
                                ${product.title}
                            </h3>

                            <p class="text-blue-600 font-bold mb-2">
                                ${hargaIDR}
                            </p>

                            <p class="text-sm text-gray-500 mb-3">
                                Subtotal: ${subtotal}
                            </p>

                            <div class="flex items-center gap-3">

                                <button
                                    onclick="decreaseQuantity(${product.id})"
                                    class="w-8 h-8 border rounded"
                                >
                                    -
                                </button>

                                <span class="font-semibold">
                                    ${item.quantity}
                                </span>

                                <button
                                    onclick="increaseQuantity(${product.id})"
                                    class="w-8 h-8 border rounded"
                                >
                                    +
                                </button>

                                <button
                                    onclick="removeFromCart(${product.id})"
                                    class="ml-4 text-red-500 hover:text-red-700"
                                >
                                    Hapus
                                </button>

                            </div>

                        </div>

                    </div>

                </div>
            `;
        } catch (error) {
            console.error(
                'Gagal mengambil produk:',
                error
            );
        }
    }

    updateSummary();
}


// =========================
// TAMBAH QUANTITY
// =========================
function increaseQuantity(productId) {
    const item = cart.find(
        product => product.id === productId
    );

    if (item) {
        item.quantity += 1;
    }

    saveCart();
}


// =========================
// KURANGI QUANTITY
// =========================
function decreaseQuantity(productId) {
    const item = cart.find(
        product => product.id === productId
    );

    if (!item) return;

    item.quantity -= 1;

    if (item.quantity <= 0) {
        cart = cart.filter(
            product => product.id !== productId
        );
    }

    saveCart();
}


// =========================
// HAPUS PRODUK
// =========================
function removeFromCart(productId) {
    cart = cart.filter(
        product => product.id !== productId
    );

    saveCart();
}


// =========================
// SIMPAN CART
// =========================
function saveCart() {
    localStorage.setItem(
        'cart',
        JSON.stringify(cart)
    );

    loadCart();
}


// =========================
// SUMMARY
// =========================
async function updateSummary() {
    const totalItems = document.getElementById('total-items');
    const totalPrice = document.getElementById('total-price');

    if (!totalItems || !totalPrice) return;

    let totalItemCount = 0;
    let totalHarga = 0;

    for (const item of cart) {
        try {
            const response = await fetch(
                `https://dummyjson.com/products/${item.id}`
            );

            if (!response.ok) continue;

            const product = await response.json();

            totalItemCount += item.quantity;

            totalHarga +=
                product.price *
                18000 *
                item.quantity;

        } catch (error) {
            console.error(error);
        }
    }

    totalItems.textContent = totalItemCount;

    totalPrice.textContent =
        totalHarga.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR'
        });
}


// =========================
// CHECKOUT
// =========================
const checkoutButton =
    document.getElementById('checkout-btn');

if (checkoutButton) {
    checkoutButton.addEventListener(
        'click',
        function () {

            const terms =
                document.getElementById('terms');

            if (!terms.checked) {
                alert(
                    'Silakan setujui terlebih dahulu.'
                );
                return;
            }

            if (cart.length === 0) {
                alert(
                    'Keranjang masih kosong.'
                );
                return;
            }

            alert(
                'Checkout berhasil!'
            );

            cart = [];

            localStorage.setItem(
                'cart',
                JSON.stringify(cart)
            );

            loadCart();
        }
    );
}


// =========================
// JALANKAN
// =========================
loadCart();