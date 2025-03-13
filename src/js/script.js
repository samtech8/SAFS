// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDxQtWWfLAPJaVSHeCjj3Y4J7RICpUXPSs",
    authDomain: "attendance-35ef7.firebaseapp.com",
    databaseURL: "https://attendance-35ef7-default-rtdb.firebaseio.com",
    projectId: "attendance-35ef7",
    storageBucket: "attendance-35ef7.appspot.com",
    messagingSenderId: "816603887202",
    appId: "1:816603887202:web:94bc2b8aed6defc677c33b",
    measurementId: "G-M3HX1MS57E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Ensure DOM is fully loaded before adding event listeners
document.addEventListener("DOMContentLoaded", () => {
    // Handle Attendance Form Submission
    const attendanceForm = document.getElementById("attendanceForm");
    const submitButton = attendanceForm.querySelector("button[type='submit']");

    if (attendanceForm) {
        attendanceForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            // Change button text to "Adding..."
            submitButton.textContent = "Adding...";
            submitButton.disabled = true;

            const name = document.getElementById("name").value;
            const matric_number = document.getElementById("matric_number").value;
            const faculty = document.getElementById("faculty").value;
            const course_code = document.getElementById("course_code").value;
            const course_title = document.getElementById("course_title").value;
            const seat_roll = document.getElementById("seat_roll").value;

            const studentData = {
                name,
                matric_number,
                faculty,
                course_code,
                course_title,
                seat_roll,
                timestamp: new Date().toISOString(),
            };

            try {
                // Push data to Firebase Realtime Database
                const attendanceRef = ref(db, "attendance");
                const newAttendanceRef = await push(attendanceRef, studentData);

                console.log("Response:", newAttendanceRef);
                console.log("Submitted Data:", studentData);

                // Alert success
                alert("Attendance submitted successfully!");

                // Reset form
                attendanceForm.reset();
            } catch (error) {
                console.error("Error adding document:", error);
                alert("Error submitting attendance. Please try again.");
            } finally {
                // Restore button text
                submitButton.textContent = "Submit";
                submitButton.disabled = false;
            }
        });
    }
});
