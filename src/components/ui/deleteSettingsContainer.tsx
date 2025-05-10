interface deleteSetingsProps {
  showDeleteBWModal: Boolean;
  setShowDeleteBWModal: React.Dispatch<React.SetStateAction<Boolean>>;
}

function DeleteSettingsContainer({ props }: { props: deleteSetingsProps }) {
  const handleBodyweightDeleteModal = () => {
    props.setShowDeleteBWModal(!props.showDeleteBWModal);
  };

  return (
    <>
      <div className="settings-button-container">
        <button onClick={handleBodyweightDeleteModal}>Delete All Bodyweights</button>
        <button>Delete All Sets</button>
      </div>
    </>
  );
}

export default DeleteSettingsContainer;
