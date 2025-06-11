
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

        // Mobile Menu Toggle
        const menuToggle = document.getElementById('menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');

        menuToggle.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
        });

        // Password Visibility Toggle
        const passwordToggles = document.querySelectorAll('.password-toggle');

        passwordToggles.forEach(toggle => {
            toggle.addEventListener('click', function () {
                const passwordField = this.closest('.relative').querySelector('input');
                const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordField.setAttribute('type', type);

                // Change the icon
                const svg = this.querySelector('svg');
                if (type === 'text') {
                    svg.innerHTML = '<path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />';
                } else {
                    svg.innerHTML = '<path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 00-2.79.588l.77.771A5.944 5.944 0 018 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0114.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" /><path d="M11.297 9.176a3.5 3.5 0 00-4.474-4.474l.823.823a2.5 2.5 0 012.829 2.829l.822.822zm-2.943 1.299l.822.822a3.5 3.5 0 01-4.474-4.474l.823.823a2.5 2.5 0 002.829 2.829z" /><path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 001.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 018 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709z" /><path fill-rule="evenodd" d="M13.646 14.354l-12-12 .708-.708 12 12-.708.708z" clip-rule="evenodd" />';
                }
            });
        });

        // Form Flip Animation
        const authContainer = document.getElementById('auth-container');
        const showSignupBtn = document.getElementById('show-signup');
        const showLoginBtn = document.getElementById('show-login');

        showSignupBtn.addEventListener('click', function () {
            authContainer.classList.add('flipped');
            resetFormAnimations();
        });

        showLoginBtn.addEventListener('click', function () {
            authContainer.classList.remove('flipped');
            resetFormAnimations();
        });

        // Reset form field animations when switching forms
        function resetFormAnimations() {
            const formFields = document.querySelectorAll('.form-field');
            formFields.forEach(field => {
                field.style.animation = 'none';
                field.offsetHeight; // Trigger reflow
                field.style.animation = null;
            });
        }

        // Form Submission (Demo)
        const loginForm = document.getElementById('login-form');
        const signupForm = document.getElementById('signup-form');

        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            // Demo: Simulate login success
            alert('Login successful! Redirecting to dashboard...');
        });

        signupForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Basic password match validation
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            // Demo: Simulate signup success
            alert('Account created successfully! Please check your email for verification.');
            authContainer.classList.remove('flipped');
        });

        // Initialize form field animations on page load
        document.addEventListener('DOMContentLoaded', function () {
            resetFormAnimations();
        });