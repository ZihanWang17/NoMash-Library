/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const { initializeApp } = require('firebase-admin/app');

initializeApp();

exports.capitalizeBookData = onDocumentCreated('books/{bookId}', async (event) => {
  const snap = event.data;
  const data = snap.data();
  const capitalizedData = {};

  for (const key in data) {
    if (typeof data[key] === 'string') {
      capitalizedData[key] = data[key].toUpperCase();
    } else {
      capitalizedData[key] = data[key];
    }
  }

  try {
    await snap.ref.update(capitalizedData);
    console.log(`Document ${snap.id} capitalized successfully.`);
  } catch (error) {
    console.error('Error capitalizing data:', error.message);
  }
});

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
