interface exportSettingsProps {
//   showDeleteBWModal: Boolean;
//   setShowDeleteBWModal: React.Dispatch<React.SetStateAction<Boolean>>;
}

function ExportSettingsContainer({ props }: { props: exportSettingsProps }) {
//   const handleBodyweightDeleteModal = () => {
//     props.setShowDeleteBWModal(!props.showDeleteBWModal);
//   };

  return (
    <>
      <div className="settings-button-container">
        <button>Export All Bodyweights (doesn't work yet)</button>
        <button>Export All Sets (doesn't work yet)</button>
        <button>Export All Exercises (doesn't work yet)</button>
      </div>
    </>
  );
}

export default ExportSettingsContainer;
