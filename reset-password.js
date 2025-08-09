import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBh4dUfZ8m61xsqa0qhG3aFguVZ4Gm2KCQ",
  authDomain: "skillflexapp.firebaseapp.com",
  projectId: "skillflexapp",
  storageBucket: "skillflexapp.firebasestorage.app",
  messagingSenderId: "827795374450",
  appId: "1:827795374450:web:4f64fa1bb85c158badddeb",
  measurementId: "G-PJ701TTVZJ"
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("resetForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message");

  try {
    await sendPasswordResetEmail(window.auth, email);
    message.style.color = "green";
    message.textContent = "Password reset email sent. Check your inbox.";
  } catch (error) {
    message.style.color = "red";
    if (error.code === "auth/user-not-found") {
      message.textContent = "No user found with that email.";
    } else if (error.code === "auth/invalid-email") {
      message.textContent = "Invalid email address.";
    } else {
      message.textContent = "Error: " + error.message;
    }
  }
});
