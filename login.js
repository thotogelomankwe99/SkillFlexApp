 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
  import { getAuth, signInWithEmailAndPassword } 
    from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
  import { getFirestore, doc, getDoc } 
    from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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
const db = getFirestore(app);

//login form handling
document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        // 1Sign in the user
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Get user role from Firestore
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            const role = (userData.role || "").toLowerCase(); // stored as "learner" or "mentor"

            // 3Redirect based on role
            if (role === "learner") {
                window.location.href = "/LearnerDashboard.html";
            } else if (role === "mentor") {
                window.location.href = "/mentorDashboard.html";
            } 
            else if (role === "admin"){
                window.location.href = "/admin.html";
            }
            else {
                console.error("Unknown role:", role);
                alert("Role not recognized. Please contact support.");
            }
        } else {
            console.error("No such user document!");
            alert("User profile not found. Please contact support.");
        }
    } catch (error) {
        console.error("Error logging in:", error.message);
        alert(error.message);
    }
});
