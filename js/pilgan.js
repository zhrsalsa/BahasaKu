let currentQuestion = 0;
let score = 0;
let isAnswered = false;

const questions = [
    { 
        question: "Pilih kalimat yang benar tepat!",
        options: [
            "Kami mengundang Bapak/Ibu untuk menghadiri rapat yang akan dilaksanakan pada hari senin, 23 Januari 2024.",
            "Kami mengundang Bapak/Ibu untuk menghadiri rapat yang akan dilaksanakan pada hari Senin, 23 Januari 2024.",
            "Kami mengundang Bapak/Ibu untuk menghadiri rapat yang akan dilaksanakan pada Hari Senin, 23 Januari, 2024.",
            "Kami mengundang Bapak/Ibu untuk menghadiri rapat yang akan dilaksanakan pada hari Senin, 23 Januari, 2024."
        ],
        correctAnswer: 1 
    },
    { 
        question: "Pilih kalimat yang benar tepat!",
        options: [
            "Penelitian ini harus menggunakan metode analisa yang tepat dan relevan.",
            "Penelitian ini harus menggunakan metode analisis yang tepat dan relevan.",
            "Penelitian ini harus menggunakan metoda analisis yang tepat dan relevan.",
            "Penelitian ini harus menggunakan metode analisa yang tepat dan relefan."
        ],
        correctAnswer: 1 
    },
    { 
        question: "Pilih kalimat yang benar tepat!",
        options: [
            "Toko buku itu menjual buku-buku, alat tulis, dan berbagai perlengkapan sekolah.",
            "Toko buku itu menjual buku buku, alat tulis dan berbagai perlengkapan sekolah.",
            "Toko buku itu menjual buku-buku, alat tulis dan berbagai perlengkapan sekolah.",
            "Toko buku itu menjual buku buku, alat-tulis, dan berbagai perlengkapan sekolah."
        ],
        correctAnswer: 0 
    },
    { 
        question: "Pilih kalimat yang benar tepat!",
        options: [
            "Pada tahun 2024, kami berencana untuk membuka cabang baru di 3 kota.",
            "Pada tahun 2024, kami berencana untuk membuka cabang baru di tiga kota.",
            "Pada tahun 2024 kami berencana untuk membuka cabang baru di tiga kota.",
            "Pada tahun 2024 kami berencana untuk membuka cabang baru di 3 kota."
        ],
        correctAnswer: 1 
    },
    { 
        question: "Pilih kalimat yang benar tepat!",
        options: [
            "Acara ini akan berlangsung pada tanggal 17, Oktober, 2024.",
            "Acara ini akan berlangsung pada tanggal 17 Oktober, 2024.",
            "Acara ini akan berlangsung pada tanggal 17 Oktober 2024.",
            "Acara ini akan berlangsung pada tanggal 17, Oktober 2024."
        ],
        correctAnswer: 1 
    }
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

    scoreDisplay.textContent = `Anda berhasil menjawab ${score} dari ${questions.length} soal`;

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
    const resultScreen = document.querySelector('.result-screen');

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
