import Header from "../../components/ui/header";
import { useFetchExercises, useFetchNonEmptyExercises } from "../../hooks/useFetchExercises";
import { useEffect, useState } from "react";
import { scaleLinear, scaleUtc } from "@visx/scale";
import { curveBasis, curveLinear } from "@visx/curve";
import { LinePath } from "@visx/shape";
import { AxisBottom, AxisLeft } from "@visx/axis";
import LineGraph from "../../components/ui/linegraph";


function Dashboard() {

  const token = localStorage.getItem('token') as string
  const [newExercises, setNewExercises ] = useState<number>(0)
  const exercises = useFetchNonEmptyExercises(token, newExercises)
  const [selectedExercise, setSelectedExercise ] = useState<number>(-1)

  // sets the selected exercise to the first value once the exercises list is fetched
  useEffect(() => {
    if (exercises && exercises.length > 0) {
      setSelectedExercise(exercises[0].exercise_id);
    }
  }, [exercises]);


  return (
    <>
      <Header showNav={true} textColor={"white"} loggedIn={true}/>
      <div className="container d-flex flex-column flex-md-row justify-content-center align-items-center vh-100">
        <div className="col-3-md p-4 m-4 shadow rounded bg-light" style={{ position: 'relative' }}>
            <select onChange={(e) => {setSelectedExercise(parseInt(e.target.value))}}>
              {exercises.map((exercise) => (
                <option value= {exercise.exercise_id} key={exercise.exercise_id}>{exercise.exercise_name}</option>
              ))}
            </select>
          </div>

        <div className="col-md-10 p-4 m-4 shadow rounded " style={{ position: 'relative', backgroundColor:"#111827"}}>
          <LineGraph selectedExercise={selectedExercise}></LineGraph>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
