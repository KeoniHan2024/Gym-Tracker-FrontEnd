import Header from "../../components/ui/header";
import { useFetchExercises, useFetchNonEmptyExercises } from "../../hooks/useFetchExercises";
import { useState } from "react";
import { scaleLinear } from "@visx/scale";
import { curveBasis, curveLinear } from "@visx/curve";
import { LinePath } from "@visx/shape";
import { AxisBottom, AxisLeft } from "@visx/axis";

function Dashboard() {

  const token = localStorage.getItem('token') as string
  const [newExercises, setNewExercises ] = useState<number>(0)
  const exercises = useFetchNonEmptyExercises(token, newExercises)

  const width = 300;
  const height = 200;
  const margin = { top: 20, right: 20, bottom: 20, left: 20 };
  const data = [
    { x: 0, y: 10 },
    { x: 2, y: 30 },
    { x: 4, y: 20 },
    { x: 6, y: 40 },
    { x: 8, y: 25 },
  ];

  const xScale = scaleLinear({
    domain: [0, Math.max(...data.map(d => d.x))],
    range: [margin.left, width - margin.right],
  });

  const yScale = scaleLinear({
    domain: [0, Math.max(...data.map(d => d.y))],
    range: [height - margin.bottom, margin.top], // Invert for SVG coordinates
  });


  return (
    <>
      <Header showNav={true} textColor={"black"} loggedIn={true}/>
      <div className="container d-flex flex-column flex-md-row justify-content-center align-items-center vh-100">
        <div className="col-md-5 p-4 m-4 shadow rounded bg-light ">
          <select>
            {exercises.map((exercise) => (
              <option value= {exercise.exercise_name} key={exercise.id}>{exercise.exercise_name}</option>
            ))}
          </select>
          <svg width="500" height="500">
            <AxisLeft scale={yScale} left={margin.left}></AxisLeft>
            <AxisBottom scale={xScale} top={height - margin.bottom} ></AxisBottom>
          <LinePath
            data={data}
            x={d => xScale(d.x)}
            y={d => yScale(d.y)}
            stroke="steelblue"
            strokeWidth={2}
            fill="none"
            curve={curveLinear} // Apply the curve interpolator here
          />
          </svg>

        </div>
      </div>
    </>
  );
}

export default Dashboard;
