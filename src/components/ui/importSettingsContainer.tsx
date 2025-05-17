import { useState } from "react";

interface importSettingsProps {
    showBWModal: Boolean;
    setShowBWModal: React.Dispatch<React.SetStateAction<Boolean>>;
    showSetsModal: Boolean;
    setShowSetsModal: React.Dispatch<React.SetStateAction<Boolean>>;
}

function ImportSettingsContainer({ props }: { props: importSettingsProps }) {
    
    const handleBodyweightModal = () => {
        props.setShowBWModal(!props.showBWModal)
    }
    const handleSetsModal = () => {
      props.setShowSetsModal(!props.showSetsModal)
    }


  return (
    <>
      <div className="settings-button-container">
        <button onClick={handleBodyweightModal}>Import Bodyweights</button>
        <button onClick={handleSetsModal}>Import Sets</button>
        <button onClick={handleSetsModal}>Import Exercises (Doesn't work yet)</button>
      </div>
    </>
  );
}

export default ImportSettingsContainer;
