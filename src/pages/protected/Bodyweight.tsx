import Header from "../../components/ui/header"


function Bodyweight() {
    return(<>
        <Header showNav={true} textColor="black" loggedIn={true}></Header>
        <div className="container d-flex flex-column flex-md-row justify-content-center align-items-center vh-100">
            <div className="col-md-5 p-4 m-4 shadow rounded bg-light ">
                <h3>INSERT WEIGHT GRAPH HERE</h3>
                <ul className="listGroup" style={{ maxHeight: '300px', overflowY: 'auto'}}>
                    
                </ul>
            </div>
            <div className="col-md-5 p-4 m-4 shadow rounded bg-light ">
                <h3>INSERT WEIGHT FORM HERE</h3>
                <ul className="listGroup" style={{ maxHeight: '300px', overflowY: 'auto'}}>
                    
                </ul>
            </div>
        </div>
    </>)
}

export default Bodyweight;