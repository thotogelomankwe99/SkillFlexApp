// Global variables
let currentSlide = 0;
let selectedQuizSkill = null;
let selectedChatbotSkill = null;
let currentQuestion = 0;
let userScore = 0;
let chatbotActive = false;

// Quiz questions data
const quizQuestions = {
    communication: [
        {
            question: "Which of these is NOT a key component of effective communication?",
            options: ["Active listening", "Clear messaging", "Interrupting frequently", "Non-verbal cues"],
            correct: 2
        },
        {
            question: "What does active listening involve?",
            options: ["Just hearing the words", "Formulating your response while the other person is talking", "Paying full attention and providing feedback", "Talking more than listening"],
            correct: 2
        },
        {
            question: "Which communication style is most effective in professional settings?",
            options: ["Aggressive", "Passive", "Assertive", "Passive-aggressive"],
            correct: 2
        },
        {
            question: "What is the purpose of paraphrasing in communication?",
            options: ["To show off your vocabulary", "To ensure understanding", "To change the subject", "To confuse the listener"],
            correct: 1
        },
        {
            question: "Which of these is a non-verbal communication cue?",
            options: ["Email tone", "Body language", "Word choice", "Sentence structure"],
            correct: 1
        }
    ],
    leadership: [
        {
            question: "What is a key trait of effective leaders?",
            options: ["Micromanagement", "Empathy", "Indecisiveness", "Authoritarianism"],
            correct: 1
        },
        {
            question: "Which leadership style focuses on empowering team members?",
            options: ["Autocratic", "Transformational", "Laissez-faire", "Transactional"],
            correct: 1
        },
        {
            question: "What does 'lead by example' mean?",
            options: ["Telling others what to do", "Demonstrating the behavior you expect from others", "Writing detailed instructions", "Delegating all tasks"],
            correct: 1
        },
        {
            question: "Why is emotional intelligence important for leaders?",
            options: ["It helps them manipulate others", "It allows them to understand and manage team dynamics", "It makes them seem more intelligent", "It's not important for leaders"],
            correct: 1
        },
        {
            question: "What is the primary role of a leader?",
            options: ["To control every aspect of work", "To inspire and guide others toward a common goal", "To do all the work themselves", "To take all the credit"],
            correct: 1
        }
    ],
    // Add questions for other skills similarly
    teamwork: [
        {
            question: "What is the most important factor for successful teamwork?",
            options: ["Having the smartest people", "Clear communication", "Working in the same location", "Having a large team"],
            correct: 1
        },
        {
            question: "What does 'psychological safety' in teams refer to?",
            options: ["Physical workplace safety", "Feeling safe to take risks and express ideas", "Insurance coverage", "Fire drill procedures"],
            correct: 1
        },
        {
            question: "Which behavior harms team collaboration?",
            options: ["Active listening", "Withholding information", "Giving constructive feedback", "Sharing credit"],
            correct: 1
        },
        {
            question: "What is the benefit of diverse teams?",
            options: ["Faster decision making", "Broader perspectives and innovation", "Fewer disagreements", "Easier communication"],
            correct: 1
        },
        {
            question: "How should conflicts in teams be handled?",
            options: ["Avoided at all costs", "Addressed openly and respectfully", "Handled by management only", "Ignored until they resolve themselves"],
            correct: 1
        }
    ],
    "problem-solving": [
        {
            question: "What is the first step in effective problem-solving?",
            options: ["Implementing a solution", "Identifying the root cause", "Asking for help", "Documenting the problem"],
            correct: 1
        },
        {
            question: "Which technique helps generate creative solutions?",
            options: ["Criticizing ideas immediately", "Brainstorming without judgment", "Only considering proven methods", "Working alone"],
            correct: 1
        },
        {
            question: "What does 'thinking outside the box' mean?",
            options: ["Working in a different location", "Considering unconventional approaches", "Ignoring all constraints", "Following strict rules"],
            correct: 1
        },
        {
            question: "Why is it important to evaluate multiple solutions?",
            options: ["To waste time", "To find the most effective approach", "To make the process more complicated", "To please everyone"],
            correct: 1
        },
        {
            question: "What should you do after implementing a solution?",
            options: ["Forget about the problem", "Monitor results and make adjustments", "Immediately move to the next problem", "Celebrate regardless of outcome"],
            correct: 1
        }
    ],
    "time-management": [
        {
            question: "Which technique involves categorizing tasks by urgency and importance?",
            options: ["Eisenhower Matrix", "Pomodoro Technique", "Time blocking", "GTD Method"],
            correct: 0
        },
        {
            question: "What is the benefit of time blocking?",
            options: ["It eliminates all distractions", "It allocates specific time for focused work", "It makes the day longer", "It automates tasks"],
            correct: 1
        },
        {
            question: "Which is a common time management pitfall?",
            options: ["Setting clear priorities", "Multitasking on complex tasks", "Taking regular breaks", "Planning your day"],
            correct: 1
        },
        {
            question: "What does the 'Pomodoro Technique' involve?",
            options: ["Working with tomatoes", "25-minute focused work sessions with breaks", "Working until exhausted", "Only working in the morning"],
            correct: 1
        },
        {
            question: "Why is it important to learn to say 'no'?",
            options: ["To be rude to people", "To protect your time and priorities", "To avoid all work", "To show authority"],
            correct: 1
        }
    ],
    "emotional-intelligence": [
        {
            question: "What is emotional intelligence?",
            options: ["Being emotional", "The ability to understand and manage your own emotions and those of others", "Always being happy", "Ignoring emotions in decision making"],
            correct: 1
        },
        {
            question: "Which is a component of emotional intelligence?",
            options: ["IQ", "Empathy", "Memory", "Speed reading"],
            correct: 1
        },
        {
            question: "How can you improve your emotional intelligence?",
            options: ["Ignore your feelings", "Practice self-reflection and mindfulness", "Watch more TV", "Avoid social interactions"],
            correct: 1
        },
        {
            question: "Why is emotional intelligence important in the workplace?",
            options: ["It helps manipulate colleagues", "It improves relationships and collaboration", "It guarantees promotions", "It replaces technical skills"],
            correct: 1
        },
        {
            question: "What does self-regulation involve?",
            options: ["Controlling others' emotions", "Managing your own emotional responses", "Suppressing all emotions", "Following strict rules"],
            correct: 1
        }
    ]
};

// Select quiz skill
function selectQuizSkill(skill) {
    selectedQuizSkill = skill;
    
    // Hide skill selection, show quiz content
    document.getElementById('skill-selection').style.display = 'none';
    document.getElementById('quiz-content').style.display = 'block';
    
    // Load first question
    loadQuestion(0);
}

// Load quiz question
function loadQuestion(index) {
    if (!selectedQuizSkill || !quizQuestions[selectedQuizSkill]) return;
    
    const questions = quizQuestions[selectedQuizSkill];
    if (index >= questions.length) {
        showQuizResults();
        return;
    }
    
    const question = questions[index];
    document.getElementById('question-text').textContent = question.question;
    
    // Update progress
    document.getElementById('current-question').textContent = index + 1;
    document.getElementById('progress-bar').style.width = `${((index + 1) / questions.length) * 100}%`;
    
    // Create answer options
    const optionsContainer = document.getElementById('answer-options');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, i) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'answer-option';
        optionElement.innerHTML = `
            <input type="radio" name="answer" id="option-${i}" value="${i}" onchange="enableNextButton()">
            <label for="option-${i}">${option}</label>
        `;
        optionsContainer.appendChild(optionElement);
    });
    
    // Disable next button initially
    document.getElementById('next-btn').disabled = true;
    
    currentQuestion = index;
}

// Enable next button when an option is selected
function enableNextButton() {
    document.getElementById('next-btn').disabled = false;
}

// Move to next question
function nextQuestion() {
    // Check if an answer is selected
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) return;
    
    // Check if answer is correct
    const questions = quizQuestions[selectedQuizSkill];
    if (parseInt(selectedOption.value) === questions[currentQuestion].correct) {
        userScore++;
    }
    
    // Load next question
    loadQuestion(currentQuestion + 1);
}

// Show quiz results
function showQuizResults() {
    document.getElementById('quiz-content').style.display = 'none';
    document.getElementById('quiz-results').style.display = 'block';
    
    const totalQuestions = quizQuestions[selectedQuizSkill].length;
    const percentage = (userScore / totalQuestions) * 100;
    
    // Update results display
    document.getElementById('score-display').textContent = `${userScore}/${totalQuestions}`;
    document.getElementById('score-message').textContent = `You scored ${percentage.toFixed(0)}% on the ${skillInfo[selectedQuizSkill].title} quiz!`;
    
    // Set circle color based on score
    const scoreCircle = document.getElementById('score-circle');
    if (percentage >= 80) {
        scoreCircle.className = 'score-circle green';
    } else if (percentage >= 60) {
        scoreCircle.className = 'score-circle yellow';
    } else {
        scoreCircle.className = 'score-circle red';
    }
}

// Retake quiz
function retakeQuiz() {
    resetQuiz();
    document.getElementById('quiz-results').style.display = 'none';
    document.getElementById('skill-selection').style.display = 'block';
}

// Reset quiz state
function resetQuiz() {
    selectedQuizSkill = null;
    currentQuestion = 0;
    userScore = 0;
    document.getElementById('quiz-results').style.display = 'none';
    document.getElementById('quiz-content').style.display = 'none';
    document.getElementById('skill-selection').style.display = 'block';
    document.getElementById('progress-bar').style.width = '20%';
    document.getElementById('current-question').textContent = '1';
}

// Chatbot scenarios
const chatbotScenarios = {
    communication: [
        "Your team member keeps interrupting you during meetings. How would you address this professionally?",
        "You need to deliver negative feedback to a colleague. How would you approach this conversation?",
        "A client seems confused about your project proposal. How would you clarify it for them?",
        "You disagree with your manager's approach. How would you express your concerns respectfully?",
        "You need to present a complex idea to a non-technical audience. How would you explain it?"
    ],
    leadership: [
        "Your team is resistant to a new process you're implementing. How would you gain their buy-in?",
        "Two team members are in conflict. How would you mediate the situation?",
        "You need to delegate a challenging task. How would you assign it and provide support?",
        "Your team missed an important deadline. How would you address this while maintaining morale?",
        "You notice a team member is disengaged. How would you approach them to understand why?"
    ],
    teamwork: [
        "A team member isn't contributing their fair share. How would you address this without causing conflict?",
        "Your team has diverse opinions on how to approach a project. How would you facilitate decision-making?",
        "You need to collaborate with someone you find difficult to work with. How would you approach this?",
        "Your team is working remotely and communication is suffering. What strategies would you implement?",
        "There's confusion about roles and responsibilities in your team. How would you clarify them?"
    ],
    "problem-solving": [
        "You discover a significant error in a project that's nearly complete. How would you address it?",
        "Your team is stuck on a complex problem with no obvious solution. How would you approach it?",
        "You have limited resources but multiple high-priority tasks. How would you decide what to focus on?",
        "A process that has worked well is no longer effective. How would you identify and implement improvements?",
        "You need to make an important decision with incomplete information. How would you proceed?"
    ],
    "time-management": [
        "You have multiple urgent tasks with similar deadlines. How would you prioritize and manage them?",
        "You're constantly interrupted during your most productive work hours. What strategies would you implement?",
        "You consistently underestimate how long tasks take. How would you improve your planning?",
        "You're feeling overwhelmed by your workload. How would you approach getting back on track?",
        "You need to balance long-term projects with daily urgent tasks. How would you manage both?"
    ],
    "emotional-intelligence": [
        "A colleague reacts strongly to minor feedback. How would you handle the situation?",
        "You're feeling frustrated with a team member's performance. How would you address this constructively?",
        "You notice you're becoming defensive in discussions. What strategies would you use to manage this?",
        "A team member shares personal difficulties that are affecting their work. How would you respond?",
        "You need to deliver disappointing news to your team. How would you approach this with empathy?"
    ],
    general: [
        "What soft skill do you feel is your strongest, and why?",
        "Which soft skill would you most like to improve, and what challenges have you faced with it?",
        "Describe a situation where you successfully used a soft skill to resolve a problem.",
        "What soft skill do you believe is most valuable in your current role or industry?",
        "How do you typically practice and develop your soft skills?"
    ]
};

// Skill information data
const skillInfo = {
    communication: {
        title: "Communication Skills",
        description: "Master the art of clear, confident communication in any setting. Learn to express ideas effectively, listen actively, and adapt your communication style to different audiences and situations.",
        benefits: [
            "Build stronger professional and personal relationships",
            "Resolve conflicts more effectively",
            "Present ideas with clarity and confidence",
            "Improve team collaboration and productivity",
            "Enhance your leadership capabilities"
        ]
    },
    leadership: {
        title: "Leadership Skills",
        description: "Develop authentic leadership to inspire and guide teams effectively. Learn to motivate others, make strategic decisions, and create a positive work environment that fosters growth and innovation.",
        benefits: [
            "Inspire and motivate team members",
            "Make better decisions under pressure",
            "Delegate effectively and empower others",
            "Build high-performing teams",
            "Navigate organizational challenges successfully"
        ]
    },
    teamwork: {
        title: "Teamwork & Collaboration",
        description: "Excel in collaborative environments and build strong team dynamics. Learn to contribute effectively to group efforts, resolve conflicts, and create synergies that lead to better outcomes.",
        benefits: [
            "Work more effectively in diverse teams",
            "Resolve conflicts constructively",
            "Leverage different strengths and perspectives",
            "Achieve better results through collaboration",
            "Build stronger professional networks"
        ]
    },
    "problem-solving": {
        title: "Problem Solving",
        description: "Enhance analytical thinking and creative problem-solving abilities. Learn systematic approaches to identify root causes, generate innovative solutions, and implement effective resolutions.",
        benefits: [
            "Solve complex challenges more effectively",
            "Think creatively and innovatively",
            "Make better decisions with limited information",
            "Anticipate and prevent potential problems",
            "Increase your value as a strategic thinker"
        ]
    },
    "time-management": {
        title: "Time Management",
        description: "Master prioritization and productivity for better work-life balance. Learn to organize your time effectively, minimize distractions, and focus on high-impact activities that drive results.",
        benefits: [
            "Accomplish more in less time",
            "Reduce stress and overwhelm",
            "Meet deadlines consistently",
            "Improve work-life balance",
            "Focus on high-value activities"
        ]
    },
    "emotional-intelligence": {
        title: "Emotional Intelligence",
        description: "Develop self-awareness and empathy for better relationships. Learn to recognize and manage your emotions, understand others' perspectives, and navigate social complexities effectively.",
        benefits: [
            "Build stronger, more authentic relationships",
            "Manage stress and emotions effectively",
            "Navigate social situations with confidence",
            "Make more thoughtful decisions",
            "Create positive work environments"
        ]
    }
};


// Check chatbot access (placeholder)
function checkChatbotAccess() {
    // In a real app, this might check if user has completed prerequisite steps
    showPage('ai-chatbot');
}

// Select chatbot skill
function selectChatbotSkill(skill) {
    selectedChatbotSkill = skill;
    chatbotActive = true;
    
// Hide skill selection, show chat interface
    document.getElementById('chatbot-skill-selection').style.display = 'none';
    document.getElementById('chat-messages').style.display = 'block';
    document.getElementById('complete-chatbot-btn').style.display = 'block';
    
    // Start the conversation
    startChatbotConversation();
}

// Start chatbot conversation
function startChatbotConversation() {
    const messagesContainer = document.getElementById('chat-messages');
    messagesContainer.innerHTML = '';
    
    // Add welcome message
    addAIMessage(`Welcome to the ${selectedChatbotSkill !== 'general' ? skillInfo[selectedChatbotSkill].title : 'SkillFlex'} practice! I'll present scenarios for you to respond to.`);
    
    // Add first scenario
    setTimeout(() => {
        presentNextScenario();
    }, 1000);
}

// Present next scenario to user
function presentNextScenario() {
    const scenarios = chatbotScenarios[selectedChatbotSkill];
    if (!scenarios || scenarios.length === 0) return;
    
    // Randomly select a scenario
    const randomIndex = Math.floor(Math.random() * scenarios.length);
    const scenario = scenarios[randomIndex];
    
    addAIMessage(scenario);
}

// Add AI message to chat
function addAIMessage(message) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.className = 'chat-message ai-message';
    messageElement.innerHTML = `
        <div class="ai-avatar">
            <img src="Robot.png" alt="SkillFlex bot" class="ai-avatar">
        </div>
        <div class="ai-message-content">
            ${message}
        </div>
    `;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Add user message to chat
function addUserMessage(message) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.className = 'chat-message user-message';
    messageElement.innerHTML = `
        <div class="user-message-content">
            ${message}
        </div>
        <div class="user-avatar-small">
            <i class="material-icons">person</i>
        </div>
    `;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Send user response
function sendResponse() {
    const userInput = document.getElementById('user-response');
    const message = userInput.value.trim();
    
    if (message === '') return;
    
    // Add user message
    addUserMessage(message);
    
    // Clear input
    userInput.value = '';
    
    // Simulate AI response after a delay
    setTimeout(() => {
        generateAIResponse(message);
    }, 1000);
}

// Generate AI response (simulated)
function generateAIResponse(userMessage) {
    // In a real app, this would call an AI API ((how dO WE DO IT??????))
    // For this demo, we'll use predefined responses
    
    const positiveFeedback = [
        "That's a thoughtful approach!",
        "Great response! You're considering multiple perspectives.",
        "Well done! That demonstrates good understanding.",
        "Excellent approach to the situation.",
        "I like how you're thinking about this."
    ];
    
    const constructiveFeedback = [
        "You might also consider...",
        "Another approach could be...",
        "Have you thought about...",
        "It might be helpful to also...",
        "Some people find it effective to..."
    ];
    
    const randomPositive = positiveFeedback[Math.floor(Math.random() * positiveFeedback.length)];
    const randomConstructive = constructiveFeedback[Math.floor(Math.random() * constructiveFeedback.length)];
    
    addAIMessage(`${randomPositive} ${randomConstructive}`);
    
 // After feedback, present another scenario
    setTimeout(() => {
        presentNextScenario();
    }, 2000);
}

// Reset chatbot
function resetChatbot() {
    selectedChatbotSkill = null;
    chatbotActive = false;
    document.getElementById('chatbot-skill-selection').style.display = 'block';
    document.getElementById('chat-messages').style.display = 'none';
    document.getElementById('chat-messages').innerHTML = '';
    document.getElementById('complete-chatbot-btn').style.display = 'none';
    document.getElementById('user-response').value = '';
}


// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
    
    // Set up event listeners
    setupEventListeners();
});

// Initialize the application
function initializeApp() {
    // Set up skill search functionality
    const skillSearch = document.getElementById('skill-search');
    if (skillSearch) {
        skillSearch.addEventListener('input', filterSkills);
    }
    
    // Set up form submissions
    const mentorForm = document.getElementById('mentor-booking-form');
    if (mentorForm) {
        mentorForm.addEventListener('submit', handleMentorBooking);
    }
    
    const reflectionForm = document.getElementById('reflection-form');
    if (reflectionForm) {
        reflectionForm.addEventListener('submit', handleReflectionSubmission);
    }
    
    // Set up star rating
    const ratingStars = document.querySelectorAll('.rating-star');
    ratingStars.forEach(star => {
        star.addEventListener('click', setRating);
    });
    
    // Initialize any other components
    initializeSkillOverviewModal();
}

// Set up event listeners
function setupEventListeners() {
    // Chat input handling
    const userResponseInput = document.getElementById('user-response');
    if (userResponseInput) {
        userResponseInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendResponse();
            }
        });
    }
}

// Toggle sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const hamburger = document.querySelector('.hamburger');
    
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Close sidebar
function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const hamburger = document.querySelector('.hamburger');
    
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    hamburger.classList.remove('active');
}

// Show specific page
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show the requested page
    const pageToShow = document.getElementById(`${pageId}-page`);
    if (pageToShow) {
        pageToShow.classList.add('active');
    }
    
    // Close sidebar on mobile
    if (window.innerWidth < 768) {
        closeSidebar();
    }
    
    // Special handling for specific pages
    if (pageId === 'quiz') {
        resetQuiz();
    } else if (pageId === 'ai-chatbot') {
        resetChatbot();
    }
}

// Show notifications page
function showNotifications() {
    showPage('notifications');
}

// Show user profile modal
function showUserProfileModal() {
    const modal = document.getElementById('user-profile-modal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

// Close user profile modal
function closeUserProfile() {
    const modal = document.getElementById('user-profile-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Update user profile
function updateProfile() {
    // In a real app, this would send data to a server
    alert('Profile updated successfully!');
    closeUserProfile();
}

// Logout function
function logout() {
    // In a real app, this would handle actual logout logic
    alert('You have been logged out successfully.');
    closeUserProfile();
}

// Show skill overview modal
function showSkillOverview(skill) {
    const modal = document.getElementById('skill-overview-modal');
    if (!modal) return;
    
    // Populate with skill data
    const skillData = skillInfo[skill];
    if (skillData) {
        document.getElementById('overview-skill-title').textContent = skillData.title;
        document.getElementById('overview-skill-description').textContent = skillData.description;
        
        // Populate benefits
        const benefitsList = document.getElementById('overview-skill-benefits');
        benefitsList.innerHTML = '';
        skillData.benefits.forEach(benefit => {
            const li = document.createElement('li');
            li.className = 'benefit-item';
            li.innerHTML = `<i class="material-icons">check_circle</i> ${benefit}`;
            benefitsList.appendChild(li);
        });
    }
    
    // Show the modal
    modal.style.display = 'flex';
}

// Close skill overview modal
function closeSkillOverview() {
    const modal = document.getElementById('skill-overview-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Initialize skill overview modal
function initializeSkillOverviewModal() {
    const modal = document.getElementById('skill-overview-modal');
    if (modal) {
        const backButton = modal.querySelector('.modal-header button');
        if (backButton) {
            backButton.addEventListener('click', closeSkillOverview);
        }
    }
}

// Play overview video
function playOverviewVideo() {
    // Simulate video loading
    const overlay = document.getElementById('overview-video-overlay');
    const placeholder = document.getElementById('overview-video-placeholder');
    
    if (overlay && placeholder) {
        overlay.style.display = 'flex';
        placeholder.textContent = 'Loading video...';
        
        // Simulate video load completion
        setTimeout(() => {
            overlay.style.display = 'none';
            placeholder.textContent = 'Video playing...';
            // In a real app, you would actually play a video here
        }, 2000);
    }
}

// Start quiz from overview
function startOverviewQuiz() {
    // Get the skill from the overview
    const skillTitle = document.getElementById('overview-skill-title').textContent;
    let skillKey = null;
    
    // Find the skill key from the title
    for (const key in skillInfo) {
        if (skillInfo[key].title === skillTitle) {
            skillKey = key;
            break;
        }
    }
    
    if (skillKey) {
        closeSkillOverview();
        showPage('quiz');
        selectQuizSkill(skillKey);
    }
}

// Show skill detail modal
function showSkillDetail(skill) {
    const modal = document.getElementById('skill-detail-modal');
    if (!modal) return;
    
    // Populate with skill data
    const skillData = skillInfo[skill];
    if (skillData) {
        document.getElementById('modal-skill-title').textContent = skillData.title;
        document.getElementById('modal-skill-description').textContent = skillData.description;
        
        // Populate benefits
        const benefitsList = document.getElementById('modal-skill-benefits');
        benefitsList.innerHTML = '';
        skillData.benefits.forEach(benefit => {
            const li = document.createElement('li');
            li.className = 'benefit-item';
            li.innerHTML = `<i class="material-icons">check_circle</i> ${benefit}`;
            benefitsList.appendChild(li);
        });
    }
    
    // Show the modal
    modal.style.display = 'flex';
}

// Close skill detail modal
function closeSkillModal() {
    const modal = document.getElementById('skill-detail-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Play modal video
function playModalVideo() {
    // Simulate video loading
    const overlay = document.getElementById('modal-video-overlay');
    const placeholder = document.getElementById('modal-video-placeholder');
    
    if (overlay && placeholder) {
        overlay.style.display = 'flex';
        placeholder.textContent = 'Loading video...';
        
        // Simulate video load completion
        setTimeout(() => {
            overlay.style.display = 'none';
            placeholder.textContent = 'Video playing...';
            // In a real app, you would actually play a video here
        }, 2000);
    }
}

// Start quiz from skill detail
function startSkillQuiz() {
    // Get the skill from the modal
    const skillTitle = document.getElementById('modal-skill-title').textContent;
    let skillKey = null;
    
    // Find the skill key from the title
    for (const key in skillInfo) {
        if (skillInfo[key].title === skillTitle) {
            skillKey = key;
            break;
        }
    }
    
    if (skillKey) {
        closeSkillModal();
        showPage('quiz');
        selectQuizSkill(skillKey);
    }
}

// Filter skills based on search input
function filterSkills() {
    const searchTerm = document.getElementById('skill-search').value.toLowerCase();
    const skillCards = document.querySelectorAll('.skill-card-large');
    
    skillCards.forEach(card => {
        const title = card.querySelector('h4').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Play video (placeholder function)
function playVideo(skill) {
    alert(`Playing introduction video for ${skillInfo[skill].title}`);
    // In a real app, this would actually play a video
}


// Handle mentor booking form submission
function handleMentorBooking(e) {
    e.preventDefault();
    
    // In a real app, this would send data to a server
    alert('Mentor session booked successfully! You will receive a confirmation email shortly.');
    
    // Reset form
    e.target.reset();
}

// Set star rating
function setRating(e) {
    const stars = document.querySelectorAll('.rating-star');
    const rating = parseInt(e.target.getAttribute('data-rating'));
    
    stars.forEach(star => {
        const starRating = parseInt(star.getAttribute('data-rating'));
        if (starRating <= rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

// Handle reflection form submission
function handleReflectionSubmission(e) {
    e.preventDefault();
    
    // In a real app, this would send data to a server
    alert('Reflection submitted successfully! Thank you for sharing your insights.');
    
    // Reset form
    e.target.reset();
    
    // Reset stars
    const stars = document.querySelectorAll('.rating-star');
    stars.forEach(star => {
        star.classList.remove('active');
    });
}

// Download certificate
function downloadCertificate(skill) {
    // In a real app, this would generate or download a PDF certificate
    alert(`Downloading certificate for ${skillInfo[skill].title}`);
}

// Show walkthrough modal
function showWalkthrough() {
    const modal = document.getElementById('walkthrough-modal');
    if (modal) {
        modal.style.display = 'flex';
        currentSlide = 0;
        updateWalkthrough();
    }
}

// Close walkthrough modal
function closeWalkthrough() {
    const modal = document.getElementById('walkthrough-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Next slide in walkthrough
function nextSlide() {
    const slides = document.querySelectorAll('.walkthrough-slide');
    if (currentSlide < slides.length - 1) {
        currentSlide++;
        updateWalkthrough();
    }
}

// Previous slide in walkthrough
function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        updateWalkthrough();
    }
}

// Update walkthrough display
function updateWalkthrough() {
    const slides = document.querySelectorAll('.walkthrough-slide');
    const indicators = document.querySelectorAll('.slide-indicator');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    // Update slides
    slides.forEach((slide, index) => {
        if (index === currentSlide) {
            slide.classList.add('active');
            slide.classList.remove('prev', 'next');
        } else if (index < currentSlide) {
            slide.classList.remove('active', 'next');
            slide.classList.add('prev');
        } else {
            slide.classList.remove('active', 'prev');
            slide.classList.add('next');
        }
    });
    
    // Update indicators
    indicators.forEach((indicator, index) => {
        if (index === currentSlide) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
    
    // Update buttons
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === slides.length - 1;
    
    // Change next button text on last slide
    if (currentSlide === slides.length - 1) {
        nextBtn.textContent = 'Get Started';
        nextBtn.onclick = closeWalkthrough;
    } else {
        nextBtn.textContent = 'Next';
        nextBtn.onclick = nextSlide;
    }
}

// Go to specific slide when indicator is clicked
document.querySelectorAll('.slide-indicator').forEach(indicator => {
    indicator.addEventListener('click', function() {
        currentSlide = parseInt(this.getAttribute('data-slide'));
        updateWalkthrough();
    });
});

