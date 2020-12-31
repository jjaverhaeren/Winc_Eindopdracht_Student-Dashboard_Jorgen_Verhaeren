import { ratings } from "./data";

//
// GENERATE INFO FUNCTIONS
//
export const students = [...ratings];

export const distinctStudentNames = [
  ...new Set(students.map(student => student.Student)),
];

export const distinctAssignmentNames = [
  ...new Set(students.map(student => student.Opdracht)),
];

const randomPhone = () => {
  const lasteight = Math.round(Math.random() * (99999999 - 10000000));
  return "06-" + lasteight;
};

const randomAge = () => {
  return Math.round(Math.random() * (55 - 18) + 18);
};

//
const generateAssignmentInfo = () => {
  const assignmentInfo = distinctAssignmentNames.map(name => ({ name }));
  let id = 1;
  assignmentInfo.forEach(assignment => {
    assignment.id = id++;
  });
  return assignmentInfo;
};


export const assignmentInfo = generateAssignmentInfo();

//
const info = distinctStudentNames.map(name => ({ name }));
let id = 1;
info.forEach(student => {
  student.id = id++;
  student.phone = randomPhone();
  student.email = `${student.name}@gmail.com`;
  student.age = randomAge();
});

info.forEach(student => {
  switch (student.name) {
    case "Evelyn":
      student.studentImgUrl = "/img/Evelyn.jpg";
      break;
    case "Aranka":
      student.studentImgUrl = "/img/Aranka.jpg";
      break;
    case "Floris":
      student.studentImgUrl = "/img/Floris.jpg";
      break;
    case "Hector":
      student.studentImgUrl = "/img/Hector.jpg";
      break;
    case "Martina":
      student.studentImgUrl = "/img/Martina.jpg";
      break;
    case "Maurits":
      student.studentImgUrl = "/img/Maurits.jpg";
      break;
    case "Rahima":
      student.studentImgUrl = "/img/Rahima.jpg";
      break;
    case "Sandra":
      student.studentImgUrl = "/img/Sandra.jpg";
      break;
    case "Storm":
      student.studentImgUrl = "/img/Storm.jpg";
      break;
    case "Wietske":
      student.studentImgUrl = "/img/Wietske.jpg";
      break;
    default:
      student.studentImgUrl = "/img/winclogo.jpg";
  }
});

export const studentInfo = info;
//
//GET AVERAGE FUNCTIONS:
//
export const averageOfAbsolutelyEverythingDifficultAndFun = () => {
  let sumDifficult = 0,
    sumFun = 0;
  students.forEach(student => {
    sumDifficult += student.Moeilijk;
    sumFun += student.Leuk;
  });
  let averageDifficult = Math.round((sumDifficult / students.length) * 10) / 10;
  let averageFun = Math.round((sumFun / students.length) * 10) / 10;
  return [[averageDifficult, averageFun]];
};

export const getAverage = array => {
  const reducer = (total, current) => total + current;
  const sum = array.reduce(reducer);
  return sum / array.length;
};

export const getAveragesPerStudent = (array, studentName) => {
  let sumDifficult = 0,
    sumFun = 0,
    numberOfTests = 0;
  array.forEach(student => {
    if (student.Student === studentName) {
      sumDifficult += student.Moeilijk;
      sumFun += student.Leuk;
      numberOfTests++;
    }
  });
  const averageDifficult = Math.round((sumDifficult / numberOfTests) * 10) / 10;
  const averageFun = Math.round((sumFun / numberOfTests) * 10) / 10;
  let dataSet = [];
  dataSet.push(averageDifficult);
  dataSet.push(averageFun);
  return [studentName, dataSet];
};

export const getAveragesPerStudentPerAssignment = (studentName, assignment) => {
  let sumDifficult = 0,
    sumFun = 0,
    numberOfTests = 0;
  students.forEach(student => {
    if (student.Student === studentName && student.Opdracht === assignment) {
      sumDifficult += student.Moeilijk;
      sumFun += student.Leuk;
      numberOfTests++;
    }
  });


  const averageDifficult = Math.round((sumDifficult / numberOfTests) * 10) / 10;
  const averageFun = Math.round((sumFun / numberOfTests) * 10) / 10;
  console.log(`${studentName} gemiddelde Moeilijk: ${averageDifficult}`);
  console.log(`${studentName} gemiddelde Leuk: ${averageFun}`);
  let dataSet = [];
  dataSet.push(averageDifficult);
  dataSet.push(averageFun);
  return dataSet;
};

export const getAveragesPerStudentAllAssignments = (array, studentName) => {
  let difficultArray = [],
    funArray = [];
  array.forEach(student => {
    if (student.Student === studentName) {
      difficultArray.push(student.Moeilijk);
      funArray.push(student.Leuk);
    }
  });
  return [difficultArray, funArray];
};

export const getAveragesPerAssignment = assignment => {
  let sumDifficult = 0,
    sumFun = 0,
    numberOfTests = 0,
    difficultArrayOfAssignment = [],
    funArrayOfAssignment = [],
    averagesPerAssignment = {};

  students.forEach(student => {
    if (student.Opdracht === assignment) {
      sumDifficult += student.Moeilijk;
      sumFun += student.Leuk;
      numberOfTests++;
      const averageDifficultperOpdracht = Math.round(
        sumDifficult / numberOfTests
      );
      difficultArrayOfAssignment.push(averageDifficultperOpdracht);
      const averageFunperOpdracht = Math.round(sumFun / numberOfTests);
      funArrayOfAssignment.push(averageFunperOpdracht);
    }
  });
  const averageDifficultOfStudents = getAverage(difficultArrayOfAssignment);
  const averageFunOfStudents = getAverage(funArrayOfAssignment);
  averagesPerAssignment.Opdracht = assignment;
  averagesPerAssignment.Moeilijk = averageDifficultOfStudents;
  averagesPerAssignment.Leuk = averageFunOfStudents;
  return averagesPerAssignment;
};

export const getAveragesAllAssignmentsArray = () => {
  let averagesPerAssignmentArray = [];
  distinctAssignmentNames.forEach(opdracht => {
    const averagesPerAssignment = getAveragesPerAssignment(opdracht);
    averagesPerAssignmentArray.push(averagesPerAssignment);
  });
  return averagesPerAssignmentArray;
};

//
//SORT FUNCTIONS
//
export const sortByDifficult = array => {
  const sortedArray = array.sort((a, b) =>
    a.Moeilijk < b.Moeilijk ? 1 : b.Moeilijk < a.Moeilijk ? -1 : 0
  );
  return sortedArray;
};

export const sortByFun = array => {
  const sortedArray = array.sort((a, b) =>
    a.Leuk < b.Leuk ? 1 : b.Leuk < a.Leuk ? -1 : 0
  );
  return sortedArray;
};

//
//GET DATASETS FUNCTIONS
//
export const getDataSets = array => {
  let difficultData = [],
    funData = [],
    xAxisLAbels = [];
  array.forEach(assignment => {
    xAxisLAbels.push(assignment.Opdracht);
    difficultData.push(assignment.Moeilijk);
    funData.push(assignment.Leuk);
  });
  return [xAxisLAbels, difficultData, funData];
};

export const getStudentSet = studentName => {
  let studentSet = [];
  students.forEach(student => {
    if (student.Student === studentName) {
      studentSet.push(student);
    }
  });
  return studentSet;
};
