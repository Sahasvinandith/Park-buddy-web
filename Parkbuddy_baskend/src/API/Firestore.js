const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

const serviceAccount = require('./parkbuddy-31f23-firebase-adminsdk-ko1uw-802ede878b.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

module.exports = db;