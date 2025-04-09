import Header from "../../components/ui/header";
import { useFetchExercises, useFetchNonEmptyExercises } from "../../hooks/useFetchExercises";
import { useState } from "react";
import { scaleLinear, scaleUtc } from "@visx/scale";
import { curveBasis, curveLinear } from "@visx/curve";
import { LinePath } from "@visx/shape";
import { AxisBottom, AxisLeft } from "@visx/axis";
import Graph from "../../components/ui/graph";


function Dashboard() {

  const token = localStorage.getItem('token') as string
  const [newExercises, setNewExercises ] = useState<number>(0)
  const exercises = useFetchNonEmptyExercises(token, newExercises)

  const width = 300;
  const height = 200;
  const margin = { top: 20, right: 20, bottom: 20, left: 20 };

  const rawData = [
    {date: "01-02-25 00:00:00", reps: 4, weight: 5},
    {date: "01-04-25 00:00:00", reps: 4, weight: 5},
    {date: "01-08-25 00:00:00", reps: 4, weight: 5},
    {date: "01-10-25 00:00:00", reps: 4, weight: 5},
    {date: "02-02-25 00:00:00", reps: 4, weight: 5},
  ]

  const getPounds = (pounds:number) => pounds * 2.20462
  const getDate = (date:string) => new Date(date)

  // convert all weight to pounds 
  // only graph each exercise type at a time. i.e. if distance and time exercises are recorder only do one

  const data = rawData.map((d) => (
    {
      weight: getPounds(d.weight),
      date: getDate(d.date)
    }
  ))

  return (
    <>
      <Header showNav={true} textColor={"black"} loggedIn={true}/>
      <div className="container d-flex flex-column flex-md-row justify-content-center align-items-center vh-100">
        <div className="col-md-5 p-4 m-4 shadow rounded bg-dark" style={{ position: 'relative' }}>
          <select>
            {exercises.map((exercise) => (
              <option value= {exercise.exercise_name} key={exercise.id}>{exercise.exercise_name}</option>
            ))}
          </select>
          <Graph></Graph>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
