import { useEffect, useState } from "react";
import BodyWeightForm from "../../components/ui/bodyweightForm";
import BodyweightGraph from "../../components/ui/bodyweightGraph";
import Header from "../../components/ui/header";
import "../../css/bodyweights.css";
import "../../css/containers.css";
import axios from "axios";
import { FormEvent } from "../../types";

interface BodyweightObject {
  bodyweight_id: number | string;
  user_id?: number;
  weight: number  | string;
  log_date: string;
  units: string;
}
const API_GET_BODYWEIGHTS = import.meta.env.VITE_APP_API_URL?.concat(
  "/bodyweights/"
) as string;
const API_DELETE_BODYWEIGHT = import.meta.env.VITE_APP_API_URL?.concat(
  "/bodyweights/"
) as string;

const API_EDIT_BODYWEIGHT = import.meta.env.VITE_APP_API_URL?.concat(
  "/bodyweights/"
) as string;

function Bodyweight() {
  const token = localStorage.getItem("token");
  const [data, setData] = useState<BodyweightObject[]>([]);
  const [newBodyweights, setNewBodyweights] = useState(0);
  const [editForm, setEditForm] = useState<BodyweightObject>({
    bodyweight_id: -1,
    weight: 0,
    log_date: "",
    units: "",
  });
  const [showEditForm, setShowEditForm] = useState<Boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<Boolean>(false);
  const [deleteForm, setDeleteForm] = useState<BodyweightObject>({
    bodyweight_id: -1,
    weight: 0,
    log_date: "",
    units: "",
  });

  useEffect(() => {
    axios
      .get(API_GET_BODYWEIGHTS, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setData(response.data.rawData);
      })
      .catch((err) => {
        // localStorage.removeItem("token")
      });
  }, [newBodyweights]);

  const handleModalClose = () => {
    setShowEditForm(false);
    setShowDeleteModal(false);
    // setSuccessMessage("");
    // setErrorMessage("");
  };

  const handleDeleteClick = (bodyweight: BodyweightObject) => {
    setDeleteForm({
      bodyweight_id: bodyweight.bodyweight_id,
      weight: bodyweight.weight,
      log_date: bodyweight.log_date,
      units: bodyweight.units,
    });
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(API_DELETE_BODYWEIGHT + deleteForm.bodyweight_id, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setShowDeleteModal(false);
        setNewBodyweights((prevCount) => prevCount - 1);
        // setSuccessMessage(response.data.message);
        // setErrorMessage("");
      })
      .catch((err) => {
        if (err.response.data.message == "Token Expired") {
          localStorage.removeItem("token");
          // navigate("/login", { state: "Login Session has expired" });
        }
        // setErrorMessage(err.response.data.message);
        // setSuccessMessage("");
      });
  };

  const handleEditClick = (bodyweight: BodyweightObject) => {
    setEditForm({
      bodyweight_id: bodyweight.bodyweight_id,
      weight: bodyweight.weight,
      log_date: bodyweight.log_date.split("T")[0],
      units: bodyweight.units,
    });
    setShowEditForm(true);
  };

  const handleSaveClick = (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const payload = Object.fromEntries(formData);
    axios
      .patch(
        API_EDIT_BODYWEIGHT + editForm.bodyweight_id,
        {
          payload,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        setNewBodyweights((prevCount) => prevCount + 1);
        // setSuccessMessage(response.data.message);
        // setErrorMessage("");
      })
      .catch((err) => {
        if (err.response.data.message == "Token Expired") {
          localStorage.removeItem("token");
          // navigate("/login", { state: "Login Session has expired" });
        }
        // setErrorMessage(err.response.data.message);
        // setSuccessMessage("");
        // localStorage.removeItem("token");
        // navigate("/login", { state: "Login Session has expired" });
      });
  };
  return (
    <>
      <Header showNav={true} textColor="white" loggedIn={true}></Header>
      {showDeleteModal && (
        <div className="modal-div">
          <div className="form-container delete-form">
            <div className="modal-row exit-row">
              <button onClick={handleModalClose}>X</button>
            </div>
            <p className="title">
              Are you sure you want to delete this logged bodyweight?
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
            <div className="modal-row exit-row">
              <button onClick={handleModalClose}>X</button>
            </div>
            <p className="title">Edit Exercise</p>
            {/* {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}
            {successMessage && (
              <div className="alert alert-success">{successMessage}</div>
            )} */}
            <form className="form" onSubmit={handleSaveClick}>
              <div className="input-group">
                <label htmlFor="logDateField">Date</label>
                <input
                  type="date"
                  name="log_date"
                  id="logDateField"
                  value={editForm.log_date}
                  onChange={(e) => {
                    setEditForm({
                      bodyweight_id: editForm.bodyweight_id,
                      weight: editForm.weight,
                      log_date: e.target.value,
                      units: editForm.units,
                    });
                  }}
                />
                <label htmlFor="weightField">Weight</label>
                <input
                  type="number"
                  name="weight"
                  id="weightField"
                  value={editForm.weight}
                  onChange={(e) => {
                    setEditForm({
                      bodyweight_id: editForm.bodyweight_id,
                      weight: e.target.value,
                      log_date: editForm.log_date,
                      units: editForm.units,
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

      <div className="bodyweight-grid">
        <div className="bodyweight-row">
          <BodyWeightForm />
          <div className="bodyweight-graph-container">
            <div className="bodyweight-graph-row">
              <BodyweightGraph />
            </div>
          </div>
        </div>
        <div className="bodyweight-row">
          <ul className="bodyweight-list">
            {data.map((bodyweight) => (
              <>
                <li className="list-group-item">
                  <p style={{ fontSize: "24px" }}>
                    {bodyweight.log_date.split("T")[0]}:{" "}
                    {bodyweight.weight}
                  </p>
                  <div>
                    <button
                      className="exercises-button edit"
                      onClick={() => handleEditClick(bodyweight)}
                    >
                      Edit
                    </button>
                    <button
                      className="exercises-button delete"
                      onClick={() => handleDeleteClick(bodyweight)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              </>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Bodyweight;
