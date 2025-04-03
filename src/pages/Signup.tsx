import Hero from "../components/Hero";
import Header from "../components/ui/header";
import axios from 'axios';
import { useState } from "react";
import { FormEvent } from "../types";
import { useNavigate } from 'react-router-dom';

function Signup() {
    // const apiUrl = process.env.REACT_APP_API_URL; // will be 'http://localhost:8080'
    const [errorMessage, setErrorMessage] = useState<String | null>(null);
    const navigate = useNavigate();

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const payload = Object.fromEntries(formData);
        

        axios.post(import.meta.env.VITE_APP_API_URL?.concat("/users/create"), payload)
        .then(response => {
            navigate('/');
        })
        .catch(err => {
            if (err.response) {
                if (err.response.status === 409) {
                    setErrorMessage("Email is already taken. Please use a different one or reset password");
                }
                else {
                    setErrorMessage("An error has occured");
                }
            }

        })
    }

    return (
        <>
            <Header showNav={false} textColor={"black"} loggedIn={false}/>
            <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
                    <div className="col-md-6 p-4 shadow rounded bg-light">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <h2>Signup</h2>
                                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                                <label htmlFor="exampleInputFirstName1">First Name</label>
                                <input type="text" className="form-control" name="first_name" placeholder="Enter first name"/>
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input type="email" className="form-control" name="email" aria-describedby="emailHelp" placeholder="Enter email"/>
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                            </div>
                            <div className="d-flex justify-content-center py-3">  
                                <button type="submit" className="btn btn-primary center px-3">Submit</button>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-6 text-center py-4">
                        <p>Already have an account? <a href="/login">Login here</a></p> 
                    </div>
            </div>

           
        </>
    )
    
}
export default Signup;