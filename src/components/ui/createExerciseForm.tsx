import { useEffect, useState } from "react";
import { fetchMuscleGroups, handleExerciseSubmit } from "../../services/ExercisesServices";
import { InputChangeEvent } from "../../types";
import { useFuzzySearchList } from "@nozbe/microfuzz/react";
import { useNavigate } from "react-router-dom";
import { useFetchExercises } from "../../hooks/useFetchExercises";

const CreateExerciseForm = () => {
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
  
  return (
    <>
      <div className="form-container">
        <p className="title">Add Custom Exercise</p>
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}
        {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
        )}
        <form
          className="form"
          onSubmit={(e) =>
            handleExerciseSubmit(
              e,
              searchQuery,
              muscleGroups,
              token,
              setNewExercises,
              setErrorMessage,
              setSuccessMessage
            )
          }
        >
          <div className="input-group">
            <label htmlFor="exerciseNameField">Exercise </label>
            <input
              type="text"
              name="exerciseName"
              id="exerciseNameField"
              placeholder="Enter Exercise Name"
            />
          </div>
          <div className="input-group" style={{ position: "relative" }}>
            <div className="form-column">
                <label htmlFor="muscleGroupsField">Muscle Groups</label>
                <input
                  type="text"
                  name="muscleGroup"
                  id="muscleGroupsField"
                  placeholder="Add Muscle Group"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <ul
                  className="list-group-item"
                  style={{ position: "absolute", width: "100%" }}
                >
                  {filteredMuscleGroups.map((muscleGroup) => (
                    <button
                      type="button"
                      className="input-group-item"
                      onClick={() =>
                        handleMuscleSelection({
                          exercise_id: muscleGroup.item.id,
                          exercise_name: muscleGroup.item.name,
                        })
                      }
                      key={muscleGroup.item.id}
                    >
                      {muscleGroup.item.name}
                    </button>
                  ))}
                </ul>
            </div>
          </div>
          <button type="submit" className="sign">
            Create Exercise
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateExerciseForm;
