
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

// Password Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            // Toggle password visibility
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle eye icon
            if (type === 'password') {
                // Password is hidden - show eye-slash (crossed out)
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            } else {
                // Password is visible - show open eye
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
        });
    }
});

// Handle login form
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const submitButton = e.target.querySelector('button[type="submit"]');

        // Validate email/password before sending
        if (!email || !password) {
            showError("Please enter both email and password.");
            return;
        }

        // Add loading state
        submitButton.classList.add('loading');
        submitButton.disabled = true;

        try {
            // Attempt to sign in the user directly
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            const user = userCredential.user;

            // Fetch user's role from Firestore
            const docSnap = await db.collection("users").doc(user.uid).get();

            if (!docSnap.exists) {
                showError("You don't have an account yet. Please sign up first.");
                return;
            }

            const roleRaw = docSnap.data().role;
            console.log("User role (raw):", roleRaw);

            if (!roleRaw) {
                showError("Role is not set in Firestore. Contact support.");
                return;
            }

            const role = roleRaw.trim().toLowerCase();

            // Show success message
            showSuccess("Login successful! Redirecting...");

            // Redirect based on role after a short delay
            setTimeout(() => {
                switch (role) {
                    case "admin":
                        window.location.href = "new-admin.dashboard.html";
                        break;
                    case "mentor":
                        window.location.href = "mentorDashboard.html";
                        break;
                    case "learner":
                        window.location.href = "LearnerDashboard.html";
                        break;
                    default:
                        showError("Role not defined. Contact support.");
                }
            }, 1000);

        } catch (error) {
            console.error("Firebase Error:", error);
            let message = "";

            // Handle known Firebase errors
            switch (error.code) {
                case "auth/user-not-found":
                    message = "No account found with this email. Please sign up.";
                    break;
                case "auth/wrong-password":
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
                case "auth/network-request-failed":
                    message = "Network error. Please check your internet connection.";
                    break;
                default:
                    message = "Login failed. Please try again.";
                    break;
            }

            showError(message);
        } finally {
            // Remove loading state
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
        }
    });
}

// Google Sign In
const googleBtn = document.getElementById('googleBtn');
if (googleBtn) {
    googleBtn.addEventListener('click', async function() {
        const provider = new firebase.auth.GoogleAuthProvider();
        
        try {
            const result = await auth.signInWithPopup(provider);
            const user = result.user;
            
            // Check if user exists in Firestore
            const docSnap = await db.collection("users").doc(user.uid).get();
            
            if (docSnap.exists) {
                const role = docSnap.data().role?.trim().toLowerCase();
                
                // Redirect based on role
                switch (role) {
                    case "admin":
                        window.location.href = "new-admin.dashboard.html";
                        break;
                    case "mentor":
                        window.location.href = "mentorDashboard.html";
                        break;
                    case "learner":
                        window.location.href = "LearnerDashboard.html";
                        break;
                    default:
                        showError("Role not defined. Contact support.");
                }
            } else {
                // New user - redirect to role selection or signup completion
                showError("Please complete your account setup first.");
                // You might want to redirect to a role selection page

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
            
        } catch (error) {
            console.error("Google Sign In Error:", error);
            showError("Google sign in failed. Please try again.");
        }
    });
}

// Utility functions for showing messages
function showError(message) {
    // Remove any existing messages
    removeExistingMessages();
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.display = 'block';
    errorDiv.textContent = message;
    
    // Insert before the form
    const form = document.querySelector('form');
    form.parentNode.insertBefore(errorDiv, form);
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    }, 5000);
}

function showSuccess(message) {
    // Remove any existing messages
    removeExistingMessages();
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.cssText = `
        color: #155724;
        background: #d4edda;
        border: 1px solid #c3e6cb;
        padding: 0.75rem;
        border-radius: 8px;
        margin-bottom: 1rem;
        font-size: 0.9rem;
        display: block;
    `;
    successDiv.textContent = message;
    
    // Insert before the form
    const form = document.querySelector('form');
    form.parentNode.insertBefore(successDiv, form);
    
    // Auto hide after 3 seconds
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.parentNode.removeChild(successDiv);
        }
    }, 3000);
}

function removeExistingMessages() {
    const existingMessages = document.querySelectorAll('.error-message, .success-message');
    existingMessages.forEach(msg => {
        if (msg.parentNode) {
            msg.parentNode.removeChild(msg);
        }
    });
}

// Form validation and UX improvements
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            // Clear validation styling on input
            this.style.borderColor = '';
            const wrapper = this.closest('.input-wrapper');
            if (wrapper) {
                const icon = wrapper.querySelector('i:not(.toggle-password)');
                if (icon) {
                    icon.style.color = '';
                }
            }
        });
    });
});

function validateField(field) {
    const isValid = field.checkValidity();
    const wrapper = field.closest('.input-wrapper');
    
    if (!isValid) {
        field.style.borderColor = '#dc3545';
        if (wrapper) {
            const icon = wrapper.querySelector('i:not(.toggle-password)');
            if (icon) {
                icon.style.color = '#dc3545';
            }
        }
    } else {
        field.style.borderColor = '#28a745';
        if (wrapper) {
            const icon = wrapper.querySelector('i:not(.toggle-password)');
            if (icon) {
                icon.style.color = '#28a745';
            }
        }
    }
}