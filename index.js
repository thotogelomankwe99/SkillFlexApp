const admin = require("firebase-admin");
const express = require("express");
const app = express();

app.use(express.json());

//Initialize Firebase Admin 
const serviceAccount =require("skillflex-1700b-firebase-adminsdk-fbsvc-541800fc47.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

//start server
app.listen(3000, () => console.log("Server started on port 3000"))