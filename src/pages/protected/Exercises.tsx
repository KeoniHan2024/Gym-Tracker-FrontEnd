import { useEffect, useState } from "react";
import Header from "../../components/ui/header";
import axios from "axios";
import { buttonEvent, FormEvent, InputChangeEvent } from "../../types";
import { useFetchExercises } from "../../hooks/useFetchExercises";
import CreateExerciseForm from "../../components/ui/createExerciseForm";
import "../../css/exercises.css";
import { useNavigate } from "react-router-dom";
import { fetchMuscleGroups } from "../../services/ExercisesServices";

function Exercises() {
  const [errorMessage, setErrorMessage] = useState<String>("");
  const [successMessage, setSuccessMessage] = useState<String>("");

  // user's logged in token
  const token = localStorage.getItem("token") as string;
  const [newExercises, setNewExercises] = useState(0); // keeps track of newexercises added. if new one is added it will re render the list
  const exercises = useFetchExercises(token, newExercises);
  const [muscleGroups, setMuscleGroups] = useState<Musclegroup[]>([]);
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

  useEffect(() => {
    const getMuscleGroups = async () => {
      const data: Musclegroup[] = await fetchMuscleGroups();
      setMuscleGroups(data);
    };
    getMuscleGroups();
  }, []);

  const API_EDIT_EXERCISE = import.meta.env.VITE_APP_API_URL?.concat(
    "/exercises/edit/"
  ) as string;
  const API_DELETE_EXERCISE = import.meta.env.VITE_APP_API_URL?.concat(
    "/exercises/delete/"
  ) as string;
  const navigate = useNavigate();

  const handleEditClick = (exercise: Exercise) => {
    setEditForm({
      exercise_id: exercise.exercise_id,
      exercise_name: exercise.exercise_name,
      is_default: 1,
    });
    setShowEditForm(true);
  };

  const handleModalClose = () => {
    setShowEditForm(false);
    setShowDeleteModal(false);
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleSaveClick = (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const payload = Object.fromEntries(formData);
    axios
      .patch(
        API_EDIT_EXERCISE + payload.exercise_id,
        {
          exercise_name: payload?.exercise_name,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        setNewExercises((prevCount) => prevCount + 1);
        setSuccessMessage(response.data.message);
        setErrorMessage("");
      })
      .catch((err) => {
        if (err.response.data.message == "Token Expired") {
          localStorage.removeItem("token");
          navigate("/login", { state: "Login Session has expired" });
        }
        setErrorMessage(err.response.data.message);
        setSuccessMessage("");
        // localStorage.removeItem("token");
        // navigate("/login", { state: "Login Session has expired" });
      });
  };

  const handleDeleteClick = (exercise: Exercise) => {
    setDeleteForm({
      exercise_id: exercise.exercise_id,
      exercise_name: exercise.exercise_name,
      is_default: 1,
    });
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(API_DELETE_EXERCISE + deleteForm.exercise_id, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setShowDeleteModal(false);
        setNewExercises((prevCount) => prevCount - 1);
        setSuccessMessage(response.data.message);
        setErrorMessage("");
      })
      .catch((err) => {
        if (err.response.data.message == "Token Expired") {
          localStorage.removeItem("token");
          navigate("/login", { state: "Login Session has expired" });
        }
        setErrorMessage(err.response.data.message);
        setSuccessMessage("");
      });
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
            <p className="title">
              Are you sure you want to delete {deleteForm.exercise_name}?
            </p>
            <p className="form-warning">
              ALL SETS ASSOCIATED WILL BE DELETED AS WELL
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
      {showEditForm && (
        <div className="modal-div">
          <div className="form-container edit-form">
            <div className="modal-row  exit-row">
              <button onClick={handleModalClose}>X</button>
            </div>
            <p className="title">Edit Exercise</p>
            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}
            {successMessage && (
              <div className="alert alert-success">{successMessage}</div>
            )}
            <form className="form" onSubmit={handleSaveClick}>
              <div className="input-group">
                <label htmlFor="exerciseNameField">Exercise Name</label>
                <input
                  type="text"
                  name="exercise_name"
                  id="exerciseNameField"
                  value={editForm.exercise_name}
                  onChange={(e) => {
                    setEditForm({
                      exercise_name: e.target.value,
                      exercise_id: editForm.exercise_id,
                      is_default: 0,
                    });
                  }}
                />
                <input
                  type="text"
                  name="exercise_id"
                  id="exerciseIdField"
                  defaultValue={editForm.exercise_id}
                />
              </div>
              <button className="sign" type="submit">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="exercises-grid">
        <div className="exercises-row">
          {/* <div className="page-title">EXERCISES</div> */}
        </div>
        <div className="exercises-row second-row">
          <div className="exercises-column">
            <CreateExerciseForm />
          </div>
          <div className="exercises-column">
            <div className="muscle-group-title">Muscle Groups</div>
            <ul className="muscle-group-list">
              {muscleGroups?.map((muscleGroup) => (
                <li>{muscleGroup.name}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="exercises-row">
          <div className="exercises-column second-row">
            <p className="exercises-title">All Exercises</p>
            <ul className="exercise-list">
              {exercises.map((exercise) => (
                <li key={exercise.exercise_id} className="list-group-item">
                  <p>{exercise.exercise_name}</p>
                  {exercise.is_default == 0 && (
                    <div>
                      <button
                        className="exercises-button edit"
                        onClick={() => handleEditClick(exercise)}
                      >
                        Edit
                      </button>
                      <button
                        className="exercises-button delete"
                        onClick={() => handleDeleteClick(exercise)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                  {exercise.is_default == 1 && (
                    <div>
                      <p className="default">default</p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Exercises;
