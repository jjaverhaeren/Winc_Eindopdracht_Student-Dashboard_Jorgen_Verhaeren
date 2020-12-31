import React from "react";
import ListItem from "./ListItem";

const List = props => {
  let studentsList = props.studentInfo.map(student => (
    <ListItem key={student.id} student={student} />
  ));

  return <div>{studentsList}</div>;
};

export default List;
