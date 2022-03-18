import React, {useState, useEffect} from "react";

import { Link, useParams, useNavigate} from 'react-router-dom'

function UpdateCourse(props) {
    const [course, setCourse] = useState({});
    const [error, setErrorMessage] = useState()

    let params = useParams(); //Gets the ":id" Param from the url clicked

    const nav = useNavigate(); 

    useEffect(() => {
        function fetchData() {
          fetch("http://localhost:5000/api/courses/" + params.id)
            .then((res) => res.json())
            .then((data) => setCourse(data))
            .catch((err) => console.log("OH NO:", err));
        }
        fetchData();
      }, [setCourse, params.id]);
    
      const updateCourse = async(e) => { 
        e.preventDefault(); 
         const encodedCreds = btoa(
             `${props.creds.emailAddress}:${props.creds.password}`
           );
        
    await fetch('http://localhost:5000/api/courses/' + params.id, {
         method: 'PUT', 
         headers : {
             'Content-Type': 'application/json', 
             Authorization: `Basic ${encodedCreds}`,
         }, 
         body: JSON.stringify(course)
     }).then((res) => {
         if(res.status === 204) {
             nav('/course/' + params.id)
         }else {
            return res.json()
         }
     })
     
     .then(data => {
        try{ 
         if(data.message){
             
             setErrorMessage(data.message.errors)
         }
        }catch{
           
        }
         
        })
     .catch((err) => {
         console.log('error message', err)
     }); 
         
    
      
     }
    return(
        <body>
            
            <main>
            <div className="wrap">
                <h2>Update Course</h2>
                {error ? 
                <div className="validation--errors">
                
                    <h3>Validation Errors</h3>
                    <ul>
                            {
                        error.map(message => <li>{message.message}</li>)
                            } 
                    </ul>
                </div>
                : ''
                }
                <form onSubmit={updateCourse}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" value={course.title} onChange={(e) => setCourse({...course, title: e.target.value})} />

                            <p>By {course.firstName} {course.lastName}</p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" value={course.description} onChange={(e) => setCourse({...course, description: e.target.value})}></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" value={course.estimatedTime} onChange={(e) => setCourse({...course, estimatedTime: e.target.value})} />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" value={course.materialsNeeded} onChange={(e) => setCourse({...course, materialsNeeded: e.target.value})}></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Update Course</button><Link to='/'><button className="button button-secondary">Cancel</button></Link>
                </form>
            </div>
        </main>
        </body>
    )
}

export default UpdateCourse;