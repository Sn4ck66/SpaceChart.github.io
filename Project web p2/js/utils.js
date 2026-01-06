/**
 * Utility Functions for Space Chart
 */

// Format time (seconds to MM:SS)
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Debounce function
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

// Create starfield
function createStarfield() {
    const starfield = document.querySelector('.starfield');
    if (!starfield) return;
    
    starfield.innerHTML = '';
    const starCount = Math.floor((window.innerWidth * window.innerHeight) / 3000);
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.width = `${Math.random() * 3 + 1}px`;
        star.style.height = star.style.width;
        star.style.animationDuration = `${Math.random() * 3 + 2}s`;
        
        starfield.appendChild(star);
    }
}

// Initialize custom cursor
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    if (!cursor || window.innerWidth <= 768) return;
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });
    
    const hoverElements = document.querySelectorAll('a, button, .song-card, .song-list-item, .song-slide, .player-btn, .album-card, .track-item');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// Initialize typing effect
function initTypingEffect() {
    const textElement = document.getElementById('typing-text');
    if (!textElement) return;
    
    const text = "Welcome to Space Chart";
    let index = 0;
    
    function type() {
        if (index < text.length) {
            textElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100);
        } else {
            textElement.innerHTML = text + '<span style="animation: blink 1s infinite;">|</span>';
        }
    }
    
    textElement.textContent = '';
    setTimeout(type, 500);
}

// Initialize mobile menu
function initMobileMenu() {
    const toggleBtn = document.getElementById('navToggle');
    const menu = document.querySelector('.navbar__menu');
    
    if (!toggleBtn || !menu) return;
    
    toggleBtn.addEventListener('click', () => {
        menu.classList.toggle('active');
        toggleBtn.innerHTML = menu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    const menuLinks = menu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// Initialize 3D tilt effect
function initTiltEffect() {
    const cards = document.querySelectorAll('.song-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 25;
            const rotateX = (centerY - y) / 25;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// Update active navigation
function updateActiveNav() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.navbar__item').forEach(item => {
        item.classList.remove('active');
    });
    
    let selector = '';
    switch(page) {
        case 'index.html': selector = '.navbar__item:nth-child(1)'; break;
        case 'Wtop10-songsTH.html': selector = '.navbar__item:nth-child(2)'; break;
        case 'Wtop10-songsGB.html': selector = '.navbar__item:nth-child(3)'; break;
        case 'Dtop10-songsTH.html': selector = '.navbar__item:nth-child(4)'; break;
        case 'Dtop10-songsGB.html': selector = '.navbar__item:nth-child(5)'; break;
        case 'Wtop3-AlbumsTH.html': selector = '.navbar__item:nth-child(6)'; break;
        case 'aboutMe.html': selector = '.navbar__item:nth-child(7)'; break;
    }
    
    const activeItem = document.querySelector(selector);
    if (activeItem) activeItem.classList.add('active');
}

// Initialize all utilities
function initUtils() {
    createStarfield();
    initCustomCursor();
    initTypingEffect();
    initMobileMenu();
    updateActiveNav();
    
    window.addEventListener('resize', debounce(createStarfield, 250));
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatTime,
        formatNumber,
        debounce,
        createStarfield,
        initCustomCursor,
        initTypingEffect,
        initMobileMenu,
        initTiltEffect,
        updateActiveNav,
        initUtils
    };
}