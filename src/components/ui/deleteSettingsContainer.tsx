interface deleteSetingsProps {
  showDeleteBWModal: Boolean;
  setShowDeleteBWModal: React.Dispatch<React.SetStateAction<Boolean>>;
  showDeleteSetsModal: Boolean;
  setShowDeleteSetsModal: React.Dispatch<React.SetStateAction<Boolean>>
}

function DeleteSettingsContainer({ props }: { props: deleteSetingsProps }) {
  const handleBodyweightDeleteModal = () => {
    props.setShowDeleteBWModal(!props.showDeleteBWModal);
  };

  const handleSetsDeleteModal = () => {
    props.setShowDeleteSetsModal(!props.showDeleteBWModal);
  };

  return (
    <>
      <div className="settings-button-container">
        <button onClick={handleBodyweightDeleteModal}>Delete All Bodyweights</button>
        <button onClick={handleSetsDeleteModal}>Delete All Sets</button>
        <button>Delete All Exercises (doesn't work yet)</button>
      </div>
    </>
  );
}

export default DeleteSettingsContainer;
