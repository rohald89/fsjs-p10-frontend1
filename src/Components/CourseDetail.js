import React from "react";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useParams, Link, useNavigate } from "react-router-dom";



function CourseDetail(props) {
  const [course, setCourse] = useState([]);


  const nav = useNavigate();
  
  let params = useParams(); //Gets the ":id" Param from the url clicked

  useEffect(() => {
    function fetchData() {
      fetch("http://localhost:5000/api/courses/" + params.id)
        .then((res) => res.json())
        .then((data) => setCourse(data))
        .catch((err) => console.log("OH NO", err));
    }
    fetchData();
  }, [setCourse, params.id] );


  const deleteCourse = async(e) => {
    
    const encodedCreds = btoa(
      `${props.creds.emailAddress}:${props.creds.password}`
    );
    e.preventDefault(); 
    await fetch('http://localhost:5000/api/courses/' + params.id, {
         method: 'DELETE', 
         headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${encodedCreds}`,
        },
  }).then((res) => {
    if(res.status === 204) {
      nav('/')
    }else {
      return res.json()
    }
  })
    .catch((err) => console.log(err))
    
}; 

  return (
      // {/* Link buttons */}
      <main>
        <div className="actions--bar">
          <div className="wrap">
          
          {/* Checks for authentication from app.js, and if the user is equal to author of article, to show link to update the class */}
            {props.auth && props.userId === course.userId ? 
            <Link className="button" to={"/courses/" + params.id + "/update"}>
              Update Course
            </Link>
            : ""}

            {/* rinse and repeat code from above only for showing the delete button */}
            {props.auth && props.userId === course.userId ? 
            <button className="button" onClick={deleteCourse}>
              Delete Course
            </button>
            : ''
            } 

            <Link className="button button-secondary" to="/">
              Return to List
            </Link>
          </div>
        </div>
        {/* ========================================================================================== */}
        {/* Course title and details */}
        <div className="wrap">
          <h2>Course Detail</h2>
          <form>
            <div className="main--flex">
              <div>
                {/* Header of each course */}
                <h3 className="course--detail--title">Course</h3>
                <h4 className="course--name">{course.title}</h4>

                {/*Conditinal Statement to check if user name exists. Had problems rendering without the conditional statement*/}
                {course.User ? (
                  <p>
                    By: {course.User.firstName} {course.User.lastName}
                  </p>
                ) : (
                  <p>"Uh oh, could not get name"</p>
                )}

                {/* Markdown description */}
                <ReactMarkdown children={course.description} />
              </div>
              <div>
                <h3 className="course--detail--title">Estimated Time</h3>
                <p>{course.estimatedTime}</p>

                <h3 className="course--detail--title">Materials Needed</h3>

                <ReactMarkdown className="course--detail--list">
                  {course.materialsNeeded}
                </ReactMarkdown>
              </div>
            </div>
          </form>
        </div>
      </main>
    
  );
}

export default CourseDetail;
