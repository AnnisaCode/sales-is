// Initialize Feather icons
feather.replace();

// Simple navigation handling
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        // Remove active class from all links
        document.querySelectorAll('.nav-link').forEach(l => {
            l.classList.remove('active');
        });

        // Add active class to clicked link
        this.classList.add('active');

        // Hide all sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.style.display = 'none';
        });

        // Show appropriate section based on link
        const href = this.getAttribute('href').replace('/', '');
        const sectionId = href ? `${href}-section` : 'dashboard-section';
        document.getElementById(sectionId || 'dashboard-section').style.display = 'block';
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const dashboardData = [
        { title: 'Total Revenue', value: '$45,231.89', change: '+20.1% from last month' },
        { title: 'Customers', value: '+2350', change: '+180.1% from last month' },
        { title: 'Products', value: '+12,234', change: '+19% from last month' },
        { title: 'Growth Rate', value: '+573%', change: '+201% since last quarter' }
    ];

    const cardBodies = document.querySelectorAll('#dashboard-section .card-body');

    cardBodies.forEach((cardBody, index) => {
        const data = dashboardData[index];
        cardBody.querySelector('.card-title').textContent = data.title;
        cardBody.querySelector('.display-6').textContent = data.value;
        cardBody.querySelector('small').textContent = data.change;
    });
});