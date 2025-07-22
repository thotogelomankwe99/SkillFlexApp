//SkillFlexApp's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyBh4dUfZ8m61xsqa0qhG3aFguVZ4Gm2KCQ",
      authDomain: "skillflexapp.firebaseapp.com",
      projectId: "skillflexapp",
      storageBucket: "skillflexapp.firebasestorage.app",
      messagingSenderId: "827795374450",
      appId: "1:827795374450:web:4f64fa1bb85c158badddeb",
      measurementId: "G-PJ701TTVZJ"
    };

    //Firebase initialization
    firebase.initializeApp(firebaseConfig);

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
