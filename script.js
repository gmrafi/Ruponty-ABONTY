// ===========================
// ABONTY - Interactive JavaScript
// Designed by Israt Zarin Ruponty
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🎨 ABONTY Website Loaded - Designed by Israt Zarin Ruponty');
    
    // ===========================
    // NAVIGATION
    // ===========================
    
    const navbar = document.getElementById('navbar');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    const navLinkItems = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });
    
    // Active navigation link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinkItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===========================
    // COLLECTION FILTERING
    // ===========================
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const collectionItems = document.querySelectorAll('.collection-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            collectionItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hidden');
                    item.style.animation = 'fadeInUp 0.6s ease';
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
    
    // ===========================
    // COLLECTION CARD MODALS
    // ===========================
    
    collectionItems.forEach(card => {
        const viewBtn = card.querySelector('.view-btn');
        if (viewBtn) {
            viewBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const title = card.querySelector('h3').textContent;
                const tag = card.querySelector('.card-tag').textContent;
                const description = card.querySelector('.card-content p').textContent;
                const price = card.querySelector('.card-price').textContent;
                
                showModal(title, tag, description, price);
            });
        }
    });
    
    function showModal(title, tag, description, price) {
        const modal = document.createElement('div');
        modal.className = 'custom-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(62, 39, 35, 0.9);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            animation: fadeIn 0.3s ease;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: #FFF8F0;
            padding: 3rem;
            border-radius: 20px;
            max-width: 500px;
            text-align: center;
            cursor: default;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            animation: slideUp 0.4s ease;
        `;
        
        modalContent.innerHTML = `
            <span style="display: inline-block; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 2px; color: #B76E79; margin-bottom: 1rem; font-weight: 600;">${tag}</span>
            <h2 style="font-family: 'Playfair Display', serif; color: #3E2723; margin-bottom: 1rem; font-size: 2rem;">${title}</h2>
            <p style="color: #795548; font-size: 1.1rem; margin-bottom: 1.5rem; line-height: 1.8;">${description}</p>
            <p style="color: #5D4037; font-size: 1.3rem; font-weight: 600; margin-bottom: 2rem;">${price}</p>
            <a href="#contact" style="display: inline-block; padding: 1rem 2.5rem; background: #5D4037; color: #FFF8F0; text-decoration: none; border-radius: 50px; font-weight: 600; transition: 0.3s;">Order This Design</a>
            <p style="color: #A1887F; font-size: 0.9rem; margin-top: 2rem; cursor: pointer;">Click anywhere to close</p>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Add CSS animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideUp {
                from { transform: translateY(30px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        // Close modal on click
        modal.addEventListener('click', () => {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        });
        
        // Prevent modal content click from closing
        modalContent.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        
        // Handle order button
        const orderBtn = modalContent.querySelector('a');
        orderBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        });
    }
    
    // ===========================
    // CONTACT FORM VALIDATION
    // ===========================
    
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const design = document.getElementById('design').value;
            const details = document.getElementById('details').value.trim();
            const budget = document.getElementById('budget').value;
            
            // Basic validation
            if (!name || !email || !design || !details || !budget) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // If validation passes, show success message
            contactForm.style.display = 'none';
            formSuccess.classList.add('show');
            
            // Log form data
            console.log('Order Request Submitted:', {
                name,
                email,
                phone: document.getElementById('phone').value,
                design,
                details,
                budget,
                timestamp: new Date().toISOString()
            });
            
            // Reset after 5 seconds
            setTimeout(() => {
                contactForm.reset();
                contactForm.style.display = 'block';
                formSuccess.classList.remove('show');
            }, 5000);
        });
    }
    
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 30px;
            background: ${type === 'error' ? '#B76E79' : '#5D4037'};
            color: #FFF8F0;
            padding: 1rem 2rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 10001;
            animation: slideInRight 0.4s ease;
            font-weight: 500;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.4s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 400);
        }, 3000);
        
        // Add animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(400px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(400px); opacity: 0; }
            }
        `;
        if (!document.querySelector('style[data-notifications]')) {
            style.setAttribute('data-notifications', 'true');
            document.head.appendChild(style);
        }
    }
    
    // ===========================
    // SCROLL ANIMATIONS
    // ===========================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(`
        .about-content > *,
        .feature-box,
        .benefit-card,
        .collection-card,
        .timeline-item,
        .pricing-card,
        .testimonial-card,
        .vision-card,
        .info-card,
        .contact-form
    `);
    
    animateElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(element);
    });
    
    // ===========================
    // HERO PARALLAX EFFECT
    // ===========================
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / 700);
        }
    });
    
    // ===========================
    // SCROLL TO TOP BUTTON
    // ===========================
    
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 55px;
        height: 55px;
        border-radius: 50%;
        background: linear-gradient(135deg, #B76E79, #5D4037);
        color: #FFF8F0;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(93, 64, 55, 0.3);
        opacity: 0;
        visibility: hidden;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 999;
        font-weight: bold;
    `;
    
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    scrollTopBtn.addEventListener('mouseenter', () => {
        scrollTopBtn.style.transform = 'scale(1.1) translateY(-5px)';
        scrollTopBtn.style.boxShadow = '0 8px 20px rgba(93, 64, 55, 0.4)';
    });
    
    scrollTopBtn.addEventListener('mouseleave', () => {
        scrollTopBtn.style.transform = 'scale(1) translateY(0)';
        scrollTopBtn.style.boxShadow = '0 4px 15px rgba(93, 64, 55, 0.3)';
    });
    
    // ===========================
    // FORM INPUT ENHANCEMENTS
    // ===========================
    
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.style.transform = 'scale(1.01)';
            input.parentElement.style.transition = 'transform 0.3s ease';
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.style.transform = 'scale(1)';
        });
        
        // Add floating label effect
        if (input.value) {
            input.parentElement.classList.add('has-value');
        }
        
        input.addEventListener('input', () => {
            if (input.value) {
                input.parentElement.classList.add('has-value');
            } else {
                input.parentElement.classList.remove('has-value');
            }
        });
    });
    
    // ===========================
    // TESTIMONIAL CARD ROTATION
    // ===========================
    
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;
    
    setInterval(() => {
        if (testimonialCards.length > 0) {
            testimonialCards.forEach(card => {
                card.style.transform = 'scale(1)';
                card.style.zIndex = '1';
            });
            
            currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
            if (testimonialCards[currentTestimonial]) {
                testimonialCards[currentTestimonial].style.transform = 'scale(1.02)';
                testimonialCards[currentTestimonial].style.zIndex = '2';
            }
        }
    }, 4000);
    
    // ===========================
    // PRICING CARD INTERACTIONS
    // ===========================
    
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            pricingCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.style.opacity = '0.6';
                }
            });
        });
        
        card.addEventListener('mouseleave', () => {
            pricingCards.forEach(otherCard => {
                otherCard.style.opacity = '1';
            });
        });
    });
    
    // ===========================
    // PAGE LOAD ANIMATION
    // ===========================
    
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.6s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // ===========================
    // CURSOR TRAIL EFFECT (SUBTLE)
    // ===========================
    
    const createCursorTrail = () => {
        let lastX = 0;
        let lastY = 0;
        let rafId = null;
        
        document.addEventListener('mousemove', (e) => {
            lastX = e.clientX;
            lastY = e.clientY;
            
            if (!rafId) {
                rafId = requestAnimationFrame(() => {
                    // Subtle trail effect on collection cards
                    const collectionSection = document.querySelector('.collections');
                    if (collectionSection) {
                        const rect = collectionSection.getBoundingClientRect();
                        if (lastY > rect.top && lastY < rect.bottom) {
                            // Create subtle effect within collection section
                        }
                    }
                    rafId = null;
                });
            }
        });
    };
    
    createCursorTrail();
    
    // ===========================
    // CONSOLE ART
    // ===========================
    
    console.log('%c✨ ABONTY - Custom Hand-Painted Shoes ✨', 
        'color: #B76E79; font-size: 20px; font-weight: bold; font-family: Playfair Display;');
    console.log('%cDesigned & Developed by Israt Zarin Ruponty', 
        'color: #5D4037; font-size: 14px; font-family: Poppins;');
    console.log('%cBBA 12, Bravo | Business Management Course Project', 
        'color: #795548; font-size: 12px; font-family: Poppins;');
    
});
