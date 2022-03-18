import React, { useState } from "react";
import {Link, useNavigate} from 'react-router-dom'



function CreateCourse(props)  {

    const nav = useNavigate();

    const [course, setCourse] = useState({
        userId: props.name.id,
    })
     const [data, setData] = useState()
   
    
    const createCourse = async(e) => { 
       
       e.preventDefault(); 
        const encodedCreds = btoa(
            `${props.creds.emailAddress}:${props.creds.password}`
          );
       
   await fetch('http://localhost:5000/api/courses', {
        method: 'POST', 
        headers : {
            'Content-Type': 'application/json', 
            Authorization: `Basic ${encodedCreds}`,
        }, 
        body: JSON.stringify(course)
    }).then((res) =>  res.json())
    .then((data) => {
        if(data.message) {
          setData(data.message.errors)
           
        }else{
            nav('/course/' + data)
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
                <h2>Create Course</h2>

                {/* TODO: RENDER VALIDATION */}
                {data ? 
                <div className="validation--errors">
                
                    <h3>Validation Errors</h3>
                    <ul>
                            {
                        data.map(message => <li>{message.message}</li>)
                            } 
                    </ul>
                </div>
                : ''
                }
                <form onSubmit={createCourse}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" value={course.title} onChange={(e) => setCourse({...course, title: e.target.value})} />

                            <p>By {props.name.firstName} {props.name.lastName}</p>

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
                    <button className="button" type="submit">Create Course</button><Link to='/' ><button className="button button-secondary">Cancel</button></Link>
                </form>
            </div>
        </main>

        </body>
    )
}

export default CreateCourse; 