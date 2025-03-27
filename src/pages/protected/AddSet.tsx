import Header from "../../components/ui/header";

function Dashboard() {
    const handleSubmit = () => {

    }

  return (
    <>
      <Header showNav={true} textColor={"black"} loggedIn={true}/>
      <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
            <div className="col-md-6 p-4 shadow rounded bg-light">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <h2>Add Set</h2>
                        {/* {errorMessage && <div className="alert alert-danger">{errorMessage}</div>} */}
                        <label htmlFor="exerciseNameField">Exercise</label>
                        <input type="text" className="form-control" name="exerciseName" id="exerciseNameField" aria-describedby="emailHelp" placeholder="Enter Exercise"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="weightField">Weight</label>
                        <input type="number" name="weight" className="form-control" id="weightField" placeholder="Weight"/>
                        <label htmlFor="repsField">Reps</label>
                        <input type="number" name="reps" className="form-control" id="repsField" placeholder="Reps"/>
                    </div>
                    <div className="d-flex justify-content-center py-3">  
                        <button type="submit" className="btn btn-primary center px-3">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </>
  );
}

export default Dashboard;
