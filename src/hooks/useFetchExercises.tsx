import { useEffect,useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_GET_EXERCISES = (import.meta.env.VITE_APP_API_URL?.concat("/exercises/")) as string
const API_GET_NON_EMPTY_EXERCISES = (import.meta.env.VITE_APP_API_URL?.concat("/exercises/notnull")) as string

export function useFetchExercises(token: string, newExercises:number): Exercise[] {
    const [exercises, setExercises] = useState<Exercise[]>([])
    const navigate = useNavigate();

    useEffect(() => {

        axios.get(API_GET_EXERCISES, {
            headers: {Authorization: `Bearer ${token}`}
        }).then((response) => {
            setExercises(response.data);

        }).catch(err => {  
            localStorage.removeItem("token")
            navigate("/login", { state: "Login Session has expired" })
        })
    }, [token, newExercises, navigate])

    return exercises;
}


export function useFetchNonEmptyExercises(token: string, newExercises:number): Exercise[] {
    const [exercises, setExercises] = useState<Exercise[]>([])
    const navigate = useNavigate();

    useEffect(() => {

        axios.get(API_GET_NON_EMPTY_EXERCISES, {
            headers: {Authorization: `Bearer ${token}`}
        }).then((response) => {
            setExercises(response.data);

        }).catch(err => {  
            localStorage.removeItem("token")
            navigate("/login", { state: "Login Session has expired" })
        })
    }, [token, newExercises, navigate])

    return exercises;
}
