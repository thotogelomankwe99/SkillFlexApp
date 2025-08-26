// Conversation state
let conversationCount = 0;
let currentSkill = '';
let currentScenario = null;
let sessionId = generateSessionId();
let waitingForSkillChoice = false;
let waitingForScenarioResponse = false;

// Scenario-based questions for each skill
const skillScenarios = {
    communication: [
        {
            title: "🎯 Difficult Client Conversation",
            scenario: "You're on a video call with an important client who seems frustrated. They've been waiting 3 weeks for a project update, and you just discovered there's been a miscommunication within your team that caused delays. The client starts the call by saying: 'I'm really disappointed. We trusted you with this project and now we're behind schedule for our launch.' How do you respond?",
            followUp: "What would be your next step after addressing their immediate concerns?"
        },
        {
            title: "🎯 Team Meeting Disagreement",
            scenario: "During a team meeting, two colleagues start arguing about the best approach for a new project. The discussion is getting heated, and other team members are looking uncomfortable. As someone who needs to work closely with both of them, you feel you should say something. What do you do?",
            followUp: "How would you follow up with each colleague individually after the meeting?"
        },
        {
            title: "🎯 Giving Constructive Feedback",
            scenario: "Your colleague just presented their work to the team, but there are several issues that need to be addressed before it can move forward. They seem proud of their work and are expecting positive feedback. You need to provide constructive criticism while maintaining a good working relationship. How do you approach this?",
            followUp: "How would you ensure they feel supported while still addressing the issues?"
        }
    ],
    leadership: [
        {
            title: "🎯 Team Morale Crisis",
            scenario: "Your team has been working overtime for the past month on a critical project. You've just learned that the deadline has been moved up by another week, meaning even more overtime. Two team members have already expressed burnout, and you can see the stress affecting everyone. How do you handle this situation as their leader?",
            followUp: "What long-term changes would you implement to prevent this situation in the future?"
        },
        {
            title: "🎯 Underperforming Team Member",
            scenario: "One of your usually reliable team members has been missing deadlines and their work quality has declined over the past month. Other team members are starting to notice and it's affecting team dynamics. You need to address this situation. How do you approach the conversation?",
            followUp: "What support systems would you put in place to help them improve?"
        },
        {
            title: "🎯 Difficult Decision Making",
            scenario: "You need to choose between two project proposals from your team. Both have merit, but you can only approve one due to budget constraints. The team members who proposed the rejected idea will likely be disappointed and may feel their work wasn't valued. How do you make and communicate this decision?",
            followUp: "How would you maintain team unity after making this difficult choice?"
        }
    ],
    emotional: [
        {
            title: "🎯 Managing Your Own Stress",
            scenario: "You're in the middle of a high-pressure presentation to senior executives when you realize you've made an error in your key data slide. You feel your heart racing and notice you're starting to panic. The executives are looking at you expectantly. How do you handle this moment?",
            followUp: "How would you prepare differently for future high-stakes presentations?"
        },
        {
            title: "🎯 Supporting a Stressed Colleague",
            scenario: "Your colleague, who sits next to you, has been visibly stressed for the past week. Today, they snapped at you over a minor question about a shared project. You can see they're overwhelmed, but their behavior is starting to affect your own work and mood. How do you handle this situation?",
            followUp: "What boundaries would you set while still being supportive?"
        },
        {
            title: "🎯 Dealing with Workplace Conflict",
            scenario: "There's tension between you and a coworker over different approaches to a shared project. Every interaction feels strained, and it's starting to affect the whole team's atmosphere. You both have valid points, but neither of you seems willing to compromise. How do you address this conflict?",
            followUp: "How would you rebuild the working relationship after resolving the conflict?"
        }
    ]
};

// Initialize chat - AI starts the conversation
function initializeChat() {
    setTimeout(() => {
        addMessage("Hello! Welcome to your SkillFlex coaching session. 👋", 'bot');
        
        setTimeout(() => {
            showTyping();
            setTimeout(() => {
                hideTyping();
                addMessage("I'm here to help you practice and develop your soft skills through real workplace scenarios. Would you like to start with your communication skills, leadership abilities, or emotional intelligence?", 'bot');
                waitingForSkillChoice = true;
            }, 1500);
        }, 2000);
    }, 1000);
}

function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (message) {
        addMessage(message, 'user');
        input.value = '';
        input.style.height = 'auto';
        conversationCount++;
        
        setTimeout(() => {
            handleUserResponse(message);
        }, 1000);
        
        updateProgress();
    }
}

function handleUserResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (waitingForSkillChoice) {
        // User is choosing a skill
        if (lowerMessage.includes('communication') || lowerMessage.includes('communicate')) {
            currentSkill = 'communication';
            startSkillSession('communication');
        } else if (lowerMessage.includes('leadership') || lowerMessage.includes('leader') || lowerMessage.includes('lead')) {
            currentSkill = 'leadership';
            startSkillSession('leadership');
        } else if (lowerMessage.includes('emotional') || lowerMessage.includes('emotion')) {
            currentSkill = 'emotional';
            startSkillSession('emotional');
        } else if (lowerMessage.includes('yes') || lowerMessage.includes('sure') || lowerMessage.includes('ok')) {
            // Default to communication if they just say yes
            currentSkill = 'communication';
            startSkillSession('communication');
        } else {
            // Ask for clarification
            showTyping();
            setTimeout(() => {
                hideTyping();
                addMessage("I'd love to help you with that! Could you let me know which specific area you'd like to focus on: Communication, Leadership, or Emotional Intelligence?", 'bot');
            }, 1500);
        }
        waitingForSkillChoice = false;
    } else if (waitingForScenarioResponse) {
        // User is responding to a scenario
        handleScenarioResponse(message);
    } else {
        // General conversation
        generateGeneralResponse(message);
    }
}

function startSkillSession(skill) {
    const skillNames = {
        communication: 'Communication',
        leadership: 'Leadership', 
        emotional: 'Emotional Intelligence'
    };
    
    showTyping();
    setTimeout(() => {
        hideTyping();
        addMessage(`Excellent choice! Let's work on your ${skillNames[skill]} skills. I'm going to present you with a realistic workplace scenario where you can practice and get feedback.`, 'bot');
        
        setTimeout(() => {
            presentScenario(skill);
        }, 2500);
    }, 1500);
}

function presentScenario(skill) {
    const scenarios = skillScenarios[skill];
    currentScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    
    showTyping();
    setTimeout(() => {
        hideTyping();
        addMessage(currentScenario.title, 'scenario');
        
        setTimeout(() => {
            addMessage(currentScenario.scenario, 'scenario');
            waitingForScenarioResponse = true;
        }, 2000);
    }, 2000);
}

function handleScenarioResponse(response) {
    showTyping();
    
    setTimeout(() => {
        hideTyping();
        
        // Generate contextual feedback based on the response
        const feedback = generateScenarioFeedback(response, currentSkill);
        addMessage(feedback, 'bot');
        
        // Ask follow-up question
        setTimeout(() => {
            showTyping();
            setTimeout(() => {
                hideTyping();
                addMessage(currentScenario.followUp, 'bot');
                // Keep waiting for scenario response for the follow-up
            }, 1500);
        }, 3000);
        
        // After follow-up, offer to continue or try another skill
        setTimeout(() => {
            offerNextStep();
        }, 8000);
        
    }, 2000);
    
    waitingForScenarioResponse = false;
}

function generateScenarioFeedback(response, skill) {
    const feedbackTemplates = {
        communication: [
            "That's a thoughtful approach! I can see you're considering both the emotional and practical aspects of the situation. Your response shows empathy while maintaining professionalism.",
            "Great thinking! You're demonstrating active listening skills and showing that you understand the importance of clear, honest communication.",
            "I appreciate how you're balancing being direct with being respectful. That's a key communication skill that will serve you well.",
            "Your response shows emotional intelligence in how you're considering the other person's perspective. That's crucial for effective communication."
        ],
        leadership: [
            "Excellent leadership thinking! You're showing that you understand leadership is about serving your team and taking responsibility.",
            "I can see you're thinking like a true leader - considering both the immediate needs and the long-term impact on your team.",
            "That's a strong leadership approach! You're demonstrating that you value both results and relationships.",
            "Your response shows you understand that leadership often means making difficult decisions while keeping your team's wellbeing in mind."
        ],
        emotional: [
            "That shows great emotional intelligence! You're demonstrating self-awareness and the ability to manage your emotions under pressure.",
            "I can see you're thinking about both your own emotional state and how to respond to others' emotions. That's exactly what emotional intelligence is about.",
            "Your approach shows you understand the importance of emotional regulation and empathy in professional settings.",
            "Great insight! You're showing that you can recognize emotional triggers and respond thoughtfully rather than reactively."
        ]
    };
    
    const templates = feedbackTemplates[skill];
    return templates[Math.floor(Math.random() * templates.length)];
}

function offerNextStep() {
    showTyping();
    setTimeout(() => {
        hideTyping();
        addMessage("You're doing great! Would you like to try another scenario with the same skill, explore a different skill area, or do you have any specific workplace situations you'd like to discuss?", 'bot');
        waitingForSkillChoice = true; // Reset to allow skill selection
    }, 1500);
    
    // Show mentor popup after several scenarios
    if (conversationCount >= 4) {
        setTimeout(() => {
            showMentorPopup();
        }, 5000);
    }
}

function generateGeneralResponse(message) {
    showTyping();
    setTimeout(() => {
        hideTyping();
        addMessage("That's really interesting! I'd love to help you work through that. Would you like me to create a specific scenario around this situation so we can practice different approaches together?", 'bot');
    }, 1500);
}

function addMessage(text, type) {
    const messages = document.getElementById('messages');
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.innerHTML = text;
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
    
    // Add skill tags for scenario messages
    if (type === 'scenario' && currentSkill) {
        addSkillTags(message, currentSkill);
    }
}

function addSkillTags(messageElement, skill) {
    const skillTags = document.createElement('div');
    skillTags.className = 'skill-tags';
    
    const skillNames = {
        communication: '💬 Communication',
        leadership: '👑 Leadership',
        emotional: '🧠 Emotional Intelligence'
    };
    
    const tag = document.createElement('span');
    tag.className = 'skill-tag';
    tag.textContent = skillNames[skill];
    skillTags.appendChild(tag);
    
    messageElement.appendChild(skillTags);
}

function showTyping() {
    document.getElementById('typingIndicator').style.display = 'block';
    const messages = document.getElementById('messages');
    messages.scrollTop = messages.scrollHeight;
}

function hideTyping() {
    document.getElementById('typingIndicator').style.display = 'none';
}

function updateProgress() {
    const progress = Math.min((conversationCount / 6) * 100, 100);
    document.getElementById('progressBar').style.width = progress + '%';
}

function showMentorPopup() {
    document.getElementById('popupOverlay').style.display = 'block';
}

function scheduleMentor() {
    alert('🎯 Mentor Scheduling\n\nExcellent! Your thoughtful responses to these scenarios show you\'re ready for advanced practice.\n\nIn the full application, this connects to our mentor booking system with:\n\n• Expert mentors specializing in your focus areas\n• Live scenario practice sessions\n• Personalized feedback and coaching\n• Industry-specific workplace situations\n\nYour professional growth journey continues!');
    closePopup();
}

function closePopup() {
    document.getElementById('popupOverlay').style.display = 'none';
}

function generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Auto-resize textarea
document.getElementById('messageInput').addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 120) + 'px';
});

// Enter key support (Shift+Enter for new line)
document.getElementById('messageInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// Close popup when clicking outside
document.getElementById('popupOverlay').addEventListener('click', function(e) {
    if (e.target === this) {
        closePopup();
    }
});

// Initialize chat when page loads - AI starts the conversation
window.addEventListener('load', initializeChat);