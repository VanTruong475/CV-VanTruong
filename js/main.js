// ===== MODERN PORTFOLIO WEBSITE JAVASCRIPT =====
class Portfolio {
    constructor() {
        this.isEditMode = false;
        this.init();
    }

    // ===== INITIALIZATION =====
    init() {
        this.handleLoading();
        this.initNavigation();
        this.initScrollEffects();
        this.initTheme();
        this.initIntersectionObserver();
        this.initSkillsAnimations();
        this.initHobbiesAnimations();
        this.initNotifications();
        this.initBackToTop();
        this.initKeyboardShortcuts();
        this.initEditingSystem();
        this.initMobileOptimizations();
        this.initModernFeatures();
    }

    // ===== MODERN FEATURES INITIALIZATION =====
    initModernFeatures() {
        this.initModernScrollReveal();
        this.initGlassmorphismEffects();
        this.addModernLoadingStates();
        this.initEnhancedThemeSystem();
        this.initModernNavigation();
        this.initPerformanceOptimizations();
    }

    // ===== LOADING SCREEN =====
    handleLoading() {
        // Loading screen removed - direct initialization
    }

    // ===== NAVIGATION =====
    initNavigation() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Hamburger menu toggle
        if (hamburger) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.classList.toggle('menu-open');
            });
        }

        // Navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Close mobile menu
                    if (hamburger) {
                        hamburger.classList.remove('active');
                        navMenu.classList.remove('active');
                        document.body.classList.remove('menu-open');
                    }

                    // Smooth scroll
                    const offsetTop = targetElement.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });

                    // Update active link
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            });
        });

        // Auto-highlight active section
        this.updateActiveNavigation();
    }

    updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', this.debounce(() => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }, 100));
    }

    // ===== SCROLL EFFECTS =====
    initScrollEffects() {
        const navbar = document.querySelector('.navbar');
        
        window.addEventListener('scroll', this.debounce(() => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, 10));
    }

    // ===== THEME SYSTEM =====
    initTheme() {
        const themeToggle = document.querySelector('.theme-toggle');
        const savedTheme = localStorage.getItem('theme');
        
        // Apply saved theme
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else {
            // Default to system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
        }
        
        this.updateThemeIcon();

        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.updateThemeIcon();
        
        this.showNotification('Theme changed successfully!', 'success');
    }

    updateThemeIcon() {
        const themeToggle = document.querySelector('.theme-toggle');
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        
        if (themeToggle) {
            themeToggle.innerHTML = isDark ? '☀️' : '🌙';
        }
    }

    // ===== INTERSECTION OBSERVER =====
    initIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Observe all sections
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // ===== SKILLS ANIMATIONS =====
    initSkillsAnimations() {
        const skillsSection = document.querySelector('.skills');
        const skillBars = document.querySelectorAll('.level-bar');

        if (skillsSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        skillBars.forEach((bar, index) => {
                            setTimeout(() => {
                                bar.classList.add('animating');
                                const level = bar.getAttribute('data-level');
                                bar.style.setProperty('--level', `${level}%`);
                            }, index * 200);
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });

            observer.observe(skillsSection);
        }
    }

    // ===== HOBBIES ANIMATIONS =====
    initHobbiesAnimations() {
        const hobbiesSection = document.querySelector('.hobbies');
        const hobbyItems = document.querySelectorAll('.hobby-item');

        if (hobbiesSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        hobbyItems.forEach((item, index) => {
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'translateY(0)';
                            }, index * 150);
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });

            observer.observe(hobbiesSection);
        }
    }

    // ===== NOTIFICATIONS =====
    initNotifications() {
        // Notifications are handled by showNotification method
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">&times;</button>
        `;

        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Auto hide
        setTimeout(() => {
            this.hideNotification(notification);
        }, 5000);

        // Close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            this.hideNotification(notification);
        });
    }

    hideNotification(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    // ===== BACK TO TOP =====
    initBackToTop() {
        const backToTopBtn = document.querySelector('.back-to-top');
        
        if (backToTopBtn) {
            window.addEventListener('scroll', this.debounce(() => {
                if (window.scrollY > 300) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            }, 100));

            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // ===== KEYBOARD SHORTCUTS =====
    initKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + E: Toggle edit mode
            if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
                e.preventDefault();
                this.toggleEditMode();
            }
            
            // Ctrl/Cmd + S: Save changes
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                if (this.isEditMode) {
                    this.saveChanges();
                }
            }
            
            // Ctrl/Cmd + D: Toggle dark mode
            if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }

    // ===== EDITING SYSTEM =====
    initEditingSystem() {
        const updateBtn = document.querySelector('.update-btn');
        
        if (updateBtn) {
            updateBtn.addEventListener('click', () => {
                this.toggleEditMode();
            });
        }
    }

    toggleEditMode() {
        this.isEditMode = !this.isEditMode;
        const editableFields = document.querySelectorAll('.editable-field');
        const updateBtn = document.querySelector('.update-btn');
        
        if (this.isEditMode) {
            editableFields.forEach(field => {
                this.makeEditable(field);
            });
            
            if (updateBtn) {
                updateBtn.innerHTML = '<i class="fas fa-save"></i> Save Changes';
                updateBtn.classList.add('save');
            }
            
            this.showNotification('Edit mode enabled! Click on text to edit.', 'info');
        } else {
            this.saveChanges();
        }
    }

    makeEditable(element) {
        const currentText = element.textContent.trim();
        const input = document.createElement('input');
        
        input.type = 'text';
        input.value = currentText;
        input.className = 'edit-input';
        
        element.style.display = 'none';
        element.parentNode.insertBefore(input, element.nextSibling);
        
        input.focus();
        input.select();
        
        input.addEventListener('blur', () => {
            this.finishEditing(element, input);
        });
        
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.finishEditing(element, input);
            } else if (e.key === 'Escape') {
                input.value = currentText;
                this.finishEditing(element, input);
            }
        });
    }

    finishEditing(element, input) {
        element.textContent = input.value;
        element.style.display = '';
        input.remove();
    }

    saveChanges() {
        const editInputs = document.querySelectorAll('.edit-input');
        
        editInputs.forEach(input => {
            const element = input.previousElementSibling;
            this.finishEditing(element, input);
        });
        
        this.isEditMode = false;
        const updateBtn = document.querySelector('.update-btn');
        
        if (updateBtn) {
            updateBtn.innerHTML = '<i class="fas fa-edit"></i> Update Info';
            updateBtn.classList.remove('save');
        }
        
        this.showNotification('Changes saved successfully!', 'success');
    }

    // ===== MOBILE OPTIMIZATIONS =====
    initMobileOptimizations() {
        // Viewport height fix for mobile
        const setVH = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        setVH();
        window.addEventListener('resize', this.debounce(setVH, 100));
        window.addEventListener('orientationchange', setVH);

        // Touch-friendly interactions
        this.initTouchOptimizations();
        this.initConnectionOptimizations();
    }

    initTouchOptimizations() {
        // Add touch feedback
        const touchElements = document.querySelectorAll('button, .nav-link, .project-link, .contact-item');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', () => {
                element.style.transform = 'scale(0.95)';
            });
            
            element.addEventListener('touchend', () => {
                element.style.transform = '';
            });
        });
    }

    initConnectionOptimizations() {
        // Connection quality detection
        if ('connection' in navigator) {
            const connection = navigator.connection;
            
            if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
                document.body.classList.add('slow-connection');
                this.showNotification('Slow connection detected. Some animations are disabled.', 'warning');
            }
        }
    }

    // ===== MODERN SCROLL REVEAL ANIMATIONS =====
    initModernScrollReveal() {
        const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    
                    // Add stagger effect for child elements
                    const children = entry.target.querySelectorAll('.modern-card, .skill-item, .hobby-item');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.style.animation = `fadeInUpEnhanced 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`;
                        }, index * 100);
                    });
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }

    // ===== ENHANCED GLASSMORPHISM EFFECTS =====
    initGlassmorphismEffects() {
        const glassElements = document.querySelectorAll('.glass-card, .modern-card');
        
        glassElements.forEach(element => {
            // Add mouse move parallax effect
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            });
        });
    }

    // ===== MODERN LOADING STATES =====
    addModernLoadingStates() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const cards = section.querySelectorAll('.modern-card, .skill-card, .hobby-card, .project-card');
            
            // Add skeleton loading effect initially
            cards.forEach((card, index) => {
                if (!card.classList.contains('loaded')) {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px)';
                    
                    setTimeout(() => {
                        card.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                        card.classList.add('loaded');
                    }, index * 150);
                }
            });
        });
    }

    // ===== ENHANCED THEME SYSTEM =====
    initEnhancedThemeSystem() {
        const themeToggle = document.querySelector('.theme-toggle');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Modern theme transition effect
        const addThemeTransition = () => {
            const transition = document.createElement('style');
            transition.textContent = `
                * {
                    transition: background-color 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                               color 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                               border-color 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                               box-shadow 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
                }
            `;
            document.head.appendChild(transition);
            
            setTimeout(() => {
                document.head.removeChild(transition);
            }, 500);
        };

        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                addThemeTransition();
                
                // Add ripple effect
                const ripple = document.createElement('span');
                ripple.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 0;
                    height: 0;
                    background: rgba(255, 255, 255, 0.6);
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                    z-index: -1;
                `;
                
                const style = document.createElement('style');
                style.textContent = `
                    @keyframes ripple {
                        to {
                            width: 60px;
                            height: 60px;
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
                
                themeToggle.style.position = 'relative';
                themeToggle.appendChild(ripple);
                
                setTimeout(() => {
                    themeToggle.removeChild(ripple);
                    document.head.removeChild(style);
                }, 600);
            });
        }

        // Auto theme based on time
        const autoTheme = () => {
            const hour = new Date().getHours();
            const isDarkTime = hour < 7 || hour > 19;
            
            if (isDarkTime && !document.documentElement.hasAttribute('data-theme')) {
                document.documentElement.setAttribute('data-theme', 'dark');
                this.updateThemeIcon();
            }
        };

        autoTheme();
        
        // Listen for system theme changes
        prefersDark.addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
                this.updateThemeIcon();
            }
        });
    }

    // ===== MODERN NAVIGATION EFFECTS =====
    initModernNavigation() {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Enhanced scroll effect with blur
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                navbar.classList.add('scrolled');
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.webkitBackdropFilter = 'blur(20px)';
                
                // Hide/show navbar based on scroll direction
                if (currentScrollY > lastScrollY && currentScrollY > 200) {
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    navbar.style.transform = 'translateY(0)';
                }
            } else {
                navbar.classList.remove('scrolled');
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });

        // Modern active link indicator
        const indicator = document.createElement('div');
        indicator.className = 'nav-indicator';
        indicator.style.cssText = `
            position: absolute;
            bottom: 0;
            height: 3px;
            background: var(--primary-gradient);
            border-radius: 2px;
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            pointer-events: none;
        `;
        
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            navMenu.style.position = 'relative';
            navMenu.appendChild(indicator);
            
            // Update indicator position
            const updateIndicator = (activeLink) => {
                if (activeLink) {
                    indicator.style.left = `${activeLink.offsetLeft}px`;
                    indicator.style.width = `${activeLink.offsetWidth}px`;
                    indicator.style.opacity = '1';
                } else {
                    indicator.style.opacity = '0';
                }
            };
            
            // Initialize indicator
            const activeLink = document.querySelector('.nav-link.active');
            updateIndicator(activeLink);
            
            // Update on hover and click
            navLinks.forEach(link => {
                link.addEventListener('mouseenter', () => updateIndicator(link));
                link.addEventListener('mouseleave', () => {
                    const activeLink = document.querySelector('.nav-link.active');
                    updateIndicator(activeLink);
                });
                
                link.addEventListener('click', () => {
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                    updateIndicator(link);
                });
            });
        }
    }

    // ===== MODERN PERFORMANCE OPTIMIZATIONS =====
    initPerformanceOptimizations() {
        // Intelligent animation reduction
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
        
        if (prefersReducedMotion.matches || isLowEndDevice) {
            document.body.classList.add('reduce-animations');
            
            const style = document.createElement('style');
            style.textContent = `
                .reduce-animations *,
                .reduce-animations *::before,
                .reduce-animations *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            `;
            document.head.appendChild(style);
        }

        // Lazy load heavy animations
        const heavyAnimationElements = document.querySelectorAll('.animate-float-enhanced, .animate-glow-pulse');
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                } else {
                    entry.target.style.animationPlayState = 'paused';
                }
            });
        }, { threshold: 0.1 });

        heavyAnimationElements.forEach(element => {
            element.style.animationPlayState = 'paused';
            animationObserver.observe(element);
        });

        // Battery API optimization
        if ('getBattery' in navigator) {
            navigator.getBattery().then(battery => {
                if (battery.level < 0.2 || !battery.charging) {
                    document.body.classList.add('power-saving');
                    
                    const powerSaveStyle = document.createElement('style');
                    powerSaveStyle.textContent = `
                        .power-saving .animate-float-enhanced,
                        .power-saving .animate-glow-pulse,
                        .power-saving .animate-shimmer-enhanced {
                            animation: none !important;
                        }
                        
                        .power-saving .glass-card::before,
                        .power-saving .modern-card::before {
                            display: none !important;
                        }
                    `;
                    document.head.appendChild(powerSaveStyle);
                }
            });
        }
    }

    // ===== UTILITY FUNCTIONS =====
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// ===== INITIALIZE APPLICATION =====
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
});

// ===== ADDITIONAL FEATURES =====

// Statistics counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count') || counter.textContent);
        const count = parseInt(counter.textContent);
        const increment = target / 100;
        
        if (count < target) {
            counter.textContent = Math.ceil(count + increment);
            setTimeout(() => animateCounters(), 20);
        } else {
            counter.textContent = target;
        }
    });
}

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const script = document.createElement('script');
    script.src = 'https://polyfill.io/v3/polyfill.min.js?features=smoothscroll';
    document.head.appendChild(script);
} 