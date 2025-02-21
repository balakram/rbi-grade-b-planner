import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/*// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_KEY",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};*/


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0yoFPmZlVY4CglR6n_pUpdPhxrhf_GBU",
  authDomain: "rbi-planner.firebaseapp.com",
  projectId: "rbi-planner",
  storageBucket: "rbi-planner.firebasestorage.app",
  messagingSenderId: "417712683519",
  appId: "1:417712683519:web:a5a553377f5216b7bf4fca",
  measurementId: "G-WLDC66LLS7"
};

  // Add Task Function
  window.addTask = function() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();
    if (taskText) {
      const task = { title: taskText, completed: false };
      db.collection('tasks').add(task); // Save to Firestore
      taskInput.value = ''; // Clear input
    }
  };


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// OpenAI Configuration
const openai = new OpenAI({
    apiKey: "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",
    dangerouslyAllowBrowser: true
});

// Core Functions
class RBIPlanner {
    constructor() {
        this.tasks = [];
        this.init();
    }

    async init() {
        this.loadTasks();
        this.initVoiceControl();
        this.initTheme();
    }

    async loadTasks() {
        const snapshot = await db.collection('tasks').get();
        this.tasks = snapshot.docs.map(doc => doc.data());
        this.renderTasks();
    }

    renderTasks() {
        const tasksContainer = document.getElementById('tasks');
        tasksContainer.innerHTML = this.tasks.map(task => `
            <div class="task">
                <input type="checkbox" ${task.completed ? 'checked' : ''}>
                <span>${task.title}</span>
            </div>
        `).join('');
    }
}

// Initialize App
const planner = new RBIPlanner();

// Full JS implementation available in GitHub repo

