import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA0yoFPmZlVY4CglR6n_pUpdPhxrhf_GBU",
  authDomain: "rbi-planner.firebaseapp.com",
  projectId: "rbi-planner",
  storageBucket: "rbi-planner.firebasestorage.app",
  messagingSenderId: "417712683519",
  appId: "1:417712683519:web:a5a553377f5216b7bf4fca",
  measurementId: "G-WLDC66LLS7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Global functions
window.addTask = async () => {
  const taskInput = document.getElementById('task-input');
  const taskText = taskInput.value.trim();
  
  if (taskText) {
    try {
      await addDoc(collection(db, "tasks"), {
        text: taskText,
        completed: false,
        createdAt: new Date()
      });
      taskInput.value = "";
      loadTasks();
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  }
};

// Load tasks from Firestore
const loadTasks = async () => {
  const querySnapshot = await getDocs(collection(db, "tasks"));
  const tasksContainer = document.getElementById('tasks');
  tasksContainer.innerHTML = "";
  
  querySnapshot.forEach((doc) => {
    const task = doc.data();
    const taskElement = document.createElement('div');
    taskElement.className = 'task';
    taskElement.innerHTML = `
      <input type="checkbox" ${task.completed ? "checked" : ""}>
      <span>${task.text}</span>
    `;
    tasksContainer.appendChild(taskElement);
  });
};

// Initialize
loadTasks();
