const firebase = require('firebase');
require('dotenv/config');


const app = firebase.initializeApp({
    apiKey: process.env.GOOGLE_APIKEY,
    authDomain: process.env.GOOGLE_AUTHDOMAIN,
    databaseURL: process.env.GOOGLE_DATABASEURL,
    projectId: process.env.GOOGLE_PROJECTID,
    storageBucket: process.env.GOOGLE_STORAGEBUCKET,
    messagingSenderId: process.env.GOOGLE_MESSAGINGSENDERID,
    appId: process.env.GOOGLE_APPID,
    measurementId: process.env.GOOGLE_MEASUREMENTID
})

module.exports = app;