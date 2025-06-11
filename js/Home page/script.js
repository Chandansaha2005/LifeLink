 // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        const htmlElement = document.documentElement;

        // Check for saved theme preference or use system preference
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
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

        // Mobile menu toggle
        const menuToggle = document.getElementById('menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');

        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    if (!mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                    }
                }
            });
        });

        // Form submission (demo)
        const contactForm = document.querySelector('#contact form');
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            if (nameInput.value && emailInput.value && messageInput.value) {
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });

        // Header shadow on scroll
        window.addEventListener('scroll', function () {
            const header = document.querySelector('header');
            if (window.scrollY > 10) {
                header.classList.add('shadow-md');
            } else {
                header.classList.remove('shadow-md');
            }
        });

        // Reveal animations on scroll
        function reveal() {
            const reveals = document.querySelectorAll('.reveal');

            reveals.forEach(element => {
                const windowHeight = window.innerHeight;
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;

                if (elementTop < windowHeight - elementVisible) {
                    element.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', reveal);
        reveal(); // Run once on page load