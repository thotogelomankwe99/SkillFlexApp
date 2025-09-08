
/*require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const serviceAccount = require('./firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();

app.use(cors());               // allow cross-origin calls (use a more restrictive policy in production)
app.use(express.json());       // built-in body parser
app.use(express.static(path.join(__dirname, 'public'))); // serve admin-dashboard.html from /public

// Nodemailer setup (use app password for Gmail)
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// helper to convert Firestore Timestamp to ISO
function toISO(ts) {
  try {
    return ts && typeof ts.toDate === 'function' ? ts.toDate().toISOString() : ts || null;
  } catch {
    return null;
  }
}

// Create admin request handler (used by both singular/plural endpoints)
async function handleCreateAdminRequest(req, res) {
  const { fullName, email, reason } = req.body;
  if (!fullName || !email || !reason) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  try {
    const docRef = await db.collection('adminRequests').add({
      fullName,
      email,
      reason,
      status: 'pending',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    return res.json({ message: 'Request submitted', id: docRef.id });
  } catch (err) {
    console.error('create request error', err);
    return res.status(500).json({ message: 'Error submitting request' });
  }
}

// Accept both routes for creating request
app.post('/api/admin-request', handleCreateAdminRequest);
app.post('/api/admin-requests', handleCreateAdminRequest);

// Get all admin requests (optionally filter ?status=pending)
app.get('/api/admin-requests', async (req, res) => {
  try {
    const { status } = req.query;
    let q = db.collection('adminRequests');
    if (status) q = q.where('status', '==', status);
    q = q.orderBy('createdAt', 'desc');
    const snapshot = await q.get();
    const requests = snapshot.docs.map(doc => {
      const d = doc.data();
      return {
        id: doc.id,
        fullName: d.fullName,
        email: d.email,
        reason: d.reason,
        status: d.status,
        accessCode: d.accessCode || null,
        createdAt: toISO(d.createdAt),
        approvedAt: toISO(d.approvedAt),
        rejectedAt: toISO(d.rejectedAt),
      };
    });
    res.json(requests);
  } catch (err) {
    console.error('fetch requests error', err);
    res.status(500).json({ message: 'Error fetching requests' });
  }
});

// Get single admin request
app.get('/api/admin-requests/:id', async (req, res) => {
  try {
    const doc = await db.collection('adminRequests').doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ message: 'Request not found' });
    const d = doc.data();
    return res.json({
      id: doc.id,
      ...d,
      createdAt: toISO(d.createdAt),
      approvedAt: toISO(d.approvedAt),
      rejectedAt: toISO(d.rejectedAt),
    });
  } catch (err) {
    console.error('get single request error', err);
    res.status(500).json({ message: 'Error fetching request' });
  }
});

// Approve endpoint
app.post('/api/admin-requests/:id/approve', async (req, res) => {
  const { id } = req.params;
  try {
    const docRef = db.collection('adminRequests').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) return res.status(404).json({ message: 'Request not found' });

    const data = doc.data();
    if (data.status === 'approved') return res.status(400).json({ message: 'Request already approved' });

    const accessCode = Math.floor(100000 + Math.random() * 900000).toString();

    await docRef.update({
      status: 'approved',
      accessCode,
      approvedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // send approval email (best effort)
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: data.email,
        subject: 'SkillFlex Admin Access Approved',
        text: `Your admin access has been approved. Access code: ${accessCode}`,
      });
      return res.json({ message: 'Request approved and email sent' });
    } catch (mailErr) {
      console.error('approval email error', mailErr);
      return res.json({ message: 'Request approved but email failed to send' });
    }
  } catch (err) {
    console.error('approve error', err);
    res.status(500).json({ message: 'Error approving request' });
  }
});

// Reject endpoint
app.post('/api/admin-requests/:id/reject', async (req, res) => {
  const { id } = req.params;
  try {
    const docRef = db.collection('adminRequests').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) return res.status(404).json({ message: 'Request not found' });

    const data = doc.data();
    if (data.status === 'rejected') return res.status(400).json({ message: 'Request already rejected' });

    await docRef.update({
      status: 'rejected',
      rejectedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // optionally, you could send a rejection email here
    return res.json({ message: 'Request rejected' });
  } catch (err) {
    console.error('reject error', err);
    res.status(500).json({ message: 'Error rejecting request' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));*/

/*require('dotenv').config();
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

// 🔑 Initialize Firebase Admin from ENV variable
if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  console.error("Missing FIREBASE_SERVICE_ACCOUNT env variable!");
  process.exit(1);
}

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// 📧 Nodemailer setup (Gmail App Password)
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// helper: convert Firestore Timestamp to ISO
function toISO(ts) {
  try {
    return ts && typeof ts.toDate === 'function' ? ts.toDate().toISOString() : ts || null;
  } catch {
    return null;
  }
}

// ---------------- Routes ------------------

// Create admin request
app.post('/api/admin-request', async (req, res) => {
  const { fullName, email, reason } = req.body;
  if (!fullName || !email || !reason) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const docRef = await db.collection('adminRequests').add({
      fullName,
      email,
      reason,
      status: 'pending',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.json({ message: 'Request submitted', id: docRef.id });
  } catch (err) {
    console.error('create request error', err);
    res.status(500).json({ message: 'Error submitting request' });
  }
});

// Get all admin requests (optional filter ?status=pending)
app.get('/api/admin-requests', async (req, res) => {
  try {
    const { status } = req.query;
    let q = db.collection('adminRequests');
    if (status) q = q.where('status', '==', status);
    q = q.orderBy('createdAt', 'desc');
    const snapshot = await q.get();
    const requests = snapshot.docs.map(doc => {
      const d = doc.data();
      return {
        id: doc.id,
        fullName: d.fullName,
        email: d.email,
        reason: d.reason,
        status: d.status,
        accessCode: d.accessCode || null,
        createdAt: toISO(d.createdAt),
        approvedAt: toISO(d.approvedAt),
        rejectedAt: toISO(d.rejectedAt),
      };
    });
    res.json(requests);
  } catch (err) {
    console.error('fetch requests error', err);
    res.status(500).json({ message: 'Error fetching requests' });
  }
});

// Approve request
app.post('/api/admin-requests/:id/approve', async (req, res) => {
  const { id } = req.params;
  try {
    const docRef = db.collection('adminRequests').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) return res.status(404).json({ message: 'Request not found' });

    const data = doc.data();
    if (data.status === 'approved') return res.status(400).json({ message: 'Request already approved' });

    const accessCode = Math.floor(100000 + Math.random() * 900000).toString();

    await docRef.update({
      status: 'approved',
      accessCode,
      approvedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // send approval email
    try {
      await transporter.sendMail({
        from: `"SkillFlex Super Admin" <${process.env.EMAIL_USER}>`,
        to: data.email,
        subject: "Admin Access Approved ✅",
        text: `Hello ${data.fullName},\n\nYour admin access has been approved!\nAccess Code: ${accessCode}\n\nPlease log in to your dashboard.`,
      });
      console.log(`Approval email sent to ${data.email}`);
    } catch (err) {
      console.error("Error sending approval email:", err);
    }

    res.json({ message: 'Request approved', accessCode });
  } catch (err) {
    console.error('approve request error', err);
    res.status(500).json({ message: 'Error approving request' });
  }
});

// Reject request
app.post('/api/admin-requests/:id/reject', async (req, res) => {
  const { id } = req.params;
  try {
    const docRef = db.collection('adminRequests').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) return res.status(404).json({ message: 'Request not found' });

    await docRef.update({
      status: 'rejected',
      rejectedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.json({ message: 'Request rejected' });
  } catch (err) {
    console.error('reject request error', err);
    res.status(500).json({ message: 'Error rejecting request' });
  }
});

// ---------------- Start Server ------------------
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));*/


/*require('dotenv').config();
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

// ---------------- Firebase Admin Setup ------------------
if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
  console.error("Missing Firebase environment variables! Make sure FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY are set.");
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
});

const db = admin.firestore();
console.log('Firebase Admin Initialized!');

// ---------------- Nodemailer Setup ------------------
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ---------------- Helpers ------------------
function toISO(ts) {
  try {
    return ts && typeof ts.toDate === 'function' ? ts.toDate().toISOString() : ts || null;
  } catch {
    return null;
  }
}

// ---------------- Routes ------------------

// Approve request
app.post('/api/admin-requests/:id/approve', async (req, res) => {
  const { id } = req.params;
  try {
    const docRef = db.collection('adminRequests').doc(id);
    const docSnap = await docRef.get();
    if (!docSnap.exists) return res.status(404).json({ message: 'Request not found' });

    const data = docSnap.data();
    if (data.status === 'approved') return res.status(400).json({ message: 'Request already approved' });

    const accessCode = Math.floor(100000 + Math.random() * 900000).toString();

    await docRef.update({
      status: 'approved',
      accessCode,
      approvedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // send approval email
    await transporter.sendMail({
      from: `"SkillFlex Super Admin" <${process.env.EMAIL_USER}>`,
      to: data.email,
      subject: "Admin Access Approved ✅",
      text: `Hello ${data.fullName},\n\nYour admin access has been approved!\nAccess Code: ${accessCode}\n\nPlease log in to your dashboard.`,
    });

    res.json({ message: 'Request approved', accessCode });
  } catch (err) {
    console.error('approve request error', err);
    res.status(500).json({ message: 'Error approving request' });
  }
});

// Reject request
app.post('/api/admin-requests/:id/reject', async (req, res) => {
  const { id } = req.params;
  try {
    const docRef = db.collection('adminRequests').doc(id);
    const docSnap = await docRef.get();
    if (!docSnap.exists) return res.status(404).json({ message: 'Request not found' });

    await docRef.update({
      status: 'rejected',
      rejectedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.json({ message: 'Request rejected' });
  } catch (err) {
    console.error('reject request error', err);
    res.status(500).json({ message: 'Error rejecting request' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));*/





require('dotenv').config();
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

// ---------------- Firebase Admin Setup ------------------
try {
  const serviceAccount = require('./firebase-service-account.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log('Firebase Admin Initialized successfully!');
} catch (error) {
  console.error("Error initializing Firebase:", error);
  process.exit(1);
}

const db = admin.firestore();

// ---------------- Nodemailer Setup ------------------
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify transporter connection
transporter.verify((error, success) => {
  if (error) {
    console.error('Email transporter error:', error);
  } else {
    console.log('Email transporter is ready to send messages');
  }
});

// ---------------- Helpers ------------------
function toISO(ts) {
  try {
    return ts && typeof ts.toDate === 'function' ? ts.toDate().toISOString() : ts || null;
  } catch {
    return null;
  }
}

// ---------------- Routes ------------------

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Create admin request
app.post('/api/admin-request', async (req, res) => {
  const { fullName, email, reason } = req.body;
  if (!fullName || !email || !reason) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const docRef = await db.collection('adminRequests').add({
      fullName,
      email,
      reason,
      status: 'pending',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    console.log(`New admin request created: ${docRef.id}`);
    res.json({ message: 'Request submitted', id: docRef.id });
  } catch (err) {
    console.error('Create request error:', err);
    res.status(500).json({ message: 'Error submitting request' });
  }
});

// Get all admin requests (optional filter ?status=pending)
app.get('/api/admin-requests', async (req, res) => {
  try {
    const { status } = req.query;
    let q = db.collection('adminRequests');
    if (status) q = q.where('status', '==', status);
    q = q.orderBy('createdAt', 'desc');
    const snapshot = await q.get();
    
    const requests = snapshot.docs.map(doc => {
      const d = doc.data();
      return {
        id: doc.id,
        fullName: d.fullName,
        email: d.email,
        reason: d.reason,
        status: d.status,
        accessCode: d.accessCode || null,
        createdAt: toISO(d.createdAt),
        approvedAt: toISO(d.approvedAt),
        rejectedAt: toISO(d.rejectedAt),
      };
    });
    
    res.json(requests);
  } catch (err) {
    console.error('Fetch requests error:', err);
    res.status(500).json({ message: 'Error fetching requests' });
  }
});

// Get single admin request
app.get('/api/admin-requests/:id', async (req, res) => {
  try {
    const doc = await db.collection('adminRequests').doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ message: 'Request not found' });
    
    const d = doc.data();
    res.json({
      id: doc.id,
      fullName: d.fullName,
      email: d.email,
      reason: d.reason,
      status: d.status,
      accessCode: d.accessCode || null,
      createdAt: toISO(d.createdAt),
      approvedAt: toISO(d.approvedAt),
      rejectedAt: toISO(d.rejectedAt),
    });
  } catch (err) {
    console.error('Get single request error:', err);
    res.status(500).json({ message: 'Error fetching request' });
  }
});

// Approve request
app.post('/api/admin-requests/:id/approve', async (req, res) => {
  const { id } = req.params;
  try {
    const docRef = db.collection('adminRequests').doc(id);
    const docSnap = await docRef.get();
    
    if (!docSnap.exists) {
      return res.status(404).json({ message: 'Request not found' });
    }

    const data = docSnap.data();
    if (data.status === 'approved') {
      return res.status(400).json({ message: 'Request already approved' });
    }

    const accessCode = Math.floor(100000 + Math.random() * 900000).toString();

    await docRef.update({
      status: 'approved',
      accessCode,
      approvedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log(`Request ${id} approved with access code: ${accessCode}`);

    // Send approval email
    try {
      await transporter.sendMail({
        from: `"SkillFlex Super Admin" <${process.env.EMAIL_USER}>`,
        to: data.email,
        subject: "Admin Access Approved ✅",
        text: `Hello ${data.fullName},\n\nYour admin access has been approved!\nAccess Code: ${accessCode}\n\nPlease log in to your dashboard.`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Admin Access Approved ✅</h2>
            <p>Hello ${data.fullName},</p>
            <p>Your admin access has been approved!</p>
            <p><strong>Access Code:</strong> ${accessCode}</p>
            <p>Please log in to your dashboard using this code.</p>
            <br>
            <p>Best regards,<br>SkillFlex Team</p>
          </div>
        `
      });
      console.log(`Approval email sent to ${data.email}`);
    } catch (mailErr) {
      console.error("Error sending approval email:", mailErr);
    }

    res.json({ message: 'Request approved', accessCode });
  } catch (err) {
    console.error('Approve request error:', err);
    res.status(500).json({ message: 'Error approving request' });
  }
});

// Reject request
app.post('/api/admin-requests/:id/reject', async (req, res) => {
  const { id } = req.params;
  try {
    const docRef = db.collection('adminRequests').doc(id);
    const docSnap = await docRef.get();
    
    if (!docSnap.exists) {
      return res.status(404).json({ message: 'Request not found' });
    }

    const data = docSnap.data();
    if (data.status === 'rejected') {
      return res.status(400).json({ message: 'Request already rejected' });
    }

    await docRef.update({
      status: 'rejected',
      rejectedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log(`Request ${id} rejected`);

    res.json({ message: 'Request rejected' });
  } catch (err) {
    console.error('Reject request error:', err);
    res.status(500).json({ message: 'Error rejecting request' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// 404 handler - fixed this route
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check available at: http://localhost:${PORT}/api/health`);
});