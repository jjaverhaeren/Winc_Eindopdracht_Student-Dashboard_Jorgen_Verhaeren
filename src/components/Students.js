import React, { useEffect } from "react";
import "./Students.css";
import Select from "./Select";
import Doughnut from "./Doughnut";
import Bar from "./Bar";

const Students = props => {
  const string = window.location.pathname;
  const array = string.split("");
  array.splice(0, 9);
  const studentName = array.join("");
  const pickStudent = props.pickStudent;

  // eslint-disable-next-line
  useEffect(() => { pickStudent(studentName)}, []);

  let phone, email, age, imgUrl, checkboxStyle;
  props.studentInfo.forEach(student => {
    if (student.name === studentName) {
      phone = student.phone;
      email = student.email;
      age = student.age;
      imgUrl = student.studentImgUrl;
    }
  });

  props.displayCheckBoxes === false
    ? (checkboxStyle = { display: "none" })
    : (checkboxStyle = { display: "inline" });

  return (
    <div className="student-main">
      <div className="student-left_container">
        <div className="student-feature_container">
          <div className="student-info_container">
            <h3>naam: {studentName}</h3>
            <p>tel: {phone}</p>
            <p>email: {email}</p>
            <p>leeftijd: {age}</p>
          </div>
          <div className="student-donut_container">
            <Doughnut className="donut" dataSet={props.studentDataSet} />
          </div>
          <img src={imgUrl} alt="" />
        </div>
        <div className="student-list_container">
          <h3>Sorteer</h3>
          <button
            className="button-moeilijk"
            onClick={props.handleSortByDifficult}
          >
            Moeilijk
          </button>
          <button className="button-leuk" onClick={props.handleSortByFun}>
            Leuk
          </button>
          <button className="button-default" onClick={props.handleSortDefault}>
            Standaard
          </button>
        </div>
      </div>

      <div className="student-bar_container">
        <label style={checkboxStyle}>
          <input
            type="checkbox"
            name="studentDifficultChecked"
            onChange={props.handleChange}
            checked={props.studentDifficultChecked}
            onClick={props.handleClickStudentDifficultCheckbox}
          />
          Moeilijk
        </label>
        <label style={checkboxStyle}>
          <input
            type="checkbox"
            name="studentFunChecked"
            onChange={props.handleChange}
            checked={props.studentFunChecked}
            onClick={props.handleClickStudentFunCheckbox}
          />
          Leuk
        </label>
        <Bar
          BarTitle={props.studentBarTitle}
          xAxisLabels={props.studentXAxisLabels}
          dataSet1Data={props.studentDataSet1Data}
          dataSet2Data={props.studentDataSet2Data}
        />
      </div>
      <div className="student-right_container">
        <div className="student-mode_container">
          <h3>Mode</h3>
          <label>
            <input
              value="single"
              type="radio"
              name="studentSingleMulti"
              onChange={props.handleChange}
              checked={props.studentSingleMulti === "single"}
            />
            Single
          </label>
          <label>
            <input
              value="multi"
              type="radio"
              name="studentSingleMulti"
              onChange={props.handleChange}
              checked={props.studentSingleMulti === "multi"}
            />
            Multi
          </label>
        </div>

        <div className="student-select_opdracht">
          <Select
            listData={props.assignmentInfo}
            onChange={props.pickAssignmentStudent}
            innerHTML={props.chooseAAssignment}
          />
        </div>
        <div className="student-reset_container">
          <button className="button-reset" onClick={props.studentReset}>
            RESET
          </button>
        </div>
      </div>
    </div>
  );
};

export default Students;
