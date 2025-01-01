let currentQuestionIndex = 0;
let quizData = [];
let score = 0;

document.getElementById('generate-quiz').addEventListener('click', async () => {
    const topic = document.getElementById('topic').value;
    if (!topic) {
        alert("Please enter a topic.");
        return;
    }

    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'none';

    try {
        const response = await fetch('/generate-quiz', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ topic })
        });

        const data = await response.json();
        quizData = data; // Directly assign the response data
        if (!quizData.length) {
            alert("Failed to generate quiz.");
            return;
        }

        localStorage.setItem('quizData', JSON.stringify(quizData));
        localStorage.setItem('score', 0);
        currentQuestionIndex = 0;
        score = 0;
        loadQuestion();
    } catch (error) {
        alert("Error generating quiz.");
        console.error(error);
    }
});

function loadQuestion() {
    const quizContainer = document.getElementById('quiz-container');
    const resultContainer = document.getElementById('result-container');
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const nextButton = document.getElementById('next-question');

    quizContainer.style.display = 'block';
    resultContainer.style.display = 'none';
    optionsElement.innerHTML = '';

    const questionData = quizData[currentQuestionIndex];
    questionElement.textContent = `Q${currentQuestionIndex + 1}: ${questionData.question}`;
    questionData.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-button');
        button.addEventListener('click', () => handleAnswer(option, index));
        optionsElement.appendChild(button);
    });

    nextButton.style.display = 'none';
    nextButton.onclick = () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            showResult();
        }
    };
}

function handleAnswer(selectedOption, index) {
    const questionData = quizData[currentQuestionIndex];
    if (index === questionData.correctAnswer) {
        score++;
    }
    localStorage.setItem('score', score);
    document.getElementById('next-question').style.display = 'block';
}

function showResult() {
    const quizContainer = document.getElementById('quiz-container');
    const resultContainer = document.getElementById('result-container');
    const resultElement = document.getElementById('result');

    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';

    const finalScore = localStorage.getItem('score') || 0;
    resultElement.textContent = `You scored ${finalScore} out of ${quizData.length}`;
}
