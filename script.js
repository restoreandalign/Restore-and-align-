// ===================================
// Restore and Align - Main JavaScript
// Tara Jayne | Sydney, NSW, Australia
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // Mobile Navigation Toggle
    // ===================================
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // ===================================
    // Smooth Scrolling for Navigation Links
    // ===================================
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===================================
    // Active Navigation Link on Scroll
    // ===================================
    const sections = document.querySelectorAll('section');
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        // Add scrolled class to navbar
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Determine active section
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // ===================================
    // Fade In Animation on Scroll
    // ===================================
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });
    
    // ===================================
    // Contact Form Handling
    // ===================================
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value
        };
        
        // Validate form
        if (!formData.name || !formData.email || !formData.service || !formData.message) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission (in production, this would send to a server)
        showFormMessage('Thank you for reaching out! Tara will get back to you soon. 💜', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Log to console (for demonstration - in production this would be sent to a server)
        console.log('Form submitted:', formData);
        
        // In a real implementation, you would send this data to a server:
        // fetch('/api/contact', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(formData)
        // })
        // .then(response => response.json())
        // .then(data => {
        //     showFormMessage('Thank you for reaching out! Tara will get back to you soon. 💜', 'success');
        //     contactForm.reset();
        // })
        // .catch(error => {
        //     showFormMessage('Something went wrong. Please try again or reach out via Facebook.', 'error');
        // });
    });
    
    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Hide message after 8 seconds for success, 5 seconds for error
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, type === 'success' ? 8000 : 5000);
    }
    
    // ===================================
    // Floating Button Visibility
    // ===================================
    const floatingBtn = document.getElementById('floatingBtn');
    
    window.addEventListener('scroll', function() {
        // Show floating button after scrolling past hero section
        if (window.scrollY > window.innerHeight) {
            floatingBtn.style.display = 'flex';
        } else {
            floatingBtn.style.display = 'none';
        }
    });
    
    // ===================================
    // Smooth Scroll for CTA Buttons
    // ===================================
    const ctaButtons = document.querySelectorAll('a[href^="#"]');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ===================================
    // Service Selection Helper
    // ===================================
    const serviceCards = document.querySelectorAll('.service-card');
    const serviceSelect = document.getElementById('service');
    
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const serviceTitle = this.querySelector('.service-title').textContent;
            
            // Map service titles to select options
            const serviceMap = {
                'Intuitive Massage': 'intuitive-massage',
                'Reiki Energy Healing': 'reiki',
                'Distant Reiki': 'distant-reiki',
                'Crystal Healing': 'crystal-healing',
                'Breathwork': 'breathwork',
                'Empowerment Coaching': 'empowerment-coaching',
                'Tarot Reading': 'tarot',
                'Nails & Tans': 'nails-tans',
                'Indian Head Massage': 'indian-head'
            };
            
            const serviceValue = serviceMap[serviceTitle];
            if (serviceValue) {
                // Scroll to contact section
                const contactSection = document.querySelector('#contact');
                const offsetTop = contactSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Pre-select the service after a brief delay
                setTimeout(() => {
                    serviceSelect.value = serviceValue;
                    serviceSelect.focus();
                }, 800);
            }
        });
    });
    
    // ===================================
    // Add hover effect to service cards
    // ===================================
    serviceCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.setAttribute('title', 'Click to book this service');
    });
    
    // ===================================
    // Initialize animations for elements in viewport
    // ===================================
    fadeElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        if (isInViewport) {
            element.classList.add('visible');
        }
    });
    
    // ===================================
    // Prevent form resubmission on page refresh
    // ===================================
    if (window.history.replaceState) {
        window.history.replaceState(null, null, window.location.href);
    }
    
    // ===================================
    // Console Welcome Message
    // ===================================
    console.log('%c✨ Restore and Align ✨', 'font-size: 20px; font-weight: bold; color: #C9A84C;');
    console.log('%cA sacred space for healing and transformation', 'font-size: 14px; color: #4A4A4A;');
    console.log('%cBuilt with love for Tara Jayne 💜', 'font-size: 12px; color: #E8D5F0;');
});

// ===================================
// Handle page visibility changes
// ===================================
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden
        console.log('User left the page');
    } else {
        // Page is visible
        console.log('User returned to the page');
    }
});

// ===================================
// Accessibility: Keyboard navigation for service cards
// ===================================
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        const activeElement = document.activeElement;
        if (activeElement.classList.contains('service-card')) {
            activeElement.click();
        }
    }
});

// ===================================
// Performance: Lazy load images
// ===================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}
