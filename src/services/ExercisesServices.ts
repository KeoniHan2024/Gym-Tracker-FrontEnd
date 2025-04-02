import axios from "axios";
import { buttonEvent, FormEvent, InputChangeEvent } from "../types";

export const fetchMuscleGroups = async (): Promise<Musclegroup[]> => {
    const API_URL_GET_ALL = (import.meta.env.VITE_APP_API_URL?.concat("/musclegroups")) as string
    try {
        const response = await axios.get(API_URL_GET_ALL)
        return response.data
    } catch(error) {
        console.error("Error fetching muscle groups:", error);
        return []; // Return empty array in case of error
    }
}


export const handleExerciseSubmit = (event: FormEvent, 
    searchQuery: string, 
    muscleGroups: Musclegroup[], 
    token: string, 
    setNewExercises:React.Dispatch<React.SetStateAction<number>>
    ) => {
        event.preventDefault();
        const API_URL_CREATE_EXERCISE = (import.meta.env.VITE_APP_API_URL?.concat("/exercises/createExercise")) as string
        const formData = new FormData(event.target as HTMLFormElement);
        const payload = Object.fromEntries(formData);


        const foundMuscle = muscleGroups.find(item => item.name.toLowerCase() === searchQuery.toLowerCase())

        axios.post(API_URL_CREATE_EXERCISE, 
            {
                exercise_name: payload?.exerciseName,
                muscleGroup: foundMuscle?.id
            },
            {
            headers: {Authorization: `Bearer ${token}`}
            }
        ).then((response) => {
            setNewExercises(prev=>prev+1);      // when an exercise is created successfully wit will then update the count which the useeffect is dependent on
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