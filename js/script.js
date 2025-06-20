/**
 * Portfolio Website - Enhanced JavaScript
 * Optimized for performance and user experience
 */

// ===== GLOBAL VARIABLES =====
const APP = {
    elements: {},
    state: {
        isMenuOpen: false,
        isEditing: false,
        theme: localStorage.getItem('theme') || 'light'
    },
    config: {
        scrollThreshold: 100,
        animationDuration: 300,
        counterSpeed: 50,
        githubUsername: 'VanTruong475' // GitHub username
    }
};

// ===== UTILITY FUNCTIONS =====
const Utils = {
    // Debounce function for performance optimization
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
    },

    // Smooth scroll to element
    scrollTo(element, offset = 70) {
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    },

    // Show notification
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;

        document.body.appendChild(notification);

        // Trigger animation
        requestAnimationFrame(() => {
            notification.classList.add('show');
        });

        // Auto remove
        setTimeout(() => {
            this.removeNotification(notification);
        }, 4000);

        // Close button event
        notification.querySelector('.notification-close').addEventListener('click', () => {
            this.removeNotification(notification);
        });
    },

    removeNotification(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, APP.config.animationDuration);
    },

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || icons.info;
    },

    // Animate counter
    animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        // Add counting class for pulse effect
        const statItem = element.closest('.stat-item');
        if (statItem) {
            statItem.classList.add('counting');
        }

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
                
                // Remove counting class when done
                if (statItem) {
                    setTimeout(() => {
                        statItem.classList.remove('counting');
                    }, 300);
                }
            }
            element.textContent = Math.floor(current) + '+';
        }, 16);
    }
};

// ===== INITIALIZATION =====
const initializeApp = () => {
    // Cache DOM elements
    cacheElements();
    
    // Mobile optimizations
    updateMobileSettings();
    initializePerformanceMonitoring();
    
    // Initialize features
    initializeLoadingScreen();
    initializeNavigation();
    initializeTheme();
    initializeScrollEffects();
    initializeProfileImage();
    initializeEditableFields();
    initializeIntersectionObserver();
    initializeSkillBars();
    initializeBackToTop();
    
    // Add enhanced animations
    addEnhancedAnimations();
    
    // Initialize GitHub integration
    initializeGitHubIntegration();
    
    // Event listeners
    addEventListeners();
    
    // Initialize about section animations
    initAboutAnimations();
    
    // Initialize career section animations
    initCareerAnimations();
    
    console.log('Portfolio website initialized successfully');
};

// ===== CACHE DOM ELEMENTS =====
const cacheElements = () => {
    APP.elements = {
        loadingScreen: document.getElementById('loading-screen'),
        navbar: document.getElementById('navbar'),
        hamburger: document.getElementById('hamburger'),
        navMenu: document.getElementById('nav-menu'),
        navLinks: document.querySelectorAll('.nav-link'),
        themeToggle: document.getElementById('themeToggle'),
        backToTop: document.getElementById('backToTop'),
        profileImg: document.getElementById('profileImg'),
        imageUpload: document.getElementById('imageUpload'),
        editButton: document.getElementById('editPersonalInfo'),
        saveButton: document.getElementById('savePersonalInfo'),
        editableFields: document.querySelectorAll('.editable-field'),
        statItems: document.querySelectorAll('.stat-item'),
        skillBars: document.querySelectorAll('.level-bar'),
        sections: document.querySelectorAll('section[id]')
    };
};

// ===== LOADING SCREEN =====
const initializeLoadingScreen = () => {
    window.addEventListener('load', () => {
        setTimeout(() => {
            // Check if loading screen exists before manipulating it
            if (APP.elements.loadingScreen) {
                APP.elements.loadingScreen.classList.add('hidden');
            }
            document.body.classList.add('loaded');
            
            // Trigger counters animation after loading
            setTimeout(() => {
                animateCounters();
            }, 500);
        }, 1000);
    });
};

// ===== NAVIGATION =====
const initializeNavigation = () => {
    // Scroll effect
    const handleScroll = Utils.debounce(() => {
        const scrolled = window.scrollY > 50;
        APP.elements.navbar.classList.toggle('scrolled', scrolled);
        
        // Update active nav link
        updateActiveNavLink();
        
        // Show/hide back to top button
        APP.elements.backToTop.classList.toggle('visible', window.scrollY > APP.config.scrollThreshold);
    }, 10);

    window.addEventListener('scroll', handleScroll);

    // Mobile menu toggle
    APP.elements.hamburger.addEventListener('click', toggleMobileMenu);

    // Navigation links
    APP.elements.navLinks.forEach(link => {
        link.addEventListener('click', handleNavLinkClick);
    });
};

const toggleMobileMenu = () => {
    APP.state.isMenuOpen = !APP.state.isMenuOpen;
    APP.elements.hamburger.classList.toggle('active', APP.state.isMenuOpen);
    APP.elements.navMenu.classList.toggle('active', APP.state.isMenuOpen);
    document.body.style.overflow = APP.state.isMenuOpen ? 'hidden' : '';
};

const handleNavLinkClick = (e) => {
    e.preventDefault();
    
    const targetId = e.target.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
        Utils.scrollTo(targetElement);
        
        // Close mobile menu if open
        if (APP.state.isMenuOpen) {
            toggleMobileMenu();
        }
    }
};

const updateActiveNavLink = () => {
    const currentSection = getCurrentSection();
    
    APP.elements.navLinks.forEach(link => {
        const section = link.getAttribute('data-section');
        link.classList.toggle('active', section === currentSection);
    });
};

const getCurrentSection = () => {
    const scrollPosition = window.scrollY + 100;
    
    for (const section of APP.elements.sections) {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            return section.id;
        }
    }
    
    return APP.elements.sections[0]?.id || 'home';
};

// ===== THEME MANAGEMENT =====
const initializeTheme = () => {
    // Set initial theme
    document.body.setAttribute('data-theme', APP.state.theme);
    updateThemeToggleIcon();
    
    // Theme toggle event
    APP.elements.themeToggle.addEventListener('click', toggleTheme);
};

const toggleTheme = () => {
    APP.state.theme = APP.state.theme === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', APP.state.theme);
    localStorage.setItem('theme', APP.state.theme);
    updateThemeToggleIcon();
    
    Utils.showNotification(
        `Đã chuyển sang chế độ ${APP.state.theme === 'dark' ? 'tối' : 'sáng'}`,
        'success'
    );
};

const updateThemeToggleIcon = () => {
    const icon = APP.elements.themeToggle.querySelector('i');
    icon.className = APP.state.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
};

// ===== SCROLL EFFECTS =====
const initializeScrollEffects = () => {
    // Enhanced parallax effect for hero section and profile image
    window.addEventListener('scroll', Utils.debounce(() => {
        const scrolled = window.pageYOffset;
        
        // Floating shapes parallax
        const heroElements = document.querySelectorAll('.floating-shapes .shape');
        heroElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        // Profile image parallax
        const profileImg = document.querySelector('.profile-image');
        if (profileImg) {
            const rate = scrolled * -0.2;
            profileImg.style.transform = `translateY(${rate}px) scale(1.02)`;
        }
        
        // Typewriter effect trigger for career section
        const careerSection = document.querySelector('#career');
        if (careerSection) {
            const rect = careerSection.getBoundingClientRect();
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                careerSection.classList.add('typewriter-active');
            }
        }
        
        // Update back to top button
        const isScrolledEnough = window.scrollY > APP.config.scrollThreshold;
        APP.elements.backToTop.classList.toggle('visible', isScrolledEnough);
        
    }, 16));
};

// ===== PROFILE IMAGE =====
const initializeProfileImage = () => {
    if (!APP.elements.profileImg || !APP.elements.imageUpload) return;
    
    APP.elements.profileImg.addEventListener('click', () => {
        APP.elements.imageUpload.click();
    });
    
    APP.elements.imageUpload.addEventListener('change', handleImageUpload);
};

const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
        Utils.showNotification('Vui lòng chọn file hình ảnh hợp lệ', 'error');
        return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        Utils.showNotification('Kích thước file không được vượt quá 5MB', 'error');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
        APP.elements.profileImg.src = e.target.result;
        Utils.showNotification('Ảnh đã được cập nhật thành công!', 'success');
        
        // Save to localStorage
        localStorage.setItem('profileImage', e.target.result);
    };
    reader.readAsDataURL(file);
};

// ===== EDITABLE FIELDS =====
const initializeEditableFields = () => {
    if (!APP.elements.editButton || !APP.elements.saveButton) return;
    
    APP.elements.editButton.addEventListener('click', enableEditing);
    APP.elements.saveButton.addEventListener('click', saveChanges);
    
    // Load saved data
    loadSavedData();
};

const enableEditing = () => {
    APP.state.isEditing = true;
    APP.elements.editButton.style.display = 'none';
    APP.elements.saveButton.style.display = 'inline-flex';
    
    APP.elements.editableFields.forEach(field => {
        const currentValue = field.textContent.trim();
        const input = createEditInput(field, currentValue);
        
        field.innerHTML = '';
        field.appendChild(input);
        
        if (field === APP.elements.editableFields[0]) {
            input.focus();
        }
    });
    
    Utils.showNotification('Đã bật chế độ chỉnh sửa', 'info');
};

const createEditInput = (field, value) => {
    const isTextarea = field.classList.contains('personal-description');
    const input = document.createElement(isTextarea ? 'textarea' : 'input');
    
    input.value = value;
    input.className = 'edit-input';
    
    if (isTextarea) {
        input.rows = 4;
        input.style.resize = 'vertical';
    } else {
        input.type = 'text';
    }
    
    // Auto-resize for textarea
    if (isTextarea) {
        input.addEventListener('input', () => {
            input.style.height = 'auto';
            input.style.height = input.scrollHeight + 'px';
        });
    }
    
    return input;
};

const saveChanges = () => {
    const data = {};
    
    APP.elements.editableFields.forEach(field => {
        const input = field.querySelector('.edit-input');
        const fieldName = field.getAttribute('data-field');
        const value = input.value.trim();
        
        if (value) {
            field.textContent = value;
            data[fieldName] = value;
        } else {
            field.textContent = getDefaultValue(fieldName);
        }
    });
    
    // Save to localStorage
    localStorage.setItem('personalData', JSON.stringify(data));
    
    APP.state.isEditing = false;
    APP.elements.editButton.style.display = 'inline-flex';
    APP.elements.saveButton.style.display = 'none';
    
    Utils.showNotification('Thông tin đã được lưu thành công!', 'success');
};

const loadSavedData = () => {
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage && APP.elements.profileImg) {
        APP.elements.profileImg.src = savedImage;
    }
    
    const savedData = localStorage.getItem('personalData');
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            
            APP.elements.editableFields.forEach(field => {
                const fieldName = field.getAttribute('data-field');
                if (data[fieldName]) {
                    field.textContent = data[fieldName];
                }
            });
        } catch (e) {
            console.warn('Could not load saved personal data:', e);
        }
    }
};

const getDefaultValue = (fieldName) => {
    const defaults = {
        fullName: 'Nguyễn Văn A',
        birthDate: '01/01/2000',
        address: 'Hà Nội, Việt Nam',
        occupation: 'Sinh viên IT',
        description: 'Tôi là một sinh viên đam mê công nghệ...'
    };
    return defaults[fieldName] || '';
};

// ===== INTERSECTION OBSERVER =====
const initializeIntersectionObserver = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                // Add general animate class
                target.classList.add('animate');
                
                // Add active class for reveal animations
                if (target.classList.contains('reveal') || 
                    target.classList.contains('reveal-scale') || 
                    target.classList.contains('reveal-left') || 
                    target.classList.contains('reveal-right')) {
                    target.classList.add('active');
                }
                
                // Handle custom animate classes
                if (target.classList.contains('animate-slide-right')) {
                    target.style.transform = 'translateX(0)';
                    target.style.opacity = '1';
                } else if (target.classList.contains('animate-slide-left')) {
                    target.style.transform = 'translateX(0)';
                    target.style.opacity = '1';
                } else if (target.classList.contains('animate-slide-up')) {
                    target.style.transform = 'translateY(0)';
                    target.style.opacity = '1';
                } else if (target.classList.contains('animate-scale')) {
                    target.style.transform = 'scale(1)';
                    target.style.opacity = '1';
                } else if (target.classList.contains('animate-fade-in')) {
                    target.style.opacity = '1';
                } else if (target.classList.contains('animate-zoom-in')) {
                    target.style.transform = 'scale(1)';
                    target.style.opacity = '1';
                }
                
                // Trigger skill bars animation for skills section
                if (target.id === 'skills') {
                    setTimeout(() => {
                        animateSkillBars();
                    }, 500);
                }
                
                // Trigger specific animations based on section
                if (target.id === 'about') {
                    setTimeout(() => {
                        animateCounters();
                    }, 300);
                }
                
                observer.unobserve(target);
            }
        });
    }, observerOptions);
    
    // Observe all sections and specific elements
    const elementsToObserve = document.querySelectorAll(
        'section[id], .skill-card, .hobby-card, .project-card, .contact-item, .career-item, .reveal, .reveal-scale, .reveal-left, .reveal-right, [class*="animate-"]'
    );
    
    elementsToObserve.forEach(el => observer.observe(el));
};

// ===== SKILL BARS ANIMATION =====
const initializeSkillBars = () => {
    // Store original widths and reset all skill bars
    APP.elements.skillBars.forEach(bar => {
        const originalWidth = bar.style.width;
        bar.setAttribute('data-width', originalWidth);
        bar.style.setProperty('--target-width', originalWidth);
        bar.style.width = '0%';
    });
};

const animateSkillBars = () => {
    APP.elements.skillBars.forEach((bar, index) => {
        const targetWidth = bar.getAttribute('data-width') || '0%';
        
        setTimeout(() => {
            bar.style.transition = 'width 1.5s ease-in-out';
            bar.style.width = targetWidth;
            
            // Add ripple effect
            bar.classList.add('animating');
            setTimeout(() => {
                bar.classList.remove('animating');
            }, 1500);
        }, index * 150);
    });
};

// ===== ENHANCED ANIMATIONS =====
const addEnhancedAnimations = () => {
    // Add stagger animation to hobby cards
    const hobbyCards = document.querySelectorAll('.hobby-card');
    hobbyCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Add hover effects to skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const levelBar = card.querySelector('.level-bar');
            if (levelBar) {
                levelBar.style.animationDuration = '0.5s';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const levelBar = card.querySelector('.level-bar');
            if (levelBar) {
                levelBar.style.animationDuration = '2s';
            }
        });
    });
    
    // Add floating animation to hobby icons with different delays
    const hobbyIcons = document.querySelectorAll('.hobby-icon');
    hobbyIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.5}s`;
    });
};

// ===== COUNTERS ANIMATION =====
const animateCounters = () => {
    APP.elements.statItems.forEach((item, index) => {
        const target = parseInt(item.getAttribute('data-count')) || 0;
        const numberElement = item.querySelector('.stat-number');
        
        setTimeout(() => {
            Utils.animateCounter(numberElement, target);
        }, index * 200);
    });
};

// ===== BACK TO TOP =====
const initializeBackToTop = () => {
    if (APP.elements.backToTop) {
        APP.elements.backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
};

// ===== GITHUB INTEGRATION =====
const initializeGitHubIntegration = () => {
    // Update GitHub links
    updateGitHubLinks();
    
    // Fetch GitHub stats (Optional - requires GitHub API)
    fetchGitHubStats();
};

const updateGitHubLinks = () => {
    const username = APP.config.githubUsername;
    
    // Update GitHub profile link in contact section
    const githubLink = document.querySelector('.contact-item a[href*="github"]');
    if (githubLink && username !== 'YOUR_GITHUB_USERNAME') {
        githubLink.href = `https://github.com/${username}`;
        githubLink.textContent = `github.com/${username}`;
    }
    
    // Update GitHub button in projects
    const githubButton = document.querySelector('.github-button');
    if (githubButton && username !== 'YOUR_GITHUB_USERNAME') {
        githubButton.href = `https://github.com/${username}`;
    }
    
    // Update project GitHub links (you can customize this for specific repos)
    const projectGithubLinks = document.querySelectorAll('.project-link.github-link');
    projectGithubLinks.forEach((link, index) => {
        if (username !== 'YOUR_GITHUB_USERNAME') {
            // You can customize these repo names  
            const repoNames = ['todo-app', 'calculator-app', 'weather-app', 'Busticketsystem', 'profile1', 'ecommerce-project'];
            if (repoNames[index]) {
                link.href = `https://github.com/${username}/${repoNames[index]}`;
            }
        }
    });
};

const fetchGitHubStats = async () => {
    const username = APP.config.githubUsername;
    
    // Only fetch if username is set
    if (username === 'YOUR_GITHUB_USERNAME') {
        console.log('GitHub username not configured. Update APP.config.githubUsername in script.js');
        return;
    }
    
    try {
        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userResponse.json();
        
        // Fetch repositories
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
        const reposData = await reposResponse.json();
        
        if (userResponse.ok && reposResponse.ok) {
            updateGitHubStats({
                repos: userData.public_repos,
                followers: userData.followers,
                stars: reposData.reduce((total, repo) => total + repo.stargazers_count, 0),
                commits: 'N/A' // GitHub API doesn't provide total commits easily
            });
        } else {
            console.warn('GitHub API rate limit or user not found');
            setDefaultGitHubStats();
        }
    } catch (error) {
        console.warn('GitHub API fetch failed:', error);
        setDefaultGitHubStats();
    }
};

const updateGitHubStats = (stats) => {
    const repoElement = document.getElementById('repoCount');
    const commitElement = document.getElementById('commitCount');
    const starElement = document.getElementById('starCount');
    const followerElement = document.getElementById('followerCount');
    
    if (repoElement) repoElement.textContent = stats.repos || '0';
    if (commitElement) commitElement.textContent = stats.commits || '500+';
    if (starElement) starElement.textContent = stats.stars || '0';
    if (followerElement) followerElement.textContent = stats.followers || '0';
};

const setDefaultGitHubStats = () => {
    updateGitHubStats({
        repos: '10+',
        commits: '500+',
        stars: '5+',
        followers: '10+'
    });
};

// ===== EVENT LISTENERS =====
const addEventListeners = () => {
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // ESC key to close mobile menu
        if (e.key === 'Escape' && APP.state.isMenuOpen) {
            toggleMobileMenu();
        }
        
        // Ctrl/Cmd + E to toggle editing
        if ((e.ctrlKey || e.metaKey) && e.key === 'e' && !APP.state.isEditing) {
            e.preventDefault();
            enableEditing();
        }
        
        // Ctrl/Cmd + S to save changes
        if ((e.ctrlKey || e.metaKey) && e.key === 's' && APP.state.isEditing) {
            e.preventDefault();
            saveChanges();
        }
    });
    
    // Window resize handler
    window.addEventListener('resize', Utils.debounce(() => {
        // Close mobile menu on desktop
        if (window.innerWidth > 768 && APP.state.isMenuOpen) {
            toggleMobileMenu();
        }
        
        // Update mobile detection
        updateMobileSettings();
    }, 250));
    
    // Click outside to close mobile menu
    document.addEventListener('click', (e) => {
        if (APP.state.isMenuOpen && 
            !APP.elements.navMenu.contains(e.target) && 
            !APP.elements.hamburger.contains(e.target)) {
            toggleMobileMenu();
        }
    });
    
    // Touch events for mobile optimization
    if ('ontouchstart' in window) {
        addTouchEventListeners();
    }
    
    // Orientation change handler
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            // Recalculate viewport height after orientation change
            document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
            
            // Close mobile menu on orientation change
            if (APP.state.isMenuOpen) {
                toggleMobileMenu();
            }
        }, 100);
    });
    
    // Visibility change handler for performance
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Pause animations when tab is not visible
            document.body.classList.add('tab-hidden');
        } else {
            document.body.classList.remove('tab-hidden');
        }
    });
};

// ===== MOBILE OPTIMIZATIONS =====
const updateMobileSettings = () => {
    const isMobile = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 480;
    
    // Update CSS custom properties for mobile
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    
    // Disable expensive animations on small screens
    if (isSmallMobile) {
        document.body.classList.add('small-mobile');
        // Disable floating shapes for performance
        const floatingShapes = document.querySelector('.floating-shapes');
        if (floatingShapes) {
            floatingShapes.style.display = 'none';
        }
    } else {
        document.body.classList.remove('small-mobile');
    }
    
    // Update mobile class
    document.body.classList.toggle('mobile', isMobile);
};

// ===== TOUCH EVENT HANDLERS =====
const addTouchEventListeners = () => {
    let touchStartY = 0;
    let touchStartTime = 0;
    
    // Swipe to close mobile menu
    APP.elements.navMenu.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
    }, { passive: true });
    
    APP.elements.navMenu.addEventListener('touchmove', (e) => {
        if (!APP.state.isMenuOpen) return;
        
        const touchY = e.touches[0].clientY;
        const deltaY = touchY - touchStartY;
        const deltaTime = Date.now() - touchStartTime;
        
        // Detect upward swipe to close menu
        if (deltaY < -50 && deltaTime < 300) {
            toggleMobileMenu();
        }
    }, { passive: true });
    
    // Smooth scroll on touch devices
    const smoothScrollElements = document.querySelectorAll('a[href^="#"]');
    smoothScrollElements.forEach(element => {
        element.addEventListener('touchend', (e) => {
            e.preventDefault();
            const targetId = element.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                Utils.scrollTo(targetElement);
                
                if (APP.state.isMenuOpen) {
                    toggleMobileMenu();
                }
            }
        });
    });
    
    // Prevent zoom on double tap for buttons
    const buttons = document.querySelectorAll('button, .cta-button, .project-link');
    buttons.forEach(button => {
        let lastTouchEnd = 0;
        button.addEventListener('touchend', (e) => {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    });
};

// ===== PERFORMANCE MONITORING =====
const initializePerformanceMonitoring = () => {
    // Monitor performance and adjust settings accordingly
    if ('connection' in navigator) {
        const connection = navigator.connection;
        const isSlowConnection = connection.effectiveType === 'slow-2g' || 
                                connection.effectiveType === '2g' || 
                                connection.effectiveType === '3g';
        
        if (isSlowConnection) {
            // Disable heavy animations and effects
            document.body.classList.add('slow-connection');
            
            // Disable floating shapes
            const floatingShapes = document.querySelector('.floating-shapes');
            if (floatingShapes) {
                floatingShapes.style.display = 'none';
            }
            
            // Reduce animation complexity
            const hobbyIcons = document.querySelectorAll('.hobby-icon');
            hobbyIcons.forEach(icon => {
                icon.style.animation = 'none';
            });
        }
    }
    
    // Battery API for mobile devices
    if ('getBattery' in navigator) {
        navigator.getBattery().then(battery => {
            const updateBatteryOptimizations = () => {
                if (battery.level < 0.2 || !battery.charging) {
                    // Enable power saving mode
                    document.body.classList.add('power-saving');
                } else {
                    document.body.classList.remove('power-saving');
                }
            };
            
            battery.addEventListener('levelchange', updateBatteryOptimizations);
            battery.addEventListener('chargingchange', updateBatteryOptimizations);
            updateBatteryOptimizations();
        });
    }
};

// ===== INITIALIZE WHEN DOM IS READY =====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// ===== ADVANCED ANIMATIONS =====
const initializeAdvancedAnimations = () => {
    // Parallax effect for hero shapes
    initializeParallax();
    
    // Advanced scroll animations
    initializeEnhancedScrollAnimations();
    
    // Button ripple effects
    initializeRippleEffects();
    
    // Dynamic effects
    initializeDynamicEffects();
};

const initializeParallax = () => {
    const shapes = document.querySelectorAll('.floating-shapes .shape');
    
    window.addEventListener('scroll', Utils.debounce(() => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            shape.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.02}deg)`;
        });
    }, 10));
};

const initializeEnhancedScrollAnimations = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add staggered animation for child elements
                const children = entry.target.querySelectorAll('.stagger-child');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-in');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe all sections and animatable elements
    document.querySelectorAll('section, .reveal, .skill-category, .hobby-item').forEach(el => {
        observer.observe(el);
    });
};

const initializeRippleEffects = () => {
    const buttons = document.querySelectorAll('.cta-button, .update-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
};

const initializeDynamicEffects = () => {
    // Mouse movement parallax
    document.addEventListener('mousemove', Utils.debounce((e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Move floating shapes based on mouse position
        const shapes = document.querySelectorAll('.floating-shapes .shape');
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 5;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            
            const currentTransform = shape.style.transform || '';
            shape.style.transform = currentTransform + ` translate(${x}px, ${y}px)`;
        });
    }, 16));
};

// ===== ENHANCED CSS ANIMATIONS =====
const addAdvancedStylesheets = () => {
    const style = document.createElement('style');
    style.textContent = `
        /* Ripple Effect */
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        /* Stagger animations */
        .stagger-child {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .stagger-child.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Enhanced hover effects */
        .enhanced-hover {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .enhanced-hover:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        }
    `;
    document.head.appendChild(style);
};

// Enhanced initialization
const enhancedInit = () => {
    addAdvancedStylesheets();
    setTimeout(initializeAdvancedAnimations, 1000);
};

// Main initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initializeApp();
        enhancedInit();
    });
} else {
    initializeApp();
    enhancedInit();
}

// Export for potential use in other scripts
window.PortfolioApp = {
    Utils,
    toggleTheme,
    showNotification: Utils.showNotification,
    initializeAdvancedAnimations
};

// ===== ABOUT SECTION ANIMATIONS =====
const initAboutAnimations = () => {
    // Typewriter effect variables
    const funFacts = [
        "Tôi thích code xuyên đêm với nhạc Lo-fi 🎵",
        "Có thể uống 5 cốc cà phê trong một ngày ☕",
        "Đam mê game chiến thuật và puzzle 🎮",
        "Mơ ước tạo ra một startup công nghệ 🚀",
        "Thích học công nghệ mới vào cuối tuần 💻"
    ];

    let currentFactIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typewriterTimeout;

    const typewriterEffect = () => {
        const funfactText = document.getElementById('funfactText');
        if (!funfactText) return;
        
        const currentFact = funFacts[currentFactIndex];
        
        if (isDeleting) {
            funfactText.textContent = currentFact.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            
            if (currentCharIndex === 0) {
                isDeleting = false;
                currentFactIndex = (currentFactIndex + 1) % funFacts.length;
                typewriterTimeout = setTimeout(typewriterEffect, 500);
            } else {
                typewriterTimeout = setTimeout(typewriterEffect, 50);
            }
        } else {
            funfactText.textContent = currentFact.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            
            if (currentCharIndex === currentFact.length) {
                isDeleting = true;
                typewriterTimeout = setTimeout(typewriterEffect, 2000);
            } else {
                typewriterTimeout = setTimeout(typewriterEffect, 100);
            }
        }
    };

    // Start typewriter effect when funfact section is visible
    const funfactSection = document.querySelector('.funfact-section');
    if (funfactSection) {
        const funfactObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        typewriterEffect();
                    }, 500);
                    funfactObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        funfactObserver.observe(funfactSection);
    }

    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
        if (typewriterTimeout) {
            clearTimeout(typewriterTimeout);
        }
    });
};

// Enhanced career section animations
function initCareerAnimations() {
    // Animate progress circles
    const progressCircles = document.querySelectorAll('.progress-circle');
    
    progressCircles.forEach(circle => {
        const progress = parseInt(circle.getAttribute('data-progress') || 0);
        const angle = (progress / 100) * 360;
        
        // Set initial state
        circle.style.background = `conic-gradient(
            #10b981 0deg,
            #10b981 0deg,
            rgba(16, 185, 129, 0.2) 0deg
        )`;
        
        // Animate when in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.background = `conic-gradient(
                            #10b981 0deg,
                            #10b981 ${angle}deg,
                            rgba(16, 185, 129, 0.2) ${angle}deg
                        )`;
                    }, 300);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        observer.observe(circle);
    });
    
    // Animate progress bars
    const progressFills = document.querySelectorAll('.progress-fill');
    
    progressFills.forEach(fill => {
        const targetWidth = fill.style.width;
        fill.style.width = '0%';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.width = targetWidth;
                    }, 500);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(fill);
    });
    
    // Animate metrics counters
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                if (target.toString().includes('M')) {
                    element.textContent = Math.floor(start) + 'M';
                } else if (target.toString().includes('%')) {
                    element.textContent = Math.floor(start) + '%';
                } else {
                    element.textContent = Math.floor(start);
                }
            }
        }, 16);
    }
    
    // Animate metric numbers when they come into view
    const metricNumbers = document.querySelectorAll('.metric-number, .vision-number');
    
    metricNumbers.forEach(number => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const text = entry.target.textContent;
                    let target;
                    
                    if (text.includes('M')) {
                        target = parseInt(text.replace('M', ''));
                    } else if (text.includes('%')) {
                        target = parseInt(text.replace('%', ''));
                    } else if (text.includes('+')) {
                        target = parseInt(text.replace('+', ''));
                    } else {
                        target = parseInt(text);
                    }
                    
                    if (!isNaN(target)) {
                        animateCounter(entry.target, target);
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(number);
    });
    
    // Hover effects for company tags
    const companyTags = document.querySelectorAll('.company-tag');
    
    companyTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Enhanced goal item animations
    const goalItems = document.querySelectorAll('.goal-item');
    
    goalItems.forEach((item, index) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        // Set initial state
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all 0.5s ease-out';
        
        observer.observe(item);
    });
    

}
