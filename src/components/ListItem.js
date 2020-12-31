import React from "react";
import "./Students.css";

const ListItem = ({ student }) => {
  return (
    <div>
      <div className="studentsList">
        <li key={student.id} className="list-item" value={student.name}>
          <section className="name" key={student.id}>
            {student.name}
          </section>
        </li>
      </div>
    </div>
  );
};

export default ListItem;
