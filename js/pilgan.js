let currentQuestion = 0;
let score = 0;
let isAnswered = false;

const questions = [
    { question: "Pilih tanda baca yang benar untuk mengakhiri kalimat:", options: [".", ",", ":", ";"], correctAnswer: 0 },
    { question: "Kalimat tanya sebaiknya diakhiri dengan:", options: [".", "!", "?", ","], correctAnswer: 2 },
    { question: "Pilih penggunaan tanda koma yang benar:", options: ["Halo, selamat datang.", "Halo selamat, datang.", "Halo selamat datang", "Halo; selamat datang"], correctAnswer: 0 },
    { question: "Tanda seru (!) biasanya digunakan untuk:", options: ["Pernyataan biasa", "Pertanyaan", "Seruan atau perintah", "Daftar item"], correctAnswer: 2 },
    { question: "Kalimat sapaan biasanya diakhiri dengan tanda:", options: [",", ".", ":", "!"], correctAnswer: 0 }
];

// Load the first question on page load
window.onload = function() {
    loadQuestion();
    updateProgressBar();
    updateQuestionNumber(); // Tambahkan penanda nomor soal
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
    questionEl.textContent = questions[currentQuestion].question;
    optionsEl.forEach((option, index) => {
        option.textContent = questions[currentQuestion].options[index];
    });

    isAnswered = false;
}

function checkAnswer(selectedIndex) {
    const correctAnswer = questions[currentQuestion].correctAnswer;
    const optionsEl = document.querySelectorAll('.option');

    if (!isAnswered) {
        if (selectedIndex === correctAnswer) {
            optionsEl[selectedIndex].classList.add('correct');
            score++;
        } else {
            optionsEl[selectedIndex].classList.add('wrong');
            optionsEl[correctAnswer].classList.add('correct');
        }

        optionsEl.forEach(option => option.disabled = true);
        isAnswered = true;
    }
}

function nextQuestion() {
    if (isAnswered) {
        currentQuestion++;
        if (currentQuestion >= questions.length) {
            showResult();
        } else {
            loadQuestion();
            updateProgressBar();
            updateQuestionNumber(); // Update nomor soal
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

    quizContainer.classList.add('hidden');
    resultScreen.classList.remove('hidden');

    scoreDisplay.textContent = "Anda berhasil menjawab ${score} dari ${questions.length} soal";

    if (score === questions.length) {
        resultMessage.textContent = "Selamat! Anda menjawab semuanya dengan benar!";
    } else {
        resultMessage.textContent = "Masih ada yang salah, coba lagi?";
    }
}

function restartQuiz() {
    score = 0;
    currentQuestion = 0;
    const quizContainer = document.querySelector('.quiz-container');
    const resultScreen = document.getElementById('result-screen');

    resultScreen.classList.add('hidden');
    quizContainer.classList.remove('hidden');

    loadQuestion();
    updateProgressBar();
    updateQuestionNumber(); // Reset nomor soal
}

function updateQuestionNumber() {
    const questionNumberEl = document.querySelector('.question-number');
    questionNumberEl.textContent = `Soal ${currentQuestion + 1}/${questions.length}`;
}
