
import {initializeApp} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword, sendEmailVerification} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import {getFirestore, doc, setDoc, serverTimestamp} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfRwl1po6DHQv1JZsdIH-o3YN9r6Vw1so",
  authDomain: "skillflex-1700b.firebaseapp.com",
  projectId: "skillflex-1700b",
  storageBucket: "skillflex-1700b.firebasestorage.app",
  messagingSenderId: "1062926529269",
  appId: "1:1062926529269:web:bb5a515fb9eddda1190bbc",
  measurementId: "G-879ZDDBYRY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db =getFirestore(app);
//const analytics = getAnalytics(app);

//event listener for form submission
 const signupForm = document.querySelector('.signup-form');
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Collect input values
    const fullName = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const role = document.querySelector('input[name="role"]:checked').value;
    const termsAccepted = document.getElementById('terms').checked;

// Basic validations
    if (!termsAccepted) {
      alert("You must accept the Terms & Privacy Policy.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

try {
// Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user details in Firestore under 'users' collection
      await setDoc(doc(db, 'users', user.uid), {
        fullName,
        email,
        role,
        createdAt: serverTimestamp(),
      });

      // Send email verification
      await sendEmailVerification(user);

      alert("Signup successful! Please verify your email before logging in.");

      // Optionally, reset the form
      signupForm.reset();

    } catch (error) {
      alert("Error: " + error.message);
    }
  });