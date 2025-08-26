// -------------------- Question Bank (20 questions per category) --------------------
const questionBank = {
    communication: [
        { question: "When giving feedback to a colleague, what's the most effective approach?", options: ["Be direct and critical", "Focus on specific behaviors and outcomes", "Avoid giving feedback", "Only mention positive aspects"], correct: 1 },
        { question: "During a presentation, you notice your audience seems confused. What should you do?", options: ["Continue as planned", "Pause and ask for questions", "Speed up to finish quickly", "Ignore their reactions"], correct: 1 },
        { question: "What's the key to active listening?", options: ["Preparing your response while others speak", "Focusing entirely on the speaker", "Taking detailed notes", "Asking many questions"], correct: 1 },
        { question: "How should you handle disagreements in a professional setting?", options: ["Avoid the topic entirely", "Focus on facts and find common ground", "Assert your position strongly", "Let others decide"], correct: 1 },
        { question: "What's the most important aspect of non-verbal communication?", options: ["Hand gestures", "Body language consistency with words", "Eye contact duration", "Facial expressions"], correct: 1 },
        { question: "When communicating via email, what should you prioritize?", options: ["Using complex vocabulary", "Being clear and concise", "Writing long explanations", "Using casual language"], correct: 1 },
        { question: "How do you ensure your message is understood?", options: ["Speak louder", "Ask for confirmation or feedback", "Repeat the same words", "Use technical jargon"], correct: 1 },
        { question: "What's the best way to start a difficult conversation?", options: ["Jump straight to the problem", "Set a positive, collaborative tone", "Start with criticism", "Avoid eye contact"], correct: 1 },
        { question: "How should you adapt your communication style?", options: ["Keep it the same for everyone", "Match your audience's needs and preferences", "Always be formal", "Always be casual"], correct: 1 },
        { question: "What's crucial when communicating across cultures?", options: ["Speak slowly and loudly", "Be aware of cultural differences and norms", "Use your native customs", "Avoid interaction"], correct: 1 },
        { question: "How do you handle interruptions during your speech?", options: ["Get angry and continue", "Acknowledge and address politely", "Ignore completely", "Stop speaking immediately"], correct: 1 },
        { question: "What makes a presentation engaging?", options: ["Reading from slides", "Interactive elements and storytelling", "Speaking very fast", "Using only text"], correct: 1 },
        { question: "How should you respond to criticism?", options: ["Defend immediately", "Listen, reflect, and respond thoughtfully", "Ignore it", "Criticize back"], correct: 1 },
        { question: "What's the purpose of small talk in professional settings?", options: ["Waste time", "Build rapport and relationships", "Show off knowledge", "Fill silence awkwardly"], correct: 1 },
        { question: "How do you communicate urgency without creating panic?", options: ["Use all caps in emails", "Be clear about timelines and importance", "Shout instructions", "Send multiple messages"], correct: 1 },
        { question: "What's the best approach for virtual communication?", options: ["Turn off camera always", "Be more expressive and clear", "Multitask during calls", "Use only text chat"], correct: 1 },
        { question: "How do you ensure inclusivity in group discussions?", options: ["Let dominant voices lead", "Actively invite all participants", "Stick to your agenda", "Avoid controversial topics"], correct: 1 },
        { question: "What's key to persuasive communication?", options: ["Being aggressive", "Understanding your audience's perspective", "Using pressure tactics", "Talking the most"], correct: 1 },
        { question: "How should you handle communication mistakes?", options: ["Ignore and move on", "Acknowledge and correct promptly", "Blame others", "Make excuses"], correct: 1 },
        { question: "What's most important in crisis communication?", options: ["Speed over accuracy", "Transparency and regular updates", "Minimal information", "Avoiding responsibility"], correct: 1 }
    ],
    leadership: [
        { question: "What's the most important quality of an effective leader?", options: ["Being the smartest person", "Inspiring and empowering others", "Making all decisions alone", "Being the most experienced"], correct: 1 },
        { question: "How should a leader handle team conflicts?", options: ["Ignore them until they resolve", "Address them promptly and fairly", "Take sides immediately", "Let the team figure it out"], correct: 1 },
        { question: "What's the best way to motivate team members?", options: ["Offer only monetary rewards", "Understand individual motivations", "Use fear-based tactics", "Treat everyone the same"], correct: 1 },
        { question: "How should leaders approach decision-making?", options: ["Make quick decisions alone", "Gather input and consider consequences", "Always follow majority vote", "Avoid making difficult decisions"], correct: 1 },
        { question: "What's crucial for building trust as a leader?", options: ["Being perfect always", "Consistency and transparency", "Keeping distance from team", "Making popular decisions only"], correct: 1 },
        { question: "How should leaders handle their own mistakes?", options: ["Hide them from the team", "Acknowledge and learn from them", "Blame external factors", "Minimize their importance"], correct: 1 },
        { question: "What's the best approach to delegating tasks?", options: ["Keep all important tasks", "Match tasks to team members' strengths", "Delegate randomly", "Only delegate boring tasks"], correct: 1 },
        { question: "How should leaders provide feedback?", options: ["Only when problems arise", "Regularly, both positive and constructive", "Through written reports only", "Let HR handle it"], correct: 1 },
        { question: "What's key to leading change in an organization?", options: ["Implement changes quickly", "Communicate vision and involve others", "Force compliance", "Change everything at once"], correct: 1 },
        { question: "How should leaders develop their team members?", options: ["Focus only on top performers", "Invest in everyone's growth", "Let them develop themselves", "Only provide training when requested"], correct: 1 },
        { question: "What's the role of emotional intelligence in leadership?", options: ["Not important for leaders", "Critical for understanding and managing relationships", "Only useful in HR", "A sign of weakness"], correct: 1 },
        { question: "How should leaders handle underperforming team members?", options: ["Fire them immediately", "Provide support and clear expectations", "Ignore the issue", "Publicly criticize them"], correct: 1 },
        { question: "What's the best way to build a strong team culture?", options: ["Enforce strict rules", "Model desired behaviors and values", "Let culture develop naturally", "Copy other successful teams"], correct: 1 },
        { question: "How should leaders approach innovation?", options: ["Stick to proven methods", "Encourage experimentation and learning", "Only innovate when forced", "Let others handle innovation"], correct: 1 },
        { question: "What's crucial when leading remote teams?", options: ["Micromanage everything", "Focus on results and communication", "Reduce expectations", "Avoid virtual meetings"], correct: 1 },
        { question: "How should leaders handle pressure and stress?", options: ["Hide it from the team", "Manage it while staying supportive", "Pass it down to others", "Take extended breaks"], correct: 1 },
        { question: "What's the best approach to strategic planning?", options: ["Plan everything in detail", "Set clear vision with flexible execution", "Avoid long-term planning", "Copy competitors' strategies"], correct: 1 },
        { question: "How should leaders celebrate team successes?", options: ["Take personal credit", "Recognize team contributions publicly", "Move immediately to next challenge", "Celebrate only major wins"], correct: 1 },
        { question: "What's key to effective leadership communication?", options: ["Being the loudest voice", "Listening more than speaking", "Using complex language", "Communicating only when necessary"], correct: 1 },
        { question: "How should leaders approach continuous learning?", options: ["Stop learning once promoted", "Model lifelong learning", "Only learn technical skills", "Learn only from successes"], correct: 1 }
    ],
    emotionalIntelligence: [
        { question: "What is the first step in developing emotional intelligence?", options: ["Understanding others' emotions", "Self-awareness of your own emotions", "Managing stress effectively", "Improving social skills"], correct: 1 },
        { question: "How should you respond when someone criticizes your work?", options: ["Get defensive immediately", "Listen calmly and consider their perspective", "Ignore the feedback", "Criticize them back"], correct: 1 },
        { question: "What's the best way to handle your own anger in the workplace?", options: ["Express it immediately", "Take time to cool down and reflect", "Suppress it completely", "Blame others for making you angry"], correct: 1 },
        { question: "How can you show empathy to a stressed colleague?", options: ["Tell them to calm down", "Listen actively and acknowledge their feelings", "Avoid them until they feel better", "Give them advice immediately"], correct: 1 },
        { question: "What's a key component of self-regulation?", options: ["Never showing emotions", "Managing your emotional responses appropriately", "Always being positive", "Avoiding difficult situations"], correct: 1 },
        { question: "How do you recognize emotional triggers in yourself?", options: ["Ignore uncomfortable feelings", "Pay attention to physical and emotional reactions", "Only focus on positive emotions", "Let others point them out"], correct: 1 },
        { question: "What's the best approach to giving emotional support?", options: ["Fix their problems immediately", "Validate their feelings and offer presence", "Tell them how to feel", "Compare their situation to others"], correct: 1 },
        { question: "How should you handle your own mistakes emotionally?", options: ["Feel ashamed and hide them", "Accept responsibility and learn from them", "Blame external circumstances", "Minimize their importance"], correct: 1 },
        { question: "What's crucial for reading others' emotions accurately?", options: ["Making assumptions based on your experience", "Observing verbal and non-verbal cues", "Focusing only on what they say", "Projecting your own feelings"], correct: 1 },
        { question: "How do you maintain emotional balance during stress?", options: ["Ignore the stress completely", "Use healthy coping strategies", "Work harder to distract yourself", "Avoid all stressful situations"], correct: 1 },
        { question: "What's the best way to motivate yourself emotionally?", options: ["Wait for external motivation", "Connect tasks to your personal values", "Force yourself through willpower alone", "Compare yourself to others"], correct: 1 },
        { question: "How should you respond to others' emotional outbursts?", options: ["Match their emotional intensity", "Stay calm and respond thoughtfully", "Leave the situation immediately", "Tell them to control themselves"], correct: 1 },
        { question: "What's important for building emotional resilience?", options: ["Avoiding all negative emotions", "Developing healthy coping mechanisms", "Being tough and unemotional", "Depending on others for support"], correct: 1 },
        { question: "How do you practice self-compassion?", options: ["Be your harshest critic", "Treat yourself with kindness during difficulties", "Always put others first", "Ignore your own needs"], correct: 1 },
        { question: "What's key to emotional communication?", options: ["Hiding your true feelings", "Expressing emotions clearly and appropriately", "Only sharing positive emotions", "Letting emotions control your words"], correct: 1 },
        { question: "How do you handle conflicting emotions?", options: ["Choose one emotion to focus on", "Acknowledge and explore all feelings", "Suppress the uncomfortable ones", "Act on the strongest emotion"], correct: 1 },
        { question: "What's the role of emotional intelligence in decision-making?", options: ["Emotions should be ignored", "Consider both logic and emotional factors", "Only use emotional reasoning", "Let others make emotional decisions"], correct: 1 },
        { question: "How do you build stronger emotional connections?", options: ["Keep relationships superficial", "Share vulnerabilities appropriately", "Always appear strong and confident", "Avoid emotional topics"], correct: 1 },
        { question: "What's crucial for emotional growth?", options: ["Staying in your comfort zone", "Reflecting on emotional experiences", "Avoiding challenging situations", "Copying others' emotional responses"], correct: 1 },
        { question: "How should you handle others' emotional needs?", options: ["Fix their problems for them", "Listen and support without judgment", "Tell them what they should feel", "Avoid emotional conversations"], correct: 1 }
    ]
};

// -------------------- Quiz State --------------------
let currentCategory = '';
let currentQuestions = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let score = 0;

// -------------------- Functions --------------------
function startQuiz(category) {
    currentCategory = category;
    const allQuestions = questionBank[category];
    currentQuestions = getRandomQuestions(allQuestions, 5); // pick 5 random questions
    currentQuestionIndex = 0;
    userAnswers = [];
    score = 0;
    document.getElementById('categorySelection').style.display = 'none';
    document.getElementById('quizContainer').style.display = 'block';
    displayQuestion();
}

function getRandomQuestions(questions, count) {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function displayQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    document.getElementById('questionNumber').textContent = `Question ${currentQuestionIndex + 1}`;
    document.getElementById('questionText').textContent = question.question;
    document.getElementById('questionCounter').textContent = `${currentQuestionIndex + 1} of ${currentQuestions.length}`;
    
    const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.onclick = () => selectOption(index);
        if(userAnswers[currentQuestionIndex] === index){
            optionElement.classList.add('selected');
        }
        optionsContainer.appendChild(optionElement);
    });

    document.getElementById('prevBtn').disabled = currentQuestionIndex === 0;
    document.getElementById('nextBtn').disabled = userAnswers[currentQuestionIndex] == null;
    document.getElementById('nextBtn').textContent = currentQuestionIndex === currentQuestions.length - 1 ? 'Finish Quiz' : 'Next';
}

function selectOption(optionIndex) {
    userAnswers[currentQuestionIndex] = optionIndex;
    displayQuestion();
}

function nextQuestion() {
    if(currentQuestionIndex < currentQuestions.length - 1){
        currentQuestionIndex++;
        displayQuestion();
    } else {
        finishQuiz();
    }
}

function previousQuestion() {
    if(currentQuestionIndex > 0){
        currentQuestionIndex--;
        displayQuestion();
    }
}

function finishQuiz() {
    score = 0;
    currentQuestions.forEach((q, i) => {
        if(userAnswers[i] === q.correct) score++;
    });
    document.getElementById('quizContainer').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    document.getElementById('scoreCircle').textContent = `Score: ${score} / ${currentQuestions.length}`;
    document.getElementById('resultTitle').textContent = score >= 3 ? "Great Job!" : "Keep Practicing!";
    document.getElementById('resultMessage').textContent = `You answered ${score} out of ${currentQuestions.length} questions correctly.`;
}

function restartQuiz() {
    document.getElementById('results').style.display = 'none';
    document.getElementById('categorySelection').style.display = 'block';
}

function backToCategories() {
    restartQuiz();
}

function engageChatbot() {
    alert("This feature will connect you to an AI Coach (not implemented yet).");
}
