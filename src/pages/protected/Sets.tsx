import Header from "../../components/ui/header";
import CreateSetForm from "../../components/ui/createSetForm";
import "../../css/sets.css";

function Sets() {
  return (
    <>
      <Header showNav={true} textColor={"white"} loggedIn={true} />
      <div className="sets-grid">
        <div className="sets-row">
          <CreateSetForm />
          <div className="sets-column">
            <p className="sets-header">Entered Sets</p>
            <ul>
              <button type="button" className="list-group-item">
                <p className="sets-button-name">Test</p>
                <button type="button" className="sets-button edit"> Edit </button>
                <button type="button" className="sets-button delete"> Delete </button>
              </button>
            </ul>
          </div>
        </div>
      </div>
      {/* <SetsView /> */}
    </>
  );
}

export default Sets;
