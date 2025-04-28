import { useEffect,useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_GET_SETS = (import.meta.env.VITE_APP_API_URL?.concat("/sets")) as string

export function useFetchSets(token: string, newSets:number): any {
    const [sets, setSets] = useState<any[]>([])
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(API_GET_SETS, {
            headers: {Authorization: `Bearer ${token}`}
        }).then((response) => {
            // console.log(response.data)
            setSets(Object.entries(response.data["allSets"]))

        }).catch(err => {  
            // localStorage.removeItem("token")
            // navigate("/login", { state: "Login Session has expired" })
        })
    }, [token, newSets, navigate])
    
    return sets;
}