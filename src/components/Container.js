import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Students from "./Students";
import Nav from "./Nav";

import {
  students,
  distinctAssignmentNames,
  assignmentInfo,
  studentInfo,
  getStudentSet,
  averageOfAbsolutelyEverythingDifficultAndFun,
  getAveragesPerStudent,
  getAveragesPerAssignment,
  getAveragesAllAssignmentsArray,
  sortByDifficult,
  sortByFun,
  getDataSets,
} from "../data/utils";

const averagesPerAssignmentArray = getAveragesAllAssignmentsArray();
const [xAxisLAbels, difficultData, funData] = getDataSets(
  averagesPerAssignmentArray
);
const [averageData] = averageOfAbsolutelyEverythingDifficultAndFun();

class Container extends Component {
  constructor(props) {
    super();
    this.state = {
      homeBarTitle: "Gemiddelde per Opdracht van alle Studenten",
      averagesPerAssignmentArray: averagesPerAssignmentArray,
      homeXAxisLabels: xAxisLAbels,
      homeDataSet1Data: difficultData,
      homeDataSet2Data: funData,
      homeDataSet: averageData,
      homeDifficultChecked: true,
      homeFunChecked: true,
      homeSortedByDifficult: false,
      homeSortedByFun: false,
      homeSingleMulti: "single",
      studentDataSetBar: [],
      studentSortedByDifficult: false,
      studentSortedByFun: false,
      studentBarTitle: "",
      studentXAxisLabels: distinctAssignmentNames,
      studentSet: students,
      studentDataSet1Data: [],
      studentDataSet2Data: [],
      studentName: "",
      studentDataSet: [1, 1],
      studentDifficultChecked: true,
      studentFunChecked: true,
      studentSingleMulti: "single",
      chooseAStudent: "Kies een Student",
      chooseAAssignment: "Kies een Opdracht",
      displayCheckBoxes: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClickHomeDifficultCheckbox = this.handleClickHomeDifficultCheckbox.bind(
      this
    );
    this.handleClickHomeFunCheckbox = this.handleClickHomeFunCheckbox.bind(
      this
    );
    this.handleClickStudentFunCheckbox = this.handleClickStudentFunCheckbox.bind(
      this
    );
    this.handleClickStudentDifficultCheckbox = this.handleClickStudentDifficultCheckbox.bind(
      this
    );
    this.pickStudent = this.pickStudent.bind(this);
    this.handleSortByDifficult = this.handleSortByDifficult.bind(this);
    this.handleSortByFun = this.handleSortByFun.bind(this);
    this.handleSortDefault = this.handleSortDefault.bind(this);
    this.handleSortByDifficultHome = this.handleSortByDifficultHome.bind(this);
    this.handleSortByFunHome = this.handleSortByFunHome.bind(this);
    this.handleSortDefaultHome = this.handleSortDefaultHome.bind(this);
    this.pickAssignmentStudent = this.pickAssignmentStudent.bind(this);
    this.pickAssignmentHome = this.pickAssignmentHome.bind(this);
    this.studentReset = this.studentReset.bind(this);
    this.pickStudentRoute = this.pickStudentRoute.bind(this);
  }

  handleChange(event) {
    const { name, value, type, checked } = event.target;
    type === "checkbox"
      ? this.setState({ [name]: checked })
      : this.setState({ [name]: value });
  }

  getHomeDataIfChecked = () => {
    const averagesPerAssignmentArray = getAveragesAllAssignmentsArray();
    if (
      this.state.homeSortedByDifficult === false &&
      this.state.homeSortedByFun === false
    ) {
      const [, newdifficultData, newfunData] = getDataSets(
        averagesPerAssignmentArray
      );
      return [newdifficultData, newfunData];
    } else if (
      this.state.homeSortedByDifficult === true &&
      this.state.homeSortedByFun === false
    ) {
      const averagesPerAssignmentArraySorted = sortByDifficult(
        averagesPerAssignmentArray
      );
      const [, newdifficultData, newfunData] = getDataSets(
        averagesPerAssignmentArraySorted
      );
      return [newdifficultData, newfunData];
    } else if (
      this.state.homeSortedByDifficult === false &&
      this.state.homeSortedByFun === true
    ) {
      const averagesPerAssignmentArraySorted = sortByFun(
        averagesPerAssignmentArray
      );
      const [, newdifficultData, newfunData] = getDataSets(
        averagesPerAssignmentArraySorted
      );
      return [newdifficultData, newfunData];
    }
  };

  handleClickHomeDifficultCheckbox(event) {
    const [homeDataSet1] = this.getHomeDataIfChecked();
    const dataSetEmpty = new Array(homeDataSet1.length).fill(0);
    event.target.checked === true &&
    event.target.name === "homeDifficultChecked"
      ? this.setState({ homeDataSet1Data: homeDataSet1 })
      : this.setState({ homeDataSet1Data: dataSetEmpty });
  }

  handleClickHomeFunCheckbox(event) {
    const [, homeDataSet2] = this.getHomeDataIfChecked();
    const dataSetEmpty = new Array(homeDataSet2.length).fill(0);
    event.target.checked === true && event.target.name === "homeFunChecked"
      ? this.setState({ homeDataSet2Data: homeDataSet2 })
      : this.setState({ homeDataSet2Data: dataSetEmpty });
  }

  getStudentDataIfChecked = () => {
    const studentSet = getStudentSet(this.state.studentName);
    if (
      this.state.studentSortedByDifficult === false &&
      this.state.studentSortedByFun === false
    ) {
      const [, newdifficultData, newfunData] = getDataSets(studentSet);
      return [newdifficultData, newfunData];
    } else if (
      this.state.studentSortedByDifficult === true &&
      this.state.studentSortedByFun === false
    ) {
      const studentSetSorted = sortByDifficult(studentSet);
      const [, newdifficultData, newfunData] = getDataSets(studentSetSorted);
      return [newdifficultData, newfunData];
    } else if (
      this.state.studentSortedByDifficult === false &&
      this.state.studentSortedByFun === true
    ) {
      const studentSetSorted = sortByFun(studentSet);
      const [, newdifficultData, newfunData] = getDataSets(studentSetSorted);
      return [newdifficultData, newfunData];
    }
  };

  handleClickStudentDifficultCheckbox(event) {
    const [newdifficultData] = this.getStudentDataIfChecked();
    const dataSetEmpty = new Array(56).fill(0);
    event.target.checked === true &&
    event.target.name === "studentDifficultChecked"
      ? this.setState({
          studentDataSet1Data: newdifficultData,
        })
      : this.setState({ studentDataSet1Data: dataSetEmpty });
  }

  handleClickStudentFunCheckbox(event) {
    const [, newfunData] = this.getStudentDataIfChecked();
    const dataSetEmpty = new Array(56).fill(0);
    event.target.checked === true && event.target.name === "studentFunChecked"
      ? this.setState({ studentDataSet2Data: newfunData })
      : this.setState({ studentDataSet2Data: dataSetEmpty });
  }

  pickStudent(studentName) {
    this.setState(prevState => {
      const chosenStudent = studentName;
      const [newStudentName, newDataSet] = getAveragesPerStudent(
        students,
        chosenStudent
      );
      const studentSet = getStudentSet(chosenStudent);
      const [newXAxisLAbels, newdifficultData, newfunData] = getDataSets(
        studentSet
      );

      const newState = {
        ...prevState,
        studentDataSetBar: studentSet,
        studentSortedByDifficult: false,
        studentSortedByFun: false,
        studentXAxisLabels: newXAxisLAbels,
        studentBarTitle: `Moeilijk vs Leuk voor ${newStudentName} per Opdracht`,
        studentName: chosenStudent,
        studentDataSet: newDataSet,
        studentDataSet1Data: newdifficultData,
        studentDataSet2Data: newfunData,
        displayCheckBoxes: true,
      };
      return newState;
    });
  }

  pickStudentRoute() {
    console.log("pickStudentRoute");
  }

  pickAssignmentStudent(event) {
    const chosenAssignment = event.target.value;
    this.state.studentName === ""
      ? alert(`KIES EERST EEN STUDENT`)
      : this.state.studentSingleMulti === "single"
      ? this.pickAssignmentStudentSingle(chosenAssignment)
      : this.state.studentXAxisLabels.length > 7
      ? this.pickAssignmentStudentSingle(chosenAssignment)
      : this.pickAssignmentStudentMulti(chosenAssignment);
  }

  pickAssignmentStudentSingle(chosenAssignment) {
    chosenAssignment === "Kies een Opdracht"
      ? alert("KIES EEN OPDRACHT")
      : this.setState(prevState => {
          const newfunData = [],
            newdifficultData = [],
            newXAxisLabels = [];
          const studentSet = this.state.studentDataSetBar;
          studentSet.forEach(item => {
            if (item.Opdracht === chosenAssignment) {
              newXAxisLabels.push(item.Opdracht);
              newdifficultData.push(item.Moeilijk);
              newfunData.push(item.Leuk);
            }
          });
          const newState = {
            ...prevState,
            studentSortedByDifficult: false,
            studentSortedByFun: false,
            studentXAxisLabels: newXAxisLabels,
            studentBarTitle: `Moeilijk vs Leuk voor ${this.state.studentName} bij opdracht ${chosenAssignment}`,
            studentDataSet1Data: newdifficultData,
            studentDataSet2Data: newfunData,
            displayCheckBoxes: false,
          };
          return newState;
        });
  }

  pickAssignmentStudentMulti(chosenAssignment) {
    this.state.studentXAxisLabels.includes(chosenAssignment)
      ? alert(`OPDRACHT ${chosenAssignment} IS AL GEKOZEN.`)
      : chosenAssignment === "Kies een Opdracht"
      ? alert(`KIES EEN OPDRACHT`)
      : this.setState(prevState => {
          const newfunData = [...prevState.studentDataSet2Data],
            newdifficultData = [...prevState.studentDataSet1Data],
            newXAxisLabels = [...prevState.studentXAxisLabels];
          const studentSet = getStudentSet(this.state.studentName);
          studentSet.forEach(item => {
            if (item.Opdracht === chosenAssignment) {
              newXAxisLabels.push(item.Opdracht);
              newdifficultData.push(item.Moeilijk);
              newfunData.push(item.Leuk);
            }
          });
          const newState = {
            ...prevState,
            studentSortedByDifficult: false,
            studentSortedByFun: false,
            studentXAxisLabels: newXAxisLabels,
            studentBarTitle: `Moeilijk vs Leuk voor ${this.state.studentName} bij de gekozen Opdrachten`,
            studentDataSet1Data: newdifficultData,
            studentDataSet2Data: newfunData,
            displayCheckBoxes: false,
          };
          return newState;
        });
  }

  pickAssignmentHome(event) {
    const chosenAssignment = event.target.value;
    this.state.homeSingleMulti === "single"
      ? this.pickAssignmentHomeSingle(chosenAssignment)
      : this.state.homeXAxisLabels.length > 7
      ? this.pickAssignmentHomeSingle(chosenAssignment)
      : this.pickAssignmentHomeMulti(chosenAssignment);
  }

  pickAssignmentHomeSingle(chosenAssignment) {
    chosenAssignment === "Kies een Opdracht"
      ? alert("KIES EEN OPDRACHT")
      : this.setState(prevState => {
          const newfunData = [],
            newdifficultData = [],
            newXAxisLabels = [];
          const averagesPerAssignment = getAveragesPerAssignment(
            chosenAssignment
          );
          newXAxisLabels.push(averagesPerAssignment.Opdracht);
          newdifficultData.push(averagesPerAssignment.Moeilijk);
          newfunData.push(averagesPerAssignment.Leuk);
          const newState = {
            ...prevState,
            homeBarTitle: `Gemiddelde van alle Studenten voor Opdracht ${chosenAssignment}`,
            homeXAxisLabels: newXAxisLabels,
            homeDataSet1Data: newdifficultData,
            homeDataSet2Data: newfunData,
            displayCheckBoxes: false,
          };
          return newState;
        });
  }

  pickAssignmentHomeMulti(chosenAssignment) {
    this.state.homeXAxisLabels.includes(chosenAssignment)
      ? alert(`OPDRACHT ${chosenAssignment} IS AL GEKOZEN.`)
      : chosenAssignment === "Kies een Opdracht"
      ? alert(`KIES EEN OPDRACHT`)
      : this.setState(prevState => {
          const newXAxisLabels = [...prevState.homeXAxisLabels],
            newdifficultData = [...prevState.homeDataSet1Data],
            newfunData = [...prevState.homeDataSet2Data];
          const averagesPerAssignment = getAveragesPerAssignment(
            chosenAssignment
          );
          newXAxisLabels.push(averagesPerAssignment.Opdracht);
          newdifficultData.push(averagesPerAssignment.Moeilijk);
          newfunData.push(averagesPerAssignment.Leuk);
          const newState = {
            ...prevState,
            homeBarTitle: `Gemiddelde van alle Studenten voor de gekozen Opdrachten`,
            homeXAxisLabels: newXAxisLabels,
            homeDataSet1Data: newdifficultData,
            homeDataSet2Data: newfunData,
            displayCheckBoxes: false,
          };
          return newState;
        });
  }

  handleSortByDifficult() {
    this.state.studentName === ""
      ? alert(`KIES EERST EEN STUDENT`)
      : this.setState(prevState => {
          const studentSet = this.state.studentDataSetBar;
          const studentSetSorted = sortByDifficult(studentSet);
          const [newXAxisLAbels, newdifficultData, newfunData] = getDataSets(
            studentSetSorted
          );
          const newState = {
            ...prevState,
            studentSortedByDifficult: true,
            studentSortedByFun: false,
            studentXAxisLabels: newXAxisLAbels,
            studentBarTitle: `Opdrachten gesorteerd op 'Moeilijk' voor ${this.state.studentName}.`,
            studentDataSet1Data: newdifficultData,
            studentDataSet2Data: newfunData,
            studentDifficultChecked: true,
            studentFunChecked: true,
            displayCheckBoxes: true,
          };
          return newState;
        });
  }

  handleSortByFun() {
    this.state.studentName === ""
      ? alert(`KIES EERST EEN STUDENT`)
      : this.setState(prevState => {
          const studentSet = this.state.studentDataSetBar;
          const studentSetSorted = sortByFun(studentSet);
          const [newXAxisLAbels, newdifficultData, newfunData] = getDataSets(
            studentSetSorted
          );
          const newState = {
            ...prevState,
            studentSortedByDifficult: false,
            studentSortedByFun: true,
            studentXAxisLabels: newXAxisLAbels,
            studentBarTitle: `Opdrachten gesorteerd op 'Leuk' voor ${this.state.studentName}.`,
            studentDataSet1Data: newdifficultData,
            studentDataSet2Data: newfunData,
            studentDifficultChecked: true,
            studentFunChecked: true,
            displayCheckBoxes: true,
          };
          return newState;
        });
  }
  //
  //
  handleSortDefault() {
    this.state.studentName === ""
      ? alert(`KIES EERST EEN STUDENT`)
      : this.setState(prevState => {
          const studentSet = getStudentSet(this.state.studentName);
          const [newXAxisLAbels, newdifficultData, newfunData] = getDataSets(
            studentSet
          );

          const newState = {
            ...prevState,
            studentSortedByDifficult: false,
            studentSortedByFun: false,
            studentXAxisLabels: newXAxisLAbels,
            studentBarTitle: `Moeilijk vs Leuk voor ${this.state.studentName} per Opdracht`,
            studentDataSet1Data: newdifficultData,
            studentDataSet2Data: newfunData,
            studentDifficultChecked: true,
            studentFunChecked: true,
            displayCheckBoxes: true,
          };
          return newState;
        });
  }

  studentReset() {
    this.setState(prevState => {
      const studentSet = getStudentSet(this.state.studentName);
      const [newXAxisLAbels, newdifficultData, newfunData] = getDataSets(
        studentSet
      );

      const newState = {
        ...prevState,
        studentSortedByDifficult: false,
        studentSortedByFun: false,
        studentXAxisLabels: newXAxisLAbels,
        studentBarTitle: `Moeilijk vs Leuk voor ${this.state.studentName} per Opdracht`,
        studentDataSet1Data: newdifficultData,
        studentDataSet2Data: newfunData,
        studentDifficultChecked: true,
        studentFunChecked: true,
        displayCheckBoxes: true,
      };
      return newState;
    });
  }

  handleSortByDifficultHome() {
    this.setState(prevState => {
      const averagesPerAssignmentArray = this.state.averagesPerAssignmentArray;
      const averagesPerAssignmentArraySorted = sortByDifficult(
        averagesPerAssignmentArray
      );
      const [xAxisLAbels, difficultData, funData] = getDataSets(
        averagesPerAssignmentArraySorted
      );
      const newState = {
        ...prevState,
        homeSortedByDifficult: true,
        homeSortedByFun: false,
        homeBarTitle: "Gesorteerd op 'Moeilijk' voor alle studenten",
        homeXAxisLabels: xAxisLAbels,
        homeDataSet1Data: difficultData,
        homeDataSet2Data: funData,
        displayCheckBoxes: true,
        homeDifficultChecked: true,
        homeFunChecked: true,
      };
      return newState;
    });
  }

  handleSortByFunHome() {
    this.setState(prevState => {
      const averagesPerAssignmentArray = this.state.averagesPerAssignmentArray;
      const averagesPerAssignmentArraySorted = sortByFun(
        averagesPerAssignmentArray
      );
      const [xAxisLAbels, difficultData, funData] = getDataSets(
        averagesPerAssignmentArraySorted
      );
      const newState = {
        ...prevState,
        homeSortedByDifficult: false,
        homeSortedByFun: true,
        homeBarTitle: "Gesorteerd op 'Leuk' voor alle studenten",
        homeXAxisLabels: xAxisLAbels,
        homeDataSet1Data: difficultData,
        homeDataSet2Data: funData,
        displayCheckBoxes: true,
        homeDifficultChecked: true,
        homeFunChecked: true,
      };
      return newState;
    });
  }

  handleSortDefaultHome() {
    this.setState(prevState => {
      const averagesPerAssignmentArray = getAveragesAllAssignmentsArray();
      const [xAxisLAbels, difficultData, funData] = getDataSets(
        averagesPerAssignmentArray
      );
      const newState = {
        ...prevState,
        homeSortedByDifficult: false,
        homeSortedByFun: false,
        homeBarTitle: "Gemiddelde per Opdracht van alle Studenten",
        homeXAxisLabels: xAxisLAbels,
        homeDataSet1Data: difficultData,
        homeDataSet2Data: funData,
        displayCheckBoxes: true,
        homeDifficultChecked: true,
        homeFunChecked: true,
      };
      return newState;
    });
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Nav />
            <Switch>
              <Route
                path="/"
                exact
                render={props => (
                  <Home
                    assignmentInfo={assignmentInfo}
                    studentInfo={studentInfo}
                    chooseAStudent={this.state.chooseAStudent}
                    chooseAAssignment={this.state.chooseAAssignment}
                    homeBarTitle={this.state.homeBarTitle}
                    homeXAxisLabels={this.state.homeXAxisLabels}
                    homeDataSet1Data={this.state.homeDataSet1Data}
                    homeDataSet2Data={this.state.homeDataSet2Data}
                    studentName={this.state.studentName}
                    homeDataSet={this.state.homeDataSet}
                    homeDifficultChecked={this.state.homeDifficultChecked}
                    homeFunChecked={this.state.homeFunChecked}
                    displayCheckBoxes={this.state.displayCheckBoxes}
                    homeSingleMulti={this.state.homeSingleMulti}
                    handleChange={this.handleChange}
                    handleClickHomeDifficultCheckbox={
                      this.handleClickHomeDifficultCheckbox
                    }
                    handleClickHomeFunCheckbox={this.handleClickHomeFunCheckbox}
                    handleSortByDifficultHome={this.handleSortByDifficultHome}
                    handleSortByFunHome={this.handleSortByFunHome}
                    handleSortDefaultHome={this.handleSortDefaultHome}
                    pickAssignmentHome={this.pickAssignmentHome}
                    pickStudentRoute={this.pickStudentRoute}
                  />
                )}
              />
              <Route
                path="/Student/:id"
                render={props => (
                  <Students
                    studentBarTitle={this.state.studentBarTitle}
                    studentInfo={studentInfo}
                    assignmentInfo={assignmentInfo}
                    chooseAStudent={this.state.chooseAStudent}
                    chooseAAssignment={this.state.chooseAAssignment}
                    studentName={this.state.studentName}
                    studentDataSet={this.state.studentDataSet}
                    studentXAxisLabels={this.state.studentXAxisLabels}
                    studentDataSet1Data={this.state.studentDataSet1Data}
                    studentDataSet2Data={this.state.studentDataSet2Data}
                    studentDifficultChecked={this.state.studentDifficultChecked}
                    studentFunChecked={this.state.studentFunChecked}
                    displayCheckBoxes={this.state.displayCheckBoxes}
                    studentSingleMulti={this.state.studentSingleMulti}
                    handleChange={this.handleChange}
                    handleClickStudentDifficultCheckbox={
                      this.handleClickStudentDifficultCheckbox
                    }
                    handleClickStudentFunCheckbox={
                      this.handleClickStudentFunCheckbox
                    }
                    pickStudent={this.pickStudent}
                    handleSortByDifficult={this.handleSortByDifficult}
                    handleSortByFun={this.handleSortByFun}
                    handleSortDefault={this.handleSortDefault}
                    pickAssignmentStudent={this.pickAssignmentStudent}
                    studentReset={this.studentReset}
                  />
                )}
              />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default Container;
