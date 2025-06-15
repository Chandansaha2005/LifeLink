// JavaScript for modal report view and UI functionality

document.querySelectorAll('.view-report-btn').forEach(button => {
    button.addEventListener('click', () => {
        const reportId = button.getAttribute('data-report');
        const reportDiv = document.getElementById(reportId);
        if (reportDiv) {
            reportDiv.classList.remove('hidden');
        } else {
            console.warn('Report div not found:', reportId);
        }
    });
});

function closeReport(id) {
    document.getElementById(id).classList.add('hidden');
}

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    htmlElement.classList.add('dark');
    themeToggle.checked = true;
}

themeToggle.addEventListener('change', function () {
    if (this.checked) {
        htmlElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        htmlElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
});

// Accordion
const accordionHeaders = document.querySelectorAll('.accordion-header');
accordionHeaders.forEach(header => {
    header.addEventListener('click', function () {
        const targetId = this.getAttribute('data-target');
        const content = document.getElementById(targetId);
        content.classList.toggle('open');
        this.classList.toggle('open');
    });
});

// Tab switching
const tabs = document.querySelectorAll('.tab');
const cards = document.querySelectorAll('.card');

tabs.forEach(tab => {
    tab.addEventListener('click', function () {
        tabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        const tabType = this.getAttribute('data-tab');

        cards.forEach(card => {
            if (tabType === 'all' || card.id === `${tabType}-card`) {
                card.style.display = 'block';
                const content = document.getElementById(`${tabType}-content`);
                const header = card.querySelector('.accordion-header');
                if (content && !content.classList.contains('open')) {
                    content.classList.add('open');
                    header.classList.add('open');
                }
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Modal
const reportModal = document.getElementById('report-modal');
const closeModal = document.getElementById('close-modal');
const reportButtons = document.querySelectorAll('.view-report-btn');
const reportTitle = document.getElementById('report-title');
const reportContent = document.getElementById('report-content');

reportButtons.forEach(button => {
    button.addEventListener('click', function () {
        const reportType = this.getAttribute('data-report');
        switch (reportType) {
            case 'fbs-report': reportTitle.textContent = 'Blood Sugar (FBS) Report'; break;
            case 'bp-report': reportTitle.textContent = 'Blood Pressure (BP) Report'; break;
            case 'hr-report': reportTitle.textContent = 'Heart Rate (HR) Report'; break;
            case 'spo2-report': reportTitle.textContent = 'Oxygen Saturation (SPO2) Report'; break;
            case 'cholesterol-report': reportTitle.textContent = 'Cholesterol Report'; break;
            default: reportTitle.textContent = 'Health Report';
        }
        generateReportContent(reportType);
        reportModal.classList.add('open');
    });
});

closeModal.addEventListener('click', () => {
    reportModal.classList.remove('open');
});

reportModal.addEventListener('click', e => {
    if (e.target === reportModal) {
        reportModal.classList.remove('open');
    }
});

function generateReportContent(reportType) {
    let content = `
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div class="flex justify-between items-center mb-3">
                <div>
                    <h4 class="font-medium text-gray-800 dark:text-white">Patient: John Doe</h4>
                    <p class="text-sm text-gray-500 dark:text-gray-400">ID: 12345678</p>
                </div>
                <div class="text-right">
                    <p class="text-sm text-gray-500 dark:text-gray-400">Date: ${new Date().toLocaleDateString()}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Time: ${new Date().toLocaleTimeString()}</p>
                </div>
            </div>
        </div>
    `;

    if (reportType === 'fbs-report') {
        content += `
            <div class="space-y-3">
                <div class="flex justify-between items-center">
                    <span class="text-gray-700 dark:text-gray-300">Test Type:</span>
                    <span class="font-medium text-gray-900 dark:text-white">Fasting Blood Sugar</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-gray-700 dark:text-gray-300">Result:</span>
                    <span class="font-medium text-gray-900 dark:text-white">95 mg/dL</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-gray-700 dark:text-gray-300">Normal Range:</span>
                    <span class="font-medium text-gray-900 dark:text-white">70-100 mg/dL</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-gray-700 dark:text-gray-300">Status:</span>
                    <span class="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs">Normal</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-gray-700 dark:text-gray-300">Normalized Value:</span>
                    <span class="font-medium text-gray-900 dark:text-white">83.3 / 100</span>
                </div>
                <div class="pt-2">
                    <span class="text-gray-700 dark:text-gray-300">Notes:</span>
                    <p class="mt-1 text-gray-600 dark:text-gray-400 text-sm">Patient's fasting blood sugar levels are within normal range. Continue with current diet and exercise regimen.</p>
                </div>
                <div class="flex items-center pt-2">
                    <div class="data-source-tag tag-me">
                        <span>Added by Me</span>
                    </div>
                    <div class="data-source-tag tag-pathologist ml-2">
                        <span>Edited by Dr. Smith</span>
                    </div>
                </div>
            </div>
        `;
    } else if (reportType === 'bp-report') {
        content += `
            <div class="space-y-3">
                <div class="flex justify-between items-center">
                    <span class="text-gray-700 dark:text-gray-300">Test Type:</span>
                    <span class="font-medium text-gray-900 dark:text-white">Blood Pressure</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-gray-700 dark:text-gray-300">Result:</span>
                    <span class="font-medium text-gray-900 dark:text-white">120/80 mmHg</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-gray-700 dark:text-gray-300">Normal Range:</span>
                    <span class="font-medium text-gray-900 dark:text-white">90-120/60-80 mmHg</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-gray-700 dark:text-gray-300">Status:</span>
                    <span class="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs">Normal</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-gray-700 dark:text-gray-300">Normalized Value:</span>
                    <span class="font-medium text-gray-900 dark:text-white">Systolic: 90.0 / 100, Diastolic: 85.0 / 100</span>
                </div>
                <div class="pt-2">
                    <span class="text-gray-700 dark:text-gray-300">Notes:</span>
                    <p class="mt-1 text-gray-600 dark:text-gray-400 text-sm">Blood pressure is at the upper limit of normal range. Recommend continued monitoring and maintaining healthy lifestyle.</p>
                </div>
            </div>
        `;
    }

    reportContent.innerHTML = content;
}
