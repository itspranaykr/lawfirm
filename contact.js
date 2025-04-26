document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('legalContactForm');
    const caseTypeSelect = document.getElementById('caseType');
    const otherCaseContainer = document.querySelector('.other-case-container');
    const submitBtn = document.querySelector('.submit-btn');

    // Toggle "Other Case" field
    caseTypeSelect.addEventListener('change', function() {
        otherCaseContainer.style.display = this.value === 'Other' ? 'block' : 'none';
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        // Prepare WhatsApp message
        const formData = new FormData(form);
        const whatsappMessage = generateWhatsAppMessage(formData);
        
        // Encode message for WhatsApp URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // Open WhatsApp with the message
        const whatsappUrl = `https://wa.me/919376457792?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    });

    // Form validation
    function validateForm() {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
        });
        
        // Validate required fields
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                const errorMsg = field.nextElementSibling;
                errorMsg.textContent = 'This field is required';
                isValid = false;
            }
        });
        
        // Validate phone number format
        const phone = document.getElementById('phone');
        if (phone.value && !/^[0-9]{10,15}$/.test(phone.value)) {
            const errorMsg = phone.nextElementSibling;
            errorMsg.textContent = 'Please enter a valid phone number';
            isValid = false;
        }
        
        // Validate email format if provided
        const email = document.getElementById('email');
        if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            const errorMsg = email.nextElementSibling;
            errorMsg.textContent = 'Please enter a valid email address';
            isValid = false;
        }
        
        // Validate consent checkbox
        const consent = document.getElementById('consent');
        if (!consent.checked) {
            const errorMsg = consent.closest('.form-group').querySelector('.error-message');
            errorMsg.textContent = 'You must give consent to contact you';
            isValid = false;
        }
        
        return isValid;
    }

    // Generate WhatsApp message from form data
    function generateWhatsAppMessage(formData) {
        const name = formData.get('name');
        const phone = formData.get('phone');
        const email = formData.get('email') || 'Not provided';
        const caseType = formData.get('caseType') === 'Other' ? 
                        formData.get('otherCase') : formData.get('caseType');
        const message = formData.get('message');
        
        return `
*New Legal Inquiry - Gaur Legal Services*

*Name:* ${name}
*Phone:* ${phone}
*Email:* ${email}
*Case Type:* ${caseType}

*Message:*
${message}

_I submitted this inquiry through the Gaur Legal Services website._
        `.trim();
    }
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