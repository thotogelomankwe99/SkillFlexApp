//Linking buttons to external html files
document.getElementById("getStartedBtn").addEventListener("click", function(){
  window.location.href="sign-up.html";
});
document.getElementById("learnMoreBtn").addEventListener("click",function(){
  window.location.href="about.html";
});

function resetPassword() {
  const newPassword = document.getElementById("new-password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (!newPassword || !confirmPassword) {
    alert("Please fill in both fields.");
    return;
  }

  if (newPassword !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  const user = firebase.auth().currentUser;

  if (user) {
    user.updatePassword(newPassword).then(() => {
      alert("Password has been reset successfully.");
    }).catch((error) => {
      alert("Error: " + error.message);
    });
  } else {
    alert("No user is signed in. Please log in first.");
  }
}

// Import Firebase core and auth modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBh4dUfZ8m61xsqa0qhG3aFguVZ4Gm2KCQ",
  authDomain: "skillflexapp.firebaseapp.com",
  projectId: "skillflexapp",
  storageBucket: "skillflexapp.appspot.com",
  messagingSenderId: "827795374450",
  appId: "1:827795374450:web:4f64fa1bb85c158badddeb",
  measurementId: "G-PJ701TTVZJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log("Firebase initialized:", app.name);

// Initialize Firebase Auth
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

//  Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const googleBtn = document.querySelector(".google-btn");

  if (googleBtn) {
    googleBtn.addEventListener("click", () => {
      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user;
          console.log("Signed in as:", user.displayName);
          alert(`Welcome, ${user.displayName}!`);
        })
        .catch((error) => {
          console.error("Sign-in error:", error.message);
          alert("Google sign-in failed: " + error.message);
        });
    });
  } else {
    console.warn("Google button not found. Make sure it has class 'google-btn'");
  }
});
