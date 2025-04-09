import Header from "../../components/ui/header"


function Bodyweight() {
    const date = new Date();
    const dd = String(date.getDate()).padStart(2,'0')
    const mm = String(date.getMonth() + 1).padStart(2,'0')
    const yyyy = date.getFullYear()
    const todayDate = yyyy + "-" + mm + "-" + dd

    return(<>
        <Header showNav={true} textColor="black" loggedIn={true}></Header>
        <div className="container d-flex flex-column flex-md-row justify-content-center align-items-center vh-100">
            <div className="col-md-5 p-4 m-4 shadow rounded bg-light ">
                <h3>INSERT WEIGHT GRAPH HERE</h3>
                <ul className="listGroup" style={{ maxHeight: '300px', overflowY: 'auto'}}>
                    
                </ul>
            </div>
            <div className="col-md-5 p-4 m-4 shadow rounded bg-light ">
            
                    <form>
{/*                   
                                        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                                        {successMessage && <div className="alert alert-success">{successMessage}</div>} */}
                        <div className="form-group">
                            <h2>Log Bodyweight</h2>
                            <div className="row">
                                <div className="form-group col-md-8">
                                    <label htmlFor="bodyWeightField">Body Weight</label>
                                    <input type="number" className="form-control" name="bodyWeight" id="bodyWeightField"placeholder="Enter Weight"/>
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="bodyWeightField">Units</label>
                                    <select name="type" className="form-control" id="unitsField">  
                                        <option value="lb">lbs</option>
                                        <option value="kg">kgs</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group col-md-4">
                                <label htmlFor="dateField">Date</label>
                                <input type="date" name="date" className="form-control" id="dateField" defaultValue={todayDate}/>
                            </div>
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
                        <div className="d-flex justify-content-center py-3">  
                            <button type="submit" className="btn btn-primary center px-3">Add</button>
                        </div>
                    </form>
            </div>
        </div>
    </>)
}

export default Bodyweight;