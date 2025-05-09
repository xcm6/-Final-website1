// MBTI type data
const mbtiTypes = {
    'ISTJ': {
        name: 'Inspector',
        description: 'Serious, responsible, practical, and logical thinker. Likes order and clear rules, focuses on details and precision. Good at systematic work, with a strong sense of responsibility and loyalty.',
        traits: [
            'Strong sense of responsibility, reliable and meticulous',
            'Organized and detail-oriented',
            'Values traditions and rules',
            'Practical and rational thinking',
            'Clear boundaries between work and personal life',
            'Steadfast in values and convictions'
        ],
        careers: [
            'Accountant, Auditor',
            'Project Manager',
            'Legal Advisor',
            'Systems Analyst',
            'Quality Control Specialist',
            'Military or Law Enforcement'
        ],
        advice: [
            'Learn to occasionally relax your focus on rules and details',
            'Try to accept new ideas and methods',
            'Develop emotional expression and empathy',
            'Consider long-term impacts before making decisions',
            'Cultivate adaptability to change',
            'Try to view problems from a broader perspective'
        ]
    },
    'ISFJ': {
        name: 'Protector',
        description: 'Quiet, responsible, warm and caring. Highly values harmony and cooperation, practical and concerned about others\' feelings. Has excellent observational skills and a rich inner world.',
        traits: [
            'Considerate and attentive to others\' needs',
            'Values traditions and family concepts',
            'Detail-oriented and organized',
            'Reliable and trustworthy',
            'Strong memory, values past experiences',
            'Tendency to serve others, strong dedication'
        ],
        careers: [
            'Nurse, Healthcare Provider',
            'Teacher (especially elementary school)',
            'Social Worker',
            'Administrative Assistant',
            'Customer Service Representative',
            'Human Resources Specialist'
        ],
        advice: [
            'Learn to set personal boundaries to avoid over-committing',
            'Try to express personal needs directly',
            'Develop ability to accept change and innovation',
            'Don\'t worry excessively about others\' opinions',
            'Learn to accept and handle conflict',
            'Allow yourself time for rest and recovery'
        ]
    },
    'INFJ': {
        name: 'Advocate',
        description: 'Insightful, idealistic, and compassionate thinker. Dedicated to helping others, with strong values and sense of purpose. Good at seeing beyond appearances and understanding complex relationships and motivations.',
        traits: [
            'Visionary, able to see possibilities',
            'Compassionate and understanding',
            'Seeks meaning and authenticity',
            'Committed to personal values and principles',
            'Keen insight in relationships',
            'Pursues personal growth and understanding'
        ],
        careers: [
            'Counselor, Therapist',
            'Writer, Editor',
            'Human Rights Activist',
            'Career Counselor',
            'University Professor',
            'Art Therapist'
        ],
        advice: [
            'Balance idealism with reality',
            'Avoid perfectionist tendencies',
            'Learn to express personal needs directly',
            'Assess your own capacity before committing to help others',
            'Avoid over-analyzing others and yourself',
            'Regularly engage in self-care activities'
        ]
    },
    'INTJ': {
        name: 'Architect',
        description: 'Independent, innovative, and strategic thinker. Skilled at developing systems and long-term plans, pursues knowledge and competence. Has high standards for self and others, values efficiency and logic.',
        traits: [
            'Strategic thinker with long-term vision',
            'Independent and autonomous, values personal space',
            'Continuous pursuit of improvement and efficiency',
            'Skilled at systematic thinking and analysis',
            'Impatient with incompetence and laziness',
            'Highly values knowledge and expertise'
        ],
        careers: [
            'Scientist, Researcher',
            'Strategic Planner',
            'Systems Architect',
            'Investment Banker',
            'Entrepreneur',
            'Management Consultant'
        ],
        advice: [
            'Develop emotional intelligence and interpersonal skills',
            'Learn to accept different working styles',
            'Consider others\' feelings and needs carefully',
            'Avoid excessive criticism and perfectionism',
            'Try to be more flexible with details',
            'Allow yourself to rest and relax'
        ]
    },
    'ISTP': {
        name: 'Craftsman',
        description: 'Flexible, calm, and observant problem-solver. Good at analyzing and handling practical issues, enjoys hands-on operation. Able to stay calm under pressure, values freedom and independence in life.',
        traits: [
            'Excellent troubleshooting and problem-solving skills',
            'Strong mechanical aptitude, enjoys hands-on work',
            'Highly adaptable and flexible',
            'Respects facts and logic',
            'Efficiency-focused, dislikes wasting time',
            'Adventurous spirit and autonomy'
        ],
        careers: [
            'Engineer, Technician',
            'Mechanic, Craftsperson',
            'Pilot',
            'Forensic Technician',
            'Computer Programmer',
            'Athlete, Coach'
        ],
        advice: [
            'Develop long-term planning and goal-setting abilities',
            'Enhance emotional expression and interpersonal communication',
            'Learn to seek help when needed',
            'Consider the emotional impact of decisions on others',
            'Develop patience for completing long-term projects',
            'Find balance between adventure and stability'
        ]
    },
    'ISFP': {
        name: 'Composer',
        description: 'Gentle, sensitive, and artistic free spirit. Values harmony and aesthetics, emphasizes personal values and authenticity. Has a strong spatial sense and natural connection, good at living in the moment.',
        traits: [
            'Strong artistic sense, appreciates beauty',
            'Gentle and friendly, avoids conflict',
            'Loyal to personal values',
            'Enjoys practical and hands-on activities',
            'Focuses on present experiences',
            'Values freedom and personal space'
        ],
        careers: [
            'Artist, Designer',
            'Musician, Photographer',
            'Beautician, Stylist',
            'Veterinarian, Animal Care Worker',
            'Interior Designer',
            'Environmental Worker'
        ],
        advice: [
            'Set clear goals and create action plans',
            'Learn to express your needs directly',
            'Develop conflict resolution skills',
            'Cultivate focus for long-term projects',
            'Build confidence in expressing opinions in groups',
            'Try to be more open to external feedback'
        ]
    },
    'INFP': {
        name: 'Mediator',
        description: 'Idealistic, passionate, and creative value-driven individual. Values inner harmony and personal growth, has empathy and deep understanding of people. Good at seeing others\' potential and possibilities.',
        traits: [
            'Idealistic and values-driven',
            'Creative and imaginative',
            'Deep understanding and empathy for others',
            'Seeks authenticity and meaning',
            'Highly adaptable, values flexibility',
            'Unwavering in beliefs and values'
        ],
        careers: [
            'Writer, Poet',
            'Psychologist, Counselor',
            'Social Worker',
            'Teacher (especially in arts)',
            'Human Resources Development Specialist',
            'Environmental Activist'
        ],
        advice: [
            'Develop practical skills and attention to detail',
            'Set realistic and achievable goals',
            'Learn to handle criticism and conflict',
            'Balance idealism with reality',
            'Improve decision-making and action-taking abilities',
            'Avoid excessive self-criticism'
        ]
    },
    'INTP': {
        name: 'Logician',
        description: 'Innovative, independent, and logical theorist. Seeks to understand concepts and systems principles, skilled at finding logical inconsistencies. Enjoys intellectual challenges, has a continuous thirst for knowledge.',
        traits: [
            'Sharp analytical mind',
            'Open-minded, receptive to new concepts',
            'Independent thinker, unconstrained by tradition',
            'Proficient with theories and abstract concepts',
            'Able to see multiple angles of complex problems',
            'Pursues precise knowledge and understanding'
        ],
        careers: [
            'Researcher, Scientist',
            'Software Developer',
            'Law Professor, Logician',
            'Philosopher, Writer',
            'Strategic Analyst',
            'University Professor'
        ],
        advice: [
            'Develop emotional expression and interpersonal skills',
            'Focus on practical applications rather than pure theory',
            'Learn to complete projects rather than just conceptualizing them',
            'Develop patience for handling everyday details',
            'Pay attention to others\' emotional needs',
            'Balance thinking with action'
        ]
    },
    'ESTP': {
        name: 'Entrepreneur',
        description: 'Energetic, observant, and practical action-taker. Enjoys stimulation and immediate problem-solving, can quickly adapt in changing environments. Values real-world experiences, enjoys taking risks.',
        traits: [
            'Energetic and action-oriented',
            'Pragmatic, focused on the present',
            'Strong adaptability, enjoys challenges',
            'Good at solving practical problems',
            'Strong social skills, frank and direct',
            'Adventurous spirit, enjoys trying new things'
        ],
        careers: [
            'Entrepreneur, Sales Representative',
            'Emergency Medical Technician',
            'Police Officer, Firefighter',
            'Athlete, Coach',
            'Construction Supervisor',
            'Venture Capitalist'
        ],
        advice: [
            'Develop long-term planning and goal-setting abilities',
            'Enhance emotional sensitivity and empathy',
            'Learn to consider the long-term impacts of decisions',
            'Cultivate patience and attention to detail',
            'Develop skills to listen to others\' opinions',
            'Balance risk-taking with stability needs'
        ]
    },
    'ESFP': {
        name: 'Performer',
        description: 'Outgoing, friendly, and energetic life enjoyer. Likes being with others, has a strong appreciation for aesthetics. Strong improvisation skills, enjoys creating fun and pleasant experiences.',
        traits: [
            'Enthusiastic and optimistic',
            'Lives in the moment, values experiences',
            'Excellent social skills',
            'Practical and adaptable',
            'Keen observation skills, attentive to details',
            'Strong aesthetic sense, values sensory experiences'
        ],
        careers: [
            'Actor, Performing Artist',
            'Public Relations Specialist',
            'Event Planner',
            'Tour Guide',
            'Preschool Teacher',
            'Sales Representative'
        ],
        advice: [
            'Develop long-term planning and self-discipline',
            'Learn to handle difficult emotions',
            'Cultivate independent thinking and analytical skills',
            'Improve financial planning awareness',
            'Consider long-term consequences before decisions',
            'Develop comfort with solitude'
        ]
    },
    'ENFP': {
        name: 'Champion',
        description: 'Enthusiastic, innovative, and imaginative possibility explorer. Can see others\' potential and opportunities, good at connecting different ideas. Pursues personal growth and authentic expression, inspires others to grow.',
        traits: [
            'Full of creativity and imagination',
            'Enthusiastic, good at motivating others',
            'Highly adaptable, open to new ideas',
            'Focuses on possibilities and future potential',
            'Strong curiosity and desire to learn',
            'Values authentic expression and personal growth'
        ],
        careers: [
            'Consultant, Coach',
            'Creative Director',
            'Entrepreneur',
            'Human Resources Development Specialist',
            'Marketing Professional',
            'Journalist, Writer'
        ],
        advice: [
            'Develop focus and project completion skills',
            'Learn to set practical and achievable goals',
            'Develop financial and resource management skills',
            'Pay attention to details and practical operations',
            'Complete existing projects before pursuing new ideas',
            'Balance work time with rest periods'
        ]
    },
    'ENTP': {
        name: 'Debater',
        description: 'Clever, curious, and innovative thinker. Good at challenging rules and finding new possibilities, skilled at recognizing patterns and connections. Enjoys intellectual challenges and debates, constantly seeks knowledge.',
        traits: [
            'Quick thinker, skilled in debate',
            'Innovative thinking, breaks conventions',
            'Versatile, strong learning ability',
            'Open-minded, enjoys challenges',
            'Adapts to change, receptive to new concepts',
            'Outstanding problem-solving ability'
        ],
        careers: [
            'Entrepreneur, Inventor',
            'Lawyer, Debater',
            'Software Developer',
            'Creative Consultant',
            'Marketing Strategist',
            'Venture Capitalist'
        ],
        advice: [
            'Develop project follow-through and completion skills',
            'Focus on details and practical implementation',
            'Develop emotional intelligence and interpersonal sensitivity',
            'Learn to maintain a gentle tone in debates',
            'Think carefully before criticizing others',
            'Balance exploring new ideas with task completion'
        ]
    },
    'ESTJ': {
        name: 'Executive',
        description: 'Efficient, practical, and order-focused manager. Values tradition and rules, skilled at organizing resources and people. Strong sense of responsibility, focuses on efficiency and results, good at implementing tasks.',
        traits: [
            'Strong organizational skills, highly efficient',
            'Practical, reliable, responsible',
            'Follows rules and traditions',
            'Decisive, results-focused',
            'Forthright and direct, follows through',
            'Attentive to details and accuracy'
        ],
        careers: [
            'Administrative Manager',
            'Project Manager',
            'Military or Law Enforcement Officer',
            'Financial Analyst',
            'Operations Director',
            'Judge, Lawyer'
        ],
        advice: [
            'Develop emotional sensitivity and empathy',
            'Learn to appreciate different working styles',
            'Cultivate open-mindedness and flexibility',
            'Try to accept new approaches and methods',
            'Consider others\' feelings before making decisions',
            'Balance work with personal life'
        ]
    },
    'ESFJ': {
        name: 'Consul',
        description: 'Warm, responsible, and harmony-focused caregiver. Attentive to others\' needs and feelings, values traditions and social connections. Helpful, creates warm and supportive environments.',
        traits: [
            'Cares for others, helpful',
            'Strong sense of responsibility, trustworthy',
            'Excellent social skills',
            'Strong organizational skills, detail-oriented',
            'Values harmony and teamwork',
            'Follows traditions and social norms'
        ],
        careers: [
            'Healthcare Provider',
            'Elementary School Teacher',
            'Human Resources Specialist',
            'Community Service Manager',
            'Public Relations Expert',
            'Customer Service Manager'
        ],
        advice: [
            'Learn to set personal boundaries',
            'Develop independent decision-making and self-care skills',
            'Cultivate ability to accept change and innovation',
            'Don\'t worry excessively about others\' opinions',
            'Focus on your own needs before caring for others',
            'Try to remain open to criticism'
        ]
    },
    'ENFJ': {
        name: 'Protagonist',
        description: 'Passionate, empathetic, and charismatic leader. Able to inspire others\' potential, dedicated to helping others grow. Skilled at communication and building relationships, pursues authenticity and meaning.',
        traits: [
            'Strong leadership skills, good at motivating others',
            'High empathy, focused on relationships',
            'Charismatic and persuasive',
            'Passionate with a strong sense of responsibility',
            'Excellent communication and coordination skills',
            'Highly sensitive to interpersonal harmony'
        ],
        careers: [
            'Teacher, Trainer',
            'Psychologist, Counselor',
            'Human Resources Manager',
            'Non-profit Organization Manager',
            'Marketing Director',
            'Politician, Community Leader'
        ],
        advice: [
            'Learn to set personal boundaries',
            'Develop self-care and relaxation skills',
            'Cultivate ability to accept criticism',
            'Avoid focusing too much on others\' needs while neglecting your own',
            'Learn to consider logic and facts when making decisions',
            'Allow yourself to express negative emotions'
        ]
    },
    'ENTJ': {
        name: 'Commander',
        description: 'Decisive, determined, and strategic leader. Skilled at systems thinking and long-term planning, focused on efficiency and results. Drives change and progress, pursues excellence and achievement.',
        traits: [
            'Strong strategic thinking, good at planning',
            'Decisive and confident, pursues excellence',
            'Strong leadership, goal-oriented',
            'Clear logic, rational decision-making',
            'Straightforward, honest and frank',
            'Pursues efficiency and results'
        ],
        careers: [
            'Corporate Executive',
            'Management Consultant',
            'Entrepreneur',
            'Politician, Policy Maker',
            'Lawyer, Judge',
            'Investment Banker'
        ],
        advice: [
            'Develop emotional intelligence and empathy',
            'Learn to listen to and consider others\' perspectives',
            'Practice patience when leading others',
            'Consider the emotional impact of decisions on others',
            'Accept imperfection and value the process',
            'Balance work with personal relationships'
        ]
    }
};

// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Check if test results exist
    const mbtiResult = localStorage.getItem('mbtiResult');
    const mbtiScores = localStorage.getItem('mbtiScores');
    
    if (!mbtiResult || !mbtiScores) {
        // No test results, return to home page
        window.location.href = 'index.html';
        return;
    }
    
    // Display test results
    displayResults(mbtiResult, JSON.parse(mbtiScores));
    
    // Add event for "Retake Test" button
    document.getElementById('retakeTest').addEventListener('click', function() {
        // Clear local storage data
        localStorage.removeItem('mbtiCurrentQuestion');
        localStorage.removeItem('mbtiAnswers');
        localStorage.removeItem('mbtiResult');
        localStorage.removeItem('mbtiScores');
        
        // Navigate to test home page
        window.location.href = 'index.html';
    });
});

// Display test results
function displayResults(mbtiType, scores) {
    // Get MBTI type data
    const typeData = mbtiTypes[mbtiType] || {
        name: 'Unknown Type',
        description: 'Unrecognized MBTI type.',
        traits: [],
        careers: [],
        advice: []
    };
    
    // Update type and name on page
    document.getElementById('resultType').textContent = mbtiType;
    document.getElementById('resultName').textContent = typeData.name;
    
    // Update description
    document.getElementById('resultDescription').textContent = typeData.description;
    
    // Update dimension score bars
    updateDimensionBar('E-I', scores.E, scores.I);
    updateDimensionBar('S-N', scores.S, scores.N);
    updateDimensionBar('T-F', scores.T, scores.F);
    updateDimensionBar('J-P', scores.J, scores.P);
    
    // Update percentage display
    document.getElementById('E-percentage').textContent = scores.E + '%';
    document.getElementById('I-percentage').textContent = scores.I + '%';
    document.getElementById('S-percentage').textContent = scores.S + '%';
    document.getElementById('N-percentage').textContent = scores.N + '%';
    document.getElementById('T-percentage').textContent = scores.T + '%';
    document.getElementById('F-percentage').textContent = scores.F + '%';
    document.getElementById('J-percentage').textContent = scores.J + '%';
    document.getElementById('P-percentage').textContent = scores.P + '%';
    
    // Add personality traits
    const traitsContainer = document.getElementById('personalityTraits');
    typeData.traits.forEach(trait => {
        const traitItem = document.createElement('div');
        traitItem.className = 'trait-item';
        traitItem.textContent = trait;
        traitsContainer.appendChild(traitItem);
    });
    
    // Add career paths
    const careersContainer = document.getElementById('careerPaths');
    typeData.careers.forEach(career => {
        const careerItem = document.createElement('div');
        careerItem.className = 'career-item';
        careerItem.textContent = career;
        careersContainer.appendChild(careerItem);
    });
    
    // Add growth advice
    const adviceContainer = document.getElementById('growthAdvice');
    typeData.advice.forEach(advice => {
        const adviceItem = document.createElement('div');
        adviceItem.className = 'advice-item';
        adviceItem.textContent = advice;
        adviceContainer.appendChild(adviceItem);
    });
    
    // Add fade-in animation
    document.querySelector('.results-section').classList.add('fade-in');
}

// Update dimension score bar
function updateDimensionBar(dimensionId, score1, score2) {
    const bar = document.getElementById(`${dimensionId}-bar`);
    
    // Calculate ratio of the left dimension
    const ratio = score1 / (score1 + score2);
    
    // Adjust progress bar width and position
    if (dimensionId === 'E-I' || dimensionId === 'S-N' || dimensionId === 'T-F') {
        // Left dimension grows from left to right
        bar.style.width = `${ratio * 100}%`;
        bar.style.left = '0';
    } else {
        // Right dimension grows from right to left
        bar.style.width = `${(1 - ratio) * 100}%`;
        bar.style.left = `${ratio * 100}%`;
    }
} 