import axios from "axios";
import { useEffect, useState } from "react";

const API_GET_MAXES = import.meta.env.VITE_APP_API_URL?.concat(
  "/sets/getMaxes/"
) as string;

const token = localStorage.getItem("token");

interface maxObject {
  exercise_id: number;
  exercise_name: string;
  max_weight: number;
  reps: number;
  date_worked: string;
  formattedDate?: string;
}

function MaxesContainer({ selectedExercise }: { selectedExercise: number }) {
  const [maxes, setMaxes] = useState<maxObject[]>([]);
  console.log(selectedExercise)

  useEffect(() => {
    axios
      .get(API_GET_MAXES + selectedExercise, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const formattedMaxes = response.data.maxList.map(
          (exercise: { date_worked: string | number | Date }) => ({
            ...exercise,
            formattedDate: new Date(exercise.date_worked).toLocaleDateString(
              "en-US",
              {
                month: "long",
                day: "numeric",
                year: "numeric",
                timeZone: "UTC"
              }
            ),
          })
        );
        setMaxes(formattedMaxes);
      })
      .catch((err) => {
      });
  }, [selectedExercise]);

  return (
    <>
      <ul className="maxes-list">
        {maxes.map((exercise) => (
          <>
            <li className="list-group-item">
              <div className="exercise-name-container">
                <p>{exercise.exercise_name}:</p>
              </div>
              <div className="maxes-container">
                <p>
                    {exercise.max_weight} lbs for {exercise.reps} reps on {" "} 
                    {exercise.formattedDate}
                </p>
              </div>
            </li>
          </>
        ))}
      </ul>
    </>
  );
}

export default MaxesContainer;
