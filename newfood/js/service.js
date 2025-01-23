document.addEventListener('DOMContentLoaded', function() {
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    // Function to handle scroll animations
    function handleScrollAnimations() {
        // Animate section header
        const sectionHeader = document.querySelector('.section-header');
        if (isInViewport(sectionHeader) && !sectionHeader.classList.contains('visible')) {
            sectionHeader.classList.add('visible');
        }

        // Animate service cards
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            if (isInViewport(card) && !card.classList.contains('visible')) {
                // Add delay based on card index for cascade effect
                setTimeout(() => {
                    card.classList.add('visible');
                }, 100 * index);
            }
        });
    }

    // Initial check for elements in viewport
    handleScrollAnimations();

    // Add scroll event listener with throttling
    let throttleTimer;
    window.addEventListener('scroll', function() {
        if (!throttleTimer) {
            throttleTimer = setTimeout(function() {
                handleScrollAnimations();
                throttleTimer = null;
            }, 50);
        }
    });
});













document.addEventListener('DOMContentLoaded', function() {
    // Initialize elements
    const faqItems = document.querySelectorAll('.faq-item');
    const categoryBtns = document.querySelectorAll('.faq-category-btn');
    const faqSections = document.querySelectorAll('.faq-category-section');
    
    // Intersection Observer for fade-in animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe each FAQ item
    faqItems.forEach(item => {
        fadeInObserver.observe(item);
    });

    // Category Switching Functionality
    function switchCategory(category) {
        // Update active button state
        categoryBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });

        // Show/hide relevant sections with animation
        faqSections.forEach(section => {
            if (category === 'all' || section.dataset.category === category) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        });
    }

    // Category button click handlers
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const category = btn.dataset.category;
            switchCategory(category);
        });
    });

    // FAQ Toggle Functionality
    function toggleFAQ(faqItem) {
        const isOpen = faqItem.classList.contains('active');
        const answer = faqItem.querySelector('.faq-answer');
        const toggleBtn = faqItem.querySelector('.faq-toggle-btn');
        const questionWrapper = faqItem.querySelector('.faq-question-wrapper');
        const iconWrapper = faqItem.querySelector('.faq-icon-wrapper');

        // Close all other FAQs
        faqItems.forEach(item => {
            if (item !== faqItem && item.classList.contains('active')) {
                const itemAnswer = item.querySelector('.faq-answer');
                const itemToggleBtn = item.querySelector('.faq-toggle-btn');
                
                item.classList.remove('active');
                itemAnswer.classList.remove('active');
                itemToggleBtn.classList.remove('active');
                itemAnswer.style.maxHeight = '0';
            }
        });

        // Toggle current FAQ
        faqItem.classList.toggle('active');
        answer.classList.toggle('active');
        toggleBtn.classList.toggle('active');

        // Animate answer height
        if (!isOpen) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
            answer.style.maxHeight = '0';
        }
    }

    // FAQ click handlers
    faqItems.forEach(item => {
        const questionWrapper = item.querySelector('.faq-question-wrapper');
        questionWrapper.addEventListener('click', () => toggleFAQ(item));
    });

    // Keyboard accessibility
    faqItems.forEach(item => {
        const questionWrapper = item.querySelector('.faq-question-wrapper');
        questionWrapper.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFAQ(item);
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Handle URL hash for direct linking to categories
    function handleURLHash() {
        const hash = window.location.hash.replace('#', '');
        if (hash) {
            const categoryBtn = document.querySelector(`.faq-category-btn[data-category="${hash}"]`);
            if (categoryBtn) {
                categoryBtn.click();
            }
        }
    }

    // Handle initial load and hash changes
    window.addEventListener('load', handleURLHash);
    window.addEventListener('hashchange', handleURLHash);

    // Mobile touch handling for better interaction
    let touchStartY = 0;
    const categoriesContainer = document.querySelector('.faq-categories');

    categoriesContainer.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    categoriesContainer.addEventListener('touchmove', (e) => {
        const touchY = e.touches[0].clientY;
        const deltaY = touchStartY - touchY;

        if (Math.abs(deltaY) > 10) {
            e.preventDefault();
            categoriesContainer.scrollLeft += deltaY;
        }
    }, { passive: false });

    // Window resize handler for responsive adjustments
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Reset any necessary styles or states
            faqItems.forEach(item => {
                const answer = item.querySelector('.faq-answer');
                if (item.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        }, 250);
    });

    // Initialize the first category as active
    switchCategory('all');
});