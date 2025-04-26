document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Animated counter for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounters() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000; // Animation duration in ms
            const step = target / (duration / 16); // 60fps
            
            let current = 0;
            const counter = setInterval(() => {
                current += step;
                if (current >= target) {
                    clearInterval(counter);
                    current = target;
                }
                stat.textContent = Math.floor(current);
            }, 16);
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('stats')) {
                    animateCounters();
                }
                
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate when scrolled to
    document.querySelectorAll('.feature, .area-card, .about-image, .stats').forEach(el => {
        observer.observe(el);
    });
    
    
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Video play button functionality
    const playButton = document.querySelector('.play-button');
    if (playButton) {
        playButton.addEventListener('click', function() {
            // In a real implementation, this would open a modal with the video
            alert('Video playback would start here. In a real implementation, this would open a modal with the video player.');
        });
    }
    
    // Initialize animations for elements already in view
    function checkInitialAnimations() {
        document.querySelectorAll('.feature, .area-card, .about-image, .stats').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                el.classList.add('animated');
                if (el.classList.contains('stats')) {
                    animateCounters();
                }
            }
        });
    }
    
    window.addEventListener('load', checkInitialAnimations);
});

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const caseTypeSelect = document.getElementById('caseType');
    const otherCaseContainer = document.querySelector('.other-case-container');

    // Show/hide "Other Case" field based on selection
    caseTypeSelect.addEventListener('change', function() {
        if (this.value === 'Other') {
            otherCaseContainer.style.display = 'block';
            document.getElementById('otherCase').setAttribute('required', '');
        } else {
            otherCaseContainer.style.display = 'none';
            document.getElementById('otherCase').removeAttribute('required');
        }
    });

    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (validateForm()) {
            // Get form values
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const caseType = caseTypeSelect.value === 'Other' ? 
                           document.getElementById('otherCase').value : caseTypeSelect.value;
            const message = document.getElementById('message').value;
            
            // Create WhatsApp message
            const whatsappMessage = `
*New Legal Inquiry - Gaur Legal Services*

*Name:* ${name}
*Phone:* ${phone}
*Email:* ${email}
*Case Type:* ${caseType}

*Message:*
${message}

_I submitted this inquiry through the Gaur Legal Services website._
            `.trim();
            
            // Encode message for URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // Open WhatsApp with the message
            window.open(`https://wa.me/919376457792?text=${encodedMessage}`, '_blank');
        }
    });

    // Form validation
    function validateForm() {
        let isValid = true;
        const requiredFields = contactForm.querySelectorAll('[required]');
        
        // Clear previous error messages
        document.querySelectorAll('.error-message').forEach(el => {
            el.style.display = 'none';
        });
        
        // Check required fields
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                const errorMsg = field.nextElementSibling || 
                               field.parentNode.nextElementSibling;
                if (errorMsg && errorMsg.classList.contains('error-message')) {
                    errorMsg.style.display = 'block';
                    isValid = false;
                }
            }
        });
        
        // Validate phone number format
        const phone = document.getElementById('phone');
        if (phone.value && !/^[0-9]{10,15}$/.test(phone.value)) {
            const errorMsg = phone.nextElementSibling;
            if (errorMsg) {
                errorMsg.textContent = 'Please enter a valid phone number';
                errorMsg.style.display = 'block';
                isValid = false;
            }
        }
        
        // Validate email format
        const email = document.getElementById('email');
        if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            const errorMsg = email.nextElementSibling;
            if (errorMsg) {
                errorMsg.textContent = 'Please enter a valid email address';
                errorMsg.style.display = 'block';
                isValid = false;
            }
        }
        
        return isValid;
    }
});