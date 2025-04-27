import Button from "./ui/button";
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router-dom";


function Hero() {
    const navigate = useNavigate();

    
    return (
        <>
        <section className="hero-container">
            <div className="hero-container__overlay"/>
            <img className="hero-container_img" src="images/hero-image.jpg"/>
            <div className="hero-container__content h-100 container-custom position-relative">
                <div className="d-flex h-100 align-items-center hero__content-width">
                    <div className="text-white">
                        <h1 className="fw-bold mb-4 hero-container__heading">Gym progress starts today!</h1>
                        <p className="lead mb-4">Start tracking your progress with ease!</p>
                        <div className="d-flex gap-3">            
                            <Button text="Signup" onClick={() => navigate("signup")} variant="md"/>
                            <Button text="Login" onClick={() => navigate("login")} variant="md"/>
                        </div>
                    </div>
                </div>
            </div>
            {/* <a href="#scroll-down" className="hero-container__scroll-btn">
                Explore <FontAwesomeIcon className="downArrow" icon={faArrowDown} style={{color: "#ffffff",}} />
            </a> */}
        </section>
            {/* <a id="scroll-down"></a>

        <section className="steps container-custom">
            <div className="row">
                <div className="col-12 col-sm-6 d-md-flex justify-content-md-center">
                    <img src="images/track-progress.jpg" width="1182" height="1174" loading="lazy" alt="Track Progress"></img>
                </div>
            </div>

        </section> */}
      
        </>
    );
}

export default Hero;