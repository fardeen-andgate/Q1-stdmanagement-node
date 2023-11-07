#! /usr/bin/env node
import inquirer from "inquirer";
import { faker } from "@faker-js/faker/locale/af_ZA";
import { Student, Instructor, Course, Management } from "./classes/class.js";
import { availableCourses } from "./coursedata/coursedata.js";
import Welcome from "./clidesign/design.js";
let application = new Management();
for (let i = 1; i <= 20; i++) {
    let sName = faker.person.fullName();
    let age = faker.number.int({ min: 16, max: 25 });
    const stud = new Student(sName, age);
    application.addStudents(stud);
}
for (let i = 1; i <= 10; i++) {
    let tName = faker.person.fullName();
    let age = faker.number.int({ min: 35, max: 75 });
    let salary = parseInt(faker.finance.amount({ min: 40000, max: 100000 }));
    const teach = new Instructor(salary, tName, age);
    application.addInstructor(teach);
}
Welcome();
async function studentManagement(system) {
    let service = await inquirer.prompt([
        {
            name: "select",
            type: "list",
            message: "Select Service",
            choices: ["Student", "Instructor"],
        },
    ]);
    let instructor;
    let selectedStudent;
    if (service.select === "Student") {
        let login = await inquirer.prompt([
            {
                name: "userId",
                type: "input",
                message: "Enter Your Student ID",
            },
        ]);
        selectedStudent = system.student.find((s) => s.rollNumber === login.userId);
        if (selectedStudent) {
            console.log("Welcome, " + selectedStudent.getName());
            const studentOptions = await inquirer.prompt([
                {
                    name: "action",
                    type: "list",
                    message: "Select an action",
                    choices: ["Register for Courses", "View Profile", "Exit"],
                },
            ]);
            if (studentOptions.action === "Register for Courses") {
                const selectedCourses = await inquirer.prompt([
                    {
                        name: "courses",
                        type: "checkbox",
                        message: "Select courses to register:",
                        choices: availableCourses,
                    },
                ]);
                for (const courseName of selectedCourses.courses) {
                    const course = new Course(Course.generateCourseID(courseName), courseName);
                    selectedStudent.registerCourses(course);
                    course.addStudents(selectedStudent);
                }
                console.log("Courses registered successfully!");
            }
        }
    }
    else if (service.select === "Instructor") {
        const instructorNames = system.teachers.map((t) => t.name);
        const selectedInstructor = await inquirer.prompt([
            {
                name: "instructorName",
                type: "list",
                message: "Select an instructor to assign a course:",
                choices: instructorNames,
            },
        ]);
        const availableStudents = system.student.map((s) => s.getName());
        const studentToAssign = await inquirer.prompt([
            {
                name: "studentName",
                type: "list",
                message: "Select a student to assign a course:",
                choices: availableStudents,
            },
        ]);
        const courseToAssign = await inquirer.prompt([
            {
                name: "courseName",
                type: "list",
                message: "Select a course to assign:",
                choices: availableCourses,
            },
        ]);
        instructor = system.teachers.find((t) => t.name === selectedInstructor.instructorName);
        if (instructor) {
            selectedStudent = system.student.find((s) => s.getName() === studentToAssign.studentName);
            if (selectedStudent) {
                const course = new Course(Course.generateCourseID(courseToAssign.courseName), courseToAssign.courseName);
                instructor.assignCourse(course);
                course.addInstructor(instructor);
                selectedStudent.registerCourses(course);
                course.addStudents(selectedStudent);
                console.log(`Course '${courseToAssign.courseName}' assigned to ${selectedStudent.getName()} by ${instructor.getName()}`);
            }
            else {
                console.log("Selected student is undefined.");
            }
        }
        else {
            console.log("Instructor is undefined.");
        }
    }
}
studentManagement(application);
