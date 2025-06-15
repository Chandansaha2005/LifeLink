
// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or use system preference
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add('dark');
    themeToggle.checked = true;
} else {
    html.classList.remove('dark');
    themeToggle.checked = false;
}

// Toggle theme when switch is clicked
themeToggle.addEventListener('change', function () {
    if (this.checked) {
        html.classList.add('dark');
        localStorage.theme = 'dark';
    } else {
        html.classList.remove('dark');
        localStorage.theme = 'light';
    }
});

// Accordion functionality
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', function () {
        const targetId = this.getAttribute('data-target');
        const content = document.getElementById(targetId);

        // Toggle the accordion
        this.classList.toggle('open');
        content.classList.toggle('open');

        // Close other accordions
        document.querySelectorAll('.accordion-content').forEach(item => {
            if (item.id !== targetId && item.classList.contains('open')) {
                item.classList.remove('open');
                document.querySelector(`[data-target="${item.id}"]`).classList.remove('open');
            }
        });
    });
});

// View Report button functionality
document.querySelectorAll('.view-report-btn').forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();
        document.getElementById('report-modal').style.display = 'flex';
    });
});

// Close report modal
document.getElementById('close-modal').addEventListener('click', function () {
    document.getElementById('report-modal').style.display = 'none';
});

// Add New Record button functionality
document.getElementById('add-record-btn').addEventListener('click', function () {
    document.getElementById('add-record-modal').style.display = 'flex';
});

// Close add record modal
document.getElementById('close-add-modal').addEventListener('click', function () {
    document.getElementById('add-record-modal').style.display = 'none';
});

// Close modals when clicking outside
window.addEventListener('click', function (e) {
    const reportModal = document.getElementById('report-modal');
    const addRecordModal = document.getElementById('add-record-modal');

    if (e.target === reportModal) {
        reportModal.style.display = 'none';
    }

    if (e.target === addRecordModal) {
        addRecordModal.style.display = 'none';
    }
});
