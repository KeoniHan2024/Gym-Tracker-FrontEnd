import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import "../../css/header.css"


function Header( {showNav, textColor, loggedIn }: {showNav:boolean, textColor:string, loggedIn: boolean} ) {
  return (
    <>
    <div className="header-container">
        <nav className={`navbar navbar-expand-lg bg-transparent text-${textColor}`} >
          <div className="container-fluid">
            {/* {if logged in then the logo goes to dashboard. if not logged in it goes to home page with hero on it} */}
            {!loggedIn && <a className="navbar-brand text-reset" href="/">M<span className="fs-6">uscle</span>M<span className="fs-6">ap</span></a>}
            {loggedIn && <a className="navbar-brand text-reset" href="/Dashboard">M<span className="fs-6">uscle</span>M<span className="fs-6">ap</span></a>}

             {/* Mobile Navigation Toggle - Only visible on mobile */}
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <FontAwesomeIcon icon={faBars} style={{color: `${textColor}`}} />
            </button>

            {/* Dropdown and Navigation Links - Visible on both mobile and desktop */}
            {showNav && <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {/* <li className="nav-item">
                  <a className="nav-link active  text-reset" aria-current="page" href="#">Home</a>
                </li> */}
                <li className="nav-item">
                  <a className="nav-link  text-reset" href="/Sets">Sets</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link  text-reset" href="/Exercises">Exercises</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link  text-reset" href="/Bodyweight">Bodyweight</a>
                </li>
                  {loggedIn && <li className="nav-item">
                  <a className="nav-link text-reset" href="/logout">Logout</a>
                </li>}
              </ul>
            </div>}
            
              
          </div>
        </nav>
        </div>
    </>
  );
}

export default Header;
