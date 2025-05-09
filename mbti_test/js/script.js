// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Check if there's an incomplete test in local storage
    checkForIncompleteTest();
    
    // Add click event for "Start Test" button
    document.getElementById('startTest').addEventListener('click', function() {
        // Initialize test data
        initializeTest();
        // Navigate to questions page
        window.location.href = 'questions.html';
    });
});

// Check for incomplete test
function checkForIncompleteTest() {
    const currentQuestionIndex = localStorage.getItem('mbtiCurrentQuestion');
    const answersJson = localStorage.getItem('mbtiAnswers');
    
    // If there's an incomplete test, show continue test notification
    if (currentQuestionIndex && answersJson) {
        const answers = JSON.parse(answersJson);
        const answeredCount = Object.keys(answers).length;
        
        if (answeredCount > 0 && answeredCount < 20) {
            const continueSection = document.createElement('div');
            continueSection.className = 'continue-test-notification fade-in';
            continueSection.innerHTML = `
                <div class="notification-content">
                    <p>You have an incomplete test (completed ${answeredCount}/20 questions)</p>
                    <button id="continueTest" class="button primary-button">Continue Test</button>
                    <button id="startNewTest" class="button secondary-button">Start New Test</button>
                </div>
            `;
            
            // Insert after instructions
            const instructions = document.querySelector('.instructions');
            instructions.parentNode.insertBefore(continueSection, instructions.nextSibling);
            
            // Add event to continue test button
            document.getElementById('continueTest').addEventListener('click', function() {
                window.location.href = 'questions.html';
            });
            
            // Add event to restart button
            document.getElementById('startNewTest').addEventListener('click', function() {
                clearTestData();
                initializeTest();
                window.location.href = 'questions.html';
            });
            
            // Add style
            const style = document.createElement('style');
            style.textContent = `
                .continue-test-notification {
                    background-color: rgba(255, 105, 180, 0.1);
                    border: 1px solid var(--primary-color);
                    border-radius: 8px;
                    padding: 20px;
                    margin: 20px auto;
                    max-width: 600px;
                    text-align: center;
                }
                .notification-content p {
                    margin-bottom: 15px;
                    color: var(--primary-color);
                    font-weight: bold;
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Initialize test data
function initializeTest() {
    // Clear previous test data
    clearTestData();
    
    // Initialize test information
    localStorage.setItem('mbtiCurrentQuestion', '0');
    localStorage.setItem('mbtiAnswers', JSON.stringify({}));
}

// Clear test data
function clearTestData() {
    localStorage.removeItem('mbtiCurrentQuestion');
    localStorage.removeItem('mbtiAnswers');
    localStorage.removeItem('mbtiResult');
    localStorage.removeItem('mbtiScores');
} 