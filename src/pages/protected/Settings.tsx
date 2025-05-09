import { FormEvent, useRef, useState } from "react";
import DeleteSettingsContainer from "../../components/ui/deleteSettingsContainer";
import Header from "../../components/ui/header";
import ImportSettingsContainer from "../../components/ui/importSettingsContainer";
import "../../css/settings.css";
import axios from "axios";

const API_IMPORT_BODYWEIGHTS = import.meta.env.VITE_APP_API_URL?.concat(
  "/bodyweights/import/"
) as string;
const API_DELETE_BODYWEIGHTS = import.meta.env.VITE_APP_API_URL?.concat(
  "/bodyweights/"
) as string;

function Settings() {
  const token = localStorage.getItem("token");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<String>("");
  const [successMessage, setSuccessMessage] = useState<String>("");

  //IMPORT BW MODAL
  const [showBWModal, setShowBWModal] = useState<Boolean>(false);
  const [showDeleteBWModal, setShowDeleteBWModal] = useState<Boolean>(false);

  //IMPORT SETS MODAL

  //FORM handlers
  const handleModalClose = () => {
    setShowBWModal(false);
    setShowDeleteBWModal(false);
    setSuccessMessage("");
    setErrorMessage("");
  };
  // sends file to the backend to import all bodyweight and dates
  const handleImportBodyweight = (e: FormEvent) => {
    e.preventDefault();
    if (fileInputRef.current?.files) {
      const file = fileInputRef.current.files[0];
      const formData = new FormData();
      formData.append("file", file);

      axios
        .post(API_IMPORT_BODYWEIGHTS, formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file uploads
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setErrorMessage("");
          setSuccessMessage("Imported all bodyweights!");
        })
        .catch((err) => {
          if (err.response.data.message == "Token Expired") {
            localStorage.removeItem("token");
          }
          setErrorMessage("Failed to import bodyweights :(");
          setSuccessMessage("");
        });
    }
  };

  const handleDeleteBodyweight = () => {
    axios
      .delete(API_DELETE_BODYWEIGHTS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setErrorMessage("");
        setSuccessMessage("Deleted all bodyweights");
      })
      .catch((err) => {
        if (err.response.data.message == "Token Expired") {
          localStorage.removeItem("token");
        }
        setErrorMessage("Failed to delete bodyweights");
        setSuccessMessage("");
      });
  };

  const props = { showBWModal, setShowBWModal };
  const deleteProps = { showDeleteBWModal, setShowDeleteBWModal };
  return (
    <>
      <Header showNav={true} textColor="white" loggedIn={true} />
      {props.showBWModal && (
        <div className="modal-div">
          <div className="form-container">
            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}
            {successMessage && (
              <div className="alert alert-success">{successMessage}</div>
            )}
            <div className="modal-row exit-row">
              <button onClick={handleModalClose}>X</button>
            </div>
            <form id="import-bodyweight" onSubmit={handleImportBodyweight}>
              <div className="modal-row">
                <input id="file" type="file" accept=".csv" ref={fileInputRef} />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}

      {deleteProps.showDeleteBWModal && (
        <div className="modal-div">
          <div className="form-container">
            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}
            {successMessage && (
              <div className="alert alert-success">{successMessage}</div>
            )}
            <div className="modal-row exit-row">
              <button onClick={handleModalClose}>X</button>
            </div>
            <div className="modal-row exit-row">
              <p>
                Are you sure you want to delete all bodyweights? This function
                cannot be undone
              </p>
            </div>
            <button onClick={handleDeleteBodyweight}>Confirm</button>
          </div>
        </div>
      )}

      <div className="settings-grid">
        <div className="settings-row">
          <div className="settings-column">
            <p>Import</p>
            <ImportSettingsContainer props={props} />
          </div>
          <div className="settings-column">
            <p>Delete</p>
            <DeleteSettingsContainer props={deleteProps} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
