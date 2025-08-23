// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfRwl1po6DHQv1JZsdIH-o3YN9r6Vw1so",
  authDomain: "skillflex-1700b.firebaseapp.com",
  projectId: "skillflex-1700b",
  storageBucket: "skillflex-1700b.firebasestorage.app",
  messagingSenderId: "1062926529269",
  appId: "1:1062926529269:web:bb5a515fb9eddda1190bbc",
  measurementId: "G-879ZDDBYRY"
};

// Initialize Firebase (compat)
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Handle login form
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Validate email/password before sending
  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  try {
    // Attempt to sign in the user directly
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Fetch user's role from Firestore
    const docSnap = await db.collection("users").doc(user.uid).get();

    if (!docSnap.exists) {
      alert("You don’t have an account yet. Please sign up first.");
      return;
    }

    const roleRaw = docSnap.data().role;
    console.log("User role (raw):", roleRaw);

    if (!roleRaw) {
      alert("Role is not set in Firestore. Contact support.");
      return;
    }

    const role = roleRaw.trim().toLowerCase();

    // Redirect based on role
    switch (role) {
      case "admin":
        window.location.href = "admin-dashboard.html";
        break;
      case "mentor":
        window.location.href = "mentorDashboard.html";
        break;
      case "learner":
        window.location.href = "leaner-dashboard.html"; // match your HTML file
        break;
      default:
        alert("Role not defined. Contact support.");
    }

  } catch (error) {
    console.error("Firebase Error:", error);
    let message = "";

    // Handle known Firebase errors
    switch (error.code) {
      case "auth/user-not-found":
        message = "No account found with this email. Please sign up.";
        break;
      case "auth/invalid-password":
        message = "Incorrect password. Please try again.";
        break;
      case "auth/invalid-email":
        message = "The email address format is invalid.";
        break;
      case "auth/user-disabled":
        message = "This account has been disabled. Please contact support.";
        break;
      case "auth/too-many-requests":
        message = "Too many failed login attempts. Please try again later.";
        break;
      case "auth/invalid-credential":
        message = "Invalid login credentials. Please check your email/password.";
        break;
      default:
        message = "Login failed. Please try again.";
        break;
    }

    alert(message);
  }
});
