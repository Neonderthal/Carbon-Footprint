// Carbon Conscious Website JavaScript - Enhanced

// Application State
const state = {
    currentPage: 'home',
    currentStep: 0,
    totalSteps: 4,
    calculatorData: {},
    carouselIndex: 0,
    carouselInterval: null,
    userProgress: {
        totalPoints: 400,
        currentTier: 'Silver',
        calculationsCompleted: 5,
        footprintReduction: 8,
        achievements: ['first_calculation', 'consistent_tracker']
    }
};

// Application Data
const appData = {
    navigation: {
        tabs: [
            {id: "home", label: "Home", color: "#4A90E2", icon: "🏠"},
            {id: "calculator", label: "Calculator", color: "#F5A623", icon: "🧮"},
            {id: "tips", label: "Tips", color: "#7ED321", icon: "💡"},
            {id: "rewards", label: "Rewards", color: "#BD10E0", icon: "🏆"},
            {id: "about", label: "About", color: "#50E3C2", icon: "ℹ️"},
            {id: "contact", label: "Contact", color: "#D0021B", icon: "📞"}
        ]
    },
    achievements: [
        {
            id: "first_calculation",
            name: "Getting Started",
            description: "Complete your first carbon footprint calculation",
            tier: "Bronze",
            icon: "🥉",
            points: 100,
            requirement: "Complete 1 calculation",
            unlocked: true
        },
        {
            id: "consistent_tracker",
            name: "Consistent Tracker", 
            description: "Complete 5 carbon footprint calculations",
            tier: "Silver",
            icon: "🥈",
            points: 300,
            requirement: "Complete 5 calculations",
            unlocked: true
        },
        {
            id: "improvement_seeker",
            name: "Improvement Seeker",
            description: "Reduce your carbon footprint by 10%",
            tier: "Silver", 
            icon: "📉",
            points: 400,
            requirement: "10% reduction",
            unlocked: false,
            progress: 80
        },
        {
            id: "dedicated_user",
            name: "Dedicated User",
            description: "Complete 10 carbon footprint calculations",
            tier: "Gold",
            icon: "🥇",
            points: 600,
            requirement: "Complete 10 calculations", 
            unlocked: false
        },
        {
            id: "climate_warrior",
            name: "Climate Warrior",
            description: "Reduce your carbon footprint by 25%",
            tier: "Gold",
            icon: "⚔️",
            points: 800,
            requirement: "25% reduction",
            unlocked: false
        },
        {
            id: "sustainability_expert",
            name: "Sustainability Expert",
            description: "Complete 20 calculations and maintain improvement",
            tier: "Platinum",
            icon: "🏅",
            points: 1200,
            requirement: "20 calculations + improvement",
            unlocked: false
        },
        {
            id: "eco_champion",
            name: "Eco Champion",
            description: "Achieve and maintain 50% footprint reduction",
            tier: "Diamond",
            icon: "💎",
            points: 2000,
            requirement: "50% reduction maintained",
            unlocked: false
        }
    ],
    globalStats: [
        {value: "421", unit: "ppm", label: "Current Atmospheric CO₂", trend: "↗"},
        {value: "4.8", unit: "tons", label: "Global Average Footprint", trend: "📊"},
        {value: "2.3", unit: "tons", label: "Target for 2030", trend: "🎯"},
        {value: "50000", unit: "", label: "Users Helped", trend: "👥"},
        {value: "125000", unit: "tons", label: "CO₂ Reduced", trend: "🌱"},
        {value: "195", unit: "", label: "Countries Covered", trend: "🌍"}
    ]
};

// Calculator Configuration
const calculatorConfig = {
    categories: [
        {
            name: "Transportation",
            icon: "🚗",
            questions: [
                {id: "car_miles", label: "Miles driven per week", type: "number", factor: 0.89},
                {id: "public_transport", label: "Hours of public transport per week", type: "number", factor: 0.15},
                {id: "flights", label: "Flight hours per year", type: "number", factor: 90}
            ]
        },
        {
            name: "Energy",
            icon: "⚡",
            questions: [
                {id: "electricity", label: "Monthly electricity bill ($)", type: "number", factor: 0.7},
                {id: "heating", label: "Monthly heating bill ($)", type: "number", factor: 1.2},
                {id: "renewable", label: "Renewable energy percentage", type: "range", factor: -0.5}
            ]
        },
        {
            name: "Diet",
            icon: "🍽️",
            questions: [
                {id: "meat_meals", label: "Meat meals per week", type: "number", factor: 3.3},
                {id: "local_food", label: "Local food percentage", type: "range", factor: -0.8},
                {id: "food_waste", label: "Food waste percentage", type: "range", factor: 1.1}
            ]
        },
        {
            name: "Lifestyle",
            icon: "🏠",
            questions: [
                {id: "shopping", label: "Shopping frequency per month", type: "number", factor: 2.1},
                {id: "recycling", label: "Recycling percentage", type: "range", factor: -0.4},
                {id: "water_usage", label: "Daily shower minutes", type: "number", factor: 0.3}
            ]
        }
    ]
};

// DOM Elements
const elements = {
    loadingScreen: null,
    navLinks: null,
    pages: null,
    carouselTrack: null,
    carouselSlides: null,
    carouselIndicators: null,
    modal: null,
    calculatorSteps: null,
    progressFill: null,
    currentStepSpan: null,
    prevBtn: null,
    nextBtn: null,
    calculateBtn: null,
    resultsSection: null
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    setupEventListeners();
    initializeAnimations();
    initializeCarousel();
    startCarousel();
    hideLoadingScreen();
    setupRippleEffect();
    setupScrollAnimations();
    initializeCalculator();
    setupEnhancedNavigation();
    
    // Set initial active states
    showPage('home');
    updateNavigation();
});

// Initialize DOM Elements
function initializeElements() {
    elements.loadingScreen = document.querySelector('.loading-screen');
    elements.navLinks = document.querySelectorAll('.nav-link');
    elements.pages = document.querySelectorAll('.page');
    elements.carouselTrack = document.querySelector('.carousel-track');
    elements.carouselSlides = document.querySelectorAll('.carousel-slide');
    elements.carouselIndicators = document.querySelectorAll('.indicator');
    elements.modal = document.getElementById('learn-more-modal');
    elements.calculatorSteps = document.querySelectorAll('.calculator-step');
    elements.progressFill = document.querySelector('.progress-fill');
    elements.currentStepSpan = document.querySelector('.current-step');
    elements.prevBtn = document.getElementById('prev-step');
    elements.nextBtn = document.getElementById('next-step');
    elements.calculateBtn = document.getElementById('calculate-btn');
    elements.resultsSection = document.querySelector('.calculator-results');
}

// Enhanced Navigation Setup
function setupEnhancedNavigation() {
    // Add enhanced hover effects and transitions
    elements.navLinks.forEach(link => {
        const color = link.getAttribute('data-color');
        
        link.addEventListener('mouseenter', () => {
            if (!link.classList.contains('active')) {
                link.style.borderColor = color;
                link.style.color = color;
                link.style.transform = 'translateY(-2px)';
            }
        });
        
        link.addEventListener('mouseleave', () => {
            if (!link.classList.contains('active')) {
                link.style.borderColor = 'transparent';
                link.style.color = '';
                link.style.transform = '';
            }
        });
    });
}

// Setup Event Listeners
function setupEventListeners() {
    // Navigation
    elements.navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });
    
    // Carousel controls
    document.querySelector('.carousel-prev')?.addEventListener('click', () => changeSlide(-1));
    document.querySelector('.carousel-next')?.addEventListener('click', () => changeSlide(1));
    
    elements.carouselIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });
    
    // Modal controls
    document.querySelector('.learn-more-btn')?.addEventListener('click', openModal);
    document.querySelector('.modal-close')?.addEventListener('click', closeModal);
    document.querySelector('.modal-backdrop')?.addEventListener('click', closeModal);
    
    // Calculator controls
    elements.prevBtn?.addEventListener('click', previousStep);
    elements.nextBtn?.addEventListener('click', nextStep);
    elements.calculateBtn?.addEventListener('click', calculateResults);
    
    // Range inputs
    document.querySelectorAll('.range-input').forEach(input => {
        input.addEventListener('input', updateRangeValue);
    });
    
    // Form submission
    document.querySelector('.contact-form')?.addEventListener('submit', handleContactForm);
    
    // Scroll progress
    window.addEventListener('scroll', updateScrollProgress);
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
}

// Loading Screen
function hideLoadingScreen() {
    setTimeout(() => {
        if (elements.loadingScreen) {
            elements.loadingScreen.style.opacity = '0';
            setTimeout(() => {
                elements.loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 1500);
}

// Navigation
function handleNavigation(e) {
    e.preventDefault();
    const targetPage = e.target.getAttribute('href').substring(1);
    showPage(targetPage);
}

function showPage(pageId) {
    // Update state
    state.currentPage = pageId;
    
    // Hide all pages
    elements.pages.forEach(page => page.classList.remove('active'));
    
    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        
        // Trigger animations for the new page
        setTimeout(() => {
            triggerPageAnimations(pageId);
        }, 100);
    }
    
    // Update navigation
    updateNavigation();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Page-specific initialization
    if (pageId === 'home') {
        initializeHomePage();
    } else if (pageId === 'rewards') {
        initializeRewardsPage();
    }
}

function updateNavigation() {
    elements.navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === `#${state.currentPage}`;
        link.classList.toggle('active', isActive);
        
        if (isActive) {
            const color = link.getAttribute('data-color');
            link.style.backgroundColor = color;
            link.style.borderColor = color;
            link.style.color = 'white';
        } else {
            link.style.backgroundColor = '';
            link.style.borderColor = '';
            link.style.color = '';
        }
    });
}

// Homepage Initialization
function initializeHomePage() {
    // Animate mission stats
    setTimeout(() => {
        animateStatNumbers('.mission-stats .stat-number');
    }, 500);
    
    // Animate global stats
    setTimeout(() => {
        animateStatNumbers('.stats-grid .stat-value');
    }, 1000);
}

// Rewards Page Initialization
function initializeRewardsPage() {
    updateAchievementCards();
    animateProgressBars();
}

function updateAchievementCards() {
    const achievementCards = document.querySelectorAll('.achievement-card');
    
    appData.achievements.forEach((achievement, index) => {
        const card = achievementCards[index];
        if (!card) return;
        
        if (achievement.unlocked) {
            card.classList.add('unlocked');
            card.classList.remove('locked');
        } else {
            card.classList.add('locked');
            card.classList.remove('unlocked');
        }
        
        // Update progress if available
        if (achievement.progress && !achievement.unlocked) {
            const progressElement = card.querySelector('.achievement-progress');
            if (progressElement) {
                progressElement.textContent = `${achievement.progress}% complete`;
            }
        }
    });
}

function animateProgressBars() {
    const progressBars = document.querySelectorAll('#rewards .progress-fill');
    progressBars.forEach((bar, index) => {
        setTimeout(() => {
            bar.style.width = bar.style.width || '80%';
        }, index * 200);
    });
}

// Ripple Effect
function setupRippleEffect() {
    document.querySelectorAll('.ripple-btn').forEach(button => {
        button.addEventListener('click', createRipple);
    });
}

function createRipple(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    `;
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple animation CSS
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyles);

// Carousel Functionality
function initializeCarousel() {
    state.carouselIndex = 0;
    updateCarousel();
}

function startCarousel() {
    if (elements.carouselSlides.length > 0) {
        state.carouselInterval = setInterval(() => {
            changeSlide(1);
        }, 5000);
    }
}

function changeSlide(direction) {
    const totalSlides = elements.carouselSlides.length;
    state.carouselIndex = (state.carouselIndex + direction + totalSlides) % totalSlides;
    updateCarousel();
}

function goToSlide(index) {
    state.carouselIndex = index;
    updateCarousel();
}

function updateCarousel() {
    if (elements.carouselTrack) {
        const translateX = -state.carouselIndex * 100;
        elements.carouselTrack.style.transform = `translateX(${translateX}%)`;
    }
    
    // Update indicators
    elements.carouselIndicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === state.carouselIndex);
    });
    
    // Update slide classes
    elements.carouselSlides.forEach((slide, index) => {
        slide.classList.toggle('active', index === state.carouselIndex);
    });
}

// Modal Functionality
function openModal() {
    if (elements.modal) {
        elements.modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    if (elements.modal) {
        elements.modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// Counter Animations
function animateStatNumbers(selector) {
    document.querySelectorAll(selector).forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target')) || parseFloat(counter.textContent);
        const isInteger = target % 1 === 0;
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = isInteger ? target.toLocaleString() : target.toFixed(1);
                clearInterval(timer);
            } else {
                counter.textContent = isInteger ? Math.floor(current).toLocaleString() : current.toFixed(1);
            }
        }, 16);
    });
}

// Scroll Animations
function setupScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = parseInt(element.getAttribute('data-delay')) || 0;
                
                setTimeout(() => {
                    element.classList.add('animate');
                    
                    // Trigger specific animations based on element type
                    if (element.classList.contains('stat-card')) {
                        const valueElement = element.querySelector('.stat-value');
                        if (valueElement && !valueElement.classList.contains('animated')) {
                            valueElement.classList.add('animated');
                            animateSingleCounter(valueElement);
                        }
                    }
                }, delay);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('[data-animation]').forEach(el => {
        observer.observe(el);
    });
}

function animateSingleCounter(counter) {
    const targetText = counter.textContent;
    const target = parseFloat(targetText.replace(/[^\d.]/g, ''));
    const isInteger = target % 1 === 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            counter.textContent = targetText;
            clearInterval(timer);
        } else {
            const formattedValue = isInteger ? Math.floor(current).toLocaleString() : current.toFixed(1);
            counter.textContent = targetText.includes('+') ? `${formattedValue}+` : formattedValue;
        }
    }, 16);
}

// Page Animations
function triggerPageAnimations(pageId) {
    const page = document.getElementById(pageId);
    if (!page) return;
    
    const animatedElements = page.querySelectorAll('[data-animation]');
    animatedElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('animate');
        }, index * 100);
    });
}

// Calculator Functionality
function initializeCalculator() {
    updateRangeValues();
    updateCalculatorProgress();
}

function updateRangeValues() {
    document.querySelectorAll('.range-input').forEach(input => {
        updateRangeValue({ target: input });
    });
}

function updateRangeValue(e) {
    const input = e.target;
    const valueDisplay = input.parentNode.querySelector('.range-value');
    if (valueDisplay) {
        valueDisplay.textContent = `${input.value}%`;
    }
}

function nextStep() {
    if (state.currentStep < state.totalSteps - 1) {
        collectStepData(state.currentStep);
        state.currentStep++;
        updateCalculatorStep();
        updateCalculatorProgress();
    } else {
        elements.nextBtn.classList.add('hidden');
        elements.calculateBtn.classList.remove('hidden');
    }
}

function previousStep() {
    if (state.currentStep > 0) {
        state.currentStep--;
        updateCalculatorStep();
        updateCalculatorProgress();
        
        elements.nextBtn.classList.remove('hidden');
        elements.calculateBtn.classList.add('hidden');
    }
}

function updateCalculatorStep() {
    elements.calculatorSteps.forEach((step, index) => {
        step.classList.toggle('active', index === state.currentStep);
    });
    
    elements.prevBtn.disabled = state.currentStep === 0;
    elements.currentStepSpan.textContent = state.currentStep + 1;
}

function updateCalculatorProgress() {
    const progress = ((state.currentStep + 1) / state.totalSteps) * 100;
    elements.progressFill.style.width = `${progress}%`;
}

function collectStepData(stepIndex) {
    const step = elements.calculatorSteps[stepIndex];
    const inputs = step.querySelectorAll('input');
    
    inputs.forEach(input => {
        const value = parseFloat(input.value) || 0;
        state.calculatorData[input.id] = value;
    });
}

function calculateResults() {
    collectStepData(state.currentStep);
    
    const results = {
        transportation: 0,
        energy: 0,
        diet: 0,
        lifestyle: 0
    };
    
    // Transportation calculations
    const carMiles = state.calculatorData.car_miles || 0;
    const publicTransport = state.calculatorData.public_transport || 0;
    const flights = state.calculatorData.flights || 0;
    
    results.transportation += (carMiles * 52 * 0.404) / 1000;
    results.transportation += (publicTransport * 52 * 0.4) / 1000;
    results.transportation += (flights * 0.25);
    
    // Energy calculations
    const electricity = state.calculatorData.electricity || 0;
    const heating = state.calculatorData.heating || 0;
    const renewable = state.calculatorData.renewable || 0;
    
    results.energy += (electricity * 12 * 0.0006);
    results.energy += (heating * 12 * 0.0053);
    results.energy *= (100 - renewable) / 100;
    
    // Diet calculations
    const meatMeals = state.calculatorData.meat_meals || 0;
    const localFood = state.calculatorData.local_food || 0;
    const foodWaste = state.calculatorData.food_waste || 0;
    
    results.diet += (meatMeals * 52 * 0.015);
    results.diet *= (120 - localFood) / 100;
    results.diet *= (100 + foodWaste) / 100;
    
    // Lifestyle calculations
    const shopping = state.calculatorData.shopping || 0;
    const recycling = state.calculatorData.recycling || 0;
    const waterUsage = state.calculatorData.water_usage || 0;
    
    results.lifestyle += (shopping * 12 * 0.1);
    results.lifestyle *= (120 - recycling) / 100;
    results.lifestyle += (waterUsage * 365 * 0.0003);
    
    // Ensure minimum values
    Object.keys(results).forEach(key => {
        results[key] = Math.max(0.1, results[key]);
    });
    
    const total = Object.values(results).reduce((sum, value) => sum + value, 0);
    
    displayResults(results, total);
    updateUserProgress();
}

function updateUserProgress() {
    // Simulate completing a calculation
    state.userProgress.calculationsCompleted += 1;
    
    // Check for new achievements
    checkAchievements();
    
    // Update rewards page if currently viewing
    if (state.currentPage === 'rewards') {
        updateRewardsDisplay();
    }
    
    // Show achievement notification
    showAchievementNotification();
}

function checkAchievements() {
    const newAchievements = [];
    
    appData.achievements.forEach(achievement => {
        if (!achievement.unlocked && !state.userProgress.achievements.includes(achievement.id)) {
            let shouldUnlock = false;
            
            // Check specific conditions
            switch (achievement.id) {
                case 'first_calculation':
                    shouldUnlock = state.userProgress.calculationsCompleted >= 1;
                    break;
                case 'consistent_tracker':
                    shouldUnlock = state.userProgress.calculationsCompleted >= 5;
                    break;
                case 'dedicated_user':
                    shouldUnlock = state.userProgress.calculationsCompleted >= 10;
                    break;
                case 'improvement_seeker':
                    shouldUnlock = state.userProgress.footprintReduction >= 10;
                    break;
            }
            
            if (shouldUnlock) {
                achievement.unlocked = true;
                state.userProgress.achievements.push(achievement.id);
                state.userProgress.totalPoints += achievement.points;
                newAchievements.push(achievement);
            }
        }
    });
    
    return newAchievements;
}

function showAchievementNotification() {
    // Create a simple notification for new achievements
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">🧮</span>
            <div class="notification-text">
                <strong>Calculation Complete!</strong>
                <span>View your progress in Rewards</span>
            </div>
        </div>
    `;
    
    // Add notification styles
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        .achievement-notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            border: 1px solid var(--color-border);
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-lg);
            z-index: 1001;
            animation: slideInRight 0.5s ease;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: var(--space-12);
            padding: var(--space-16);
        }
        
        .notification-icon {
            font-size: 24px;
        }
        
        .notification-text {
            display: flex;
            flex-direction: column;
        }
        
        .notification-text strong {
            color: var(--color-primary);
            margin-bottom: var(--space-4);
        }
        
        .notification-text span {
            font-size: var(--font-size-sm);
            color: var(--color-text-secondary);
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    
    document.head.appendChild(notificationStyles);
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.5s ease reverse';
        setTimeout(() => notification.remove(), 500);
    }, 5000);
}

function displayResults(results, total) {
    // Hide calculator form
    document.querySelector('.calculator-content').style.display = 'none';
    
    // Show results
    elements.resultsSection.classList.remove('hidden');
    
    // Animate total emissions
    const emissionsNumber = document.querySelector('.emissions-number');
    animateNumber(emissionsNumber, 0, total, 2000, 1);
    
    // Animate category bars and values
    const maxValue = Math.max(...Object.values(results));
    
    Object.keys(results).forEach(category => {
        const value = results[category];
        const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
        
        const fillElement = document.querySelector(`[data-category="${category}"]`);
        const valueElement = fillElement.closest('.category-result').querySelector('.category-value');
        
        setTimeout(() => {
            fillElement.style.width = `${percentage}%`;
            animateNumber(valueElement, 0, value, 1500, 1, ' tons');
        }, 500);
    });
    
    // Generate recommendations
    generateRecommendations(results, total);
    
    // Scroll to results
    setTimeout(() => {
        elements.resultsSection.scrollIntoView({ behavior: 'smooth' });
    }, 1000);
}

function animateNumber(element, start, end, duration, decimals = 0, suffix = '') {
    const increment = (end - start) / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = end.toFixed(decimals) + suffix;
            clearInterval(timer);
        } else {
            element.textContent = current.toFixed(decimals) + suffix;
        }
    }, 16);
}

function generateRecommendations(results, total) {
    const recommendations = [];
    
    const sortedCategories = Object.entries(results).sort((a, b) => b[1] - a[1]);
    const [highestCategory, highestValue] = sortedCategories[0];
    
    const categoryRecommendations = {
        transportation: [
            "Consider carpooling or using public transportation more often",
            "Walk or bike for short trips under 2 miles",
            "Work from home when possible to reduce commuting",
            "Plan and consolidate trips to reduce overall driving"
        ],
        energy: [
            "Switch to LED light bulbs throughout your home",
            "Unplug electronics when not in use to avoid phantom loads",
            "Use a programmable thermostat to optimize heating and cooling",
            "Consider switching to a renewable energy provider"
        ],
        diet: [
            "Try having one or two meatless days per week",
            "Buy locally grown produce when available",
            "Plan meals to reduce food waste",
            "Compost food scraps instead of throwing them away"
        ],
        lifestyle: [
            "Buy quality items that last longer instead of frequent replacements",
            "Increase your recycling rate and learn about local programs",
            "Take shorter showers to reduce water and energy usage",
            "Choose reusable items over single-use products"
        ]
    };
    
    recommendations.push(
        `Your highest impact area is <strong>${highestCategory}</strong>. Here are some ways to reduce it:`
    );
    
    categoryRecommendations[highestCategory].slice(0, 2).forEach(rec => {
        recommendations.push(rec);
    });
    
    if (total > 4.8) {
        recommendations.push("Your footprint is above the global average. Small changes can make a big difference!");
    } else {
        recommendations.push("Great job! Your footprint is below average. Keep up the good work!");
    }
    
    const recommendationsList = document.getElementById('recommendations-list');
    recommendationsList.innerHTML = recommendations.map(rec => 
        `<div class="recommendation-item">${rec}</div>`
    ).join('');
}

function resetCalculator() {
    state.currentStep = 0;
    state.calculatorData = {};
    
    // Reset form inputs
    document.querySelectorAll('#calculator input').forEach(input => {
        if (input.type === 'range') {
            input.value = input.getAttribute('value') || '20';
        } else {
            input.value = '';
        }
    });
    
    // Reset UI
    updateCalculatorStep();
    updateCalculatorProgress();
    updateRangeValues();
    
    // Show calculator form, hide results
    document.querySelector('.calculator-content').style.display = 'block';
    elements.resultsSection.classList.add('hidden');
    elements.nextBtn.classList.remove('hidden');
    elements.calculateBtn.classList.add('hidden');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Contact Form
function handleContactForm(e) {
    e.preventDefault();
    
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        submitButton.textContent = 'Message Sent!';
        submitButton.style.background = 'var(--color-success)';
        
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.style.background = '';
            e.target.reset();
        }, 2000);
    }, 1000);
}

// Scroll Progress
function updateScrollProgress() {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / scrollHeight) * 100;
    
    const progressBar = document.querySelector('.nav-progress');
    if (progressBar) {
        progressBar.style.width = `${Math.min(progress, 100)}%`;
    }
}

// Keyboard Navigation
function handleKeyboardNavigation(e) {
    if (e.key === 'Escape' && !elements.modal.classList.contains('hidden')) {
        closeModal();
    }
    
    if (document.activeElement.closest('.carousel-container')) {
        if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        }
    }
}

// Initialize Animations
function initializeAnimations() {
    // CSS handles most animations
}

// Utility Functions
function debounce(func, wait) {
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance Optimizations
const debouncedScrollProgress = debounce(updateScrollProgress, 10);
window.addEventListener('scroll', debouncedScrollProgress);

// Cleanup
window.addEventListener('beforeunload', () => {
    if (state.carouselInterval) {
        clearInterval(state.carouselInterval);
    }
});

// Global functions for inline event handlers
window.showPage = showPage;
window.resetCalculator = resetCalculator;

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showPage,
        resetCalculator,
        state
    };
}