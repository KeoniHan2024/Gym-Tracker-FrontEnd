import { FormEvent, useEffect, useState } from "react";
import { convertToSeconds } from "../../utils/helpers";
import { useFuzzySearchList } from "@nozbe/microfuzz/react";
import { InputChangeEvent } from "../../types";
import axios from "axios";

const CreateSetForm = () => {
    const token = localStorage.getItem("token") as string;
    const [exercises, setExercises] = useState<Exercise[]>([]); // keeps track of exercises from the user and the default one
    const [newSets, setNewSets] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredExercises, setFilteredExercises] = useState<any[]>([]);
    const [exerciseList, setExerciseList] = useState<Exercise[]>([]); // gets the list of exercises when component is mounted so that the fuzzy search can work on this
    const API_GET_EXERCISES = import.meta.env.VITE_APP_API_URL?.concat(
      "/exercises"
    ) as string;
    const [exerciseType, setExerciseType] = useState<String>("weight");
    const [errorMessage, setErrorMessage] = useState<String>();
    const [successMessage, setsuccessMessage] = useState<String>();
  
    // today's date
    const date = new Date();
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    const todayDate = yyyy + "-" + mm + "-" + dd;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const API_URL_CREATE_SET = import.meta.env.VITE_APP_API_URL?.concat(
      "/sets/createSet"
    ) as string;
    const formData = new FormData(event.target as HTMLFormElement);
    var payload = Object.fromEntries(formData);
    const date_worked = payload.date + " 00:00:00";
    const duration_seconds = convertToSeconds(
      payload.hours as string,
      payload.minutes as string,
      payload.seconds as string
    );

    
    switch (exerciseType) {
        case "weight":
          payload = {
            exercise_type: exerciseType as FormDataEntryValue,
            exercise_name: payload?.exerciseName,
            weight: payload.weight,
            units: payload.units,
            reps: payload.reps,
            date_worked: date_worked,
            notes: payload.notes,
          };
          break;
        case "distance":
          payload = {
            exercise_type: exerciseType as FormDataEntryValue,
            exercise_name: payload?.exerciseName,
            distance: payload.distance,
            units: payload.units,
            date_worked: date_worked,
            notes: payload.notes,
          };
          break;
        case "time":
          payload = {
            exercise_type: exerciseType as FormDataEntryValue,
            exercise_name: payload?.exerciseName,
            duration_seconds: duration_seconds as FormDataEntryValue,
            date_worked: date_worked,
            notes: payload.notes,
          };
          break;
      }
  
      axios
        .post(
          API_URL_CREATE_SET,
          {
            payload,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          setErrorMessage("");
          setsuccessMessage(response.data.message);
          setNewSets((prev) => prev + 1); // when an exercise is created successfully wit will then update the count which the useeffect is dependent on
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.status === 400) {
              setsuccessMessage("");
              setErrorMessage(err.response.data.message);
            }
          }
        });
    
  };

  let filteredList = useFuzzySearchList({
    list: exerciseList,
    queryText: searchQuery,
    getText: (item) => [item.exercise_name],
    mapResultItem: ({ item, score, matches: [highlightRanges] }) => ({
      item,
      highlightRanges,
    }),
  });

  // get initial list of exercises
  useEffect(() => {
    axios
      .get(API_GET_EXERCISES, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setExerciseList(response.data);
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 409) {
            // setErrorMessage("Email is already taken. Please use a different one or reset password");
            console.log("Error");
          } else {
            // setErrorMessage("An error has occured");
            console.log("Error");
          }
        }
      });
  }, []);

  const handleSearchChange = (event: InputChangeEvent) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query.length == 0) {
      filteredList = [];
    }
    setFilteredExercises(filteredList.splice(0, 4));
    console.log(filteredExercises);
  };
  
  function handleExerciseSelection(selectedExercise: Exercise) {
    setSearchQuery(selectedExercise.exercise_name);
    setFilteredExercises([]);
  }

  return (
    <>
      <div className="form-container">
        <p className="title">Add Set</p>
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}
        {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="exerciseNameField">Exercise</label>
            <input
              type="text"
              name="exerciseName"
              id="exerciseNameField"
              placeholder="Enter Exercise"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <ul
            className="list-group"
            style={{ position: "absolute", width: "100%", zIndex: '100'}}
          >
            {filteredExercises.map((exercise) => (
              <button
                type="button"
                className="input-group-item"
                onClick={() =>
                  handleExerciseSelection({
                    exercise_id: exercise.item.id,
                    exercise_name: exercise.item.exercise_name
                  })
                }
                key={exercise.item.id}
              >
                {exercise.item.exercise_name}
              </button>
            ))}
          </ul>
          <div className="input-group">
            <div className="form-column">
              <label htmlFor="dateField">Date</label>
              <input
                type="date"
                name="date"
                id="dateField"
                defaultValue={todayDate}
              />
            </div>
            <div className="form-column">
              <label htmlFor="typeField">Type</label>
              <select
                name="type"
                id="typeField"
                onChange={(e) => {
                  setExerciseType(e.target.value);
                }}
              >
                <option value="weight">Weight</option>
                <option value="distance">Distance</option>
                <option value="time">Time</option>
              </select>
            </div>
          </div>

          <div className="input-group">
            <div className="form-column">
              {exerciseType == "weight" && (
                <>
                  <label htmlFor="weightField">Weight</label>
                  <input
                    type="number"
                    name="weight"
                    id="weightField"
                    placeholder="Weight"
                  />
                </>
              )}
            </div>
            <div className="form-column">
              {exerciseType == "weight" && (
                <>
                  <label htmlFor="repsField">Units</label>
                  <select name="units" id="unitsField">
                    {exerciseType == "weight" && (
                      <>
                        <option value="lbs">lbs</option>
                        <option value="kgs">kgs</option>
                      </>
                    )}
                    {exerciseType == "distance" && (
                      <>
                        <option value="mi">mi</option>
                        <option value="km">km</option>
                      </>
                    )}
                  </select>
                </>
              )}
            </div>
          </div>

          {exerciseType == "time" && (
            <>
              <div className="input-group">
                <label htmlFor="duration">Duration (HH:MM:SS):</label>
                <div className="d-flex">
                  <input
                    type="number"
                    id="hoursField"
                    name="hours"
                    min="0"
                    placeholder="HH"
                  />
                  <span className="mx-1 my-1">:</span>
                  <input
                    type="number"
                    id="minutesField"
                    name="minutes"
                    min="0"
                    max="59"
                    placeholder="MM"
                  />
                  <span className="mx-1 my-1">:</span>
                  <input
                    type="number"
                    id="secondsField"
                    name="seconds"
                    min="0"
                    max="59"
                    placeholder="SS"
                  />
                </div>
              </div>
            </>
          )}

          {exerciseType == "distance" && (
            <>
              <div className="input-group">
                <div className="form-column">
                  <label htmlFor="distanceField">Distance</label>
                  <input
                    type="number"
                    name="distance"
                    id="distanceField"
                    placeholder="Distance"
                  />
                </div>
                <div className="form-column">
                  {(exerciseType == "distance") && (
                    <>
                      <label htmlFor="repsField">Units</label>
                      <select
                        name="units"
                        id="unitsField"
                      >
                        {exerciseType == "weight" && (
                          <>
                            <option value="lbs">lbs</option>
                            <option value="kgs">kgs</option>
                          </>
                        )}
                        {exerciseType == "distance" && (
                          <>
                            <option value="mi">mi</option>
                            <option value="km">km</option>
                          </>
                        )}
                      </select>
                    </>
                  )}
                </div>
              </div>
            </>
          )}

          <div className="input-group">
            <div className="form-column">
              {exerciseType == "weight" && (
                <>
                  <label htmlFor="repsField">Reps</label>
                  <input
                    type="number"
                    name="reps"
                    id="repsField"
                    placeholder="Reps"
                  />
                </>
              )}
            </div>
          </div>
          <div className="input-group">
            <div className="form-column">
              <label htmlFor="notesField ">Notes</label>
              <textarea
                style={{ overflowY: "auto" }}
                name="notes"
                id="notesField"
                placeholder="Enter Notes"
              />
            </div>
          </div>
          <button type="submit" className="sign">
            Create Set
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateSetForm;
