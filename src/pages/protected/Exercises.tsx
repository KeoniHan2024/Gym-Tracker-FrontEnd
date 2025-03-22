import { useEffect, useState } from "react";
import Header from "../../components/ui/header";
import axios from 'axios';
import { FormEvent } from "../../types";

// Define the Exercise interface
interface Exercise {
    id: number;
    exercise_name: string;
}


function Exercises() {
    // user's logged in token
    const token = localStorage.getItem("token");
    
    const [exercises, setExercises] = useState<Exercise[]>([]); // keeps track of exercises from the user and the default one

    const[newExercises, setNewExercises] = useState(0); // keeps track of newexercises added. if new one is added it will re render the list

    // function to call backend and create a new exercise
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const payload = Object.fromEntries(formData);
        axios.post("http://localhost:8080/exercises/createExercise", 
            {
                exercise_name: payload.exerciseName,
                muscleGroup: payload.muscleGroup
            },
            {
            headers: {Authorization: `Bearer ${token}`}
            }
        ).then((response) => {
            setNewExercises(newExercises=>newExercises+1);      // when an exercise is created successfully wit will then update the count which the useeffect is dependent on
        }).catch(err => {
            if (err.response) {
                if (err.response.status === 409) {
                    // setErrorMessage("Email is already taken. Please use a different one or reset password");
                    console.log("Error");
                }
                else {
                    // setErrorMessage("An error has occured");
                    console.log("Error");
                }
            }
        })

    }


    // update exercise list everytime a new exercise is added 
    useEffect(() => {
        axios.get("http://localhost:8080/exercises/", {
            headers: {Authorization: `Bearer ${token}`}
        }).then((response) => {
            setExercises(response.data);
        }).catch(err => {
            if (err.response) {
                if (err.response.status === 409) {
                    // setErrorMessage("Email is already taken. Please use a different one or reset password");
                    console.log("Error");
                }
                else {
                    // setErrorMessage("An error has occured");
                    console.log("Error");
                }
            }
        })
    }, [newExercises])

    

  return (
    <>
      <Header showNav={true} textColor={"black"} loggedIn={true}/>
      <div className="container d-flex flex-column flex-md-row justify-content-center align-items-center vh-100">
            <div className="col-md-6 p-4 m-4 shadow rounded bg-light">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <h2>Add Custom Exercise</h2>
                        {/* {errorMessage && <div className="alert alert-danger">{errorMessage}</div>} */}
                        <label htmlFor="exerciseNameField">Exercise Name</label>
                        <input type="text" className="form-control" name="exerciseName" id="exerciseNameField"placeholder="Enter Exercise Name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="muscleGroupsField">Mucle Groups</label>
                        <input type="text" name="muscleGroup" className="form-control" id="muscleGroupsField" placeholder="Add Muscle Groups"/>
                    </div>
                    <div className="d-flex justify-content-center py-3">  
                        <button type="submit" className="btn btn-primary center px-3">Create</button>
                    </div>
                </form>
            </div>
            <div className="col-md-5 p-4 m-4 shadow rounded bg-light ">
                <h3>Exercises</h3>
                <ul className="listGroup" style={{ maxHeight: '300px', overflowY: 'auto'}}>
                    {exercises.map((exercise) => (
                        <li key = {exercise.id} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        {exercise.exercise_name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </>
  );
}

export default Exercises;
