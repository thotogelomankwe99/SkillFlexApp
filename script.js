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
