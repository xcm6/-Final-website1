// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Check if test answers exist
    const answersJson = localStorage.getItem('mbtiAnswers');
    
    if (!answersJson) {
        // No answer data, return to test home page
        window.location.href = 'index.html';
        return;
    }
    
    // Start processing animation
    startProcessingAnimation();
    
    // Calculate test results (simulated processing)
    setTimeout(() => {
        calculateResults();
    }, 1000);
});

// Start processing animation
function startProcessingAnimation() {
    const loadingProgress = document.getElementById('loadingProgress');
    const percentageText = document.getElementById('percentageText');
    const steps = document.querySelectorAll('.step');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += 1;
        
        // Update loading progress bar
        loadingProgress.style.width = `${progress}%`;
        percentageText.textContent = `${progress}%`;
        
        // Update step status
        if (progress >= 25 && progress < 50) {
            updateStepStatus(steps, 1);
        } else if (progress >= 50 && progress < 75) {
            updateStepStatus(steps, 2);
        } else if (progress >= 75 && progress < 100) {
            updateStepStatus(steps, 3);
        } else if (progress >= 100) {
            updateStepStatus(steps, 4);
            clearInterval(interval);
            
            // After processing is complete, navigate to results page
            setTimeout(() => {
                window.location.href = 'results.html';
            }, 500);
        }
    }, 30);
}

// Update step status
function updateStepStatus(steps, activeStep) {
    for (let i = 0; i < steps.length; i++) {
        if (i < activeStep) {
            steps[i].classList.add('completed');
            steps[i].classList.remove('active');
            steps[i].querySelector('.check-icon').textContent = '✓';
        } else if (i === activeStep) {
            steps[i].classList.add('active');
            steps[i].classList.remove('completed');
            steps[i].querySelector('.check-icon').textContent = '...';
        } else {
            steps[i].classList.remove('active', 'completed');
            steps[i].querySelector('.check-icon').textContent = '';
        }
    }
}

// Calculate MBTI test results
function calculateResults() {
    const answers = JSON.parse(localStorage.getItem('mbtiAnswers'));
    
    // Initialize dimension scores
    const scores = {
        E: 0, I: 0,
        S: 0, N: 0,
        T: 0, F: 0,
        J: 0, P: 0
    };
    
    // Get dimension and score for each question from questions data
    const questionScript = document.createElement('script');
    questionScript.src = 'js/questions.js';
    
    // When questions data is loaded, calculate scores
    questionScript.onload = function() {
        // Loop through all answers
        for (const [index, answer] of getObjectEntries(answers)) {
            const question = questions[index];
            const dimension = question.dimension;
            const scoreType = question.score[answer];
            
            // Increase score for the corresponding dimension
            scores[scoreType]++;
        }
        
        // Calculate dominant type for each dimension
        const mbtiResult = [
            scores.E >= scores.I ? 'E' : 'I',
            scores.S >= scores.N ? 'S' : 'N',
            scores.T >= scores.F ? 'T' : 'F',
            scores.J >= scores.P ? 'J' : 'P'
        ].join('');
        
        // Calculate percentage scores
        const percentages = {
            E: Math.round((scores.E / (scores.E + scores.I)) * 100),
            I: Math.round((scores.I / (scores.E + scores.I)) * 100),
            S: Math.round((scores.S / (scores.S + scores.N)) * 100),
            N: Math.round((scores.N / (scores.S + scores.N)) * 100),
            T: Math.round((scores.T / (scores.T + scores.F)) * 100),
            F: Math.round((scores.F / (scores.T + scores.F)) * 100),
            J: Math.round((scores.J / (scores.J + scores.P)) * 100),
            P: Math.round((scores.P / (scores.J + scores.P)) * 100)
        };
        
        // Save results to local storage
        localStorage.setItem('mbtiResult', mbtiResult);
        localStorage.setItem('mbtiScores', JSON.stringify(percentages));
    };
    
    // Add script to page
    document.body.appendChild(questionScript);
}

// Manual implementation of Object.entries() (for compatibility)
function getObjectEntries(obj) {
    const entries = [];
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            entries.push([key, obj[key]]);
        }
    }
    return entries;
} 