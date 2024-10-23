const correctAnswers = [
    ["B", "E", "S", "A", "R"],  // Baris 1
    ["G", "E", "L", "A", "P"],  // Baris 2
    ["H"],                      // Baris 3
    ["A", "K", "T", "I"],        // Baris 4
    [],                          // Baris 5 tidak ada jawaban penuh
    ["P", "I", "N", "T", "A", "R"] // Baris 6
];

function checkAnswers() {
    let table = document.getElementById("crosswordTable");
    let rows = table.getElementsByTagName("tr");
    let allCorrect = true;

    // Loop through each row
    for (let i = 0; i < rows.length; i++) {
        let inputs = rows[i].getElementsByTagName("input");
        let rowCorrect = true;

        // Check each input in the row
        for (let j = 0; j < inputs.length; j++) {
            if (inputs[j].value.toUpperCase() !== correctAnswers[i][j]) {
                inputs[j].value = ""; // Empty wrong answers
                rowCorrect = false;
                allCorrect = false;
            }
        }

        // If the row is correct, keep the answers
        if (rowCorrect) {
            for (let j = 0; j < inputs.length; j++) {
                inputs[j].disabled = true; // Lock correct answers
            }
        }
    }

    // If all answers are correct, show success message
    if (allCorrect) {
        document.getElementById("gameContainer").style.display = "none"; // Sembunyikan game saat semua jawaban benar
        document.getElementById("successMessage").style.display = "block"; // Tampilkan pesan sukses
    }
}