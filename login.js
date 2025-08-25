import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();

document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
        // 1️⃣ Sign in the user
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 2️⃣ Get user role from Firestore
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            const role = userData.role; // stored as "learner" or "mentor"

            // 3️⃣ Redirect based on role
            if (role === "learner") {
                window.location.href = "/learner-dashboard.html";
            } else if (role === "mentor") {
                window.location.href = "/mentor-dashboard.html";
            } else {
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
