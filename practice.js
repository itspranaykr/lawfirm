// Practice Areas Page Specific JavaScript

// Smooth scrolling to practice area when coming from links with hash
document.addEventListener('DOMContentLoaded', function() {
    // Check if URL has a hash (e.g., practice-areas.html#criminal)
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
            setTimeout(() => {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Add highlight effect
                targetElement.style.boxShadow = '0 0 0 5px rgba(248, 180, 0, 0.3)';
                targetElement.style.transition = 'box-shadow 0.5s ease';
                
                // Remove highlight after 2 seconds
                setTimeout(() => {
                    targetElement.style.boxShadow = 'none';
                }, 2000);
            }, 300);
        }
    }
    
    // Add intersection observer for practice area cards
    const practiceObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe all practice area cards
    document.querySelectorAll('.area-card').forEach(card => {
        practiceObserver.observe(card);
    });
    
    // Check if cards are already in view on page load
    function checkPracticeAnimations() {
        document.querySelectorAll('.area-card').forEach(card => {
            const rect = card.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                card.classList.add('animated');
            }
        });
    }
    
    window.addEventListener('load', checkPracticeAnimations);
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
