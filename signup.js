import {initializeApp} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup, GoogleAuthProvider} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import {getFirestore, doc, setDoc, serverTimestamp, getDoc} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js"; // Added getDoc import

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Password Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Toggle for main password field
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            togglePasswordVisibility(passwordInput, this);
        });
    }

    // Toggle for confirm password field
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const confirmPasswordInput = document.getElementById('confirm-password');

    if (toggleConfirmPassword && confirmPasswordInput) {
        toggleConfirmPassword.addEventListener('click', function() {
            togglePasswordVisibility(confirmPasswordInput, this);
        });
    }
});

// Function to toggle password visibility
function togglePasswordVisibility(inputField, iconElement) {
    const type = inputField.getAttribute('type') === 'password' ? 'text' : 'password';
    inputField.setAttribute('type', type);
    
    // Toggle eye icon
    if (type === 'password') {
        // Password is hidden - show eye-slash (crossed out)
        iconElement.classList.remove('fa-eye');
        iconElement.classList.add('fa-eye-slash');
    } else {
        // Password is visible - show open eye
        iconElement.classList.remove('fa-eye-slash');
        iconElement.classList.add('fa-eye');
    }
}

// Form validation functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

function validateForm(fullName, email, password, confirmPassword, role, termsAccepted) {
    const errors = [];

    if (!fullName.trim()) {
        errors.push("Full name is required.");
    }

    if (!validateEmail(email)) {
        errors.push("Please enter a valid email address.");
    }

    if (!validatePassword(password)) {
        errors.push("Password must be at least 8 characters with uppercase, lowercase, and number.");
    }

    if (password !== confirmPassword) {
        errors.push("Passwords do not match.");
    }

    if (!role) {
        errors.push("Please select a role.");
    }

    if (!termsAccepted) {
        errors.push("You must accept the Terms & Privacy Policy.");
    }

    return errors;
}

// Utility functions for showing messages
function showError(message) {
    removeExistingMessages();
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.display = 'block';
    errorDiv.textContent = message;
    
    const form = document.querySelector('.signup-form');
    form.parentNode.insertBefore(errorDiv, form);
    
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    }, 5000);
}

function showSuccess(message) {
    removeExistingMessages();
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.display = 'block';
    successDiv.textContent = message;
    
    const form = document.querySelector('.signup-form');
    form.parentNode.insertBefore(successDiv, form);
    
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.parentNode.removeChild(successDiv);
        }
    }, 5000);
}

function removeExistingMessages() {
    const existingMessages = document.querySelectorAll('.error-message, .success-message');
    existingMessages.forEach(msg => {
        if (msg.parentNode) {
            msg.parentNode.removeChild(msg);
        }
    });
}

// Event listener for form submission
const signupForm = document.querySelector('.signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Collect input values
        const fullName = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const roleElement = document.querySelector('input[name="role"]:checked');
        const role = roleElement ? roleElement.value : null;
        const termsAccepted = document.getElementById('terms').checked;
        const submitButton = e.target.querySelector('.submit-btn');

        // Validate form
        const errors = validateForm(fullName, email, password, confirmPassword, role, termsAccepted);
        
        if (errors.length > 0) {
            showError(errors.join(' '));
            return;
        }

        // Add loading state
        submitButton.classList.add('loading');
        submitButton.disabled = true;

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
                emailVerified: false
            });

            // Send email verification
            await sendEmailVerification(user);

            showSuccess("Signup successful! Please check your email for verification before logging in.");

            // Reset the form after successful signup
            setTimeout(() => {
                signupForm.reset();
                // Redirect to login page after successful signup
                window.location.href = "login.html";
            }, 2000);

        } catch (error) {
            console.error("Firebase Error:", error);
            let message = "";

            switch (error.code) {
                case "auth/email-already-in-use":
                    message = "An account with this email already exists. Please login instead.";
                    break;
                case "auth/weak-password":
                    message = "Password is too weak. Please choose a stronger password.";
                    break;
                case "auth/invalid-email":
                    message = "Invalid email address format.";
                    break;
                case "auth/operation-not-allowed":
                    message = "Email/password accounts are not enabled. Contact support.";
                    break;
                case "auth/network-request-failed":
                    message = "Network error. Please check your internet connection.";
                    break;
                default:
                    message = "Signup failed. Please try again.";
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

// Google Sign Up
const googleBtn = document.getElementById('google-btn');
if (googleBtn) {
    googleBtn.addEventListener('click', async function() {
        const provider = new GoogleAuthProvider();
        
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            
            // Check if user already exists in Firestore
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            
            if (!userDoc.exists()) {
                // New user - save basic info and redirect to role selection
                await setDoc(doc(db, 'users', user.uid), {
                    fullName: user.displayName || '',
                    email: user.email,
                    role: 'learner', // Default role for Google signup
                    createdAt: serverTimestamp(),
                    emailVerified: user.emailVerified,
                    authProvider: 'google'
                });
                
                showSuccess("Google signup successful! Redirecting to dashboard...");
                
                setTimeout(() => {
                    // Fixed redirect URL (was "leaner-dashboard.html")
                    window.location.href = "learner-dashboard.html";
                }, 2000);
            } else {
                // Existing user - redirect to appropriate dashboard based on role
                const userData = userDoc.data();
                showSuccess("Login successful! Redirecting...");
                
                setTimeout(() => {
                    // Redirect based on user role
                    if (userData.role === 'learner') {
                        window.location.href = "learner-dashboard.html";
                    } else if (userData.role === 'mentor') {
                        window.location.href = "mentor-dashboard.html";
                    } else if (userData.role === 'admin') {
                        window.location.href = "admin-dashboard.html";
                    } else {
                        window.location.href = "dashboard.html";
                    }
                }, 2000);
            }
            
        } catch (error) {
            console.error("Google Sign Up Error:", error);
            showError("Google signup failed. Please try again.");
        }
    });
}

// Form field validation and UX improvements
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            // Clear validation styling on input
            clearFieldValidation(this);
        });
    });
    
    // Real-time password match validation
    const confirmPasswordInput = document.getElementById('confirm-password');
    const passwordInput = document.getElementById('password');
    
    if (confirmPasswordInput && passwordInput) {
        confirmPasswordInput.addEventListener('input', function() {
            if (this.value && passwordInput.value) {
                if (this.value === passwordInput.value) {
                    showFieldSuccess(this);
                } else {
                    showFieldError(this, "Passwords do not match");
                }
            }
        });
    }
});

function validateField(field) {
    const isValid = field.checkValidity();
    
    if (!isValid) {
        showFieldError(field, field.validationMessage);
    } else {
        showFieldSuccess(field);
    }
}

function showFieldError(field, message) {
    field.style.borderColor = '#dc3545';
    const wrapper = field.closest('.input-container');
    if (wrapper) {
        const icon = wrapper.querySelector('i:not(.toggle-password)');
        if (icon) {
            icon.style.color = '#dc3545';
        }
    }
}

function showFieldSuccess(field) {
    field.style.borderColor = '#28a745';
    const wrapper = field.closest('.input-container');
    if (wrapper) {
        const icon = wrapper.querySelector('i:not(.toggle-password)');
        if (icon) {
            icon.style.color = '#28a745';
        }
    }
}

function clearFieldValidation(field) {
    field.style.borderColor = '';
    const wrapper = field.closest('.input-container');
    if (wrapper) {
        const icon = wrapper.querySelector('i:not(.toggle-password)');
        if (icon) {
            icon.style.color = '';
        }
    }
}
