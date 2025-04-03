import { useEffect, useState } from "react";
import Header from "../../components/ui/header";
import axios from 'axios';
import { buttonEvent, FormEvent, InputChangeEvent } from "../../types";
import { fetchMuscleGroups, handleExerciseSubmit } from "../../services/ExercisesServices";
import { useFuzzySearchList, Highlight } from '@nozbe/microfuzz/react';
import { useNavigate } from 'react-router-dom';



function Exercises() {
    // user's logged in token
    const token = localStorage.getItem("token") as string;
    const navigate = useNavigate();
    const [exercises, setExercises] = useState<Exercise[]>([]); // keeps track of exercises from the user and the default one
    const [newExercises, setNewExercises] = useState(0); // keeps track of newexercises added. if new one is added it will re render the list
    const [muscleGroups, setMuscleGroups] = useState<Musclegroup[]>([]); // gets the list of muscle groups when component is mounted so that the fuzzy search can work on this 
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredMuscleGroups, setFilteredMuscleGroups] = useState<any[]>([]);
    const [errorMessage, setErrorMessage] = useState<String>('')
    const [successMessage, setSuccessMessage] = useState<String>('')

    
    let filteredList = useFuzzySearchList({
        list: muscleGroups,
        queryText: searchQuery,
        getText: (item) => [item.name],
        mapResultItem: ({ item, score, matches: [highlightRanges] }) => ({ item, highlightRanges })
    });


    // get all muscle groups when its loaded
    useEffect(() => {
        const getMuscleGroups = async () => {
            const data: Musclegroup[] = await fetchMuscleGroups();
            // const muscleGroupsList: any[] = JSON.parse(data);
            setMuscleGroups(data)
        }
        getMuscleGroups();
    }, [])


    // whenever the muscle group field is changed it will do a fuzzy search. and if 0 then reset the list to empty
    const handleSearchChange = (event: InputChangeEvent) => {
        const query = event.target.value;
        setSearchQuery(query)
        if (query.length == 0) {
            filteredList = []
        }
        setFilteredMuscleGroups(filteredList.splice(0,4))

        //if query is in the musclegroup list then set selected muscle to that 

        // if not then leave selected muscle as blank
    }

    function handleMuscleSelection(selectedMuscleGroup:Exercise) {
        setSearchQuery(selectedMuscleGroup.exercise_name)
        setFilteredMuscleGroups([])
    }

    // update exercise list everytime a new exercise is added 
    const API_GET_EXERCISES = (import.meta.env.VITE_APP_API_URL?.concat("/exercises/")) as string
    
    useEffect(() => {

        axios.get(API_GET_EXERCISES, {
            headers: {Authorization: `Bearer ${token}`}
        }).then((response) => {
            setExercises(response.data);

        }).catch(err => {  
            localStorage.removeItem("token")
            navigate("/login", { state: "Login Session has expired" })
        })
    }, [newExercises])

    

  return (
    <>
      <Header showNav={true} textColor={"black"} loggedIn={true}/>
      <div className="container d-flex flex-column flex-md-row justify-content-center align-items-center vh-100">
            <div className="col-md-6 p-4 m-4 shadow rounded bg-light">
                <form onSubmit={(e) => handleExerciseSubmit(e, searchQuery, muscleGroups, token, setNewExercises, setErrorMessage, setSuccessMessage)}>
                    
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    <div className="form-group">
                        <h2>Add Custom Exercise</h2>
                        <label htmlFor="exerciseNameField">Exercise Name</label>
                        <input type="text" className="form-control" name="exerciseName" id="exerciseNameField"placeholder="Enter Exercise Name"/>
                    </div>
                    <div className="form-group" style={{ position: 'relative' }}>
                        <label htmlFor="muscleGroupsField">Muscle Groups</label>
                        <input type="text" name="muscleGroup" className="form-control" id="muscleGroupsField" placeholder="Add Muscle Group" value={searchQuery} onChange={handleSearchChange}/>
                        <ul className="list-group" style={{ position: 'absolute', width: '100%'}}>
                            {
                            filteredMuscleGroups.map((muscleGroup) => (
                                <button type="button" className="list-group-item list-group-item-action" onClick={() => handleMuscleSelection({id: muscleGroup.item.id, exercise_name: muscleGroup.item.name})} key={muscleGroup.item.id}>{muscleGroup.item.name}</button>
                            ))}
                        </ul>
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
