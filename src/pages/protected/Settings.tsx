import Header from "../../components/ui/header";
import '../../css/settings.css'


function Settings() {
    return(<>
        <Header showNav={true} textColor="white" loggedIn={true}/>
        <div className="settings-grid">
            <div className="settings-row">
                add import bodyweight, sets, and  from a .csv file 
            </div>
        </div>
    </>)
}

export default Settings;