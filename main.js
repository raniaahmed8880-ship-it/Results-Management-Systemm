
// 1. Student Class & Encapsulation

class Student {

    // Private Fields
    #grade1;
    #grade2;
    #grade3;
    #attendance;

    constructor(name, grade1, grade2, grade3, attendance) {

        this.name = name.trim();

        if (!this.name) {
            throw new Error("Please enter the student name.");
        }

        this.grade1 = grade1;
        this.grade2 = grade2;
        this.grade3 = grade3;
        this.attendance = attendance;
    }

    // Setter for Grade 1
    set grade1(value) {

        if (value === "" || value === null || value === undefined) {
            throw new Error("Grade 1 cannot be empty.");
        }

        const grade = Number(value);

        if (!Number.isFinite(grade) || grade < 0 || grade > 100) {
            throw new Error("Grade 1 must be between 0 and 100.");
        }

        this.#grade1 = grade;
    }

    // Getter for Grade 1
    get grade1() {
        return this.#grade1;
    }

    // Setter for Grade 2
    set grade2(value) {

        if (value === "" || value === null || value === undefined) {
            throw new Error("Grade 2 cannot be empty.");
        }

        const grade = Number(value);

        if (!Number.isFinite(grade) || grade < 0 || grade > 100) {
            throw new Error("Grade 2 must be between 0 and 100.");
        }

        this.#grade2 = grade;
    }

    // Getter for Grade 2
    get grade2() {
        return this.#grade2;
    }

    // Setter for Grade 3
    set grade3(value) {

        if (value === "" || value === null || value === undefined) {
            throw new Error("Grade 3 cannot be empty.");
        }

        const grade = Number(value);

        if (!Number.isFinite(grade) || grade < 0 || grade > 100) {
            throw new Error("Grade 3 must be between 0 and 100.");
        }

        this.#grade3 = grade;
    }

    // Getter for Grade 3
    get grade3() {
        return this.#grade3;
    }

    // Setter for Attendance
    set attendance(value) {

        if (value === "" || value === null || value === undefined) {
            throw new Error("Attendance cannot be empty.");
        }

        const percentage = Number(value);

        if (
            !Number.isFinite(percentage) ||
            percentage < 0 ||
            percentage > 100
        ) {
            throw new Error("Attendance must be between 0 and 100.");
        }

        this.#attendance = percentage;
    }

    // Getter for Attendance
    get attendance() {
        return this.#attendance;
    }

    // Calculate Student Average
    get average() {
        return (this.#grade1 + this.#grade2 + this.#grade3) / 3;
    }
}



// 2. Students Arra

const studentsList = [];



// 3. Get HTML Elements

// Input Fields
const studentNameInput = document.getElementById("studentName");

const grade1Input = document.getElementById("grade1");

const grade2Input = document.getElementById("grade2");

const grade3Input = document.getElementById("grade3");

const attendanceInput = document.getElementById("attendance");

// Buttons
const studentForm = document.getElementById("studentForm");

const mercyBtn = document.getElementById("mercyBtn");

// Display Areas
const errorBox = document.getElementById("errorBox");

const studentsDisplay = document.getElementById("studentsList");

const studentCount = document.getElementById("studentCount");

const reportBox = document.getElementById("reportBox");

// 4. Add New Student

studentForm.addEventListener("submit", function(event) {

    event.preventDefault();

    // Hide previous error
    errorBox.style.display = "none";
    errorBox.textContent = "";

    try {

        // Get values rom inputs
        const name = studentNameInput.value;

        const grade1 = grade1Input.value;

        const grade2 = grade2Input.value;

        const grade3 = grade3Input.value;

        const attendance = attendanceInput.value;


        // Create new Student Object
        const student = new Student(
            name,
            grade1,
            grade2,
            grade3,
            attendance
        );


        // Add student to array
        studentsList.push(student);


        // Update students display
        displayStudents();


        // Clear input fields
        studentForm.reset();


        // Update count
        studentCount.textContent = studentsList.length;


        // Clear old report
        reportBox.innerHTML = `
            <p class="empty-message">
                A new student was added.
                Activate the committee to generate a new report.
            </p>
        `;

    }

    catch(error) {

        // Display error on screen
        errorBox.textContent = error.message;

        errorBox.style.display = "block";

    }

});



// 5. Display Students Function


function displayStudents() {

    if (studentsList.length === 0) {

        studentsDisplay.innerHTML = `
            <p class="empty-message">
                No students added yet.
            </p>
        `;

        return;
    }

    studentsDisplay.innerHTML = studentsList.map((student, index) => `

        <div class="student-item">

            <div class="student-name">
                ${index + 1}. ${escapeHTML(student.name)}
            </div>

            <div class="student-details">

                Grade 1: ${student.grade1} |

                Grade 2: ${student.grade2} |

                Grade 3: ${student.grade3}

                <br>

                Attendance: ${student.attendance}%

                <br>

                Average:
                ${student.average.toFixed(2)}

            </div>

        </div>

    `).join("");

}

// 6. Protect Names in HTML

function escapeHTML(value) {

    return String(value).replace(/[&<>"']/g, function(character) {

        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return entities[character];

    });

}

// 7. Mercy Committee

mercyBtn.addEventListener("click", function() {

    // Check if there are students
    if (studentsList.length === 0) {

        reportBox.innerHTML = `
            <p class="empty-message">
                Please add students before activating the committee.
            </p>
        `;

        return;
    }


    // Filter students with average between 40 and 49
    const strugglingStudents = studentsList.filter(student => {

        return student.average >= 40 && student.average <= 49;

    });


    // Check if there are struggling students
    if (strugglingStudents.length === 0) {

        reportBox.innerHTML = `
            <div class="text-center">

                <h5 class="text-success">
                    No Struggling Students!
                </h5>

                <p class="empty-message">
                    There are no students with an average
                    between 40 and 49.
                </p>

            </div>
        `;

        return;
    }


    // Map: Add 5 mercy marks to each average
    const updatedStudents = strugglingStudents.map(student => {

        return {

            name: student.name,

            oldAverage: student.average,

            newAverage: student.average + 5

        };

    });


    // Reduce: Calculate total new averages
    const totalAverage = updatedStudents.reduce((total, student) => {

        return total + student.newAverage;

    }, 0);


    // Calculate general average
    const generalAverage = totalAverage / updatedStudents.length;


    // Display Final Report
    reportBox.innerHTML = `

        <div class="report-stat">

            <p>Number of Struggling Students:</p>

            <strong>${updatedStudents.length}</strong>

        </div>


        <h5 class="mb-3" style="color: #E6C8FF;">
            Students After Mercy Marks
        </h5>


        ${updatedStudents.map((student, index) => `

            <div class="report-name">

                <strong>
                    ${index + 1}. ${escapeHTML(student.name)}
                </strong>

                <div class="student-details">

                    Old Average:
                    ${student.oldAverage.toFixed(2)}

                    <br>

                    New Average:

                    <span class="report-average">
                        ${student.newAverage.toFixed(2)}
                    </span>

                </div>

            </div>

        `).join("")}


        <div class="report-stat mt-3">

            <p>General Average After Mercy Marks:</p>

            <strong>
                ${generalAverage.toFixed(2)}
            </strong>

        </div>

        <p class="text-center mt-3" style="color: #D6B86A;">

            ⭐ Mercy Committee Completed Successfully!

        </p>

    `;

});