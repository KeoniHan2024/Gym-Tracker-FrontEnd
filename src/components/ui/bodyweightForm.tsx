import axios from "axios";
import { FormEvent } from "../../types";

const BodyWeightForm = () => {
  const token = localStorage.getItem("token") as string;
  const date = new Date();
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  const todayDate = yyyy + "-" + mm + "-" + dd;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const API_URL_CREATE_BODYWEIGHT = import.meta.env.VITE_APP_API_URL?.concat(
          "/bodyweights/create"
        ) as string;
        const formData = new FormData(event.target as HTMLFormElement);
        var payload = Object.fromEntries(formData);
        const date_worked = payload.date + " 00:00:00";
      
        axios
        .post(
          API_URL_CREATE_BODYWEIGHT,
          {
            payload,
            date_worked
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          // setErrorMessage("");
          // setsuccessMessage(response.data.message);
          // setNewSets((prev) => prev + 1); // when an exercise is created successfully wit will then update the count which the useeffect is dependent on
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.status === 400) {
              // setsuccessMessage("");
              // setErrorMessage(err.response.data.message);
            }
          }
        });

  }



  return (
    <>
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
        <p className="title">Log Bodyweight</p>
        {/* {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}
        {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
        )} */}
        <div className="input-group">
          <label htmlFor="bodyWeightField">Body Weight</label>
          <input
            type="number"
            name="bodyWeight"
            id="bodyWeightField"
            placeholder="Enter Weight"
            />
        </div>
        <div className="input-group">
          <div className="form-column">
            <label htmlFor="bodyWeightField">Units</label>
            <select name="type" id="unitsField">
              <option value="lb">lbs</option>
              <option value="kg">kgs</option>
            </select>
          </div>
          <div className="form-column">
            <label htmlFor="dateField">Date</label>
            <input
              type="date"
              name="date"
              id="dateField"
              defaultValue={todayDate}
              />
          </div>
        </div>
        <button type="submit" className="sign">
          Enter weight
        </button>
              </form>
      </div>

      {/* <div className="form-group" style={{ position: 'relative' }}>
                            <label htmlFor="muscleGroupsField">Muscle Groups</label>
                            <input type="text" name="muscleGroup" className="form-control" id="muscleGroupsField" placeholder="Add Muscle Group" value={searchQuery} onChange={handleSearchChange}/>
                            <ul className="list-group" style={{ position: 'absolute', width: '100%'}}>
                                {
                                filteredMuscleGroups.map((muscleGroup) => (
                                    <button type="button" className="list-group-item list-group-item-action" onClick={() => handleMuscleSelection({id: muscleGroup.item.id, exercise_name: muscleGroup.item.name})} key={muscleGroup.item.id}>{muscleGroup.item.name}</button>
                                ))}
                            </ul>
                        </div> */}
    </>
  );
};

export default BodyWeightForm;
