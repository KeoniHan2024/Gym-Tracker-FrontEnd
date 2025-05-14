import Header from "../../components/ui/header";
import { useFetchNonEmptyExercises } from "../../hooks/useFetchExercises";
import { useEffect, useState } from "react";
import LineGraph from "../../components/ui/averageWeightPerRepGraph";
import "../../css/dashboard.css";

function Dashboard() {
  const token = localStorage.getItem("token") as string;
  const first_name = localStorage.getItem("first_name") as string;
  const [newExercises, setNewExercises] = useState<number>(0);
  const exercises = useFetchNonEmptyExercises(token, newExercises);
  const [selectedExercise, setSelectedExercise] = useState<number>(-1);

  // sets the selected exercise to the first value once the exercises list is fetched
  useEffect(() => {
    if (exercises && exercises.length > 0) {
      setSelectedExercise(exercises[0].exercise_id);
    }
  }, [exercises]);

  return (
    <>
      <Header showNav={true} textColor={"white"} loggedIn={true} />
      <div className="dashboard-grid">
        <div className="dashboard-row">
          <div className="dashboard-welcome">Welcome back {first_name}!</div>
        </div>
        <div className="dashboard-row">
          <div className="graph-container">
            <div className="select-row">
              <select
                onChange={(e) => {
                  setSelectedExercise(parseInt(e.target.value));
                }}
              >
                {exercises.map((exercise) => (
                  <option
                    value={exercise.exercise_id}
                    key={exercise.exercise_id}
                  >
                    {exercise.exercise_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="graph-row">
              <LineGraph selectedExercise={selectedExercise} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
