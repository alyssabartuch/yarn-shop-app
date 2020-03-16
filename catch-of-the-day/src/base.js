import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCCkey_QM34Xuxft7bqsXBKB3EEE4Rb0jg",
    authDomain: "catch-of-the-day-abartuch.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-abartuch.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

// named export
export {firebaseApp};

// default export
export default base;
