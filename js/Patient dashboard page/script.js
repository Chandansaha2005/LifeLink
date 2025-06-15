
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
            } else {
                htmlElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
        });

        // Patient Details Edit Functionality
        const editButton = document.getElementById('edit-button');
        const cancelButton = document.getElementById('cancel-button');
        const saveButton = document.getElementById('save-button');
        const formActions = document.getElementById('form-actions');
        const formInputs = document.querySelectorAll('#patient-form input, #patient-form select');
        const successCheckmark = document.getElementById('success-checkmark');

        // Store original values
        const originalValues = {};
        formInputs.forEach(input => {
            originalValues[input.id] = input.value;
        });

        // Enable editing
        editButton.addEventListener('click', function () {
            formInputs.forEach(input => {
                input.disabled = false;
            });
            formActions.classList.remove('hidden');
        });

        // Cancel editing
        cancelButton.addEventListener('click', function () {
            formInputs.forEach(input => {
                input.value = originalValues[input.id];
                input.disabled = true;
            });
            formActions.classList.add('hidden');
        });

        // Save changes
        saveButton.addEventListener('click', function () {
            // Basic validation
            let isValid = true;
            formInputs.forEach(input => {
                if (input.value.trim() === '') {
                    isValid = false;
                    input.classList.add('border-red-500');
                } else {
                    input.classList.remove('border-red-500');
                }
            });

            if (!isValid) {
                alert('Please fill in all fields.');
                return;
            }

            // Update original values
            formInputs.forEach(input => {
                originalValues[input.id] = input.value;
                input.disabled = true;
            });

            // Hide form actions
            formActions.classList.add('hidden');

            // Show success animation
            successCheckmark.classList.add('show');

            // Hide success animation after delay
            setTimeout(() => {
                successCheckmark.classList.remove('show');
            }, 1500);
        });

        // Bottom Navigation
        const navItems = document.querySelectorAll('.nav-item');

        navItems.forEach(item => {
            item.addEventListener('click', function (e) {

                // Remove active class from all items
                navItems.forEach(navItem => {
                    navItem.classList.remove('active');
                });

                // Add active class to clicked item
                this.classList.add('active');
            });
        });

        // Profile Button
        const profileButton = document.getElementById('profile-button');

        profileButton.addEventListener('click', function () {
            alert('Profile settings would open here.');
        });

        
        