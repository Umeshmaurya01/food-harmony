// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
});

// Add smooth scroll for CTA buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        if (targetId) {
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});












// <!-- About Us Section -->
// Scroll reveal functionality
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
    
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    };
    
    // Initial check
    revealOnScroll();
    
    // Add smooth scroll event listener
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                revealOnScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Add hover effects for cards
    const cards = document.querySelectorAll('.card, .possibility-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const cardRect = card.getBoundingClientRect();
            const mouseX = e.clientX - cardRect.left;
            const mouseY = e.clientY - cardRect.top;
            
            card.style.transform = `
                perspective(1000px)
                rotateX(${(mouseY - cardRect.height/2) * -0.005}deg)
                rotateY(${(mouseX - cardRect.width/2) * 0.005}deg)
                translateZ(10px)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'none';
        });
    });
});

// Intersection Observer for better performance
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up').forEach(element => {
    observer.observe(element);
});













// testimonial

/* Add this to your existing JavaScript file */
document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe the section
    document.querySelectorAll('.testi-section').forEach(section => {
        observer.observe(section);
    });

    // Observe individual cards
    document.querySelectorAll('.testi-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        observer.observe(card);
    });
});





















