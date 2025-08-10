// Global variables
let sidebarOpen = false;

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeResponsive();
    initializeAnimations();
});

// Navigation functionality
function initializeNavigation() {
    // Add click events to navigation items
    const navItems = document.querySelectorAll('.nav-item, .nav-item1, .nav-item2');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
            
            // Close sidebar on mobile after navigation
            if (window.innerWidth <= 768) {
                toggleSidebar();
            }
        });
    });

    // Add click events to action items
    const actionItems = document.querySelectorAll('.action-item');
    actionItems.forEach(item => {
        item.addEventListener('click', function() {
            const actionName = this.querySelector('h4').textContent;
            showToast(`${actionName} clicked!`);
        });
    });

    // Add click events to action buttons
    const actionButtons = document.querySelectorAll('.action-btn, .action-btn1');
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const buttonText = this.textContent;
            showToast(`${buttonText} action performed!`);
        });
    });

    // Add User button functionality
    const addUserBtn = document.querySelector('.add-user-btn');
    if (addUserBtn) {
        addUserBtn.addEventListener('click', function() {
            showToast('Add User dialog would open here!');
        });
    }

    // Notification bell functionality
    const notificationWrappers = document.querySelectorAll('.notification-wrapper');
    notificationWrappers.forEach(wrapper => {
        wrapper.addEventListener('click', function() {
            showToast('Notifications panel would open here!');
        });
    });
}

// Toggle sidebar for mobile/tablet
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const mainContent = document.getElementById('mainContent');
    
    sidebarOpen = !sidebarOpen;
    
    if (sidebarOpen) {
        sidebar.classList.add('show');
        overlay.classList.add('show');
        mainContent.classList.add('sidebar-open');
        document.body.style.overflow = 'hidden'; // Prevent body scroll
    } else {
        sidebar.classList.remove('show');
        overlay.classList.remove('show');
        mainContent.classList.remove('sidebar-open');
        document.body.style.overflow = ''; // Restore body scroll
    }
}

// Responsive functionality
function initializeResponsive() {
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // Desktop view - show sidebar, hide overlay
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('sidebarOverlay');
            const mainContent = document.getElementById('mainContent');
            
            sidebar.classList.remove('show');
            overlay.classList.remove('show');
            mainContent.classList.remove('sidebar-open');
            document.body.style.overflow = '';
            sidebarOpen = false;
        }
    });

    // Handle orientation change on mobile devices
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            // Recalculate layout after orientation change
            if (window.innerWidth > 768 && sidebarOpen) {
                toggleSidebar();
            }
        }, 100);
    });
}

// Animation and interaction enhancements
function initializeAnimations() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add click animations to buttons
    const buttons = document.querySelectorAll('button, .action-item, .nav-item, .nav-item1, .nav-item2');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Intersection Observer for fade-in animations
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
    const animatedElements = document.querySelectorAll('.card, .panel');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Toast notification system
function showToast(message, type = 'info') {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <span class="toast-message">${message}</span>
            <button class="toast-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;

    // Add toast styles
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border: 1px solid #e1e5e9;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        min-width: 300px;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;

    // Add inner content styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        .toast-content {
            padding: 15px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .toast-message {
            font-size: 14px;
            color: #333;
            font-weight: 500;
        }
        .toast-close {
            background: none;
            border: none;
            font-size: 18px;
            cursor: pointer;
            color: #999;
            margin-left: 10px;
        }
        .toast-close:hover {
            color: #333;
        }
        .toast-info { border-left: 4px solid #007bff; }
        .toast-success { border-left: 4px solid #28a745; }
        .toast-warning { border-left: 4px solid #ffc107; }
        .toast-error { border-left: 4px solid #dc3545; }
    `;

    if (!document.querySelector('#toast-styles')) {
        style.id = 'toast-styles';
        document.head.appendChild(style);
    }

    // Add to DOM
    document.body.appendChild(toast);

    // Auto remove after 3 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => toast.remove(), 300);
        }
    }, 3000);
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes sidebar on mobile
    if (e.key === 'Escape' && sidebarOpen) {
        toggleSidebar();
    }

    // Space or Enter activates focused elements
    if ((e.key === ' ' || e.key === 'Enter') && e.target.classList.contains('nav-item')) {
        e.preventDefault();
        e.target.click();
    }
});

// Touch gesture support for mobile sidebar
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;

    // Only handle swipes on mobile
    if (window.innerWidth <= 768) {
        // Swipe right to open sidebar
        if (swipeDistance > swipeThreshold && touchStartX < 50 && !sidebarOpen) {
            toggleSidebar();
        }
        // Swipe left to close sidebar
        if (swipeDistance < -swipeThreshold && sidebarOpen) {
            toggleSidebar();
        }
    }
}

// Performance optimization: debounce resize events
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

// Apply debounce to resize handler
window.addEventListener('resize', debounce(() => {
    // Handle any resize-specific logic here
    if (window.innerWidth > 768 && sidebarOpen) {
        toggleSidebar();
    }
}, 250));

// Export functions for global access
window.toggleSidebar = toggleSidebar;
window.showToast = showToast;
