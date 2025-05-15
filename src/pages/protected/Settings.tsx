import { FormEvent, useRef, useState } from "react";
import DeleteSettingsContainer from "../../components/ui/deleteSettingsContainer";
import Header from "../../components/ui/header";
import ImportSettingsContainer from "../../components/ui/importSettingsContainer";
import "../../css/settings.css";
import axios from "axios";
import ExportSettingsContainer from "../../components/ui/exportSettingsContainer";

const API_IMPORT_BODYWEIGHTS = import.meta.env.VITE_APP_API_URL?.concat(
  "/bodyweights/import/"
) as string;
const API_DELETE_BODYWEIGHTS = import.meta.env.VITE_APP_API_URL?.concat(
  "/bodyweights/"
) as string;

const API_IMPORT_SETS = import.meta.env.VITE_APP_API_URL?.concat(
  "/sets/import"
) as string;

const API_DELETE_SETS = import.meta.env.VITE_APP_API_URL?.concat(
  "/sets/"
) as string;

function Settings() {
  const token = localStorage.getItem("token");
  const boyweightFile = useRef<HTMLInputElement>(null);
  const setsFile = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<String>("");
  const [successMessage, setSuccessMessage] = useState<String>("");

  //IMPORT BW MODAL
  const [showBWModal, setShowBWModal] = useState<Boolean>(false);
  const [showDeleteBWModal, setShowDeleteBWModal] = useState<Boolean>(false);

  //IMPORT SETS MODAL
  const [showSetsModal, setShowSetsModal] = useState<Boolean>(false);
  const [showDeleteSetsModal, setShowDeleteSetsModal] =
    useState<Boolean>(false);

  //FORM handlers
  const handleModalClose = () => {
    setShowBWModal(false);
    setShowDeleteBWModal(false);
    setShowSetsModal(false);
    setShowDeleteBWModal(false);
    setShowDeleteSetsModal(false);
    setSuccessMessage("");
    setErrorMessage("");
  };
  // sends file to the backend to import all bodyweight and dates
  const handleImportBodyweight = (e: FormEvent) => {
    e.preventDefault();
    if (boyweightFile.current?.files) {
      const file = boyweightFile.current.files[0];
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

  const handleImportSets = (e: FormEvent) => {
    e.preventDefault();
    if (setsFile.current?.files) {
      const file = setsFile.current.files[0];
      const formData = new FormData();
      formData.append("file", file);

      axios
        .post(API_IMPORT_SETS, formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file uploads
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setErrorMessage("");
          setSuccessMessage("Imported all sets!");
        })
        .catch((err) => {
          if (err.response.data.message == "Token Expired") {
            localStorage.removeItem("token");
          }
          setErrorMessage("Failed to import sets :(");
          setSuccessMessage("");
        });
    }
  };

  const handleDeleteAllSets = () => {
    axios
      .delete(API_DELETE_SETS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setErrorMessage("");
        setSuccessMessage("Deleted all sets");
      })
      .catch((err) => {
        if (err.response.data.message == "Token Expired") {
          localStorage.removeItem("token");
        }
        setErrorMessage("Failed to delete sets");
        setSuccessMessage("");
      });
  };

  const props = {
    showBWModal,
    setShowBWModal,
    showSetsModal,
    setShowSetsModal,
    showDeleteSetsModal,
    setShowDeleteSetsModal,
  };
  const deleteProps = {
    showDeleteBWModal,
    setShowDeleteBWModal,
    showDeleteSetsModal,
    setShowDeleteSetsModal,
  };
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
            <p className="title">Import bodyweights (.csv)</p>
            <form id="import-bodyweight" onSubmit={handleImportBodyweight}>
              <div className="modal-row">
                <input
                  id="file"
                  type="file"
                  accept=".csv"
                  ref={boyweightFile}
                />
              </div>
              <div className="modal-row submit-row">
                <button className="sign" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {props.showSetsModal && (
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
            <p className="title">Import Sets (.csv)</p>
            <form id="import-bodyweight" onSubmit={handleImportSets}>
              <div className="modal-row">
                <input id="file" type="file" accept=".csv" ref={setsFile} />
              </div>
              <div className="modal-row submit-row">
                <button className="sign" type="submit">
                  Submit
                </button>
              </div>
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
            <p className="title">DELETE ALL BODYWEIGHTS</p>
            <div className="modal-row">
              <p>
                Are you sure you want to delete all bodyweights? This function
                cannot be undone
              </p>
            </div>
            <div className="modal-row submit-row">
              <button
                className="delete-button"
                onClick={handleDeleteBodyweight}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      {deleteProps.showDeleteSetsModal && (
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
            <p className="title">DELETE ALL SETS</p>
            <div className="modal-row">
              <p>
                Are you sure you want to delete all sets? This function cannot
                be undone
              </p>
            </div>
            <div className="modal-row submit-row">
              <button className="delete-button" onClick={handleDeleteAllSets}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="settings-grid">
        <div className="settings-row">
          <p>Will show tutorial on how to import files in the future</p>
        </div>
        <div className="settings-row">
          <div className="settings-column">
            <p>Import</p>
            <ImportSettingsContainer props={props} />
          </div>
          <div className="settings-column">
            <p>Delete</p>
            <DeleteSettingsContainer props={deleteProps} />
          </div>
          <div className="settings-column">
            <p>Export</p>
            <ExportSettingsContainer props={deleteProps} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
