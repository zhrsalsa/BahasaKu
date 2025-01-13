import { useEffect } from "react";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

const SetupQuizzes = () => {
  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyCBNu8V547_Eg5hg1_hmbuibGmTf5olOJg",
      authDomain: "bahasaku-eb21d.firebaseapp.com",
      projectId: "bahasaku-eb21d",
      storageBucket: "bahasaku-eb21d.firebasestorage.app",
      messagingSenderId: "636276077242",
      appId: "1:636276077242:web:aa463e78c2e0385594c883",
      measurementId: "G-RHC681N2XH",
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const addQuizzesToExistingUsers = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, "users"));
        const quizzes = [
          "huruf-kapital", 
          "huruf-tebal", 
          "imbuhan", 
          "unsur-terikat", 
          "unsur-serapan", 
          "kata-majemuk"
        ];

        usersSnapshot.forEach(async (userDoc) => {
          const userId = userDoc.id;
          const quizzesRef = collection(db, "users", userId, "quizzes");

          const quizzesSnapshot = await getDocs(quizzesRef);
          if (quizzesSnapshot.empty) {
            quizzes.forEach(async (quiz) => {
              const quizRef = doc(db, "users", userId, "quizzes", quiz);
              await setDoc(quizRef, {
                status: "locked", 
                score: 0          
              });
            });
            console.log(`Subcollection 'quizzes' berhasil ditambahkan untuk pengguna ${userId}`);
          }
        });
      } catch (error) {
        console.error("Error menambahkan quizzes ke pengguna yang sudah ada:", error);
      }
    };

    addQuizzesToExistingUsers();
  }, []);

  return <div>Setting up quizzes...</div>;
};

export default SetupQuizzes;