import { useState } from "react";

interface importSettingsProps {
    showBWModal: Boolean;
    setShowBWModal: React.Dispatch<React.SetStateAction<Boolean>>;
}

function ImportSettingsContainer({ props }: { props: importSettingsProps }) {
    
    const handleBodyweightModal = () => {
        props.setShowBWModal(!props.showBWModal)
    }


  return (
    <>
      <div className="settings-button-container">
        <button onClick={handleBodyweightModal}>Import Bodyweights</button>
        <button>Import Sets</button>
      </div>
    </>
  );
}

export default ImportSettingsContainer;
