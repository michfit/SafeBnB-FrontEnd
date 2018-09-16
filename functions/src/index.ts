import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
admin.initializeApp();
export const addVote = functions.https.onCall((data, context) => {
  return admin.database().ref('/votes/').child(data.id).push({'test': 'ok'});
});
