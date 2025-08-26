// For Firebase 
const firebaseConfig = {
  apiKey: "AIzaSyDfRwl1po6DHQv1JZsdIH-o3YN9r6Vw1so",
  authDomain: "skillflex-1700b.firebaseapp.com",
  projectId: "skillflex-1700b",
  storageBucket: "skillflex-1700b.firebasestorage.app",
  messagingSenderId: "1062926529269",
  appId: "1:1062926529269:web:bb5a515fb9eddda1190bbc",
  measurementId: "G-879ZDDBYRY"
};

//Initialize firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

document.getElementById("googleBtn").addEventListener("click", ()=>{
  auth.signInWithPopup(provider)
  .then((result)=>{
    const user = result.user;
    alert("Logged in as: "+ user.displayName);

    window.location.href = "dashborad.html";
  })
  .catch((error)=>{
    console.error("Google Login error: ", error.message);
  });
});

//email and password login

document.querySelector("#log-btn").addEventListener("click", function(e){
  e.preventDefault();
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();

  if (!email || !password){
    alert("please fill in both email and password.");
    return;}

    if(!validateEmail(email)){
      alert("please enter a valid email address.");
      return;
    }

    //firebase sign-in with email/password
    auth.signInWithEmailAndPassword(email, password)
    .then((userCredential)=>{
      alert("Login successful!");
      window.location.href="dashboard.html" //go to dashboard
    })
    .catch((error)=>{
      console.error("google login error: "+ error);
      alert("Login failed: " + error.message);
    });
})

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

