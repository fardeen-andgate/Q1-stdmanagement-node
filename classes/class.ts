export class Person {
    name: string;
    age: number;
    courses: Course[] = [];
    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }
  
    getName() {
      return this.name;
    }
  }
  
  export class Student extends Person {
    static count: number = 100;
    rollNumber: string;
    constructor(name: string, age: number) {
      super(name, age);
      this.rollNumber = ++Student.count + "-2023";
    }
    registerCourses(courses:Course){
      this.courses.push(courses)
    }
  }
  
  export class Instructor extends Person {
    salary: number;
    constructor(salary: number, name: string, age: number) {
      super(name, age);
      this.salary = salary;
    }
    assignCourse(courses: Course) {
      this.courses.push(courses);
    }
  }
  
  export class Course {
    id: string;
    name: string;
    students: Student[] = [];
    instructor: Instructor[] = [];
    constructor(id: string, name: string) {
      this.id = id;
      this.name = name;
    }
      static generateCourseID(courseName: string) {
      const uniqueNumber = Math.floor(Math.random() * 1000);
      return `${uniqueNumber}-${courseName.replace(/\s/g, "-").toLowerCase()}`;
    }
    addStudents(students: Student) {
      this.students.push(students);
    }
    addInstructor(instructor: Instructor) {
      this.instructor.push(instructor);
    }
  }
  
  
  
  export class Management {
    student:Student[] = []
    teachers:Instructor[] = []
    courses:Course[] = []
    addStudents(student: Student) {
      this.student.push(student);
    }
    addInstructor(teachers: Instructor) {
      this.teachers.push(teachers);
    }
    addCourses(courses:Course){
      this.courses.push(courses)
    }
  }