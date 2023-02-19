// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBJP81uQCQ18pfLgDB82EwRsPzb5KwptB0",
    authDomain: "integer-sub.firebaseapp.com",
    databaseURL: "https://integer-sub-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "integer-sub",
    storageBucket: "integer-sub.appspot.com",
    messagingSenderId: "573087509810",
    appId: "1:573087509810:web:30ab159d4f039cf7a17b2b",
    measurementId: "G-K2V9MS5GFS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import {getDatabase, set, ref} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

var db = getDatabase();
var tries = 1;
var score = 0;
var addends1 = 0;
var addends2 = 0;
var total = 0;
var fullname = "";
var section = "";

document.getElementById('startButton').addEventListener('click', startQuiz);
document.getElementById('submitButton').addEventListener('click', submitAnswer);

function startQuiz() {
    document.getElementById('answerField').removeAttribute('disabled');
    document.getElementById('answerField').value = '';
    document.getElementById('submitButton').removeAttribute('disabled');
    document.getElementById('startButton').setAttribute('disabled', true);

    if (tries == 1) {   
        document.getElementById('questionNo').textContent = '#' + tries;
        document.getElementById('startButton').innerText = 'Next Question';
        document.getElementById('submitButton').style.display = 'inline';
        document.getElementById('addends1').style.display = 'inline';
        document.getElementById('addends2').style.display = 'inline';
        document.getElementById('operation').style.display = 'inline';
        document.getElementById('horizontalLine').style.display = 'block';
        document.getElementById('answerField').style.display = 'inline';
        document.getElementById('answerField').style.textAlign = 'center';
        document.getElementById('fullname').style.display = 'none';
        document.getElementById('section').style.display = 'none';
        fullname = document.getElementById('fullname').value;
        section = document.getElementById('section').value;
    }

    addends1 = Math.floor(Math.random() * (10 + 10)) - 10;
    addends2 = Math.floor(Math.random() * (10 + 10)) - 10;
    
    document.getElementById('addends1').textContent = addends1 < 0 ? addends1 : "+" + addends1;
    document.getElementById('addends2').textContent = addends2 < 0 ? addends2 : "+" + addends2;
}

function submitAnswer() {
    document.getElementById('submitButton').setAttribute('disabled', true);
    document.getElementById('correctText').style.display = 'block';
    document.getElementById('correctText').style.fontWeight = 'bold';
    document.getElementById('startButton').removeAttribute('disabled');
    document.getElementById('questionNo').textContent = '#' + tries;

    let submittedAnswer = document.getElementById('answerField').value;
    total = addends1 - addends2;

    if (submittedAnswer == total) {
        score++
        document.getElementById('answerField').value = submittedAnswer;
        document.getElementById('correctText').textContent = 'Correct answer: ' + total;
        document.getElementById('answerField').setAttribute('disabled', true);
    } else {
        document.getElementById('answerField').value = submittedAnswer;
        document.getElementById('correctText').textContent = 'Correct answer: ' + total;
        document.getElementById('answerField').setAttribute('disabled', true);
    }

    tries++;
    document.getElementById('score').textContent = score + '/10';

    if (tries == 11) {
        document.getElementById('startButton').setAttribute('disabled', true);
        document.getElementById('answerField').setAttribute('disabled', true);
        document.getElementById('startButton').setAttribute('disabled', true);
        
        insertDB();

        Swal.fire({
            title: 'Do you want to try again?',
            text: 'Your score is ' + score + '/10',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            allowOutsideClick: false
          }).then((result) => {
            if (result.isConfirmed) {
                tries = 1;
                score = 0;
                addends1 = 0;
                addends2 = 0;
                total = 0;
                startQuiz();
            }
          });
    }
}

function insertDB() {
    set(ref(db, "Students/" + fullname), {
        Section: section,
        Score: score
    })
    .then(() => {
        console.log("successfully submitted");
    })
    .catch((error) => {
        console.log("not inserted" + error);
    });
}
