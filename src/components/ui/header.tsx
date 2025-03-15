import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';



function Header( {showNav }: {showNav:boolean} ) {
  return (
    <>
    <div className="header-container">
        <nav className="navbar navbar-expand-lg bg-transparent text-white" >
          <div className="container-fluid">
            <a className="navbar-brand text-reset" href="/">M<span className="fs-6">uscle</span>M<span className="fs-6">ap</span></a>

             {/* Mobile Navigation Toggle - Only visible on mobile */}
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <FontAwesomeIcon icon={faBars} style={{color: "#ffffff",}} />
            </button>

            {/* Dropdown and Navigation Links - Visible on both mobile and desktop */}
            {showNav && <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {/* <li className="nav-item">
                  <a className="nav-link active  text-reset" aria-current="page" href="#">Home</a>
                </li> */}
                <li className="nav-item">
                  <a className="nav-link  text-reset" href="#">Link</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle text-reset" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown
                  </a>
                  <ul className="dropdown-menu bg-primary text-reset">
                    <li><a className="dropdown-item text-reset" href="#">Action</a></li>
                    <li><a className="dropdown-item text-reset" href="#">Another action</a></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><a className="dropdown-item text-reset" href="#">Something else here</a></li>
                  </ul>
                </li>
              </ul>
            </div>}
          </div>
        </nav>
        </div>
    </>
  );
}

export default Header;
