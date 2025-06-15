
// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or use device preference
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
        updateChartColors(true);
    } else {
        htmlElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        updateChartColors(false);
    }
});

// Set today's date as default
const testDateInput = document.getElementById('test-date');
const today = new Date();
const formattedDate = today.toISOString().split('T')[0];
testDateInput.value = formattedDate;

// Form field animation on focus
const formFields = document.querySelectorAll('.form-field');
formFields.forEach(field => {
    field.addEventListener('focus', function () {
        this.classList.add('animate-input-bounce');
        setTimeout(() => {
            this.classList.remove('animate-input-bounce');
        }, 300);
    });
});

// Auto-populate ranges based on test type
const reportTypeSelect = document.getElementById('report-type');
const minValueInput = document.getElementById('min-value');
const maxValueInput = document.getElementById('max-value');

const testRanges = {
    'fbs': { min: 70, max: 100, name: 'Fasting Blood Sugar (FBS)' },
    'bp': { min: 90, max: 120, name: 'Blood Pressure (BP)' },
    'hr': { min: 60, max: 100, name: 'Heart Rate' },
    'spo2': { min: 95, max: 100, name: 'Oxygen Saturation (SPO2)' },
    'cholesterol': { min: 125, max: 200, name: 'Cholesterol' },
    'hba1c': { min: 4, max: 5.7, name: 'HbA1c' },
    'bmi': { min: 18.5, max: 24.9, name: 'Body Mass Index (BMI)' },
    'temperature': { min: 97, max: 99, name: 'Body Temperature' }
};

reportTypeSelect.addEventListener('change', function () {
    const selectedTest = this.value;
    if (testRanges[selectedTest]) {
        minValueInput.value = testRanges[selectedTest].min;
        maxValueInput.value = testRanges[selectedTest].max;
    } else {
        minValueInput.value = '';
        maxValueInput.value = '';
    }
});

// Section navigation
const section1 = document.getElementById('section-1');
const section2 = document.getElementById('section-2');
const section3 = document.getElementById('section-3');
const successSection = document.getElementById('success-section');

// Progress steps
const stepCircle1 = document.getElementById('step-circle-1');
const stepCircle2 = document.getElementById('step-circle-2');
const stepCircle3 = document.getElementById('step-circle-3');
const stepLabel1 = document.getElementById('step-label-1');
const stepLabel2 = document.getElementById('step-label-2');
const stepLabel3 = document.getElementById('step-label-3');
const stepLine1 = document.getElementById('step-line-1');
const stepLine2 = document.getElementById('step-line-2');

// Navigation buttons
const backToDataBtn = document.getElementById('back-to-data');
const continueToReportBtn = document.getElementById('continue-to-report');
const backToGraphBtn = document.getElementById('back-to-graph');
const viewReportsBtn = document.getElementById('view-reports-button');
const addNewDataBtn = document.getElementById('add-new-data-button');

// File upload
const fileUpload = document.getElementById('file-upload');
const filePreview = document.getElementById('file-preview');
const fileName = document.getElementById('file-name');
const removeFile = document.getElementById('remove-file');

// Success animations
const successCheckmark = document.getElementById('success-checkmark');
const successToast = document.getElementById('success-toast');

// Health data storage
let healthData = {
    reportType: '',
    testValue: 0,
    minValue: 0,
    maxValue: 0,
    testDate: '',
    normalizedValue: 0
};

// Sample data for the chart
let chartData = {
    labels: [],
    values: []
};

// Chart instance
let healthChart;

// Function to update progress steps
function updateProgressStep(step) {
    // Reset all steps
    stepCircle1.classList.remove('active', 'completed');
    stepCircle2.classList.remove('active', 'completed');
    stepCircle3.classList.remove('active', 'completed');
    stepLabel1.classList.remove('active');
    stepLabel2.classList.remove('active');
    stepLabel3.classList.remove('active');
    stepLine1.classList.remove('active');
    stepLine2.classList.remove('active');

    // Set active step
    if (step >= 1) {
        if (step > 1) {
            stepCircle1.classList.add('completed');
            stepLine1.classList.add('active');
        } else {
            stepCircle1.classList.add('active');
        }
        stepLabel1.classList.add('active');
    }

    if (step >= 2) {
        if (step > 2) {
            stepCircle2.classList.add('completed');
            stepLine2.classList.add('active');
        } else {
            stepCircle2.classList.add('active');
        }
        stepLabel2.classList.add('active');
    }

    if (step >= 3) {
        stepCircle3.classList.add('active');
        stepLabel3.classList.add('active');
    }
}


// Function to navigate between sections
function navigateToSection(sectionNumber) {
    // Hide all sections
    section1.classList.add('hidden');
    section2.classList.add('hidden');
    section3.classList.add('hidden');
    successSection.classList.add('hidden');

    // Show the requested section
    if (sectionNumber === 1) {
        section1.classList.remove('hidden');
        updateProgressStep(1);
    } else if (sectionNumber === 2) {
        section2.classList.remove('hidden');
        updateProgressStep(2);
    } else if (sectionNumber === 3) {
        section3.classList.remove('hidden');
        updateProgressStep(3);
    } else if (sectionNumber === 4) {
        successSection.classList.remove('hidden');
        updateProgressStep(3);
    }
}

// Function to normalize a value
function normalizeValue(value, originalMin, originalMax, targetMin = 75, targetMax = 100) {
    // Linear mapping formula
    return targetMin + ((value - originalMin) / (originalMax - originalMin)) * (targetMax - targetMin);
}

// Function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Function to generate sample data for the chart
function generateSampleData(reportType, testValue, minValue, maxValue, testDate) {
    const normalizedValue = normalizeValue(testValue, minValue, maxValue);

    // Generate dates for the past month
    const dates = [];
    const values = [];
    const normalizedValues = [];

    const endDate = new Date(testDate);

    // Add the current test value
    dates.push(formatDate(testDate));
    values.push(testValue);
    normalizedValues.push(normalizedValue);

    // Generate some random historical data (30 days)
    for (let i = 1; i <= 30; i++) {
        const date = new Date(endDate);
        date.setDate(date.getDate() - i);

        // Generate a random value within a reasonable range
        const randomValue = minValue + Math.random() * (maxValue - minValue);
        const normalizedRandomValue = normalizeValue(randomValue, minValue, maxValue);

        dates.push(formatDate(date.toISOString()));
        values.push(parseFloat(randomValue.toFixed(2)));
        normalizedValues.push(parseFloat(normalizedRandomValue.toFixed(2)));
    }

    // Update global chartData
    chartData.labels = dates.reverse();
    chartData.values = normalizedValues.reverse();
}

// Function to render chart
function renderChart() {
    const ctx = document.getElementById('health-chart').getContext('2d');

    // Destroy previous chart if exists
    if (healthChart) {
        healthChart.destroy();
    }

    healthChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartData.labels,
            datasets: [{
                label: 'Normalized Health Metric',
                data: chartData.values,
                fill: false,
                borderColor: '#3B82F6',
                backgroundColor: '#3B82F6',
                tension: 0.4,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 120
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: htmlElement.classList.contains('dark') ? '#fff' : '#000'
                    }
                }
            }
        }
    });
}

// Function to update chart colors when theme changes
function updateChartColors(isDark) {
    if (!healthChart) return;

    healthChart.options.plugins.legend.labels.color = isDark ? '#fff' : '#000';
    healthChart.update();
}

// Button event listeners
continueToReportBtn.addEventListener('click', () => {
    healthData.reportType = reportTypeSelect.value;
    healthData.testValue = parseFloat(document.getElementById('test-value').value);
    healthData.minValue = parseFloat(minValueInput.value);
    healthData.maxValue = parseFloat(maxValueInput.value);
    healthData.testDate = testDateInput.value;

    if (!healthData.reportType || isNaN(healthData.testValue)) {
        alert('Please fill in all required fields.');
        return;
    }

    healthData.normalizedValue = normalizeValue(
        healthData.testValue,
        healthData.minValue,
        healthData.maxValue
    ).toFixed(2);

    generateSampleData(
        healthData.reportType,
        healthData.testValue,
        healthData.minValue,
        healthData.maxValue,
        healthData.testDate
    );

    renderChart();
    navigateToSection(3);
});

backToDataBtn.addEventListener('click', () => navigateToSection(1));
backToGraphBtn.addEventListener('click', () => navigateToSection(2));
viewReportsBtn.addEventListener('click', () => navigateToSection(4));
addNewDataBtn.addEventListener('click', () => navigateToSection(1));

// File upload preview
fileUpload.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        fileName.textContent = file.name;
        filePreview.classList.remove('hidden');
    }
});

removeFile.addEventListener('click', function () {
    fileUpload.value = '';
    filePreview.classList.add('hidden');
    fileName.textContent = '';
});
const normalizeBtn = document.getElementById('normalize-button');

normalizeBtn.addEventListener('click', (e) => {
    e.preventDefault();

    healthData.reportType = reportTypeSelect.value;
    healthData.testValue = parseFloat(document.getElementById('test-value').value);
    healthData.minValue = parseFloat(minValueInput.value);
    healthData.maxValue = parseFloat(maxValueInput.value);
    healthData.testDate = testDateInput.value;

    if (!healthData.reportType || isNaN(healthData.testValue)) {
        alert('Please fill in all required fields.');
        return;
    }

    healthData.normalizedValue = normalizeValue(
        healthData.testValue,
        healthData.minValue,
        healthData.maxValue
    ).toFixed(2);

    // ✅ Fill readonly fields
    document.getElementById('report-type-display').value = testRanges[healthData.reportType]?.name || healthData.reportType;
    document.getElementById('report-date').value = formatDate(healthData.testDate);

    generateSampleData(
        healthData.reportType,
        healthData.testValue,
        healthData.minValue,
        healthData.maxValue,
        healthData.testDate
    );

    renderChart();
    navigateToSection(2); // Go to graph section
});
const uploadReportBtn = document.getElementById('upload-report-button');

uploadReportBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Optional: prevents form submission if it's in a form
    navigateToSection(4); // Show the success section
});
