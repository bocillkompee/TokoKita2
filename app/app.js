let allProducts = [];

async function getProducts() {
    try {
        const response = await fetch('https://dummyjson.com/products?limit=100');

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        allProducts = data.products;

        renderProducts(allProducts);
    } catch (error) {
        console.error('Gagal mengambil data produk:', error);

        const container = document.getElementById('product-container');

        if (container) {
            container.innerHTML = `
                <p class="col-span-full text-center text-red-500 py-8">
                    Gagal mengambil data produk. Silakan coba lagi nanti.
                </p>
            `;
        }
    }
}

function filterProducts() {
    const query = document
        .getElementById('search-input')
        .value
        .toLowerCase();

    const filtered = allProducts.filter(product =>
        product.title.toLowerCase().includes(query)
    );

    renderProducts(filtered);
}

function renderProducts(list) {
    const container = document.getElementById('product-container');

    if (!container) return;

    container.className =
        'container mx-auto py-8 px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4';

    if (list.length === 0) {
        container.innerHTML = `
            <p class="col-span-full text-center text-gray-500 py-8">
                Produk tidak ditemukan
            </p>
        `;
        return;
    }

    container.innerHTML = list.map(product => {
        const hargaIDR = (product.price * 18000).toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR'
        });

        return `
            <a
                href="detail.html?id=${product.id}"
                class="bg-white border border-gray-200 rounded-lg shadow p-4 flex flex-col"
            >
                <img
                    src="${product.thumbnail}"
                    alt="${product.title}"
                    class="h-48 w-full object-contain mb-4"
                />

                <h2 class="text-sm font-semibold text-gray-800 mb-2 line-clamp-2">
                    ${product.title}
                </h2>

                <p class="text-blue-600 font-bold mt-auto">
                    ${hargaIDR}
                </p>

                <i data-lucide="shopping-cart" class="mt-2"></i>
            </a>
        `;
    }).join('');

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function switchTab(tab) {
    const formLogin = document.getElementById('form-login');
    const formRegister = document.getElementById('form-register');
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');
    const title = document.getElementById('modal-title');

    if (tab === 'login') {
        formLogin.classList.remove('hidden');
        formRegister.classList.add('hidden');

        tabLogin.classList.add(
            'border-b-2',
            'border-brand',
            'text-fg-brand'
        );

        tabRegister.classList.remove(
            'border-b-2',
            'border-brand',
            'text-fg-brand'
        );

        title.textContent = 'Sign in';
    } else {
        formRegister.classList.remove('hidden');
        formLogin.classList.add('hidden');

        tabRegister.classList.add(
            'border-b-2',
            'border-brand',
            'text-fg-brand'
        );

        tabLogin.classList.remove(
            'border-b-2',
            'border-brand',
            'text-fg-brand'
        );

        title.textContent = 'Create account';
    }
}

function checkAuth() {
    const currentuser = JSON.parse(
        localStorage.getItem('currentUser')
    );

    const btnSignin = document.getElementById('btn-signin');
    const btnsignout = document.getElementById('btn-signout');
    const greeting = document.getElementById('greeting');

    if (currentuser) {
        if (btnSignin) {
            btnSignin.classList.add('hidden');
        }

        if (btnsignout) {
            btnsignout.classList.remove('hidden');
        }

        if (greeting) {
            greeting.textContent = `Hi, ${currentuser.name}`;
        }
    } else {
        if (btnSignin) {
            btnSignin.classList.remove('hidden');
        }

        if (btnsignout) {
            btnsignout.classList.add('hidden');
        }

        if (greeting) {
            greeting.textContent = '';
        }
    }
}

function handleLogout() {
    localStorage.removeItem('currentUser');

    alert('Anda telah keluar!');

    location.reload();
}

function handleRegister() {
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const confirm = document.getElementById('reg-confirm').value;

    if (!name || !email || !password) {
        return alert('Semua field wajib diisi!');
    }

    if (password !== confirm) {
        return alert('Password tidak cocok!');
    }

    const users = JSON.parse(
        localStorage.getItem('users') || '[]'
    );

    const exists = users.find(
        user => user.email === email
    );

    if (exists) {
        return alert('Email sudah terdaftar!');
    }

    users.push({
        name,
        email,
        password
    });

    localStorage.setItem(
        'users',
        JSON.stringify(users)
    );

    alert('Akun berhasil dibuat! Silakan login.');

    switchTab('login');
}

function handleLogin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const users = JSON.parse(
        localStorage.getItem('users') || '[]'
    );

    const user = users.find(
        user =>
            user.email === email &&
            user.password === password
    );

    if (!user) {
        return alert('Email atau password salah!');
    }

    localStorage.setItem(
        'currentUser',
        JSON.stringify(user)
    );

    alert(`Selamat datang, ${user.name}!`);

    location.reload();
}

getProducts();
checkAuth();