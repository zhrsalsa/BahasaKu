import { auth, db } from './firebase-config.js';
import { getAuth } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { doc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

// Menyimpan status kuis setelah menyelesaikan
async function saveQuizProgress(status) {
    const user = getAuth().currentUser;
    if (user) {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
            "quizProgress.hurufKapital": status
        });
    }
}

// Event untuk menyelesaikan kuis
document.querySelector("#submit-quiz").addEventListener("click", async () => {
    const status = "completed"; // Misalnya setelah kuis selesai
    await saveQuizProgress(status);
    alert("Progres kuis disimpan!");
});
