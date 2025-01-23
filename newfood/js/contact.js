document.addEventListener('DOMContentLoaded', function() {
    // Get the form element
    const contactForm = document.getElementById('contactForm');
    
    // Input animation handlers
    const formInputs = document.querySelectorAll('.input-wrapper input, .input-wrapper textarea');
    
    // Input focus animations
    formInputs.forEach(input => {
        // Add active class if input has value
        if (input.value) {
            input.classList.add('active');
        }
        
        // Handle focus events
        input.addEventListener('focus', () => {
            input.classList.add('active');
            input.parentElement.classList.add('focused');
        });
        
        // Handle blur events
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.classList.remove('active');
            }
            input.parentElement.classList.remove('focused');
        });
    });

    // Form validation
    function validateForm() {
        let isValid = true;
        const errorMessages = {
            name: 'Please enter a valid name (minimum 2 characters)',
            email: 'Please enter a valid email address',
            message: 'Please enter your message (minimum 10 characters)'
        };

        // Name validation
        const name = contactForm.querySelector('#name');
        if (!name.value || name.value.length < 2) {
            showError(name, errorMessages.name);
            isValid = false;
        } else {
            removeError(name);
        }

        // Email validation
        const email = contactForm.querySelector('#email');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value || !emailPattern.test(email.value)) {
            showError(email, errorMessages.email);
            isValid = false;
        } else {
            removeError(email);
        }

        // Message validation
        const message = contactForm.querySelector('#message');
        if (!message.value || message.value.length < 10) {
            showError(message, errorMessages.message);
            isValid = false;
        } else {
            removeError(message);
        }

        return isValid;
    }

    // Show error message
    function showError(input, message) {
        const wrapper = input.parentElement;
        wrapper.classList.add('error');
        
        // Create or update error message
        let errorDiv = wrapper.querySelector('.error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            wrapper.appendChild(errorDiv);
        }
        errorDiv.textContent = message;
    }

    // Remove error message
    function removeError(input) {
        const wrapper = input.parentElement;
        wrapper.classList.remove('error');
        const errorDiv = wrapper.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    // Show success message
    function showSuccess() {
        // Create success message element
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <h4>Thank You!</h4>
            <p>Your message has been sent successfully.</p>
        `;

        // Replace form with success message
        contactForm.innerHTML = '';
        contactForm.appendChild(successDiv);
    }

    // Loading animation
    function toggleLoading(show) {
        const submitBtn = contactForm.querySelector('.submit-btn');
        if (show) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <span>Sending...</span>
                <i class="fas fa-spinner fa-spin"></i>
            `;
        } else {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `
                <span>Send Message</span>
                <i class="fas fa-paper-plane"></i>
            `;
        }
    }

    // Form submission handler
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        toggleLoading(true);

        // Collect form data
        const formData = {
            name: contactForm.querySelector('#name').value,
            email: contactForm.querySelector('#email').value,
            message: contactForm.querySelector('#message').value
        };

        try {
            // Simulate API call (replace with your actual API endpoint)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            showSuccess();
            
            // Optional: Reset form
            contactForm.reset();

        } catch (error) {
            // Handle error
            alert('Sorry, there was an error sending your message. Please try again.');
            toggleLoading(false);
        }
    });

    // Add some animation when scrolling to the contact section
    const contactSection = document.querySelector('.contact-master-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    observer.observe(contactSection);
});

// Add this CSS for the animations
const style = document.createElement('style');
style.textContent = `
    .error-message {
        color: #ff4444;
        font-size: 0.8rem;
        margin-top: 5px;
        display: flex;
        align-items: center;
        gap: 5px;
        opacity: 0;
        transform: translateY(-10px);
        animation: slideDown 0.3s forwards;
    }

    @keyframes slideDown {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .input-wrapper.error input,
    .input-wrapper.error textarea {
        border-color: #ff4444;
    }

    .success-message {
        text-align: center;
        padding: 40px 20px;
        opacity: 0;
        transform: translateY(20px);
        animation: fadeIn 0.5s forwards;
    }

    .success-message i {
        font-size: 3rem;
        color: #4CAF50;
        margin-bottom: 20px;
    }

    .success-message h4 {
        color: #333;
        font-size: 1.5rem;
        margin-bottom: 10px;
    }

    .success-message p {
        color: #666;
    }

    @keyframes fadeIn {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .contact-master-section {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }

    .contact-master-section.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;

document.head.appendChild(style);