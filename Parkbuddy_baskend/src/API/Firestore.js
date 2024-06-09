const admin = require('firebase-admin');
const credential = require('./parkbuddy-31f23-firebase-adminsdk-ko1uw-bcd6f5e2c0.json');

// Initialize Firestore client
admin.initializeApp({
  credential: admin.credential.cert(credential)
});

// Export the Firestore client instance
const db = admin.firestore();

module.exports = db;
