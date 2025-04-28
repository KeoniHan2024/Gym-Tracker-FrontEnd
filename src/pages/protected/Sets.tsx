import Header from "../../components/ui/header";
import CreateSetForm from "../../components/ui/createSetForm";
import "../../css/sets.css";
import { useFetchSets } from "../../hooks/useFetchSets";
import { useState } from "react";

interface Set {
  date_worked: string;
  distance?: string;
  duration_seconds?: string;
  exercise_id: number;
  exercise_type: string;
  id: number;
  notes?: string;
  reps: number;
  units: string;
  user_id: number;
  weight: number;
  exercise_name?: string;
}

function Sets() {
  const token = localStorage.getItem("token") as string;
  const [newSets, setNewSets] = useState<number>(0);
  const days: [date: string, setsForDay: Set[]] = useFetchSets(token, newSets);
  const [expandedDate, setExpandedDate] = useState<string | null>(null);

  const handleDateClick = (date: string) => {
    setExpandedDate(expandedDate === date ? null : date);
  };

  days.map((day) => console.log(day[1]));
  // set[0] is date
  return (
    <>
      <Header showNav={true} textColor={"white"} loggedIn={true} />
      <div className="sets-grid">
        <div className="sets-row">
          <CreateSetForm />
          <div className="sets-column">
            <p className="sets-header">Entered Sets</p>
            <ul className="set-list">
              {days.length > 0 ? <></> : <></>}

              {days.map(([date, setsByExercise]) => (
                <div key={date as string} className="date-group">
                  <li
                    className="list-group-item"
                    onClick={() => handleDateClick(date as string)} // Add onClick here
                    style={{ cursor: "pointer" }} // Make it clear it's clickable
                  >
                    {date as string}
                  </li>
                  <div
                    className={
                      expandedDate === date
                        ? "setList-Column"
                        : "setList-Column hide-set"
                    }
                  >
                    {Object.entries(setsByExercise).map(
                      ([exerciseId, sets]) => (
                        <div className="exercise-row" key={exerciseId}>
                          <p className="set-exercise-name">
                            Exercise Name: {exerciseId}
                          </p>
                          <ul>
                            {sets.map((set: any) => (
                              <li className="set-text" key={set.id}>
                                {set.reps} reps of {set.weight} lbs
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                    )}
                  </div>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* <SetsView /> */}
    </>
  );
}

export default Sets;
