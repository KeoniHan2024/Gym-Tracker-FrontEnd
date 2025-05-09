import { FormEvent, useRef, useState } from "react";
import DeleteSettingsContainer from "../../components/ui/deleteSettingsContainer";
import Header from "../../components/ui/header";
import ImportSettingsContainer from "../../components/ui/importSettingsContainer";
import "../../css/settings.css";
import axios from "axios";

const API_IMPORT_BODYWEIGHTS = import.meta.env.VITE_APP_API_URL?.concat(
  "/bodyweights/import/"
) as string;

function Settings() {
  const token = localStorage.getItem("token");
  const fileInputRef = useRef<HTMLInputElement>(null);
  //IMPORT BW MODAL
  const [showBWModal, setShowBWModal] = useState<Boolean>(false);

  //IMPORT SETS MODAL

  //FORM handlers
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
          console.log(response.data);
        })
        .catch((err) => {
          if (err.response.data.message == "Token Expired") {
            localStorage.removeItem("token");
          }
        });
    }
  };

  const props = { showBWModal, setShowBWModal };
  return (
    <>
      <Header showNav={true} textColor="white" loggedIn={true} />
      {props.showBWModal && (
        <div className="modal-div">
          <div className="form-container">
            <form id="import-bodyweight" onSubmit={handleImportBodyweight}>
              <input id="file" type="file" accept=".csv" ref={fileInputRef} />
              <button type="submit">Submit</button>
            </form>
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
            <DeleteSettingsContainer />
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
