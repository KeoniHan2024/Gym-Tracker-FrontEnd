import Header from "../../components/ui/header";
import CreateSetForm from "../../components/ui/createSetForm";
import "../../css/sets.css";
import "../../css/containers.css";
import { useFetchSets } from "../../hooks/useFetchSets";
import { useState } from "react";
import axios from "axios";

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
  const [expandedDate, setExpandedDate] = useState<string | null>(null);
  const days: [date: string, setsForDay: Set[]] = useFetchSets(token, newSets);

  const [editForm, setEditForm] = useState<Exercise>({
    exercise_id: -1,
    exercise_name: "",
    is_default: -1,
  });
  const [showEditForm, setShowEditForm] = useState<Boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<Boolean>(false);
  const [deleteForm, setDeleteForm] = useState<Exercise>({
    exercise_id: -1,
    exercise_name: "",
    is_default: -1,
  });

  const [setId,setSetId] = useState<string>("");

  const DELETE_SET_API = import.meta.env.VITE_APP_API_URL?.concat(
    "/sets/"
  ) as string;

  const handleDateClick = (date: string) => {
    setExpandedDate(expandedDate === date ? null : date);
  };

  const handleDeleteClick = (set_id: string) => {
    setShowDeleteModal(true);
    setSetId(set_id);
  }

  const handleConfirmDelete = () => {
    axios.delete(DELETE_SET_API + setId,
      {headers: { Authorization: `Bearer ${token}` }}
   ).then((response) => {
     setNewSets((prev) => prev + 1)
     setShowEditForm(false);
      setShowDeleteModal(false);
   }).catch((err) => {
     if (err.response.data.message == "Token Expired") {
       localStorage.removeItem("token");
       // navigate("/login", { state: "Login Session has expired" });
     }
     // setErrorMessage(err.response.data.message);
     // setSuccessMessage("");
   });
  }

  const handleModalClose = () => {
    setShowEditForm(false);
    setShowDeleteModal(false);
  };



  // set[0] is date
  return (
    <>
      <Header showNav={true} textColor={"white"} loggedIn={true} />
      {showDeleteModal && (
        <div className="modal-div">
          <div className="form-container delete-form">
            <div className="modal-row exit-row">
              <button onClick={handleModalClose}>X</button>
            </div>
            <p className="title">
              Are you sure you want to delete this Set?
            </p>
            <p className="form-warning">YOU CANNOT UNDO THIS ACTION!</p>
            <div className="modal-row submit-row">
              <button className="delete-button" onClick={handleConfirmDelete}>
                CONFIRM
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="sets-grid">
        <div className="sets-row">
          <CreateSetForm newSets={newSets} setNewSets={setNewSets} />
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
                              <div className="set-text" key={set.set_id}>
                                <div className="">
                                  - {set.reps} reps of {set.weight} lbs
                                </div>
                                <div className="">
                                  <button
                                    className="settings-button edit"
                                    // onClick={() => handleEditClick(exercise)}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    className="settings-button delete"
                                    onClick={() => handleDeleteClick(set.set_id)}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
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
