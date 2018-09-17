import firebase from 'firebase';
import { rejects } from 'assert';
import { CssBaseline } from '@material-ui/core';


var config = {
    apiKey: "AIzaSyBNS108MYhYUouPdv9GKJsC8tpIK_Tzeuk",
    authDomain: "firestorepro1.firebaseapp.com",
    databaseURL: "https://firestorepro1.firebaseio.com",
    projectId: "firestorepro1",
    storageBucket: "firestorepro1.appspot.com",
    messagingSenderId: "33114311914"
};
firebase.initializeApp(config);

const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);

const auth = firebase.auth();

const checkUser = () => {
    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                resolve(user)
            } else {
                reject("no user!")
            }
        })
    })
}

const login = (email, password) => {
    return new Promise((resolve, reject) => {
        auth.signInWithEmailAndPassword(email, password)
            .then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
    })
}

const register = (userInfo) => {
    const { email, password, name } = userInfo
    return new Promise((resolve, reject) => {
        auth.createUserWithEmailAndPassword(email, password)
            .then((res) => {
                return firestore.collection('users').doc(res.user.uid)
            }).then((userRes) => {
                resolve(userRes)
            }).catch(err => {
                reject(err)
            })
    })
}

const getQuiz = (quizName, no) => {
    var type
    switch (quizName) {
        case "htmlQuiz":
            type = "html"
            break;
        case "cssQuiz":
            type = "css"
            break;
        case "jsQuiz":
            type = "javascript"
            break;
    }

    return new Promise((resolve, reject) => {
        firestore.collection('quizes')
            .doc(type)
            .collection(quizName)
            .doc(no)
            .get()
            .then((res) => {
                resolve(res.data())
            })
            .catch((err) => {
                reject(err)
            })
    })


}


export default { login, register, checkUser, getQuiz }