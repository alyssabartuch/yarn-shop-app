import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBGhtC4H21i1cIWmntRp4KFJfX2u-g5CdU",
    authDomain: "yarn-shop-app.firebaseapp.com",
    databaseURL: "https://yarn-shop-app.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

// named export
export {firebaseApp};

// default export
export default base;
