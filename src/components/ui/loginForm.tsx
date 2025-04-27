import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";




const LoginForm = () => {
    const [errorMessage, setErrorMessage] = useState<String | null>(null);
    const navigate = useNavigate();
  
    const handleSubmit = (event: FormEvent) => {
      event.preventDefault();
      const formData = new FormData(event.target as HTMLFormElement);
      const payload = Object.fromEntries(formData);
  
      axios
        .post(import.meta.env.VITE_APP_API_URL?.concat("/users/login"), payload)
        .then((response) => {
          const { token, user } = response.data;
          localStorage.setItem("token", token);
          // console.log("User Logged in", user);
          navigate("/Dashboard"); //TODO - CHANGE TO DASHBOARD WITH USER STATS (Protected Route)
        })
        .catch((err) => {
          setErrorMessage("Login Failed");
        });
    };
  
    const location = useLocation();
    const passedData = location.state;
  
    useEffect(() => {
      if (passedData) {
        setErrorMessage(passedData);
      }
    }, [passedData]);
    
    return (<>
        <div className="form-container">
            <p className="title">Login</p>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <form className="form" onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input type="text" name="email" id="email" placeholder="Enter Email" />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter Password"
                />
              </div>
              <button type="submit" className="sign">Sign in</button>
            </form>
            <p className="signup">
              Don't have an account? <a rel="noopener noreferrer" href="/signup" className="">Sign up</a>
            </p>
        </div>
    
    </>)
}

export default LoginForm;