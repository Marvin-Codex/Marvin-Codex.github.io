// Msafari Tours JavaScript

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Mobile dropdown toggles
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
    
    mobileDropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Toggle the dropdown content
            content.classList.toggle('hidden');
            
            // Rotate the chevron icon
            if (content.classList.contains('hidden')) {
                icon.classList.remove('rotate-180');
            } else {
                icon.classList.add('rotate-180');
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileMenu && !mobileMenu.contains(event.target) && !mobileMenuButton.contains(event.target)) {
            mobileMenu.classList.add('hidden');
        }
    });
});



// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed nav
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
});

// Form Handling
class FormHandler {
    constructor() {
        this.init();
    }
    
    init() {
        // Contact form
        const contactForm = document.querySelector('#contact form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleContactForm(e));
        }
        
        // Newsletter form
        const newsletterForm = document.querySelector('footer form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => this.handleNewsletterForm(e));
        }
    }
    
    handleContactForm(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitButton = e.target.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.innerHTML = '<span class="loading"></span> Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            this.showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            e.target.reset();
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    }
    
    handleNewsletterForm(e) {
        e.preventDefault();
        
        const email = e.target.querySelector('input[type="email"]').value;
        const submitButton = e.target.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.innerHTML = '<span class="loading"></span> Subscribing...';
        submitButton.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            this.showNotification('Successfully subscribed to our newsletter!', 'success');
            e.target.reset();
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);
    }
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 px-6 py-4 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300 ${
            type === 'success' ? 'bg-green-600 text-white' : 
            type === 'error' ? 'bg-red-600 text-white' : 
            'bg-blue-600 text-white'
        }`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }
}

// Initialize form handler
document.addEventListener('DOMContentLoaded', function() {
    new FormHandler();
});

// Intersection Observer for Animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.grid > div, .testimonial-slide, section > div');
    animatedElements.forEach(el => observer.observe(el));
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('nav');
    const scrolled = window.scrollY > 50;
    
    if (scrolled) {
        navbar.classList.add('shadow-xl');
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.classList.remove('shadow-xl');
        navbar.style.backgroundColor = 'white';
        navbar.style.backdropFilter = 'none';
    }
});

// Image lazy loading
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('loading');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Search Functionality (if needed)
class SearchHandler {
    constructor() {
        this.searchInput = document.querySelector('#search-input');
        this.searchResults = document.querySelector('#search-results');
        this.debounceTimer = null;
        this.init();
    }
    
    init() {
        if (!this.searchInput) return;
        
        this.searchInput.addEventListener('input', (e) => {
            clearTimeout(this.debounceTimer);
            this.debounceTimer = setTimeout(() => {
                this.performSearch(e.target.value);
            }, 300);
        });
    }
    
    performSearch(query) {
        if (query.length < 2) {
            this.hideResults();
            return;
        }
        
        // Simulate search (replace with actual search implementation)
        const mockResults = [
            { title: 'Gorilla Trekking in Bwindi', type: 'Tour', url: '#' },
            { title: 'Queen Elizabeth National Park', type: 'Destination', url: '#' },
            { title: 'Cultural Village Tours', type: 'Experience', url: '#' }
        ].filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase())
        );
        
        this.displayResults(mockResults);
    }
    
    displayResults(results) {
        if (!this.searchResults) return;
        
        if (results.length === 0) {
            this.searchResults.innerHTML = '<div class="p-4 text-gray-500">No results found</div>';
        } else {
            this.searchResults.innerHTML = results.map(result => `
                <a href="${result.url}" class="block p-4 hover:bg-gray-50 border-b">
                    <div class="font-medium">${result.title}</div>
                    <div class="text-sm text-gray-500">${result.type}</div>
                </a>
            `).join('');
        }
        
        this.searchResults.classList.remove('hidden');
    }
    
    hideResults() {
        if (this.searchResults) {
            this.searchResults.classList.add('hidden');
        }
    }
}

// Cookie Consent (GDPR Compliance)
class CookieConsent {
    constructor() {
        this.cookieName = 'Msafari_cookie_consent';
        this.init();
    }
    
    init() {
        if (!this.hasConsent()) {
            this.showConsentBanner();
        }
    }
    
    hasConsent() {
        return localStorage.getItem(this.cookieName) === 'true';
    }
    
    showConsentBanner() {
        const banner = document.createElement('div');
        banner.className = 'fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50';
        banner.innerHTML = `
            <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <p class="text-sm">
                    We use cookies to enhance your browsing experience and provide personalized content. 
                    <a href="#" class="underline hover:text-amber-400">Learn more</a>
                </p>
                <div class="flex gap-2">
                    <button id="accept-cookies" class="bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded text-sm transition duration-300">
                        Accept
                    </button>
                    <button id="decline-cookies" class="border border-gray-600 hover:border-gray-500 px-4 py-2 rounded text-sm transition duration-300">
                        Decline
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(banner);
        
        // Event listeners
        document.getElementById('accept-cookies').addEventListener('click', () => {
            this.setConsent(true);
            document.body.removeChild(banner);
        });
        
        document.getElementById('decline-cookies').addEventListener('click', () => {
            this.setConsent(false);
            document.body.removeChild(banner);
        });
    }
    
    setConsent(consent) {
        localStorage.setItem(this.cookieName, consent.toString());
        
        if (consent) {
            // Enable analytics and other tracking
            this.enableTracking();
        }
    }
    
    enableTracking() {
        // Add Google Analytics or other tracking code here
        console.log('Tracking enabled');
    }
}

// Initialize cookie consent
document.addEventListener('DOMContentLoaded', function() {
    new CookieConsent();
});

// Back to top button
document.addEventListener('DOMContentLoaded', function() {
    // Create back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopButton.className = 'fixed bottom-6 right-6 w-12 h-12 bg-amber-600 hover:bg-amber-700 text-white rounded-full shadow-lg opacity-0 invisible transition-all duration-300 z-40';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    
    document.body.appendChild(backToTopButton);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top when clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('#preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Replace with placeholder image if original fails to load
            this.src = 'https://via.placeholder.com/400x300/d97706/ffffff?text=Msafari+Tours';
            this.alt = 'Msafari Tours - Image unavailable';
        });
    });
});

// Accessibility improvements
document.addEventListener('DOMContentLoaded', function() {
    // Skip link for keyboard navigation
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-amber-600 text-white px-4 py-2 rounded z-50';
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Announce page changes for screen readers
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.id = 'announcer';
    
    document.body.appendChild(announcer);
});

// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqContainer = document.getElementById('faq-container');
    
    if (faqContainer) {
        // Add event listeners to all FAQ questions
        const faqQuestions = faqContainer.querySelectorAll('.faq-question');
        
        faqQuestions.forEach(question => {
            question.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('data-target');
                const answer = document.getElementById(targetId);
                const icon = document.getElementById(`icon-${targetId}`);
                
                if (!answer || !icon) return;
                
                const isCurrentlyOpen = !answer.classList.contains('hidden');
                
                // Close all other FAQs first
                closeAllFAQs();
                
                // Toggle current FAQ
                if (!isCurrentlyOpen) {
                    // Open this FAQ
                    answer.classList.remove('hidden');
                    icon.classList.add('rotate-180');
                    this.setAttribute('aria-expanded', 'true');
                } else {
                    // Close this FAQ
                    answer.classList.add('hidden');
                    icon.classList.remove('rotate-180');
                    this.setAttribute('aria-expanded', 'false');
                }
            });
            
            // Initialize aria-expanded
            question.setAttribute('aria-expanded', 'false');
        });
        
        function closeAllFAQs() {
            const allAnswers = faqContainer.querySelectorAll('.faq-answer');
            const allIcons = faqContainer.querySelectorAll('[id^="icon-faq-"]');
            const allQuestions = faqContainer.querySelectorAll('.faq-question');
            
            allAnswers.forEach(answer => {
                answer.classList.add('hidden');
            });
            
            allIcons.forEach(icon => {
                icon.classList.remove('rotate-180');
            });
            
            allQuestions.forEach(question => {
                question.setAttribute('aria-expanded', 'false');
            });
        }
    }
});

// Performance monitoring
window.addEventListener('load', function() {
    // Log performance metrics
    if ('performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0];
        const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
        console.log(`Page load time: ${loadTime}ms`);
    }
});

// Package Details Toggle Function
function togglePackageDetails(detailsId) {
    const detailsElement = document.getElementById(detailsId);
    const toggleElement = document.getElementById(detailsId.replace('-details', '-toggle'));
    const iconElement = document.getElementById(detailsId.replace('-details', '-icon'));
    
    // Check if we're on desktop (large screens)
    const isDesktop = window.innerWidth >= 1024; // lg breakpoint
    
    if (detailsElement && toggleElement && iconElement) {
        if (isDesktop) {
            // Show modal on desktop
            showPackageModal(detailsId, detailsElement);
        } else {
            // Use inline expansion on mobile/tablet
            if (detailsElement.classList.contains('hidden')) {
                // Show details
                detailsElement.classList.remove('hidden');
                toggleElement.textContent = 'Show Less Details';
                iconElement.classList.remove('fa-chevron-down');
                iconElement.classList.add('fa-chevron-up');
                
                // Smooth scroll to show the expanded content
                setTimeout(() => {
                    detailsElement.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest' 
                    });
                }, 100);
            } else {
                // Hide details
                detailsElement.classList.add('hidden');
                toggleElement.textContent = 'See More Details';
                iconElement.classList.remove('fa-chevron-up');
                iconElement.classList.add('fa-chevron-down');
            }
        }
    }
}

// Update button text based on screen size
function updatePackageButtonText() {
    const isDesktop = window.innerWidth >= 1024;
    const toggleButtons = document.querySelectorAll('[id$="-toggle"]');
    
    toggleButtons.forEach(button => {
        const detailsId = button.id.replace('-toggle', '-details');
        const detailsElement = document.getElementById(detailsId);
        
        if (detailsElement) {
            if (isDesktop) {
                button.textContent = 'View Full Details';
                // Update icon to indicate popup
                const iconElement = document.getElementById(button.id.replace('-toggle', '-icon'));
                if (iconElement) {
                    iconElement.classList.remove('fa-chevron-down', 'fa-chevron-up');
                    iconElement.classList.add('fa-external-link-alt');
                }
            } else {
                // Reset to original mobile text
                if (detailsElement.classList.contains('hidden')) {
                    button.textContent = 'See More Details';
                    const iconElement = document.getElementById(button.id.replace('-toggle', '-icon'));
                    if (iconElement) {
                        iconElement.classList.remove('fa-external-link-alt', 'fa-chevron-up');
                        iconElement.classList.add('fa-chevron-down');
                    }
                } else {
                    button.textContent = 'Show Less Details';
                    const iconElement = document.getElementById(button.id.replace('-toggle', '-icon'));
                    if (iconElement) {
                        iconElement.classList.remove('fa-external-link-alt', 'fa-chevron-down');
                        iconElement.classList.add('fa-chevron-up');
                    }
                }
            }
        }
    });
}

// Modal Functions for Desktop Package Details
function showPackageModal(detailsId, contentElement) {
    // Get package title from the parent card
    const packageCard = contentElement.closest('.bg-white, .bg-stone-50');
    let packageTitle = 'Package Details';
    
    if (packageCard) {
        const titleElement = packageCard.querySelector('h3');
        if (titleElement) {
            packageTitle = titleElement.textContent.trim();
        }
    }
    
    // Create modal overlay
    const modal = document.createElement('div');
    modal.id = 'package-modal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'bg-white rounded-xl max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl';
    
    // Clone the content and make it visible
    const clonedContent = contentElement.cloneNode(true);
    clonedContent.classList.remove('hidden', 'border-t', 'pt-6', 'mt-6');
    clonedContent.classList.add('p-8');
    
    // Add close button
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '<i class="fas fa-times text-2xl"></i>';
    closeButton.className = 'absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition duration-300 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:shadow-xl';
    closeButton.onclick = closePackageModal;
    
    // Add modal header
    const modalHeader = document.createElement('div');
    modalHeader.className = 'border-b pb-4 mb-6 sticky top-0 bg-white z-10 px-8 pt-8';
    modalHeader.innerHTML = `
        <h3 class="text-3xl font-bold text-gray-900">${packageTitle}</h3>
        <p class="text-gray-600 mt-2">Complete information about this tour package</p>
    `;
    
    // Assemble modal
    modalContent.appendChild(closeButton);
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(clonedContent);
    modal.appendChild(modalContent);
    
    // Add to page
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden'; // Prevent background scroll
    
    // Add click outside to close
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closePackageModal();
        }
    });
    
    // Add escape key to close
    document.addEventListener('keydown', handleModalEscape);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

function closePackageModal() {
    const modal = document.getElementById('package-modal');
    if (modal) {
        // Add closing animation
        modal.style.opacity = '0';
        modal.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            if (document.body.contains(modal)) {
                document.body.removeChild(modal);
            }
            document.body.style.overflow = ''; // Restore scroll
            document.removeEventListener('keydown', handleModalEscape);
        }, 300);
    }
}

function handleModalEscape(e) {
    if (e.key === 'Escape') {
        closePackageModal();
    }
}

// Make the function globally available
window.togglePackageDetails = togglePackageDetails;

// Initialize package button text and add resize listener
document.addEventListener('DOMContentLoaded', function() {
    updatePackageButtonText();
    
    // Update button text on window resize
    window.addEventListener('resize', function() {
        // Debounce the resize event
        clearTimeout(window.resizeTimer);
        window.resizeTimer = setTimeout(function() {
            updatePackageButtonText();
        }, 250);
    });
});

// Enhanced Testimonial Carousel with Fade Transition
class TestimonialCarousel {
    constructor() {
        this.currentIndex = 0;
        this.slides = [];
        this.dots = [];
        this.container = null;
        this.prevBtn = null;
        this.nextBtn = null;
        this.autoPlayTimer = null;
        this.autoPlayDelay = 8000; // 8 seconds per slide
        this.isManualNavigation = false;
        this.pauseOnHover = true;
        
        this.init();
    }
    
    init() {
        // Find carousel elements
        this.container = document.querySelector('.testimonial-carousel');
        if (!this.container) {
            console.log('Testimonial carousel container not found');
            return;
        }
        
        this.slides = Array.from(document.querySelectorAll('.testimonial-slide'));
        this.dots = Array.from(document.querySelectorAll('.testimonial-dot'));
        this.prevBtn = document.querySelector('.testimonial-prev');
        this.nextBtn = document.querySelector('.testimonial-next');
        
        console.log(`Found ${this.slides.length} slides, ${this.dots.length} dots`);
        
        if (this.slides.length === 0) return;
        
        // Setup initial styles
        this.setupCarousel();
        
        // Add event listeners
        this.addEventListeners();
        
        // Show first slide
        this.showSlide(0);
        
        // Start auto-play after initial delay
        setTimeout(() => {
            this.startAutoPlay();
        }, 3000);
    }
    
    setupCarousel() {
        // Reset any existing transforms
        const track = document.querySelector('.testimonial-track');
        if (track) {
            track.style.transform = 'translateX(0%)';
            track.style.display = 'block';
        }
        
        // Setup fade-based carousel
        this.slides.forEach((slide, index) => {
            slide.style.opacity = index === 0 ? '1' : '0';
            slide.style.position = 'absolute';
            slide.style.top = '0';
            slide.style.left = '0';
            slide.style.width = '100%';
            slide.style.transition = 'opacity 1s ease-in-out';
            slide.style.zIndex = index === 0 ? '2' : '1';
            slide.style.visibility = 'visible';
        });
        
        // Ensure container positioning
        this.container.style.position = 'relative';
        this.container.style.overflow = 'hidden';
        
        // Set minimum height based on first slide
        if (this.slides[0]) {
            const firstSlideHeight = this.slides[0].offsetHeight;
            this.container.style.minHeight = firstSlideHeight + 'px';
        }
    }
    
    addEventListeners() {
        // Navigation buttons
        if (this.prevBtn) {
            console.log('Previous button found and event listener added');
            this.prevBtn.addEventListener('click', () => {
                console.log('Previous button clicked');
                this.isManualNavigation = true;
                this.previousSlide();
                this.resetAutoPlay();
            });
        } else {
            console.log('Previous button not found');
        }
        
        if (this.nextBtn) {
            console.log('Next button found and event listener added');
            this.nextBtn.addEventListener('click', () => {
                console.log('Next button clicked');
                this.isManualNavigation = true;
                this.nextSlide();
                this.resetAutoPlay();
            });
        } else {
            console.log('Next button not found');
        }
        
        // Dot navigation
        console.log(`Adding event listeners to ${this.dots.length} dots`);
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                console.log(`Dot ${index} clicked`);
                this.isManualNavigation = true;
                this.showSlide(index);
                this.resetAutoPlay();
            });
        });
        
        // Pause on hover
        if (this.pauseOnHover) {
            this.container.addEventListener('mouseenter', () => {
                this.stopAutoPlay();
            });
            
            this.container.addEventListener('mouseleave', () => {
                if (!this.isManualNavigation) {
                    this.startAutoPlay();
                }
            });
        }
        
        // Touch/Swipe support
        this.addTouchSupport();
    }
    
    showSlide(index) {
        if (index < 0 || index >= this.slides.length || index === this.currentIndex) return;
        
        const previousIndex = this.currentIndex;
        this.currentIndex = index;
        
        // Fade out current slide
        if (this.slides[previousIndex]) {
            this.slides[previousIndex].style.opacity = '0';
            this.slides[previousIndex].style.zIndex = '1';
        }
        
        // Fade in new slide
        setTimeout(() => {
            if (this.slides[this.currentIndex]) {
                this.slides[this.currentIndex].style.opacity = '1';
                this.slides[this.currentIndex].style.zIndex = '2';
            }
        }, 50);
        
        // Update dots
        this.updateDots();
        
        // Update container height for responsive design
        this.updateContainerHeight();
    }
    
    nextSlide() {
        const nextIndex = (this.currentIndex + 1) % this.slides.length;
        this.showSlide(nextIndex);
    }
    
    previousSlide() {
        const prevIndex = this.currentIndex === 0 ? this.slides.length - 1 : this.currentIndex - 1;
        this.showSlide(prevIndex);
    }
    
    updateDots() {
        this.dots.forEach((dot, index) => {
            if (index === this.currentIndex) {
                dot.classList.remove('bg-white', 'bg-opacity-60');
                dot.classList.add('bg-amber-600');
            } else {
                dot.classList.remove('bg-amber-600');
                dot.classList.add('bg-white', 'bg-opacity-60');
            }
            dot.setAttribute('aria-pressed', index === this.currentIndex ? 'true' : 'false');
        });
    }
    
    updateContainerHeight() {
        if (this.slides[this.currentIndex]) {
            const currentSlideHeight = this.slides[this.currentIndex].offsetHeight;
            this.container.style.minHeight = currentSlideHeight + 'px';
        }
    }
    
    addTouchSupport() {
        let startX = 0;
        let startY = 0;
        let deltaX = 0;
        let deltaY = 0;
        let isSwiping = false;
        
        this.container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isSwiping = true;
        }, { passive: true });
        
        this.container.addEventListener('touchmove', (e) => {
            if (!isSwiping) return;
            
            deltaX = e.touches[0].clientX - startX;
            deltaY = e.touches[0].clientY - startY;
        }, { passive: true });
        
        this.container.addEventListener('touchend', () => {
            if (!isSwiping) return;
            
            // Only trigger if horizontal swipe is dominant and significant
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 75) {
                this.isManualNavigation = true;
                
                if (deltaX > 0) {
                    this.previousSlide();
                } else {
                    this.nextSlide();
                }
                
                this.resetAutoPlay();
            }
            
            // Reset values
            startX = 0;
            startY = 0;
            deltaX = 0;
            deltaY = 0;
            isSwiping = false;
        }, { passive: true });
    }
    
    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayTimer = setInterval(() => {
            if (!this.isManualNavigation && document.visibilityState === 'visible') {
                this.nextSlide();
            }
        }, this.autoPlayDelay);
    }
    
    stopAutoPlay() {
        if (this.autoPlayTimer) {
            clearInterval(this.autoPlayTimer);
            this.autoPlayTimer = null;
        }
    }
    
    resetAutoPlay() {
        // Reset manual navigation flag and restart auto-play after delay
        setTimeout(() => {
            this.isManualNavigation = false;
            this.startAutoPlay();
        }, 12000); // Resume auto-play after 12 seconds of inactivity
    }
    
    // Public methods for external control
    pause() {
        this.stopAutoPlay();
        this.isManualNavigation = true;
    }
    
    resume() {
        this.isManualNavigation = false;
        this.startAutoPlay();
    }
    
    goTo(index) {
        this.isManualNavigation = true;
        this.showSlide(index);
        this.resetAutoPlay();
    }
    
    destroy() {
        this.stopAutoPlay();
        // Reset styles
        this.slides.forEach(slide => {
            slide.style = '';
        });
    }
}

// Initialize testimonial carousel
document.addEventListener('DOMContentLoaded', function() {
    new TestimonialCarousel();
});

// Export for potential use in other scripts
window.MsafariTours = {
    TestimonialCarousel,
    FormHandler,
    SearchHandler,
    CookieConsent
};
