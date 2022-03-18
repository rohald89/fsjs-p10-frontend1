import React from "react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'


function Courses(props) {
  const [courses, setCourse] = useState([]);

  useEffect(() => {

    async function fetchData() {
      await fetch("http://localhost:5000/api/courses")
      .then((res) => res.json())
      .then((data) => setCourse(data));
  };
      fetchData(); 
  }, []);
 
  return (
   
    

    <div className="wrap main--grid">
      {/* Map over all courses in datatbase */}
      {courses.map((course) => (
        <Link key={course.id} className="course--module course--link" to={"/course/" + course.id }>
          <h2 className="course--label">Course</h2>
          <h3 className="course--title">{course.title}</h3>
        </Link>
      ))}

      {/* Add new course  */}
      <Link
        className="course--module course--add--module"
        to="/courses/create"
      >
        <span className="course--add--title">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 13 13"
            className="add"
          >
            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
          </svg>
          New Course
        </span>
      </Link>
    </div>

    
  );
}

export default Courses;
