// Careers Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Floating Contact Box Toggle
    const contactToggle = document.querySelector('.contact-toggle');
    const floatingContact = document.querySelector('.floating-contact');
    
    if (contactToggle) {
        contactToggle.addEventListener('click', function() {
            floatingContact.classList.toggle('active');
        });
    }
    
    // Close floating contact when clicking outside
    document.addEventListener('click', function(e) {
        if (!floatingContact.contains(e.target) && e.target !== contactToggle) {
            floatingContact.classList.remove('active');
        }
    });
    
    
    
    // Highlight current position when coming from Apply Now button
    if (window.location.hash === '#application-form') {
        setTimeout(() => {
            const formSection = document.getElementById('application-form');
            if (formSection) {
                window.scrollTo({
                    top: formSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        }, 300);
    }
    
    // Animate steps and position cards when they come into view
    const careersObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe all steps and position cards
    document.querySelectorAll('.step, .position-card').forEach(element => {
        careersObserver.observe(element);
    });
    
    // Check if elements are already in view on page load
    function checkCareersAnimations() {
        document.querySelectorAll('.step, .position-card').forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                element.classList.add('animated');
            }
        });
    }
    
    window.addEventListener('load', checkCareersAnimations);
});

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


document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('application-form');
    const confirmationMessage = document.getElementById('confirmation-message');
    const closeButton = document.getElementById('close-message');

    // Smooth scroll from cover page to form
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            document.querySelector('.application-form').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Form submission handler
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = 'red';
                    isValid = false;
                    
                    // Remove error styling when user starts typing
                    field.addEventListener('input', function() {
                        if (this.value.trim()) {
                            this.style.borderColor = '';
                        }
                    });
                }
            });
            
            if (!isValid) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Create overlay
            const overlay = document.createElement('div');
            overlay.className = 'confirmation-overlay';
            document.body.appendChild(overlay);
            
            // Show confirmation message
            confirmationMessage.style.display = 'block';
            overlay.style.display = 'block';
            
            // Disable scrolling when modal is open
            document.body.style.overflow = 'hidden';
            
            // Close button handler
            closeButton.addEventListener('click', function() {
                confirmationMessage.style.display = 'none';
                overlay.style.display = 'none';
                document.body.style.overflow = '';
                
                // Reset form
                form.reset();
                
                // Remove overlay
                document.body.removeChild(overlay);
            });
            
            // Actually submit the form to Web3Forms
            const formData = new FormData(form);
            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Form submission successful:', data);
            })
            .catch(error => {
                console.error('Error submitting form:', error);
                // You might want to show an error message to the user here
            });
        });
    }
    
    // Graduation year validation
    const graduationYearInput = document.getElementById('graduation-year');
    if (graduationYearInput) {
        graduationYearInput.addEventListener('change', function() {
            const currentYear = new Date().getFullYear();
            const enteredYear = parseInt(this.value);
            
            if (enteredYear < 1900 || enteredYear > currentYear + 5) {
                alert(`Please enter a valid graduation year between 1900 and ${currentYear + 5}`);
                this.value = '';
                this.focus();
            }
        });
    }
    
   
});