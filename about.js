// About Page Specific JavaScript
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
// Animate stats on about page
function animateAboutStats() {
    const statNumbers = document.querySelectorAll('.about-stats .stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        
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

// Update the Intersection Observer to include about page elements
const aboutObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('about-stats')) {
                animateAboutStats();
            }
            
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

// Observe elements on about page
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.about-stats')) {
        document.querySelectorAll('.about-stats, .step, .specialty, .value-card').forEach(el => {
            aboutObserver.observe(el);
        });
    }
    
    // Check if elements are already in view on page load
    function checkAboutAnimations() {
        document.querySelectorAll('.about-stats, .step, .specialty, .value-card').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                el.classList.add('animated');
                if (el.classList.contains('about-stats')) {
                    animateAboutStats();
                }
            }
        });
    }
    
    window.addEventListener('load', checkAboutAnimations);
});