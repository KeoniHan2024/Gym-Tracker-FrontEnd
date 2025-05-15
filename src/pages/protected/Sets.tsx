import Header from "../../components/ui/header";
import CreateSetForm from "../../components/ui/createSetForm";
import "../../css/sets.css";
import "../../css/containers.css";
import { useFetchSets } from "../../hooks/useFetchSets";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FormEvent } from "../../types";

interface Set {
  date_worked: string;
  distance?: string;
  duration_seconds?: string;
  exercise_id?: number;
  exercise_type?: string;
  set_id: number | string;
  notes?: string;
  reps: number | string;
  units?: string;
  weight: number | string;
  exercise_name?: string;
}
// API ROUTES
const DELETE_SET_API = import.meta.env.VITE_APP_API_URL?.concat(
  "/sets/"
) as string;
const EDIT_SET_API = import.meta.env.VITE_APP_API_URL?.concat(
  "/sets/"
) as string;

function Sets() {
  // usestate variables
  const [newSets, setNewSets] = useState<number>(0);
  const [expandedDate, setExpandedDate] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Set>({
    date_worked: "",
    set_id: 0,
    reps: 0,
    weight: 0,
  });
  const [showEditModal, setShowEditModal] = useState<Boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<Boolean>(false);
  const [deleteForm, setDeleteForm] = useState<Exercise>({
    exercise_id: -1,
    exercise_name: "",
    is_default: -1,
  });
  const [setId, setSetId] = useState<string>("");

  const token = localStorage.getItem("token") as string;
  const days: [date: string, setsForDay: Set[]] = useFetchSets(token, newSets);
  const navigate = useNavigate();

  const handleDateClick = (date: string) => {
    setExpandedDate(expandedDate === date ? null : date);
  };

  const handleDeleteClick = (set_id: string) => {
    setShowDeleteModal(true);
    setSetId(set_id);
  };
  const handleEditClick = (set: Set) => {
    setSetId(set.set_id as string);
    setEditForm({
      date_worked: set.date_worked.split("T")[0],
      set_id: setId,
      reps: set.reps,
      weight: set.weight,
    });
    setShowEditModal(true);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(DELETE_SET_API + setId, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setNewSets((prev) => prev + 1);
        setShowEditModal(false);
        setShowDeleteModal(false);
      })
      .catch((err) => {
        if (err.response.data.message == "Token Expired") {
          localStorage.removeItem("token");
          navigate("/login", { state: "Login Session has expired" });
        }
        // setErrorMessage(err.response.data.message);
        // setSuccessMessage("");
      });
  };

  const handleSaveClick = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    var payload = Object.fromEntries(formData);
    payload.date_worked += " 00:00:00"
    axios
      .patch(EDIT_SET_API + setId, {payload}, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setNewSets((prev) => prev + 1);
        setShowEditModal(false);
        setShowDeleteModal(false);
      })
      .catch((err) => {
        if (err.response.data.message == "Token Expired") {
          localStorage.removeItem("token");
          navigate("/login", { state: "Login Session has expired" });
        }
        // setErrorMessage(err.response.data.message);
        // setSuccessMessage("");
      });
  };

  const handleModalClose = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
  };

  return (
    <>
      <Header showNav={true} textColor={"white"} loggedIn={true} />
      {showDeleteModal && (
        <div className="modal-div">
          <div className="form-container delete-form">
            <div className="modal-row exit-row">
              <button onClick={handleModalClose}>X</button>
            </div>
            <p className="title">Are you sure you want to delete this Set?</p>
            <p className="form-warning">YOU CANNOT UNDO THIS ACTION!</p>
            <div className="modal-row submit-row">
              <button className="delete-button" onClick={handleConfirmDelete}>
                CONFIRM
              </button>
            </div>
          </div>
        </div>
      )}
      {showEditModal && (
        <div className="modal-div">
          <div className="form-container delete-form">
            <div className="modal-row exit-row">
              <button onClick={handleModalClose}>X</button>
            </div>
            <p className="title">Edit Set</p>
            <form className="form" onSubmit={handleSaveClick}>
              <div className="input-group">
                <label htmlFor="exerciseNameField">Date</label>
                <input
                  type="date"
                  name="date_worked"
                  id="dateField"
                  value={editForm.date_worked}
                  onChange={(e) => {
                    setEditForm({
                      date_worked: e.target.value,
                      set_id: setId,
                      reps: editForm.reps,
                      weight: editForm.weight,
                    });
                  }}
                />
                <label htmlFor="weightField">Weight</label>
                <input
                  type="number"
                  name="weight"
                  id="weightField"
                  placeholder="Weight"
                  value={editForm.weight}
                  onChange={(e) => {
                    setEditForm({
                      date_worked: editForm.date_worked,
                      set_id: setId,
                      reps: editForm.reps,
                      weight: e.target.value,
                    });
                  }}
                />
                <label htmlFor="repsField">Reps</label>
                <input
                  type="number"
                  name="reps"
                  id="repsField"
                  value={editForm.reps}
                  placeholder="Reps"
                  onChange={(e) => {
                    setEditForm({
                      date_worked: editForm.date_worked,
                      set_id: setId,
                      reps: e.target.value,
                      weight: editForm.weight,
                    });
                  }}
                />
              </div>
              <button className="sign" type="submit">
                Save Changes
              </button>
            </form>
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
                                    onClick={() => handleEditClick(set)}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    className="settings-button delete"
                                    onClick={() =>
                                      handleDeleteClick(set.set_id)
                                    }
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
