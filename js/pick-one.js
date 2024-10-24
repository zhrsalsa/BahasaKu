let currentQuestion = 0;
let score = 0;
let isAnswered = false;

const questions = [
    { options: ["Apotik", "Apotek"], correctAnswer: 1 },
    { options: ["Ijin", "Izin"], correctAnswer: 1 },
    { options: ["Himne", "Hymne"], correctAnswer: 0 },
    { options: ["Kedaluarsa", "Kadaluarsa"], correctAnswer: 0 },
    { options: ["Distilasi", "Destilasi"], correctAnswer: 0 }
];

// Load the first question on page load
window.onload = function() {
    loadQuestion();
    updateProgressBar(); // Update the progress bar on page load
};

function loadQuestion() {
    const optionsEl = document.querySelectorAll('.option');
    const questionEl = document.getElementById('question-title');

    // Reset styles and buttons for the new question
    optionsEl.forEach(option => {
        option.classList.remove('correct', 'wrong');
        option.disabled = false;
    });

    // Set the question and options
    questionEl.textContent = `Pilih kata yang tepat:`;
    optionsEl.forEach((option, index) => {
        option.textContent = questions[currentQuestion].options[index];
    });

    isAnswered = false;
}

function checkAnswer(selectedIndex) {
    const correctAnswer = questions[currentQuestion].correctAnswer;
    const optionsEl = document.querySelectorAll('.option');

    // Only allow checking answer once per question
    if (!isAnswered) {
        if (selectedIndex === correctAnswer) {
            optionsEl[selectedIndex].classList.add('correct');
            score++;
        } else {
            optionsEl[selectedIndex].classList.add('wrong');
            optionsEl[correctAnswer].classList.add('correct');
        }

        optionsEl.forEach(option => option.disabled = true); // Disable further selection
        isAnswered = true;
    }
}

function nextQuestion() {
    // Check if the question was answered before proceeding
    if (isAnswered) {
        currentQuestion++;
        if (currentQuestion >= questions.length) {
            showResult(); // Show result screen if all questions are answered
        } else {
            loadQuestion();
            updateProgressBar(); // Update progress bar as user progresses
        }
    } else {
        alert("Harap jawab pertanyaan terlebih dahulu!");
    }
}

function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function showResult() {
    const quizContainer = document.querySelector('.quiz-container');
    const resultScreen = document.getElementById('result-screen');
    const resultMessage = document.getElementById('result-message');
    const scoreDisplay = document.getElementById('score');
    const retryBtn = document.querySelector('.retry-btn');
    const testBtn = document.querySelector('.test-btn');

    // Hide the quiz container and show the result screen
    quizContainer.classList.add('hidden');
    resultScreen.classList.remove('hidden');

    // Display the final score
    scoreDisplay.textContent = `Anda berhasil menjawab ${score} dari ${questions.length} soal`;

    // Determine the result message
    if (score === questions.length) {
        resultMessage.textContent = "Selamat! Anda menjawab semuanya dengan benar!";
        retryBtn.classList.add('hidden'); // Hide "Coba Lagi" button if the score is perfect
        testBtn.classList.remove('hidden'); // Show "Take Another Test" button
    } else {
        resultMessage.textContent = "Masih ada yang salah, coba lagi?";
        retryBtn.classList.remove('hidden'); // Show "Coba Lagi" button
        testBtn.classList.remove('hidden'); // Hide "Take Another Test" button if there are mistakes
    }
}

function restartQuiz() {
    score = 0;
    currentQuestion = 0;
    const quizContainer = document.querySelector('.quiz-container');
    const resultScreen = document.getElementById('result-screen');

    // Reset the view: hide result screen, show quiz container
    resultScreen.classList.add('hidden');
    quizContainer.classList.remove('hidden');

    // Reload the first question and reset progress bar
    loadQuestion();
    updateProgressBar();
}
