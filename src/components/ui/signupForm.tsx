import axios from "axios";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  // const apiUrl = process.env.REACT_APP_API_URL; // will be 'http://localhost:8080'
  const [errorMessage, setErrorMessage] = useState<String | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const payload = Object.fromEntries(formData);

    axios
      .post(import.meta.env.VITE_APP_API_URL?.concat("/users/create"), payload)
      .then((response) => {
        navigate("/");
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 409) {
            setErrorMessage(
              "Email is already taken. Please use a different one or reset password"
            );
          } else {
            setErrorMessage("An error has occured");
          }
        }
      });
  };
  return (
    <>
      <div className="form-container">
        <p className="title">Sign Up</p>
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="FirstName1">First Name</label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              placeholder=""
            />
          </div>
          <div className="input-group">
            <label htmlFor="FirstName1">Email Address</label>
            <input type="text" name="email" id="email" placeholder="" />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder=""
            />
          </div>
          <button type="submit" className="sign">
            Sign up
          </button>
        </form>
        <p className="signup">
          Already have an account?{" "}
          <a rel="noopener noreferrer" href="/login" className="">
            Login here
          </a>
        </p>
      </div>
    </>
  );
};

export default SignupForm;
