
//footer
document.addEventListener('DOMContentLoaded', function() {
    // Initialize elements for animation
    const footerElements = {
        stats: document.querySelectorAll('.fotr-stat-item'),
        columns: document.querySelectorAll('.fotr-col'),
        contacts: document.querySelectorAll('.fotr-contact-item'),
        social: document.querySelector('.fotr-social'),
        bottom: document.querySelector('.fotr-bottom')
    };

    // Intersection Observer Configuration
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    // Create Intersection Observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                handleElementAnimation(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Handle Element Animation
    function handleElementAnimation(element) {
        // Add specific animations based on element type
        if (element.classList.contains('fotr-stat-item')) {
            element.classList.add('fotr-animate');
            animateStatNumber(element.querySelector('.fotr-stat-number'));
        } else {
            element.classList.add('fotr-animate');
        }
    }

    // Animate Statistics Numbers
    function animateStatNumber(element) {
        if (!element) return;

        const finalValue = parseInt(element.getAttribute('data-count')) || 0;
        const duration = 2000; // 2 seconds
        const step = finalValue / (duration / 16); // 60fps
        let current = 0;

        const updateNumber = () => {
            current += step;
            if (current <= finalValue) {
                element.textContent = Math.round(current).toLocaleString() + 
                    (finalValue > 1000 ? '+' : '%');
                requestAnimationFrame(updateNumber);
            } else {
                element.textContent = finalValue.toLocaleString() + 
                    (finalValue > 1000 ? '+' : '%');
            }
        };

        requestAnimationFrame(updateNumber);
    }

    // Initialize Animations
    function initializeAnimations() {
        // Observe stats items
        footerElements.stats.forEach((stat, index) => {
            stat.style.animationDelay = `${index * 0.2}s`;
            observer.observe(stat);
        });

        // Observe columns
        footerElements.columns.forEach((column, index) => {
            column.style.animationDelay = `${index * 0.2}s`;
            observer.observe(column);
        });

        // Observe contact items
        footerElements.contacts.forEach((contact, index) => {
            contact.style.animationDelay = `${index * 0.2}s`;
            observer.observe(contact);
        });

        // Observe social section
        if (footerElements.social) {
            observer.observe(footerElements.social);
        }

        // Observe bottom section
        if (footerElements.bottom) {
            observer.observe(footerElements.bottom);
        }
    }

    // Enhanced Hover Effects
    function initializeHoverEffects() {
        // Social Links Hover Effect
        document.querySelectorAll('.fotr-social-link').forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) rotate(360deg)';
            });

            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) rotate(0)';
            });
        });

        // Contact Items Hover Effect
        document.querySelectorAll('.fotr-contact-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = 'var(--fotr-shadow-md)';
            });

            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'var(--fotr-shadow-sm)';
            });
        });
    }

    // Smooth Scroll for Footer Links
    function initializeSmoothScroll() {
        document.querySelectorAll('.fotr-links a').forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }

    // Update Copyright Year
    function updateCopyrightYear() {
        const yearElement = document.querySelector('.fotr-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    // Performance Optimization
    function optimizePerformance() {
        // Debounce scroll events
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                window.cancelAnimationFrame(scrollTimeout);
            }
            scrollTimeout = window.requestAnimationFrame(() => {
                // Handle scroll-based animations
            });
        });

        // Use passive event listeners
        window.addEventListener('scroll', () => {}, { passive: true });
    }

    // Initialize everything
    function init() {
        initializeAnimations();
        initializeHoverEffects();
        initializeSmoothScroll();
        updateCopyrightYear();
        optimizePerformance();
    }

    // Start the initialization
    init();
});