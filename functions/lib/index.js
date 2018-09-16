"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const functions = require("firebase-functions");
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
admin.initializeApp();
exports.addVote = functions.https.onCall((data, context) => {
    return admin.database().ref('/votes/').child(data.id).push({ 'test': 'ok' });
});
//# sourceMappingURL=index.js.map