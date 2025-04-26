const BodyWeightForm = () => {
  const date = new Date();
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  const todayDate = yyyy + "-" + mm + "-" + dd;
  return (
    <>
      <div className="form-container">
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
