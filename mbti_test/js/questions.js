// MBTI test questions data
const questions = [
    // E vs I questions (5 questions)
    {
        question: "In social situations, you typically:",
        options: {
            A: "Actively engage with others and make new friends",
            B: "Prefer to talk with a few familiar people or be alone"
        },
        dimension: "E-I",
        score: { A: "E", B: "I" }
    },
    {
        question: "After spending time with people, you feel:",
        options: {
            A: "Energized and wanting to continue socializing",
            B: "Need to be alone to recharge"
        },
        dimension: "E-I",
        score: { A: "E", B: "I" }
    },
    {
        question: "When facing a problem, you tend to:",
        options: {
            A: "Discuss it with others and get multiple perspectives",
            B: "Think about it alone and organize your thoughts"
        },
        dimension: "E-I",
        score: { A: "E", B: "I" }
    },
    {
        question: "In work or study environments, you prefer:",
        options: {
            A: "Open team collaboration spaces",
            B: "Quiet, independent work settings"
        },
        dimension: "E-I",
        score: { A: "E", B: "I" }
    },
    {
        question: "You consider yourself:",
        options: {
            A: "Someone who readily expresses feelings and ideas",
            B: "Someone who shares only after careful consideration"
        },
        dimension: "E-I",
        score: { A: "E", B: "I" }
    },
    
    // S vs N questions (5 questions)
    {
        question: "When receiving new information, you focus more on:",
        options: {
            A: "Concrete facts and details",
            B: "Overall concepts and possibilities"
        },
        dimension: "S-N",
        score: { A: "S", B: "N" }
    },
    {
        question: "You trust more in:",
        options: {
            A: "Practical experience and concrete evidence",
            B: "Intuition and theoretical possibilities"
        },
        dimension: "S-N",
        score: { A: "S", B: "N" }
    },
    {
        question: "When solving problems, you prefer to:",
        options: {
            A: "Use proven methods that work",
            B: "Try innovative solutions"
        },
        dimension: "S-N",
        score: { A: "S", B: "N" }
    },
    {
        question: "You prefer to read or watch:",
        options: {
            A: "Realistic content like history or documentaries",
            B: "Imaginative content like sci-fi or fantasy"
        },
        dimension: "S-N",
        score: { A: "S", B: "N" }
    },
    {
        question: "You focus more on:",
        options: {
            A: "Current reality and practical situations",
            B: "Future possibilities and potential developments"
        },
        dimension: "S-N",
        score: { A: "S", B: "N" }
    },
    
    // T vs F questions (5 questions)
    {
        question: "When making decisions, you typically value more:",
        options: {
            A: "Objective logical analysis",
            B: "Impact on people and personal values"
        },
        dimension: "T-F",
        score: { A: "T", B: "F" }
    },
    {
        question: "In a conflict, you tend to focus on:",
        options: {
            A: "Finding the truth and maintaining fairness",
            B: "Considering everyone's feelings and maintaining harmony"
        },
        dimension: "T-F",
        score: { A: "T", B: "F" }
    },
    {
        question: "You appreciate others more for their:",
        options: {
            A: "Clear thinking and competence",
            B: "Genuine emotions and empathy"
        },
        dimension: "T-F",
        score: { A: "T", B: "F" }
    },
    {
        question: "When giving feedback, you tend to:",
        options: {
            A: "Directly point out issues with objective evaluation",
            B: "Focus on encouragement, expressing criticism tactfully"
        },
        dimension: "T-F",
        score: { A: "T", B: "F" }
    },
    {
        question: "You are more concerned with:",
        options: {
            A: "Efficiency and logical reasoning",
            B: "Meeting everyone's needs and feelings"
        },
        dimension: "T-F",
        score: { A: "T", B: "F" }
    },
    
    // J vs P questions (5 questions)
    {
        question: "For your daily life, you prefer:",
        options: {
            A: "Having a plan and scheduled activities",
            B: "Staying flexible and adapting to changes"
        },
        dimension: "J-P",
        score: { A: "J", B: "P" }
    },
    {
        question: "When completing tasks, you tend to:",
        options: {
            A: "Work according to plan and finish early",
            B: "Focus your energy close to the deadline"
        },
        dimension: "J-P",
        score: { A: "J", B: "P" }
    },
    {
        question: "Your work or living space is usually:",
        options: {
            A: "Neat and organized with everything in its place",
            B: "Casual with creative disorder"
        },
        dimension: "J-P",
        score: { A: "J", B: "P" }
    },
    {
        question: "When facing new opportunities, you prefer:",
        options: {
            A: "Clear rules and expectations",
            B: "Keeping options open and exploring possibilities"
        },
        dimension: "J-P",
        score: { A: "J", B: "P" }
    },
    {
        question: "You prefer:",
        options: {
            A: "Knowing what will happen in the future",
            B: "A life full of surprises and spontaneity"
        },
        dimension: "J-P",
        score: { A: "J", B: "P" }
    }
];

// Global variables
let currentQuestionIndex = 0;
let answers = {};

// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Check if data exists in local storage
    loadDataFromLocalStorage();
    
    // Update progress bar and question counter
    updateProgress();
    
    // Load current question
    loadQuestion(currentQuestionIndex);
    
    // Add event listeners to radio buttons
    const radioButtons = document.querySelectorAll('input[name="answer"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            // Highlight the selected option
            const labels = document.querySelectorAll('.option-label');
            labels.forEach(label => {
                label.classList.remove('selected');
            });
            this.closest('.option-label').classList.add('selected');
            
            // Save the answer
            saveAnswer(currentQuestionIndex, this.value);
        });
    });
    
    // Add event listener to "Previous" button
    document.getElementById('prevButton').addEventListener('click', function() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            loadQuestion(currentQuestionIndex);
            updateProgress();
            saveCurrentQuestionIndex();
        }
    });
    
    // Add event listener to "Next" button
    document.getElementById('nextButton').addEventListener('click', function() {
        // Check if current question has been answered
        if (answers[currentQuestionIndex] || currentQuestionIndex === questions.length) {
            if (currentQuestionIndex < questions.length - 1) {
                // More questions remain
                currentQuestionIndex++;
                loadQuestion(currentQuestionIndex);
                updateProgress();
                saveCurrentQuestionIndex();
            } else {
                // All questions answered, navigate to processing page
                window.location.href = 'processing.html';
            }
        } else {
            // Prompt user to answer current question
            showAlert('Please answer the current question first');
        }
    });
});

// Load data from local storage
function loadDataFromLocalStorage() {
    const storedQuestionIndex = localStorage.getItem('mbtiCurrentQuestion');
    const storedAnswers = localStorage.getItem('mbtiAnswers');
    
    if (storedQuestionIndex) {
        currentQuestionIndex = parseInt(storedQuestionIndex);
    }
    
    if (storedAnswers) {
        answers = JSON.parse(storedAnswers);
    }
}

// Save current question index to local storage
function saveCurrentQuestionIndex() {
    localStorage.setItem('mbtiCurrentQuestion', currentQuestionIndex.toString());
}

// Save answer to local storage
function saveAnswer(questionIndex, answer) {
    answers[questionIndex] = answer;
    localStorage.setItem('mbtiAnswers', JSON.stringify(answers));
}

// Load question
function loadQuestion(index) {
    // Get question data
    const question = questions[index];
    
    // Update question text
    document.getElementById('questionText').textContent = question.question;
    
    // Update options
    document.getElementById('optionA').textContent = question.options.A;
    document.getElementById('optionB').textContent = question.options.B;
    
    // Check if an answer already exists, if so select the corresponding option
    const radioButtons = document.querySelectorAll('input[name="answer"]');
    const labels = document.querySelectorAll('.option-label');
    
    // Reset all option states
    radioButtons.forEach(radio => {
        radio.checked = false;
    });
    labels.forEach(label => {
        label.classList.remove('selected');
    });
    
    // If there's a stored answer, set the selected state
    if (answers[index]) {
        const selectedValue = answers[index];
        const selectedRadio = document.querySelector(`input[value="${selectedValue}"]`);
        if (selectedRadio) {
            selectedRadio.checked = true;
            selectedRadio.closest('.option-label').classList.add('selected');
        }
    }
}

// Update progress bar and question counter
function updateProgress() {
    const progress = ((currentQuestionIndex) / questions.length) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
    document.getElementById('totalQuestions').textContent = questions.length;
    
    // Update button text, if last question change "Next" to "Complete"
    const nextButton = document.getElementById('nextButton');
    if (currentQuestionIndex === questions.length - 1) {
        nextButton.textContent = 'Complete Test';
    } else {
        nextButton.textContent = 'Next';
    }
    
    // Disable or enable "Previous" button
    const prevButton = document.getElementById('prevButton');
    prevButton.disabled = currentQuestionIndex === 0;
    prevButton.style.opacity = currentQuestionIndex === 0 ? '0.5' : '1';
}

// Show alert message
function showAlert(message) {
    // Check if an alert box already exists
    let alertBox = document.querySelector('.alert-box');
    
    if (!alertBox) {
        // Create alert box
        alertBox = document.createElement('div');
        alertBox.className = 'alert-box';
        document.body.appendChild(alertBox);
        
        // Add style
        const style = document.createElement('style');
        style.textContent = `
            .alert-box {
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background-color: rgba(255, 105, 180, 0.9);
                color: white;
                padding: 15px 30px;
                border-radius: 30px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                z-index: 1000;
                font-weight: bold;
                animation: fadeIn 0.3s, fadeOut 0.3s 2.7s;
                opacity: 0;
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translate(-50%, -20px); }
                to { opacity: 1; transform: translate(-50%, 0); }
            }
            @keyframes fadeOut {
                from { opacity: 1; transform: translate(-50%, 0); }
                to { opacity: 0; transform: translate(-50%, -20px); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Set message
    alertBox.textContent = message;
    alertBox.style.animation = 'none';
    
    // Trigger repaint
    void alertBox.offsetWidth;
    
    // Add animation
    alertBox.style.animation = 'fadeIn 0.3s, fadeOut 0.3s 2.7s';
    
    // Remove alert box after 3 seconds
    setTimeout(() => {
        alertBox.remove();
    }, 3000);
} 