import { useEffect, useState } from "react";
import Header from "../../components/ui/header";
import axios from "axios";
import { buttonEvent, FormEvent, InputChangeEvent } from "../../types";
import {
  fetchMuscleGroups,
  handleExerciseSubmit,
} from "../../services/ExercisesServices";
import { useFuzzySearchList, Highlight } from "@nozbe/microfuzz/react";
import { useNavigate } from "react-router-dom";
import { useFetchExercises } from "../../hooks/useFetchExercises";
import CreateExerciseForm from "../../components/ui/createExerciseForm";

function Exercises() {
  // user's logged in token
  const token = localStorage.getItem("token") as string;
  const navigate = useNavigate();
  // const [exercises, setExercises] = useState<Exercise[]>([]); // keeps track of exercises from the user and the default one
  const [newExercises, setNewExercises] = useState(0); // keeps track of newexercises added. if new one is added it will re render the list
  const [muscleGroups, setMuscleGroups] = useState<Musclegroup[]>([]); // gets the list of muscle groups when component is mounted so that the fuzzy search can work on this
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMuscleGroups, setFilteredMuscleGroups] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<String>("");
  const [successMessage, setSuccessMessage] = useState<String>("");

  const exercises = useFetchExercises(token, newExercises);

  let filteredList = useFuzzySearchList({
    list: muscleGroups,
    queryText: searchQuery,
    getText: (item) => [item.name],
    mapResultItem: ({ item, score, matches: [highlightRanges] }) => ({
      item,
      highlightRanges,
    }),
  });

  // get all muscle groups when its loaded
  useEffect(() => {
    const getMuscleGroups = async () => {
      const data: Musclegroup[] = await fetchMuscleGroups();
      // const muscleGroupsList: any[] = JSON.parse(data);
      setMuscleGroups(data);
    };
    getMuscleGroups();
  }, []);

  // whenever the muscle group field is changed it will do a fuzzy search. and if 0 then reset the list to empty
  const handleSearchChange = (event: InputChangeEvent) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query.length == 0) {
      filteredList = [];
    }
    setFilteredMuscleGroups(filteredList.splice(0, 4));

    //if query is in the musclegroup list then set selected muscle to that

    // if not then leave selected muscle as blank
  };

  function handleMuscleSelection(selectedMuscleGroup: Exercise) {
    setSearchQuery(selectedMuscleGroup.exercise_name);
    setFilteredMuscleGroups([]);
  }

  // // update exercise list everytime a new exercise is added
  // const API_GET_EXERCISES = (import.meta.env.VITE_APP_API_URL?.concat("/exercises/")) as string

  // useEffect(() => {

  //     axios.get(API_GET_EXERCISES, {
  //         headers: {Authorization: `Bearer ${token}`}
  //     }).then((response) => {
  //         setExercises(response.data);

  //     }).catch(err => {
  //         localStorage.removeItem("token")
  //         navigate("/login", { state: "Login Session has expired" })
  //     })
  // }, [newExercises])

  return (
    <>
      <Header showNav={true} textColor={"white"} loggedIn={true} />
      <div className="sets-grid">
        <CreateExerciseForm />
      </div>
    </>
  );
}

export default Exercises;
