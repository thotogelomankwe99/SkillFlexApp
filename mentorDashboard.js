// Global variables
let currentModal = null;
let chart = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    initializeChart();
    setupProfileDropdown();
});

// Initialize all event listeners
function initializeEventListeners() {
    // Profile dropdown toggle
    const profileIcon = document.getElementById('profileIcon');
    profileIcon.addEventListener('click', toggleProfileDropdown);

    // Statistics cards click events
    document.getElementById('mentorSessionsCard').addEventListener('click', () => showMentorSessions());
    document.getElementById('upcomingSessionsCard').addEventListener('click', () => showUpcomingSessions());
    document.getElementById('completedSessionsCard').addEventListener('click', () => showCompletedSessions());
    document.getElementById('pendingFeedbackCard').addEventListener('click', () => showPendingFeedback());

    // Message buttons
    const messageButtons = document.querySelectorAll('.message-btn');
    messageButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const mentee = e.target.getAttribute('data-mentee');
            const focus = e.target.getAttribute('data-focus');
            showContactModal(mentee, focus);
        });
    });

    // Modal close events
    document.getElementById('closeContactModal').addEventListener('click', closeContactModal);
    document.getElementById('closeDetailModal').addEventListener('click', closeDetailModal);
    document.getElementById('cancelMessage').addEventListener('click', closeContactModal);

    // Contact form submission
    document.getElementById('contactForm').addEventListener('submit', handleContactSubmission);

    // Click outside modal to close
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeAllModals();
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        const profileSection = document.querySelector('.profile-section');
        if (!profileSection.contains(e.target)) {
            closeProfileDropdown();
        }
    });
}

// Profile dropdown functionality
function setupProfileDropdown() {
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const text = e.target.textContent.trim();
            
            if (text === 'Logout') {
                handleLogout();
            } else {
                alert(`${text} functionality coming soon!`);
            }
            closeProfileDropdown();
        });
    });
}

function toggleProfileDropdown() {
    const dropdown = document.getElementById('profileDropdown');
    dropdown.classList.toggle('show');
}

function closeProfileDropdown() {
    const dropdown = document.getElementById('profileDropdown');
    dropdown.classList.remove('show');
}

function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        alert('Logout functionality would redirect to login page');
        // In a real application, this would clear session and redirect
        // window.location.href = '/login';
    }
}

// Chart initialization
function initializeChart() {
    const ctx = document.getElementById('bookingChart').getContext('2d');
    
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'February', 'Mar', 'April', 'Jun'],
            datasets: [{
                label: 'Bookings',
                data: [5, 12, 15, 10, 8],
                borderColor: '#374151',
                backgroundColor: 'rgba(55, 65, 81, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#374151',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#666'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#666'
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Modal functions
function showContactModal(mentee, focus) {
    const modal = document.getElementById('contactModal');
    document.getElementById('menteeName').value = mentee;
    document.getElementById('focusArea').value = focus;
    document.getElementById('messageSubject').value = '';
    document.getElementById('messageContent').value = '';
    
    modal.style.display = 'block';
    currentModal = modal;
}

function closeContactModal() {
    const modal = document.getElementById('contactModal');
    modal.style.display = 'none';
    currentModal = null;
}

function closeDetailModal() {
    const modal = document.getElementById('detailModal');
    modal.style.display = 'none';
    currentModal = null;
}

function closeAllModals() {
    closeContactModal();
    closeDetailModal();
}

// Contact form submission
function handleContactSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const messageData = {
        mentee: formData.get('menteeName'),
        focusArea: formData.get('focusArea'),
        subject: formData.get('messageSubject'),
        content: formData.get('messageContent')
    };
    
    // Simulate sending message
    alert(`Message sent to ${messageData.mentee} successfully!`);
    closeContactModal();
}

// Detail view functions
function showMentorSessions() {
    const modalTitle = document.getElementById('detailModalTitle');
    const modalContent = document.getElementById('detailModalContent');
    
    modalTitle.textContent = 'Mentor Sessions Details';
    modalContent.innerHTML = `
        <div class="detail-section">
            <h3>All Scheduled Sessions</h3>
            <div class="detail-list">
                <div class="detail-item">
                    <div class="detail-info">
                        <strong>Letago Ramautla</strong>
                        <span class="detail-meta">Communication • Aug 5, 2025 - 2:00 PM • Google Meet</span>
                    </div>
                    <span class="status-badge status-upcoming">Upcoming</span>
                </div>
                <div class="detail-item">
                    <div class="detail-info">
                        <strong>Praise Rynn</strong>
                        <span class="detail-meta">Leadership • Aug 7, 2025 - 10:00 AM • Zoom</span>
                    </div>
                    <span class="status-badge status-upcoming">Upcoming</span>
                </div>
                <div class="detail-item">
                    <div class="detail-info">
                        <strong>Ayanda Mbili</strong>
                        <span class="detail-meta">Emotional Intelligence • Aug 10, 2025 - 3:00 PM • Microsoft Teams</span>
                    </div>
                    <span class="status-badge status-upcoming">Upcoming</span>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('detailModal').style.display = 'block';
    currentModal = document.getElementById('detailModal');
}

function showUpcomingSessions() {
    const modalTitle = document.getElementById('detailModalTitle');
    const modalContent = document.getElementById('detailModalContent');
    
    modalTitle.textContent = 'Upcoming Sessions';
    modalContent.innerHTML = `
        <div class="detail-section">
            <h3>Sessions Scheduled for the Next 7 Days</h3>
            <div class="detail-list">
                <div class="detail-item">
                    <div class="detail-info">
                        <strong>Letago Ramautla</strong>
                        <span class="detail-meta">Communication • Aug 5, 2025 - 2:00 PM • Google Meet</span>
                    </div>
                    <button class="btn-send" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">Join Meeting</button>
                </div>
                <div class="detail-item">
                    <div class="detail-info">
                        <strong>Praise Rynn</strong>
                        <span class="detail-meta">Leadership • Aug 7, 2025 - 10:00 AM • Zoom</span>
                    </div>
                    <button class="btn-send" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">Join Meeting</button>
                </div>
            </div>
            <div style="margin-top: 1rem; padding: 1rem; background-color: #f8f9fa; border-radius: 6px;">
                <h4>Quick Actions:</h4>
                <button class="btn-send" style="margin: 0.5rem 0.5rem 0 0;">Send Reminder</button>
                <button class="btn-cancel" style="margin: 0.5rem 0.5rem 0 0;">Reschedule</button>
            </div>
        </div>
    `;
    
    document.getElementById('detailModal').style.display = 'block';
    currentModal = document.getElementById('detailModal');
}

function showCompletedSessions() {
    const modalTitle = document.getElementById('detailModalTitle');
    const modalContent = document.getElementById('detailModalContent');
    
    modalTitle.textContent = 'Completed Sessions';
    modalContent.innerHTML = `
        <div class="detail-section">
            <h3>Successfully Completed Mentorship Sessions</h3>
            <div class="detail-list">
                <div class="detail-item">
                    <div class="detail-info">
                        <strong>John Smith</strong>
                        <span class="detail-meta">Leadership • Jul 28, 2025 • 8 weeks</span>
                        <span class="status-badge status-completed">Eligible</span>
                    </div>
                    <button class="btn-send" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">Issue Certificate</button>
                </div>
                <div class="detail-item">
                    <div class="detail-info">
                        <strong>Sarah Johnson</strong>
                        <span class="detail-meta">Communication • Jul 25, 2025 • 6 weeks</span>
                        <span class="status-badge status-completed">Eligible</span>
                    </div>
                    <button class="btn-send" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">Issue Certificate</button>
                </div>
                <div class="detail-item">
                    <div class="detail-info">
                        <strong>Mike Davis</strong>
                        <span class="detail-meta">Problem Solving • Jul 20, 2025 • 10 weeks</span>
                        <span class="status-badge status-completed">Eligible</span>
                    </div>
                    <button class="btn-send" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">Issue Certificate</button>
                </div>
                <div class="detail-item">
                    <div class="detail-info">
                        <strong>Emma Wilson</strong>
                        <span class="detail-meta">Emotional Intelligence • Jul 15, 2025 • 4 weeks</span>
                        <span class="status-badge status-pending">Under Review</span>
                    </div>
                    <button class="btn-cancel" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">Review Required</button>
                </div>
            </div>
            <div style="margin-top: 1rem; padding: 1rem; background-color: #d4edda; border-radius: 6px;">
                <h4 style="color: #155724;">Certificate Eligibility Criteria:</h4>
                <ul style="color: #155724; margin-top: 0.5rem;">
                    <li>Completed minimum 80% of scheduled sessions</li>
                    <li>Demonstrated improvement in focus area</li>
                    <li>Submitted all required assignments</li>
                    <li>Received positive mentor evaluation</li>
                </ul>
            </div>
        </div>
    `;
    
    document.getElementById('detailModal').style.display = 'block';
    currentModal = document.getElementById('detailModal');
}

function showPendingFeedback() {
    const modalTitle = document.getElementById('detailModalTitle');
    const modalContent = document.getElementById('detailModalContent');
    
    modalTitle.textContent = 'Pending Feedback';
    modalContent.innerHTML = `
        <div class="detail-section">
            <h3>Mentees Requiring Session Feedback</h3>
            <div class="detail-list">
                <div class="detail-item">
                    <div class="detail-info">
                        <strong>Alex Thompson</strong>
                        <span class="detail-meta">Time Management • Jul 30, 2025 • 4 days pending</span>
                        <span class="status-badge status-pending">High Priority</span>
                    </div>
                    <button class="btn-send" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;" onclick="showFeedbackForm('Alex Thompson')">Provide Feedback</button>
                </div>
                <div class="detail-item">
                    <div class="detail-info">
                        <strong>Lisa Chen</strong>
                        <span class="detail-meta">Public Speaking • Aug 1, 2025 • 2 days pending</span>
                        <span class="status-badge status-upcoming">Medium Priority</span>
                    </div>
                    <button class="btn-send" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;" onclick="showFeedbackForm('Lisa Chen')">Provide Feedback</button>
                </div>
                <div class="detail-item">
                    <div class="detail-info">
                        <strong>Robert Brown</strong>
                        <span class="detail-meta">Conflict Resolution • Aug 2, 2025 • 1 day pending</span>
                        <span class="status-badge status-upcoming">Low Priority</span>
                    </div>
                    <button class="btn-send" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;" onclick="showFeedbackForm('Robert Brown')">Provide Feedback</button>
                </div>
                <div class="detail-item">
                    <div class="detail-info">
                        <strong>Jessica Lee</strong>
                        <span class="detail-meta">Team Collaboration • Jul 28, 2025 • 6 days pending</span>
                        <span class="status-badge status-pending">High Priority</span>
                    </div>
                    <button class="btn-send" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;" onclick="showFeedbackForm('Jessica Lee')">Provide Feedback</button>
                </div>
            </div>
            <div style="margin-top: 1rem; padding: 1rem; background-color: #fff3cd; border-radius: 6px;">
                <h4 style="color: #856404;">Feedback Guidelines:</h4>
                <ul style="color: #856404; margin-top: 0.5rem;">
                    <li>Provide specific examples of progress made</li>
                    <li>Highlight areas for continued improvement</li>
                    <li>Include actionable recommendations</li>
                    <li>Rate overall session effectiveness (1-5 scale)</li>
                </ul>
            </div>
        </div>
    `;
    
    document.getElementById('detailModal').style.display = 'block';
    currentModal = document.getElementById('detailModal');
}

// Feedback form function
function showFeedbackForm(menteeName) {
    const modalContent = document.getElementById('detailModalContent');
    modalContent.innerHTML = `
        <div class="detail-section">
            <h3>Provide Feedback for ${menteeName}</h3>
            <form id="feedbackForm">
                <div class="form-group">
                    <label for="sessionRating">Session Effectiveness (1-5):</label>
                    <select id="sessionRating" name="sessionRating" style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 6px;">
                        <option value="">Select Rating</option>
                        <option value="5">5 - Excellent</option>
                        <option value="4">4 - Very Good</option>
                        <option value="3">3 - Good</option>
                        <option value="2">2 - Fair</option>
                        <option value="1">1 - Needs Improvement</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="progressMade">Progress Made:</label>
                    <textarea id="progressMade" name="progressMade" rows="3" placeholder="Describe specific progress the mentee has made..."></textarea>
                </div>
                <div class="form-group">
                    <label for="areasImprovement">Areas for Improvement:</label>
                    <textarea id="areasImprovement" name="areasImprovement" rows="3" placeholder="Identify areas where the mentee can continue to grow..."></textarea>
                </div>
                <div class="form-group">
                    <label for="recommendations">Recommendations:</label>
                    <textarea id="recommendations" name="recommendations" rows="3" placeholder="Provide actionable recommendations for future development..."></textarea>
                </div>
                <div class="form-group">
                    <label for="additionalComments">Additional Comments:</label>
                    <textarea id="additionalComments" name="additionalComments" rows="2" placeholder="Any additional feedback or observations..."></textarea>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn-cancel" onclick="showPendingFeedback()">Back</button>
                    <button type="submit" class="btn-send">Submit Feedback</button>
                </div>
            </form>
        </div>
    `;
    
    // Add form submission handler
    document.getElementById('feedbackForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert(`Feedback submitted for ${menteeName} successfully!`);
        showPendingFeedback();
    });
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && currentModal) {
        closeAllModals();
    }
});

// Notification bell functionality
document.querySelector('.notification-bell').addEventListener('click', function() {
    alert('You have 3 new notifications:\n\n1. New session request from Michael Johnson\n2. Feedback reminder for Lisa Chen\n3. Certificate ready for John Smith');
});

