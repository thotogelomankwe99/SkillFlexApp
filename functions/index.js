const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// ⚡ Configure email transporter (use Gmail + App Password)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "thotogelomankwe@gmail.com",
    pass: "xpok zdhl usqd igvz", // not your Gmail password, use App password
  },
});

// 📩 Firestore Trigger
exports.sendApprovalEmail = functions.firestore
  .document("adminRequests/{requestId}")
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();

    // only fire when status changed to approved
    if (before.status !== "approved" && after.status === "approved") {
      const mailOptions = {
        from: '"SkillFlex Super Admin" <YOUR_GMAIL@gmail.com>',
        to: after.email,
        subject: "Admin Access Approved ✅",
        text: `Hello ${after.fullName}, your admin access has been approved! You can now log in.`,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log("✅ Email sent to:", after.email);
      } catch (err) {
        console.error("❌ Error sending email:", err);
      }
    }
  });
