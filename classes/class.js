export class Person {
    constructor(name, age) {
        this.courses = [];
        this.name = name;
        this.age = age;
    }
    getName() {
        return this.name;
    }
}
export class Student extends Person {
    constructor(name, age) {
        super(name, age);
        this.rollNumber = ++Student.count + "-2023";
    }
    registerCourses(courses) {
        this.courses.push(courses);
    }
}
Student.count = 100;
export class Instructor extends Person {
    constructor(salary, name, age) {
        super(name, age);
        this.salary = salary;
    }
    assignCourse(courses) {
        this.courses.push(courses);
    }
}
export class Course {
    constructor(id, name) {
        this.students = [];
        this.instructor = [];
        this.id = id;
        this.name = name;
    }
    static generateCourseID(courseName) {
        const uniqueNumber = Math.floor(Math.random() * 1000);
        return `${uniqueNumber}-${courseName.replace(/\s/g, "-").toLowerCase()}`;
    }
    addStudents(students) {
        this.students.push(students);
    }
    addInstructor(instructor) {
        this.instructor.push(instructor);
    }
}
export class Management {
    constructor() {
        this.student = [];
        this.teachers = [];
        this.courses = [];
    }
    addStudents(student) {
        this.student.push(student);
    }
    addInstructor(teachers) {
        this.teachers.push(teachers);
    }
    addCourses(courses) {
        this.courses.push(courses);
    }
}
