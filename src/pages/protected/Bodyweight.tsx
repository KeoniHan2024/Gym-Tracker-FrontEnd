import BodyWeightForm from "../../components/ui/bodyweightForm";
import BodyweightGraph from "../../components/ui/bodyweightGraph";
import Header from "../../components/ui/header";
import "../../css/bodyweights.css";

function Bodyweight() {
  return (
    <>
      <Header showNav={true} textColor="white" loggedIn={true}></Header>
      <div className="bodyweight-grid">
        <div className="bodyweight-row">
          <BodyWeightForm />
          <div className="graph-container">
            <div className="bodyweight-graph-row">
            <BodyweightGraph />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Bodyweight;
