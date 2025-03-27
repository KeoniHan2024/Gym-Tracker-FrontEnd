import axios from "axios";

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