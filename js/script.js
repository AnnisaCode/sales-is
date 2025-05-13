// Initialize Feather icons
feather.replace();

// Mock data for the application
const mockData = {
    products: [
        { id: 1, name: 'Laptop HP 15s', category: 'Electronics', price: 899.99, stock: 25, status: 'In Stock' },
        { id: 2, name: 'Samsung Galaxy S22', category: 'Electronics', price: 799.99, stock: 15, status: 'In Stock' },
        { id: 3, name: 'Adidas Running Shoes', category: 'Clothing', price: 89.99, stock: 45, status: 'In Stock' },
        { id: 4, name: 'Cotton T-Shirt', category: 'Clothing', price: 19.99, stock: 8, status: 'Low Stock' },
        { id: 5, name: 'Office Desk', category: 'Furniture', price: 249.99, stock: 0, status: 'Out of Stock' },
        { id: 6, name: 'Organic Coffee Beans', category: 'Food', price: 12.99, stock: 50, status: 'In Stock' }
    ],
    customers: [
        { id: 1, name: 'John Smith', email: 'john@example.com', phone: '555-1234', address: '123 Main St', type: 'Regular', totalSpent: 2499.75, lastPurchase: '2025-05-01' },
        { id: 2, name: 'Jane Doe', email: 'jane@example.com', phone: '555-5678', address: '456 Oak Ave', type: 'VIP', totalSpent: 5632.50, lastPurchase: '2025-05-08' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '555-9012', address: '789 Pine Rd', type: 'New', totalSpent: 149.99, lastPurchase: '2025-05-10' },
        { id: 4, name: 'Sara Wilson', email: 'sara@example.com', phone: '555-3456', address: '321 Elm Blvd', type: 'Regular', totalSpent: 1876.25, lastPurchase: '2025-04-28' }
    ],
    sales: [
        { invoice: 'INV-2025-001', customerId: 2, customerName: 'Jane Doe', date: '2025-05-08', items: 3, paymentMethod: 'Credit Card', amount: 1299.97, status: 'Completed' },
        { invoice: 'INV-2025-002', customerId: 1, customerName: 'John Smith', date: '2025-05-01', items: 2, paymentMethod: 'Bank Transfer', amount: 949.98, status: 'Completed' },
        { invoice: 'INV-2025-003', customerId: 3, customerName: 'Bob Johnson', date: '2025-05-10', items: 1, paymentMethod: 'Cash', amount: 149.99, status: 'Pending' },
        { invoice: 'INV-2025-004', customerId: 4, customerName: 'Sara Wilson', date: '2025-04-28', items: 4, paymentMethod: 'Credit Card', amount: 1876.25, status: 'Completed' },
        { invoice: 'INV-2025-005', customerId: 2, customerName: 'Jane Doe', date: '2025-04-15', items: 2, paymentMethod: 'Bank Transfer', amount: 4332.53, status: 'Completed' }
    ],
    salesByMonth: [
        { month: 'Jan', sales: 15200 },
        { month: 'Feb', sales: 18150 },
        { month: 'Mar', sales: 21400 },
        { month: 'Apr', sales: 25600 },
        { month: 'May', sales: 32100 },
        { month: 'Jun', sales: 28400 },
        { month: 'Jul', sales: 34200 },
        { month: 'Aug', sales: 38100 },
        { month: 'Sep', sales: 42300 },
        { month: 'Oct', sales: 45200 },
        { month: 'Nov', sales: 0 },
        { month: 'Dec', sales: 0 }
    ],
    categories: [
        { name: 'Electronics', percentage: 45 },
        { name: 'Clothing', percentage: 30 },
        { name: 'Furniture', percentage: 15 },
        { name: 'Food', percentage: 10 }
    ]
};

// Simpan state login di localStorage
function saveLoginState() {
    console.log('[AUTH] Saving login state to localStorage');
    try {
        localStorage.setItem('salesAppLoggedIn', 'true');
        localStorage.setItem('salesAppLoginTime', new Date().toString());
        return true;
    } catch (error) {
        console.error('[AUTH] Error saving login state:', error);
        return false;
    }
}

// Periksa state login
function checkLoginState() {
    console.log('[AUTH] Checking login state from localStorage');
    try {
        const isLoggedIn = localStorage.getItem('salesAppLoggedIn') === 'true';
        console.log('[AUTH] Login state:', isLoggedIn ? 'Logged in' : 'Not logged in');
        return isLoggedIn;
    } catch (error) {
        console.error('[AUTH] Error checking login state:', error);
        return false;
    }
}

// Hapus state login
function clearLoginState() {
    console.log('[AUTH] Clearing login state from localStorage');
    try {
        localStorage.removeItem('salesAppLoggedIn');
        localStorage.removeItem('salesAppLoginTime');
        return true;
    } catch (error) {
        console.error('[AUTH] Error clearing login state:', error);
        return false;
    }
}

// Get current date for new transactions
function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Format currency
function formatCurrency(amount) {
    return '$' + parseFloat(amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Initialize dashboard elements
function initializeDashboardElements() {
    // Pastikan elemen dashboard ada
    const totalRevenueEl = document.getElementById('totalRevenue');
    const totalCustomersEl = document.getElementById('totalCustomers');
    const totalProductsEl = document.getElementById('totalProducts');
    const salesGrowthEl = document.getElementById('salesGrowth');
    const growthIndicatorEl = document.getElementById('growthIndicator');

    // Jika elemen-elemen tersebut belum ada di DOM, coba buat
    if (!totalRevenueEl && document.getElementById('dashboard-section')) {
        console.log('Creating dashboard elements that were missing');
        // Mencari tempat untuk meletakkan elemen-elemen ini
        const firstCard = document.querySelector('#dashboard-section .card-body');
        if (firstCard) {
            firstCard.innerHTML = `
                <h5 class="card-title">Total Revenue</h5>
                <p class="card-text display-6" id="totalRevenue">$0.00</p>
                <p class="card-text">
                    <small id="growthIndicator" class="text-success">
                        <span id="salesGrowth">0.0%</span> from last month
                    </small>
                </p>
            `;
        }
    }
}

// Global reference untuk chart objects agar bisa dihancurkan
let salesDashboardChart = null;
let categoryDashboardChart = null;
let reportSalesChart = null;
let productPieChart = null;
let customerTypeChart = null;

// Fungsi untuk membersihkan chart
function destroyChart(chartInstance) {
    console.log('Destroying chart:', chartInstance ? 'instance exists' : 'null');
    try {
        if (chartInstance) {
            chartInstance.destroy();
            return true;
        }
    } catch (error) {
        console.error('[CHART] Error destroying chart:', error);
    }
    return false;
}

// Fungsi debugger helper
function debugElement(elementId, functionName) {
    const element = document.getElementById(elementId);
    console.log(`[DEBUG] ${functionName}: Element ${elementId}`, element ? 'exists' : 'NOT FOUND');
    return element;
}

// Fungsi navigasi - menampilkan section yang sesuai
function showSection(sectionId) {
    console.log(`[SECTION] Showing section: ${sectionId}`);

    // Sembunyikan semua section
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });

    // Tampilkan section yang dipilih
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
        // Simpan section aktif ke localStorage
        saveActiveSection(sectionId);
    } else {
        console.error(`[ERROR] Section with ID ${sectionId} not found`);
    }

    // Update status active di navigasi
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href').replace('/', '');
        const linkSectionId = href ? `${href}-section` : 'dashboard-section';

        if (linkSectionId === sectionId) {
            link.classList.add('active');
        }
    });

    // Re-initialize Feather icons
    feather.replace();
    console.log(`[SECTION] ${sectionId} displayed successfully`);
}

// Fungsi untuk memuat dashboard
function loadDashboard() {
    console.log('[DASHBOARD] Loading dashboard...');

    // Initialize dashboard elements
    initializeDashboardElements();

    // Load charts and tables on dashboard
    loadDashboardContent();

    // Update stats
    updateDashboardStats();

    // Tampilkan section dashboard
    showSection('dashboard-section');
    console.log('[DASHBOARD] Dashboard loaded successfully');
}

// Load dashboard data and charts
function loadDashboardContent() {
    console.log('[DASHBOARD] Loading dashboard content...');

    // Populate recent transactions table
    updateRecentTransactions();

    // Initialize Sales Chart
    const salesChartEl = document.getElementById('salesChart');
    if (salesChartEl) {
        console.log('[CHART] Creating sales chart');

        // Destroy existing chart if it exists
        destroyChart(salesDashboardChart);

        // Pastikan canvas bersih untuk mencegah masalah
        const salesChartParent = salesChartEl.parentNode;
        if (salesChartParent) {
            const oldCanvas = salesChartEl;
            const newCanvas = document.createElement('canvas');
            newCanvas.id = 'salesChart';
            newCanvas.width = oldCanvas.width;
            newCanvas.height = oldCanvas.height;
            newCanvas.style.maxHeight = '300px';  // Batasi tinggi chart
            salesChartParent.replaceChild(newCanvas, oldCanvas);
        }

        const salesCtx = document.getElementById('salesChart').getContext('2d');
        salesDashboardChart = new Chart(salesCtx, {
            type: 'line',
            data: {
                labels: mockData.salesByMonth.map(data => data.month),
                datasets: [{
                    label: 'Sales ($)',
                    data: mockData.salesByMonth.map(data => data.sales),
                    backgroundColor: 'rgba(0, 123, 255, 0.1)',
                    borderColor: 'rgba(0, 123, 255, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(0, 123, 255, 1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 2,  // Mengatur rasio aspek (lebar:tinggi)
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    } else {
        console.error('[ERROR] Sales chart element not found');
    }

    // Initialize Category Chart (Doughnut)
    const categoryChartEl = document.getElementById('categoryChart');
    if (categoryChartEl) {
        console.log('[CHART] Creating category chart');

        // Destroy existing chart if it exists
        destroyChart(categoryDashboardChart);

        // Pastikan canvas bersih untuk mencegah masalah
        const categoryChartParent = categoryChartEl.parentNode;
        if (categoryChartParent) {
            const oldCanvas = categoryChartEl;
            const newCanvas = document.createElement('canvas');
            newCanvas.id = 'categoryChart';
            newCanvas.width = oldCanvas.width;
            newCanvas.height = oldCanvas.height;
            newCanvas.style.maxHeight = '300px';  // Batasi tinggi chart
            categoryChartParent.replaceChild(newCanvas, oldCanvas);
        }

        const categoryCtx = document.getElementById('categoryChart').getContext('2d');
        categoryDashboardChart = new Chart(categoryCtx, {
            type: 'doughnut',
            data: {
                labels: mockData.categories.map(cat => cat.name),
                datasets: [{
                    data: mockData.categories.map(cat => cat.percentage),
                    backgroundColor: [
                        'rgba(0, 123, 255, 0.8)',
                        'rgba(40, 167, 69, 0.8)',
                        'rgba(255, 193, 7, 0.8)',
                        'rgba(220, 53, 69, 0.8)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 1,  // Square aspect ratio for pie/doughnut
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    } else {
        console.error('[ERROR] Category chart element not found');
    }
    console.log('[DASHBOARD] Dashboard content loaded successfully');
}

// Products Management
function loadProducts() {
    console.log('Loading products...');
    const productsTable = document.getElementById('productsList');
    if (!productsTable) {
        console.error('Products table not found');
        return;
    }

    productsTable.innerHTML = '';

    mockData.products.forEach(product => {
        const row = document.createElement('tr');
        const statusClass = product.status.toLowerCase().replace(/\s+/g, '-');

        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${formatCurrency(product.price)}</td>
            <td>${product.stock}</td>
            <td><span class="status-badge ${statusClass}">${product.status}</span></td>
            <td>
                <button class="action-btn edit-product" data-id="${product.id}"><i data-feather="edit"></i></button>
                <button class="action-btn delete delete-product" data-id="${product.id}"><i data-feather="trash-2"></i></button>
            </td>
        `;
        productsTable.appendChild(row);
    });

    feather.replace();

    // Add event listeners for edit buttons
    document.querySelectorAll('.edit-product').forEach(button => {
        button.addEventListener('click', function () {
            const productId = this.getAttribute('data-id');
            const product = mockData.products.find(p => p.id == productId);
            if (!product) return;

            // Populate modal with product data
            const productModalLabel = document.getElementById('productModalLabel');
            const productIdInput = document.getElementById('productId');
            const productNameInput = document.getElementById('productName');
            const productCategoryInput = document.getElementById('productCategory');
            const productPriceInput = document.getElementById('productPrice');
            const productStockInput = document.getElementById('productStock');

            if (productModalLabel) productModalLabel.textContent = 'Edit Product';
            if (productIdInput) productIdInput.value = product.id;
            if (productNameInput) productNameInput.value = product.name;
            if (productCategoryInput) productCategoryInput.value = product.category;
            if (productPriceInput) productPriceInput.value = product.price;
            if (productStockInput) productStockInput.value = product.stock;

            // Show modal
            $('#productModal').modal('show');
        });
    });

    // Add event listeners for delete buttons
    document.querySelectorAll('.delete-product').forEach(button => {
        button.addEventListener('click', function () {
            const productId = this.getAttribute('data-id');
            showConfirm('Are you sure you want to delete this product?', () => {
                // In a real application, this would send a delete request to the server
                const index = mockData.products.findIndex(p => p.id == productId);
                if (index !== -1) {
                    mockData.products.splice(index, 1);
                    // Simpan data ke localStorage
                    saveAppData();
                    loadProducts(); // Reload the table
                }
            });
        });
    });

    // Reset tambahan
    const addProductBtn = document.getElementById('addProductBtn');
    if (addProductBtn) {
        const newAddProductBtn = addProductBtn.cloneNode(true);
        addProductBtn.parentNode.replaceChild(newAddProductBtn, addProductBtn);

        newAddProductBtn.addEventListener('click', function () {
            // Reset modal form
            const productForm = document.getElementById('productForm');
            if (productForm) productForm.reset();

            const productModalLabel = document.getElementById('productModalLabel');
            if (productModalLabel) productModalLabel.textContent = 'Add New Product';

            const productId = document.getElementById('productId');
            if (productId) productId.value = '';

            // Show modal
            $('#productModal').modal('show');
        });
    }

    // Tambahkan event listener untuk Save button
    const saveProductBtn = document.getElementById('saveProductBtn');
    if (saveProductBtn) {
        const newSaveProductBtn = saveProductBtn.cloneNode(true);
        saveProductBtn.parentNode.replaceChild(newSaveProductBtn, saveProductBtn);

        newSaveProductBtn.addEventListener('click', function () {
            const productId = document.getElementById('productId')?.value;
            const name = document.getElementById('productName')?.value;
            const category = document.getElementById('productCategory')?.value;
            const price = parseFloat(document.getElementById('productPrice')?.value);
            const stock = parseInt(document.getElementById('productStock')?.value);

            if (!name || !category || isNaN(price) || isNaN(stock)) {
                alert('Please fill in all required fields', 'error');
                return;
            }

            // Determine product status based on stock
            let status = 'In Stock';
            if (stock <= 0) {
                status = 'Out of Stock';
            } else if (stock < 10) {
                status = 'Low Stock';
            }

            if (productId) {
                // Update existing product
                const index = mockData.products.findIndex(p => p.id == productId);
                if (index !== -1) {
                    mockData.products[index] = {
                        id: parseInt(productId),
                        name,
                        category,
                        price,
                        stock,
                        status
                    };
                }
            } else {
                // Add new product
                const newId = Math.max(...mockData.products.map(p => p.id)) + 1;
                mockData.products.push({
                    id: newId,
                    name,
                    category,
                    price,
                    stock,
                    status
                });
            }

            // Simpan data ke localStorage
            saveAppData();

            // Close modal and reload products list
            $('#productModal').modal('hide');
            loadProducts();
        });
    }

    // Tambahkan event listener untuk product search dan filter
    const productSearch = document.getElementById('productSearch');
    if (productSearch) {
        productSearch.addEventListener('keyup', function () {
            const searchTerm = this.value.toLowerCase();
            const rows = document.querySelectorAll('#productsList tr');

            rows.forEach(row => {
                const name = row.querySelectorAll('td')[1]?.textContent.toLowerCase();
                const category = row.querySelectorAll('td')[2]?.textContent.toLowerCase();

                if (name && category && (name.includes(searchTerm) || category.includes(searchTerm))) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }

    // Category filter
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function () {
            const selectedCategory = this.value.toLowerCase();
            const rows = document.querySelectorAll('#productsList tr');

            rows.forEach(row => {
                const category = row.querySelectorAll('td')[2]?.textContent.toLowerCase();

                if (selectedCategory === '' || (category && category === selectedCategory)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }

    // Stock filter
    const stockFilter = document.getElementById('stockFilter');
    if (stockFilter) {
        stockFilter.addEventListener('change', function () {
            const selectedStock = this.value;
            const rows = document.querySelectorAll('#productsList tr');

            rows.forEach(row => {
                const status = row.querySelectorAll('td')[5]?.textContent;

                if (selectedStock === '' || (status && status === selectedStock)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }

    console.log('Products loaded successfully');
} // End of loadProducts

// Customers Management
function loadCustomers() {
    const customersTable = document.getElementById('customersList');
    customersTable.innerHTML = '';

    mockData.customers.forEach(customer => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${customer.id}</td>
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>${formatCurrency(customer.totalSpent)}</td>
            <td>${customer.lastPurchase}</td>
            <td>
                <button class="action-btn edit-customer" data-id="${customer.id}"><i data-feather="edit"></i></button>
                <button class="action-btn delete delete-customer" data-id="${customer.id}"><i data-feather="trash-2"></i></button>
            </td>
        `;
        customersTable.appendChild(row);
    });

    feather.replace();

    // Add event listeners for edit buttons
    document.querySelectorAll('.edit-customer').forEach(button => {
        button.addEventListener('click', function () {
            const customerId = this.getAttribute('data-id');
            const customer = mockData.customers.find(c => c.id == customerId);

            // Populate modal with customer data
            document.getElementById('customerModalLabel').textContent = 'Edit Customer';
            document.getElementById('customerId').value = customer.id;
            document.getElementById('customerName').value = customer.name;
            document.getElementById('customerEmail').value = customer.email;
            document.getElementById('customerPhone').value = customer.phone;
            document.getElementById('customerAddress').value = customer.address;
            document.getElementById('customerType').value = customer.type;

            // Show modal
            $('#customerModal').modal('show');
        });
    });

    // Add event listeners for delete buttons
    document.querySelectorAll('.delete-customer').forEach(button => {
        button.addEventListener('click', function () {
            const customerId = this.getAttribute('data-id');
            showConfirm('Are you sure you want to delete this customer?', () => {
                // In a real application, this would send a delete request to the server
                const index = mockData.customers.findIndex(c => c.id == customerId);
                if (index !== -1) {
                    mockData.customers.splice(index, 1);
                    // Simpan data ke localStorage
                    saveAppData();
                    loadCustomers(); // Reload the table
                }
            });
        });
    });

    // Customer search functionality
    document.getElementById('customerSearch').addEventListener('keyup', function () {
        const searchTerm = this.value.toLowerCase();
        const rows = document.querySelectorAll('#customersList tr');

        rows.forEach(row => {
            const name = row.querySelectorAll('td')[1].textContent.toLowerCase();
            const email = row.querySelectorAll('td')[2].textContent.toLowerCase();

            if (name.includes(searchTerm) || email.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });

    // Customer type filter
    document.getElementById('customerTypeFilter').addEventListener('change', function () {
        const selectedType = this.value;

        if (selectedType === '') {
            loadCustomers(); // Show all if no filter selected
            return;
        }

        const filteredCustomers = mockData.customers.filter(customer =>
            customer.type === selectedType
        );

        renderFilteredCustomers(filteredCustomers);
    });

    function renderFilteredCustomers(customers) {
        const customersTable = document.getElementById('customersList');
        customersTable.innerHTML = '';

        customers.forEach(customer => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${customer.id}</td>
                <td>${customer.name}</td>
                <td>${customer.email}</td>
                <td>${customer.phone}</td>
                <td>${formatCurrency(customer.totalSpent)}</td>
                <td>${customer.lastPurchase}</td>
                <td>
                    <button class="action-btn edit-customer" data-id="${customer.id}"><i data-feather="edit"></i></button>
                    <button class="action-btn delete delete-customer" data-id="${customer.id}"><i data-feather="trash-2"></i></button>
                </td>
            `;
            customersTable.appendChild(row);
        });

        feather.replace();
    }
}

// Handle Add New Customer button
document.getElementById('addCustomerBtn')?.addEventListener('click', function () {
    // Reset modal form
    document.getElementById('customerModalLabel').textContent = 'Add New Customer';
    document.getElementById('customerForm').reset();
    document.getElementById('customerId').value = '';
    document.getElementById('customerType').value = 'New'; // Default for new customers

    // Show modal
    $('#customerModal').modal('show');
});

// Handle Customer Save
document.getElementById('saveCustomerBtn')?.addEventListener('click', function () {
    const customerId = document.getElementById('customerId').value;
    const name = document.getElementById('customerName').value;
    const email = document.getElementById('customerEmail').value;
    const phone = document.getElementById('customerPhone').value;
    const address = document.getElementById('customerAddress').value;
    const type = document.getElementById('customerType').value;

    if (!name || !email || !phone) {
        alert('Please fill in all required fields', 'error');
        return;
    }

    if (customerId) {
        // Update existing customer
        const index = mockData.customers.findIndex(c => c.id == customerId);
        if (index !== -1) {
            mockData.customers[index] = {
                ...mockData.customers[index],
                name,
                email,
                phone,
                address,
                type
            };
        }
    } else {
        // Add new customer
        const newId = Math.max(...mockData.customers.map(c => c.id)) + 1;
        mockData.customers.push({
            id: newId,
            name,
            email,
            phone,
            address,
            type,
            totalSpent: 0,
            lastPurchase: '-'
        });
    }

    // Simpan data ke localStorage
    saveAppData();

    // Close modal and reload customers list
    $('#customerModal').modal('hide');
    loadCustomers();
});

// Sales Management
function loadSales() {
    const salesTable = document.getElementById('salesList');
    if (!salesTable) return;

    salesTable.innerHTML = '';

    mockData.sales.forEach(sale => {
        const row = document.createElement('tr');
        const statusClass = sale.status.toLowerCase();

        row.innerHTML = `
            <td>${sale.invoice}</td>
            <td>${sale.customerName}</td>
            <td>${sale.date}</td>
            <td>${sale.items}</td>
            <td>${sale.paymentMethod}</td>
            <td>${formatCurrency(sale.amount)}</td>
            <td><span class="status-badge ${statusClass}">${sale.status}</span></td>
            <td>
                <button class="action-btn view-sale" data-invoice="${sale.invoice}"><i data-feather="eye"></i></button>
                <button class="action-btn delete delete-sale" data-invoice="${sale.invoice}"><i data-feather="trash-2"></i></button>
            </td>
        `;
        salesTable.appendChild(row);
    });

    feather.replace();

    // Initialize sale modal related elements
    if (document.getElementById('saleModal')) {
        initNewSaleModal();

        // Add event listener for add sale button here
        const addSaleBtn = document.getElementById('addSaleBtn');
        if (addSaleBtn) {
            // Hapus event listener lama jika sudah ada
            const newAddSaleBtn = addSaleBtn.cloneNode(true);
            addSaleBtn.parentNode.replaceChild(newAddSaleBtn, addSaleBtn);

            newAddSaleBtn.addEventListener('click', function () {
                // Reset modal form
                const saleForm = document.getElementById('saleForm');
                if (saleForm) saleForm.reset();

                const saleProductsList = document.getElementById('saleProductsList');
                if (saleProductsList) saleProductsList.innerHTML = '';

                // Add initial product row
                addProductRow();

                // Set default date to today
                const saleDate = document.getElementById('saleDate');
                if (saleDate) saleDate.value = getCurrentDate();

                // Reset totals
                const saleSubtotal = document.getElementById('saleSummarySubtotal');
                const saleTax = document.getElementById('saleSummaryTax');
                const saleTotal = document.getElementById('saleSummaryTotal');

                if (saleSubtotal) saleSubtotal.textContent = formatCurrency(0);
                if (saleTax) saleTax.textContent = formatCurrency(0);
                if (saleTotal) saleTotal.textContent = formatCurrency(0);

                // Show modal
                $('#saleModal').modal('show');
            });
        }
    }

    // Add event listeners for view buttons
    document.querySelectorAll('.view-sale').forEach(button => {
        button.addEventListener('click', function () {
            const invoice = this.getAttribute('data-invoice');
            // In a real application, this would load the sale details
            alert(`Viewing sale details for invoice: ${invoice}`, 'info');
        });
    });

    // Add event listeners for delete buttons
    document.querySelectorAll('.delete-sale').forEach(button => {
        button.addEventListener('click', function () {
            const invoice = this.getAttribute('data-invoice');
            showConfirm('Are you sure you want to delete this sales record?', () => {
                // In a real application, this would send a delete request to the server
                const index = mockData.sales.findIndex(s => s.invoice === invoice);
                if (index !== -1) {
                    mockData.sales.splice(index, 1);
                    // Simpan data ke localStorage
                    saveAppData();
                    loadSales(); // Reload the table
                }
            });
        });
    });

    // Sales search functionality
    document.getElementById('saleSearch').addEventListener('keyup', function () {
        const searchTerm = this.value.toLowerCase();
        const rows = document.querySelectorAll('#salesList tr');

        rows.forEach(row => {
            const invoice = row.querySelectorAll('td')[0].textContent.toLowerCase();
            const customer = row.querySelectorAll('td')[1].textContent.toLowerCase();

            if (invoice.includes(searchTerm) || customer.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });

    // Payment method filter
    document.getElementById('paymentFilter').addEventListener('change', function () {
        filterSales();
    });

    // Status filter
    document.getElementById('statusFilter').addEventListener('change', function () {
        filterSales();
    });

    // Date filter
    document.getElementById('dateFilter').addEventListener('change', function () {
        filterSales();
    });

    function filterSales() {
        const paymentMethod = document.getElementById('paymentFilter').value;
        const status = document.getElementById('statusFilter').value;
        const date = document.getElementById('dateFilter').value;

        const rows = document.querySelectorAll('#salesList tr');

        rows.forEach(row => {
            const rowPayment = row.querySelectorAll('td')[4].textContent;
            const rowStatus = row.querySelectorAll('td')[6].textContent;
            const rowDate = row.querySelectorAll('td')[2].textContent;

            const paymentMatch = paymentMethod === '' || rowPayment === paymentMethod;
            const statusMatch = status === '' || rowStatus === status;
            const dateMatch = date === '' || rowDate === date;

            if (paymentMatch && statusMatch && dateMatch) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }
}

// Initialize New Sale Modal
function initNewSaleModal() {
    console.log('[SALE] Initializing new sale modal');

    // Populate customer dropdown
    const customerSelect = document.getElementById('saleCustomer');
    customerSelect.innerHTML = '<option value="">Choose Customer</option>';

    mockData.customers.forEach(customer => {
        const option = document.createElement('option');
        option.value = customer.id;
        option.textContent = customer.name;
        customerSelect.appendChild(option);
    });

    // Populate product dropdown for first row
    updateProductDropdowns();

    // Set default date to today
    document.getElementById('saleDate').value = getCurrentDate();

    // Add event listener for adding product rows
    document.getElementById('addProductRowBtn').addEventListener('click', function () {
        addProductRow();
    });

    // Update calculation when product or quantity changes
    document.addEventListener('change', function (e) {
        if (e.target.classList.contains('sale-product') || e.target.classList.contains('sale-quantity')) {
            updateSaleCalculations();
        }
    });

    // Payment method info
    const paymentMethodSelect = document.getElementById('salePaymentMethod');
    if (paymentMethodSelect) {
        // Tambahkan info text setelah dropdown payment method
        const paymentMethodInfo = document.createElement('small');
        paymentMethodInfo.id = 'paymentMethodInfo';
        paymentMethodInfo.className = 'form-text text-muted mt-1';

        // Tambahkan ke DOM setelah select
        if (paymentMethodSelect.parentNode) {
            paymentMethodSelect.parentNode.appendChild(paymentMethodInfo);
        }

        // Update info text berdasarkan pilihan
        paymentMethodSelect.addEventListener('change', function () {
            const method = this.value;
            const infoText = document.getElementById('paymentMethodInfo');

            if (infoText) {
                if (method === 'Bank Transfer') {
                    infoText.textContent = 'Note: Some bank transfers may be marked as "Pending" until they are verified';
                } else if (method === 'Cash') {
                    infoText.textContent = 'Payment will be marked as "Completed" immediately';
                } else if (method === 'Credit Card') {
                    infoText.textContent = 'Payment will be processed and marked as "Completed" immediately';
                }
            }
        });

        // Trigger change untuk set initial text
        paymentMethodSelect.dispatchEvent(new Event('change'));
    }

    // Handle save sale button
    document.getElementById('saveSaleBtn').addEventListener('click', function () {
        saveSaleTransaction();
    });
}

// Update product dropdowns
function updateProductDropdowns() {
    document.querySelectorAll('.sale-product').forEach(select => {
        // Save current selection if any
        const currentValue = select.value;

        // Clear and repopulate options
        select.innerHTML = '<option value="">Select Product</option>';

        mockData.products.forEach(product => {
            if (product.stock > 0) { // Only show products in stock
                const option = document.createElement('option');
                option.value = product.id;
                option.textContent = `${product.name} (${formatCurrency(product.price)})`;
                option.dataset.price = product.price;
                select.appendChild(option);
            }
        });

        // Restore selection if product still exists
        if (currentValue) {
            select.value = currentValue;
        }
    });
}

// Add a new product row to sale form
function addProductRow() {
    const productsList = document.getElementById('saleProductsList');
    const rowCount = productsList.querySelectorAll('tr').length;
    const newRowId = `saleProductRow${rowCount}`;

    const newRow = document.createElement('tr');
    newRow.id = newRowId;
    newRow.innerHTML = `
        <td>
            <select class="form-control sale-product" data-row="${rowCount}" required>
                <option value="">Select Product</option>
                <!-- JS will populate this -->
            </select>
        </td>
        <td class="sale-price">$0.00</td>
        <td>
            <input type="number" min="1" class="form-control sale-quantity" data-row="${rowCount}" value="1" required>
        </td>
        <td class="sale-subtotal">$0.00</td>
        <td>
            <button type="button" class="btn btn-sm btn-danger remove-product"><i data-feather="trash-2"></i></button>
        </td>
    `;

    productsList.appendChild(newRow);
    feather.replace();

    // Populate the product dropdown
    updateProductDropdowns();

    // Add event listener for product selection
    const newSelect = newRow.querySelector('.sale-product');
    newSelect.addEventListener('change', function () {
        const productId = this.value;
        const product = mockData.products.find(p => p.id == productId);

        if (product) {
            const priceCell = newRow.querySelector('.sale-price');
            priceCell.textContent = formatCurrency(product.price);
            updateRowSubtotal(newRow);
        }
    });

    // Add event listener for quantity change
    const quantityInput = newRow.querySelector('.sale-quantity');
    quantityInput.addEventListener('change', function () {
        updateRowSubtotal(newRow);
    });

    // Add event listener for remove button
    const removeBtn = newRow.querySelector('.remove-product');
    removeBtn.addEventListener('click', function () {
        newRow.remove();
        updateSaleCalculations();
    });
}

// Update subtotal for a row
function updateRowSubtotal(row) {
    const priceText = row.querySelector('.sale-price').textContent;
    const price = parseFloat(priceText.replace(/[$,]/g, ''));
    const quantity = parseInt(row.querySelector('.sale-quantity').value);

    const subtotal = price * quantity;
    row.querySelector('.sale-subtotal').textContent = formatCurrency(subtotal);

    updateSaleCalculations();
}

// Update sale calculations (subtotal, tax, total)
function updateSaleCalculations() {
    console.log('[SALE] Updating sale calculations');
    let subtotal = 0;

    // Get required elements
    const saleSubtotalEl = debugElement('saleSummarySubtotal', 'updateSaleCalculations');
    const saleTaxEl = debugElement('saleSummaryTax', 'updateSaleCalculations');
    const saleTotalEl = debugElement('saleSummaryTotal', 'updateSaleCalculations');

    if (!saleSubtotalEl || !saleTaxEl || !saleTotalEl) {
        console.warn('[SALE] Sale summary elements not found, skipping calculations');
        return;
    }

    // Calculate subtotal from all rows
    const productRows = document.querySelectorAll('#saleProductsList tr');
    console.log(`[SALE] Found ${productRows.length} product rows to calculate`);

    productRows.forEach((row, idx) => {
        const subtotalEl = row.querySelector('.sale-subtotal');
        if (!subtotalEl) {
            console.warn(`[SALE] Subtotal element not found in row ${idx}`);
            return;
        }

        const subtotalText = subtotalEl.textContent;
        const rowSubtotal = parseFloat(subtotalText.replace(/[$,]/g, '')) || 0;
        subtotal += rowSubtotal;
    });

    // Calculate tax (10% tax rate for example)
    const taxRate = 0.1;
    const tax = subtotal * taxRate;

    // Calculate total
    const total = subtotal + tax;

    // Update the totals in the form
    saleSubtotalEl.textContent = formatCurrency(subtotal);
    saleTaxEl.textContent = formatCurrency(tax);
    saleTotalEl.textContent = formatCurrency(total);

    console.log(`[SALE] Sale calculations updated: Subtotal=${formatCurrency(subtotal)}, Tax=${formatCurrency(tax)}, Total=${formatCurrency(total)}`);
}

// Save new sale transaction
function saveSaleTransaction() {
    console.log('[SALE] Saving sale transaction');

    // Get required elements
    const saleCustomerEl = debugElement('saleCustomer', 'saveSaleTransaction');
    const saleDateEl = debugElement('saleDate', 'saveSaleTransaction');
    const salePaymentMethodEl = debugElement('salePaymentMethod', 'saveSaleTransaction');
    const saleNotesEl = debugElement('saleNotes', 'saveSaleTransaction');
    const saleTotalEl = debugElement('saleSummaryTotal', 'saveSaleTransaction');

    if (!saleCustomerEl || !saleDateEl || !salePaymentMethodEl) {
        console.error('[ERROR] Required sale form elements not found');
        alert('Error accessing sale form elements. Please try again later.', 'error');
        return;
    }

    const customerId = saleCustomerEl.value;
    const date = saleDateEl.value;
    const paymentMethod = salePaymentMethodEl.value;
    const notes = saleNotesEl ? saleNotesEl.value : '';

    console.log('[SALE] Customer ID:', customerId, 'Payment Method:', paymentMethod);

    // Validasi customer ID
    if (customerId === '') {
        console.error('[SALE] No customer selected');
        // alert('Please select a customer', 'warning');
        return;
    }

    // Check if there are valid product selections
    const productRows = document.querySelectorAll('#saleProductsList tr');
    if (productRows.length === 0) {
        // alert('Please add at least one product', 'warning');
        return;
    }

    let validProducts = 0;
    const saleItems = [];

    // Validate each product row and prepare items data
    productRows.forEach((row, idx) => {
        console.log(`[SALE] Processing product row ${idx + 1}`);
        const productSelect = row.querySelector('.sale-product');
        if (!productSelect) {
            console.warn(`[SALE] Product select not found in row ${idx + 1}`);
            return;
        }

        const productId = productSelect.value;
        if (productId) {
            validProducts++;
            const product = mockData.products.find(p => p.id == productId);
            if (!product) {
                console.warn(`[SALE] Product with id=${productId} not found`);
                return;
            }

            const quantityEl = row.querySelector('.sale-quantity');
            const subtotalEl = row.querySelector('.sale-subtotal');

            if (!quantityEl || !subtotalEl) {
                console.warn(`[SALE] Quantity or subtotal element not found in row ${idx + 1}`);
                return;
            }

            const quantity = parseInt(quantityEl.value);
            const subtotalText = subtotalEl.textContent;
            const subtotal = parseFloat(subtotalText.replace(/[$,]/g, ''));

            saleItems.push({
                productId,
                productName: product.name,
                price: product.price,
                quantity,
                subtotal
            });

            // Update product stock
            const productIndex = mockData.products.findIndex(p => p.id == productId);
            if (productIndex !== -1) {
                mockData.products[productIndex].stock -= quantity;

                // Update product status based on new stock level
                if (mockData.products[productIndex].stock <= 0) {
                    mockData.products[productIndex].status = 'Out of Stock';
                } else if (mockData.products[productIndex].stock < 10) {
                    mockData.products[productIndex].status = 'Low Stock';
                }
            }
        }
    });

    if (validProducts === 0) {
        // alert('Please select at least one valid product', 'warning');
        return;
    }

    // Get the customer
    const customer = mockData.customers.find(c => c.id == customerId);
    if (!customer) {
        console.error(`[ERROR] Customer with id=${customerId} not found`);
        alert('Error: Selected customer not found.', 'error');
        return;
    }

    // Calculate total amount
    let totalAmount = 0;
    if (saleTotalEl) {
        const totalText = saleTotalEl.textContent;
        totalAmount = parseFloat(totalText.replace(/[$,]/g, ''));
    } else {
        // Calculate total from items if element not found
        totalAmount = saleItems.reduce((sum, item) => sum + item.subtotal, 0) * 1.1; // Include 10% tax
        console.warn('[SALE] Total element not found, calculated from items: ' + formatCurrency(totalAmount));
    }

    // Generate invoice number (simple implementation)
    const nextInvoiceNum = mockData.sales.length + 1;
    const invoiceNumber = `INV-${new Date().getFullYear()}-${String(nextInvoiceNum).padStart(3, '0')}`;
    console.log(`[SALE] Generated invoice number: ${invoiceNumber}`);

    // Determine status based on payment method
    let status = 'Completed';
    if (paymentMethod === 'Bank Transfer') {
        // For demo, randomly set some bank transfers to pending
        status = Math.random() > 0.7 ? 'Pending' : 'Completed';
    }
    console.log(`[SALE] Transaction status set to: ${status}`);

    // Create new sale record
    const newSale = {
        invoice: invoiceNumber,
        customerId: parseInt(customerId),
        customerName: customer.name,
        date,
        items: saleItems.length,
        paymentMethod,
        amount: totalAmount,
        status,
        notes,
        itemDetails: saleItems
    };

    // Add to mock data
    mockData.sales.push(newSale);
    console.log(`[SALE] Added new sale with invoice ${invoiceNumber}`);

    // Update customer's total spent and last purchase
    const customerIndex = mockData.customers.findIndex(c => c.id == customerId);
    if (customerIndex !== -1) {
        mockData.customers[customerIndex].totalSpent += totalAmount;
        mockData.customers[customerIndex].lastPurchase = date;
    }

    // Simpan data ke localStorage
    saveAppData();

    // Close modal and reload sales list
    $('#saleModal').modal('hide');
    loadSales();

    // Update recent transactions on dashboard
    updateRecentTransactions();

    // Show success notification
    alert(`Sale successfully recorded with Invoice #${invoiceNumber}`, 'success');
}

// Reports Management
function loadReports() {
    console.log('[REPORTS] Loading reports section');

    const reportsSection = document.getElementById('reports-section');
    if (!reportsSection) {
        console.error('[ERROR] Reports section not found');
        return;
    }

    // Reset report content area
    const reportContent = document.getElementById('reportContent');
    if (reportContent) {
        reportContent.innerHTML = '';
    }

    // Get or create report controls
    const existingControls = document.querySelector('.report-controls');
    if (!existingControls) {
        console.log('[REPORTS] Creating report controls');

        const reportTitle = document.getElementById('reportTitle');
        if (reportTitle && reportTitle.parentNode) {
            const controlDiv = document.createElement('div');
            controlDiv.className = 'report-controls mb-3';
            controlDiv.innerHTML = `
                <div class="form-row">
                    <div class="col-md-4">
                        <select id="reportType" class="form-control">
                            <option value="sales">Sales Report</option>
                            <option value="products">Product Performance</option>
                            <option value="customers">Customer Analysis</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <select id="reportYear" class="form-control"></select>
                    </div>
                    <div class="col-md-4">
                        <button id="generateReportBtn" class="btn btn-primary">Generate Report</button>
                    </div>
                </div>
            `;
            reportTitle.parentNode.insertBefore(controlDiv, reportTitle.nextSibling);
            console.log('[REPORTS] Created report controls');
        }
    }

    // Populate year select
    const yearSelect = document.getElementById('reportYear');
    if (yearSelect) {
        yearSelect.innerHTML = '';

        // Populate date ranges for filter
        const currentYear = new Date().getFullYear();

        for (let year = currentYear; year >= currentYear - 5; year--) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearSelect.appendChild(option);
        }
    }

    // Add event listener to generate report button
    const generateReportBtn = document.getElementById('generateReportBtn');
    if (generateReportBtn) {
        // Remove existing event listeners
        const newGenerateReportBtn = generateReportBtn.cloneNode(true);
        generateReportBtn.parentNode.replaceChild(newGenerateReportBtn, generateReportBtn);

        newGenerateReportBtn.addEventListener('click', function () {
            console.log('[REPORTS] Generate report button clicked');
            generateSalesReport();
        });
    }

    // Make sure report chart container exists
    const reportChartContainer = document.getElementById('reportChartContainer');
    if (!reportChartContainer && reportContent) {
        const chartDiv = document.createElement('div');
        chartDiv.id = 'reportChartContainer';
        chartDiv.className = 'mb-4';
        chartDiv.style.height = '300px';
        reportContent.appendChild(chartDiv);
    }

    // Load initial report
    console.log('[REPORTS] Loading initial report');
    generateSalesReport();

    // Show reports section
    showSection('reports-section');
}

function generateSalesReport() {
    console.log('[REPORTS] Generating sales report');

    const reportTypeEl = debugElement('reportType', 'generateSalesReport');
    const reportYearEl = debugElement('reportYear', 'generateSalesReport');
    const reportContainerEl = debugElement('reportContent', 'generateSalesReport');

    const reportType = reportTypeEl ? reportTypeEl.value : 'sales';
    const reportYear = reportYearEl ? reportYearEl.value : new Date().getFullYear();

    // Clear previous report
    if (reportContainerEl) {
        reportContainerEl.innerHTML = '';

        // Tambahkan container untuk chart jika tidak ada
        const chartDiv = document.createElement('div');
        chartDiv.id = 'reportChartContainer';
        chartDiv.className = 'mb-4';
        chartDiv.style.height = '300px';
        reportContainerEl.appendChild(chartDiv);
    } else {
        console.error('[ERROR] Report container not found');
        return;
    }

    let reportTitle = '';
    let reportData = [];

    switch (reportType) {
        case 'sales':
            reportTitle = 'Sales Report';
            reportData = generateSalesReportData(reportYear);
            generateSalesChart(reportData, reportYear);
            generateSalesTable(reportData, reportContainerEl);
            break;

        case 'products':
            reportTitle = 'Product Performance Report';
            reportData = generateProductReportData();
            generateProductsTable(reportData, reportContainerEl);
            break;

        case 'customers':
            reportTitle = 'Customer Analysis Report';
            reportData = generateCustomerReportData();
            generateCustomersTable(reportData, reportContainerEl);
            break;
    }

    // Set report title
    const reportTitleEl = debugElement('reportTitle', 'generateSalesReport');
    if (reportTitleEl) {
        reportTitleEl.textContent = reportTitle;
    }

    console.log(`[REPORTS] Generated ${reportType} report for year ${reportYear}`);
}

// Generate sales chart
function generateSalesChart(data, year) {
    console.log('[REPORTS] Generating sales chart');

    const reportChartContainer = debugElement('reportChartContainer', 'generateSalesChart');
    if (!reportChartContainer) {
        console.error('[ERROR] Report chart container not found');

        // Coba tambahkan container jika tidak ada
        const reportContent = document.getElementById('reportContent');
        if (reportContent) {
            // Buat container untuk chart
            const chartContainerDiv = document.createElement('div');
            chartContainerDiv.id = 'reportChartContainer';
            chartContainerDiv.className = 'mb-4';
            chartContainerDiv.style.height = '300px'; // Tetapkan tinggi spesifik

            // Tambahkan ke halaman
            reportContent.prepend(chartContainerDiv);

            // Gunakan container yang baru dibuat
            generateSalesChart(data, year);
            return;
        } else {
            return;
        }
    }

    // Bersihkan container dan buat canvas baru
    reportChartContainer.innerHTML = '';
    const canvasElement = document.createElement('canvas');
    canvasElement.id = 'reportChart';
    canvasElement.style.maxHeight = '300px';
    reportChartContainer.appendChild(canvasElement);

    const reportChartEl = document.getElementById('reportChart');
    if (!reportChartEl) {
        console.error('[ERROR] Report chart canvas element not found');
        return;
    }

    // Destroy existing chart if it exists
    destroyChart(reportSalesChart);

    const ctx = reportChartEl.getContext('2d');
    reportSalesChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.map(item => item.month),
            datasets: [{
                label: `Sales for ${year}`,
                data: data.map(item => item.sales),
                backgroundColor: 'rgba(0, 123, 255, 0.7)',
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Sales Amount ($)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Month'
                    }
                }
            }
        }
    });

    console.log('[REPORTS] Sales chart generated successfully');
}

// Generate sales report table
function generateSalesTable(data, container) {
    const table = document.createElement('table');
    table.className = 'table table-striped';

    let thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>Month</th>
            <th>Sales Amount</th>
            <th>Growth</th>
        </tr>
    `;

    let tbody = document.createElement('tbody');
    let totalSales = 0;

    data.forEach((item, index) => {
        const row = document.createElement('tr');
        const growthValue = index > 0 ? ((item.sales - data[index - 1].sales) / data[index - 1].sales * 100).toFixed(2) : '-';
        const growthClass = growthValue > 0 ? 'text-success' : growthValue < 0 ? 'text-danger' : '';
        const growthText = growthValue !== '-' ? `${growthValue}%` : '-';

        row.innerHTML = `
            <td>${item.month}</td>
            <td>${formatCurrency(item.sales)}</td>
            <td class="${growthClass}">${growthText}</td>
        `;

        totalSales += item.sales;
        tbody.appendChild(row);
    });

    // Add total row
    const totalRow = document.createElement('tr');
    totalRow.className = 'table-active font-weight-bold';
    totalRow.innerHTML = `
        <td>Total</td>
        <td>${formatCurrency(totalSales)}</td>
        <td></td>
    `;
    tbody.appendChild(totalRow);

    table.appendChild(thead);
    table.appendChild(tbody);
    container.appendChild(table);
}

// Generate product report data
function generateProductReportData() {
    // Calculate sales by product from the sales records
    // For demo purposes, we'll create mock data
    return [
        { name: 'Laptop HP 15s', sold: 42, revenue: 37799.58, rank: 1 },
        { name: 'Samsung Galaxy S22', sold: 38, revenue: 30399.62, rank: 2 },
        { name: 'Adidas Running Shoes', sold: 65, revenue: 5849.35, rank: 3 },
        { name: 'Cotton T-Shirt', sold: 110, revenue: 2198.90, rank: 4 },
        { name: 'Office Desk', sold: 15, revenue: 3749.85, rank: 5 },
        { name: 'Organic Coffee Beans', sold: 95, revenue: 1234.05, rank: 6 }
    ];
}

// Generate products table
function generateProductsTable(data, container) {
    console.log('[REPORTS] Generating products table');

    // Bersihkan container terlebih dahulu
    container.innerHTML = '';

    const table = document.createElement('table');
    table.className = 'table table-striped';

    let thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>Rank</th>
            <th>Product Name</th>
            <th>Units Sold</th>
            <th>Revenue</th>
        </tr>
    `;

    let tbody = document.createElement('tbody');

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.rank}</td>
            <td>${item.name}</td>
            <td>${item.sold}</td>
            <td>${formatCurrency(item.revenue)}</td>
        `;
        tbody.appendChild(row);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    container.appendChild(table);

    // Add chart for product sales distribution
    container.appendChild(document.createElement('hr'));

    // Buat chart container dengan tinggi yang tetap
    const chartContainer = document.createElement('div');
    chartContainer.className = 'mt-4';
    chartContainer.style.height = '300px';
    chartContainer.innerHTML = '<h5>Revenue Distribution by Product</h5>';

    // Buat canvas element
    const canvasElement = document.createElement('canvas');
    canvasElement.id = 'productPieChart';
    canvasElement.style.maxHeight = '250px';  // Tetapkan tinggi maksimum
    chartContainer.appendChild(canvasElement);

    container.appendChild(chartContainer);

    // Destroy existing chart if it exists
    destroyChart(productPieChart);

    const ctx = document.getElementById('productPieChart').getContext('2d');
    productPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: data.map(item => item.name),
            datasets: [{
                data: data.map(item => item.revenue),
                backgroundColor: [
                    'rgba(0, 123, 255, 0.8)',
                    'rgba(40, 167, 69, 0.8)',
                    'rgba(255, 193, 7, 0.8)',
                    'rgba(220, 53, 69, 0.8)',
                    'rgba(23, 162, 184, 0.8)',
                    'rgba(111, 66, 193, 0.8)'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.5,
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });

    console.log('[REPORTS] Products table and chart generated successfully');
}

// Generate customer report data
function generateCustomerReportData() {
    // Sort customers by total spent, descending
    return [...mockData.customers].sort((a, b) => b.totalSpent - a.totalSpent);
}

// Generate customers table
function generateCustomersTable(data, container) {
    console.log('[REPORTS] Generating customers table');

    // Bersihkan container terlebih dahulu
    container.innerHTML = '';

    const table = document.createElement('table');
    table.className = 'table table-striped';

    let thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>Customer Name</th>
            <th>Type</th>
            <th>Total Spent</th>
            <th>Last Purchase</th>
        </tr>
    `;

    let tbody = document.createElement('tbody');

    data.forEach(customer => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${customer.name}</td>
            <td>${customer.type}</td>
            <td>${formatCurrency(customer.totalSpent)}</td>
            <td>${customer.lastPurchase}</td>
        `;
        tbody.appendChild(row);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    container.appendChild(table);

    // Add chart for customer type distribution
    container.appendChild(document.createElement('hr'));

    // Buat chart container dengan tinggi yang tetap
    const chartContainer = document.createElement('div');
    chartContainer.className = 'mt-4';
    chartContainer.style.height = '300px';
    chartContainer.innerHTML = '<h5>Customer Segmentation</h5>';

    // Buat canvas element
    const canvasElement = document.createElement('canvas');
    canvasElement.id = 'customerTypeChart';
    canvasElement.style.maxHeight = '250px';  // Tetapkan tinggi maksimum
    chartContainer.appendChild(canvasElement);

    container.appendChild(chartContainer);

    // Count customers by type
    const customerTypes = {};
    data.forEach(customer => {
        if (!customerTypes[customer.type]) {
            customerTypes[customer.type] = 0;
        }
        customerTypes[customer.type]++;
    });

    const types = Object.keys(customerTypes);
    const counts = types.map(type => customerTypes[type]);

    // Destroy existing chart if it exists
    destroyChart(customerTypeChart);

    const ctx = document.getElementById('customerTypeChart').getContext('2d');
    customerTypeChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: types,
            datasets: [{
                data: counts,
                backgroundColor: [
                    'rgba(0, 123, 255, 0.8)',
                    'rgba(40, 167, 69, 0.8)',
                    'rgba(255, 193, 7, 0.8)'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.5,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    console.log('[REPORTS] Customers table and chart generated successfully');
}

// Initialize report filter handlers
document.getElementById('generateReportBtn')?.addEventListener('click', function () {
    generateSalesReport();
});

// User Authentication
function initAuth() {
    console.log('[AUTH] Initializing authentication...');

    // For demo purposes, using hardcoded admin credentials
    const adminCredentials = {
        username: 'admin',
        password: 'password123'
    };

    // Show login screen by default, hide main app
    const loginSection = document.getElementById('loginSection');
    const mainApp = document.getElementById('mainApp');

    if (loginSection && mainApp) {
        // Check if already logged in
        if (checkLoginState()) {
            console.log('[AUTH] User already logged in');
            loginSection.style.display = 'none';
            mainApp.style.display = 'block';
            loadDashboard();
        } else {
            console.log('[AUTH] User not logged in, showing login screen');
            loginSection.style.display = 'flex';
            mainApp.style.display = 'none';
        }

        // Handle login form submission
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            // Remove existing event listeners
            const newLoginForm = loginForm.cloneNode(true);
            loginForm.parentNode.replaceChild(newLoginForm, loginForm);

            newLoginForm.addEventListener('submit', function (e) {
                e.preventDefault();
                console.log('[AUTH] Login form submitted');

                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;

                if (username === adminCredentials.username && password === adminCredentials.password) {
                    // Successful login - save state
                    console.log('[AUTH] Login successful');
                    saveLoginState();

                    // Update UI
                    loginSection.style.display = 'none';
                    mainApp.style.display = 'block';

                    // Initialize the dashboard
                    loadDashboard();

                    // Update user info in header
                    const currentUser = document.getElementById('currentUser');
                    if (currentUser) {
                        currentUser.textContent = username;
                    }
                } else {
                    // Failed login
                    console.log('[AUTH] Login failed: Invalid credentials');
                    alert('Invalid username or password. Please try again.', 'error');
                }
            });

            console.log('[AUTH] Login form handler attached');
        }

        // Handle logout
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            // Remove existing event listeners
            const newLogoutBtn = logoutBtn.cloneNode(true);
            logoutBtn.parentNode.replaceChild(newLogoutBtn, logoutBtn);

            newLogoutBtn.addEventListener('click', function () {
                console.log('[AUTH] Logout requested');
                // Clear login state
                clearLoginState();

                // Update UI
                loginSection.style.display = 'flex';
                mainApp.style.display = 'none';

                const loginForm = document.getElementById('loginForm');
                if (loginForm) {
                    loginForm.reset();
                }

                console.log('[AUTH] Logout completed');
            });

            console.log('[AUTH] Logout button handler attached');
        }
    }

    console.log('[AUTH] Authentication initialization completed');
}

// Update dashboard statistics
function updateDashboardStats() {
    // Calculate total revenue
    const totalRevenue = mockData.sales.reduce((sum, sale) => sum + sale.amount, 0);

    const totalRevenueEl = document.getElementById('totalRevenue');
    if (totalRevenueEl) {
        totalRevenueEl.textContent = formatCurrency(totalRevenue);
    }

    // Count total customers
    const totalCustomersEl = document.getElementById('totalCustomers');
    if (totalCustomersEl) {
        totalCustomersEl.textContent = mockData.customers.length;
    }

    // Count total products
    const totalProductsEl = document.getElementById('totalProducts');
    if (totalProductsEl) {
        totalProductsEl.textContent = mockData.products.length;
    }

    // Calculate growth (comparing last month to previous month)
    const currentMonthIndex = new Date().getMonth();
    const currentMonth = mockData.salesByMonth[currentMonthIndex].sales;
    const previousMonth = mockData.salesByMonth[currentMonthIndex - 1]?.sales || 0;

    let growthRate = 0;
    if (previousMonth > 0) {
        growthRate = ((currentMonth - previousMonth) / previousMonth) * 100;
    }

    const salesGrowthEl = document.getElementById('salesGrowth');
    if (salesGrowthEl) {
        salesGrowthEl.textContent = `${growthRate.toFixed(1)}%`;
    }

    // Set growth indicator class
    const growthIndicator = document.getElementById('growthIndicator');
    if (growthIndicator) {
        if (growthRate > 0) {
            growthIndicator.className = 'text-success';
            growthIndicator.innerHTML = `<i data-feather="trending-up"></i> <span id="salesGrowth">${growthRate.toFixed(1)}%</span> from last month`;
        } else if (growthRate < 0) {
            growthIndicator.className = 'text-danger';
            growthIndicator.innerHTML = `<i data-feather="trending-down"></i> <span id="salesGrowth">${growthRate.toFixed(1)}%</span> from last month`;
        } else {
            growthIndicator.className = 'text-warning';
            growthIndicator.innerHTML = `<i data-feather="minus"></i> <span id="salesGrowth">${growthRate.toFixed(1)}%</span> from last month`;
        }
    }

    feather.replace();
}

// Generate sales report data by year
function generateSalesReportData(year) {
    console.log(`[REPORTS] Generating sales data for year ${year}`);

    // Filter sales by year if needed
    const yearFilter = parseInt(year);
    const currentYear = new Date().getFullYear();

    // Untuk demo, gunakan data bulanan yang sudah ada
    const salesData = [...mockData.salesByMonth];

    // Tambahkan total penjualan dari records penjualan
    const totalByMonth = new Array(12).fill(0);
    mockData.sales.forEach(sale => {
        const saleDate = new Date(sale.date);
        // Hanya proses data untuk tahun yang diminta
        if (saleDate.getFullYear() === yearFilter) {
            const month = saleDate.getMonth();
            totalByMonth[month] += sale.amount;
        }
    });

    // Jika ada data penjualan tambahan, tambahkan ke data bulanan
    for (let i = 0; i < salesData.length; i++) {
        if (totalByMonth[i] > 0) {
            salesData[i].sales += totalByMonth[i];
        }
    }

    console.log(`[REPORTS] Generated sales data with ${salesData.length} months`);
    return salesData;
}

// Fix modal accessibility issues
document.addEventListener('DOMContentLoaded', function () {
    console.log('[MODAL] Setting up modal event handlers');

    // Fungsi untuk menangani modal-modal Bootstrap
    function setupModalHandlers() {
        // Cara handle modal Bootstrap
        $('.modal').on('hidden.bs.modal', function () {
            console.log('[MODAL] Modal hidden event triggered');
            // Reset aria-hidden attribute
            $(this).removeAttr('aria-hidden');

            // Reset form jika ada
            const form = $(this).find('form');
            if (form.length > 0) {
                form[0].reset();
            }
        });

        $('.modal').on('show.bs.modal', function () {
            console.log('[MODAL] Modal show event triggered for:', this.id);
        });
    }

    // Panggil setupModalHandlers setelah beberapa saat untuk memastikan
    // bahwa jQuery dan Bootstrap telah dimuat dengan sempurna
    setTimeout(setupModalHandlers, 1000);
});

// Inisialisasi aplikasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', function () {
    console.log('[APP] Initializing application...');

    // Muat data aplikasi dari localStorage jika ada
    loadAppData();

    // Inisialisasi autentikasi
    initAuth();

    // Cek jika pengguna sudah login, maka load section yang sesuai
    if (checkLoginState()) {
        const loginSection = document.getElementById('loginSection');
        const mainApp = document.getElementById('mainApp');

        if (loginSection && mainApp) {
            loginSection.style.display = 'none';
            mainApp.style.display = 'block';

            // Dapatkan section aktif dari localStorage dan tampilkan
            const activeSection = getActiveSection();
            console.log(`[APP] Restoring active section: ${activeSection}`);

            // Muat konten yang sesuai
            switch (activeSection) {
                case 'dashboard-section':
                    loadDashboard();
                    break;
                case 'products-section':
                    showSection(activeSection);
                    loadProducts();
                    break;
                case 'customers-section':
                    showSection(activeSection);
                    loadCustomers();
                    break;
                case 'sales-section':
                    showSection(activeSection);
                    loadSales();
                    break;
                case 'reports-section':
                    showSection(activeSection);
                    loadReports();
                    break;
                default:
                    loadDashboard();
            }
        }
    }

    // Setup navigasi
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const href = this.getAttribute('href').replace('/', '');
            const sectionId = href ? `${href}-section` : 'dashboard-section';

            // Muat konten yang sesuai
            switch (sectionId) {
                case 'dashboard-section':
                    loadDashboard();
                    break;
                case 'products-section':
                    showSection(sectionId);
                    loadProducts();
                    break;
                case 'customers-section':
                    showSection(sectionId);
                    loadCustomers();
                    break;
                case 'sales-section':
                    showSection(sectionId);
                    loadSales();
                    break;
                case 'reports-section':
                    showSection(sectionId);
                    loadReports();
                    break;
                default:
                    loadDashboard();
            }
        });
    });

    // Setup handler laporan
    document.querySelectorAll('.list-group-item').forEach(reportLink => {
        reportLink.addEventListener('click', function (e) {
            e.preventDefault();

            // Tandai sebagai aktif
            document.querySelectorAll('.list-group-item').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');

            // Generate laporan sesuai id
            const reportId = this.id;
            generateSalesReport();
        });
    });

    console.log('[APP] Application initialized successfully');
});

// Update recent transactions on dashboard
function updateRecentTransactions() {
    console.log('[DASHBOARD] Updating recent transactions');

    const transactionsTable = document.getElementById('recent-transactions');
    if (!transactionsTable) {
        console.error('[ERROR] Recent transactions table not found');
        return; // Skip if element doesn't exist
    }

    // Clear existing content
    transactionsTable.innerHTML = '';

    // Sort sales by date (newest first)
    const sortedSales = [...mockData.sales].sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });

    // Display only the most recent 5 transactions
    sortedSales.slice(0, 5).forEach(sale => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${sale.invoice}</td>
            <td>${sale.customerName}</td>
            <td>${sale.items} items</td>
            <td>${sale.date}</td>
            <td>${formatCurrency(sale.amount)}</td>
            <td><span class="status-badge ${sale.status.toLowerCase()}">${sale.status}</span></td>
        `;
        transactionsTable.appendChild(row);
    });

    console.log('[DASHBOARD] Recent transactions updated successfully');
}

// Fungsi untuk menyimpan data ke localStorage
function saveAppData() {
    console.log('[STORAGE] Saving application data to localStorage');
    try {
        localStorage.setItem('salesAppData', JSON.stringify(mockData));
        return true;
    } catch (error) {
        console.error('[STORAGE] Error saving data to localStorage:', error);
        return false;
    }
}

// Fungsi untuk memuat data dari localStorage
function loadAppData() {
    console.log('[STORAGE] Loading application data from localStorage');
    try {
        const savedData = localStorage.getItem('salesAppData');
        if (savedData) {
            console.log('[STORAGE] Found saved data in localStorage');
            mockData = JSON.parse(savedData);
            return true;
        }
        console.log('[STORAGE] No saved data found in localStorage');
        return false;
    } catch (error) {
        console.error('[STORAGE] Error loading data from localStorage:', error);
        return false;
    }
}

// Fungsi untuk menampilkan dialog konfirmasi kustom
function showConfirm(message, onConfirm, onCancel) {
    console.log(`[CONFIRM] ${message}`);

    // Karena ini adalah prototype, kita masih menggunakan confirm browser untuk sementara
    // Tapi kita bisa menggantinya dengan UI kustom nanti
    if (confirm(message)) {
        if (typeof onConfirm === 'function') {
            onConfirm();
        }
    } else {
        if (typeof onCancel === 'function') {
            onCancel();
        }
    }
}

// Simpan section aktif di localStorage
function saveActiveSection(sectionId) {
    console.log(`[SECTION] Saving active section: ${sectionId}`);
    try {
        localStorage.setItem('salesAppActiveSection', sectionId);
        return true;
    } catch (error) {
        console.error('[SECTION] Error saving active section:', error);
        return false;
    }
}

// Dapatkan section aktif dari localStorage
function getActiveSection() {
    try {
        const activeSection = localStorage.getItem('salesAppActiveSection');
        console.log(`[SECTION] Retrieved active section: ${activeSection || 'none'}`);
        return activeSection || 'dashboard-section'; // Default ke dashboard jika tidak ada
    } catch (error) {
        console.error('[SECTION] Error getting active section:', error);
        return 'dashboard-section';
    }
}