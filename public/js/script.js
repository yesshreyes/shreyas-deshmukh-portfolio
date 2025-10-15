// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Add at the top of script.js
document.addEventListener('DOMContentLoaded', function() {
    // Mark GSAP as loaded
    document.body.classList.add('gsap-loaded');
    
    // Your existing GSAP code here...
});


// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Active Navigation on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });

    // Navbar background on scroll
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(26, 26, 26, 0.8)';
    } else {
        navbar.style.background = 'var(--glass-bg)';
    }
});

// GSAP Animations
// Hero section animations
gsap.from('.reveal-left', {
    opacity: 0,
    x: -100,
    duration: 1,
    ease: 'power3.out'
});

gsap.from('.reveal-right', {
    opacity: 0,
    x: 100,
    duration: 1,
    ease: 'power3.out'
});

// Scroll-triggered animations
gsap.utils.toArray('.reveal-top').forEach(element => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: -50,
        duration: 0.8,
        ease: 'power2.out'
    });
});

gsap.utils.toArray('.reveal-bottom').forEach((element, index) => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: index * 0.2,
        ease: 'power2.out'
    });
});

gsap.utils.toArray('.reveal-scale').forEach((element, index) => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'back.out(1.7)'
    });
});

gsap.utils.toArray('.reveal-fade').forEach(element => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    });
});

// Counter Animation
const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
    gsap.from(counter, {
        scrollTrigger: {
            trigger: counter,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        textContent: 0,
        duration: 2,
        ease: 'power1.in',
        snap: { textContent: 1 },
        stagger: 1,
        onUpdate: function() {
            counter.textContent = Math.ceil(counter.textContent);
        }
    });
});

// Portfolio Tabs

// Screenshot Carousel for Mobile Projects
document.querySelectorAll('.screenshot-carousel').forEach(carousel => {
    const images = carousel.querySelectorAll('img');
    const dotsContainer = carousel.parentElement.querySelector('.carousel-dots');
    const dots = dotsContainer.querySelectorAll('.dot');
    let currentIndex = 0;
    let autoRotateInterval;

    function showSlide(index) {
        images[currentIndex].classList.remove('active');
        dots[currentIndex].classList.remove('active');
        
        currentIndex = index;
        
        images[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }

    function nextSlide() {
        const nextIndex = (currentIndex + 1) % images.length;
        showSlide(nextIndex);
    }

    // Auto-rotate every 3 seconds
    function startAutoRotate() {
        autoRotateInterval = setInterval(nextSlide, 3000);
    }

    function stopAutoRotate() {
        clearInterval(autoRotateInterval);
    }

    // Click dots to change image
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoRotate();
            showSlide(index);
            startAutoRotate();
        });
    });

    // Pause on hover
    carousel.parentElement.addEventListener('mouseenter', stopAutoRotate);
    carousel.parentElement.addEventListener('mouseleave', startAutoRotate);

    // Start auto-rotation
    startAutoRotate();
});

// Portfolio Filter Tabs - Show only Mobile by default
const tabBtns = document.querySelectorAll('.tab-btn');
const projectCards = document.querySelectorAll('.project-card, .cert-card, .article-card');

// Function to filter cards
function filterCards(category) {
    projectCards.forEach(card => {
        const cardCategory = card.dataset.category;
        
        if (cardCategory === category) {
            card.style.display = 'flex';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 10);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.9)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// Show only mobile projects on page load
document.addEventListener('DOMContentLoaded', () => {
    filterCards('mobile');
});

// Tab click event
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const category = btn.dataset.tab;
        filterCards(category);
    });
});



// Contact Form
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalHTML = submitBtn.innerHTML;
    const messageField = contactForm.querySelector('[name="message"]');
    
    // Check message length
    if (messageField.value.trim().length < 10) {
        alert('Please write a longer message (at least 10 characters)');
        messageField.focus();
        return;
    }
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Get form data
    const formData = new FormData(contactForm);
    
    // Check honeypot (extra security)
    if (formData.get('website')) {
        console.log('Bot detected');
        return;
    }
    
    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Success animation
            gsap.to('.contact-form', {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                onComplete: () => {
                    // Success message
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                    submitBtn.style.background = 'linear-gradient(135deg, #00ff88, #00cc66)';
                    
                    alert('Thank you! Your message has been sent. I will get back to you soon! 🚀');
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitBtn.innerHTML = originalHTML;
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                    }, 3000);
                }
            });
            
        } else {
            throw new Error(data.message || 'Submission failed');
        }
        
    } catch (error) {
        console.error('Error:', error);
        
        // Error animation
        gsap.to('.contact-form', {
            x: -10,
            duration: 0.1,
            yoyo: true,
            repeat: 3
        });
        
        submitBtn.innerHTML = '<i class="fas fa-times"></i> Try Again';
        submitBtn.style.background = 'linear-gradient(135deg, #ff0066, #cc0044)';
        
        alert('Oops! Please write a longer, more detailed message (minimum 10 characters).');
        
        setTimeout(() => {
            submitBtn.innerHTML = originalHTML;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    }
});



// Smooth scroll for anchor links (FIXED VERSION)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const targetPosition = target.offsetTop - 100;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Parallax effect on mouse move
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    gsap.to('.gradient-orb', {
        x: moveX,
        y: moveY,
        duration: 1,
        ease: 'power2.out'
    });
});

// Cursor effect (optional)
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: 'power2.out'
    });
});

// Add cursor styles
const style = document.createElement('style');
style.textContent = `
    .custom-cursor {
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid var(--primary-pink);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform 0.2s ease;
    }
`;
document.head.appendChild(style);

console.log('🚀 Portfolio loaded successfully!');
