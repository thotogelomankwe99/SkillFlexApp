//get references
const loginBtn = document.querySelector('#log-btn a');
const emailInput = document.querySelector('#email');
const passwordInput =document.querySelector('#password');

// Prevent default <a> click
loginBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    alert("Please fill in both email and password.");
    return;
  }

  if (!validateEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Simulated login success
  alert("Login successful!");
  window.location.href = "dashboard.html"; // Change to dashboard page
});

// Simple email validation
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}