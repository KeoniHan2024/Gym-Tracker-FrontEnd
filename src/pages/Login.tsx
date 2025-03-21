import Header from "../components/ui/header";
import axios from "axios";
import { FormEvent } from "../types";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";


function Login(){
    const [errorMessage, setErrorMessage] = useState<String | null>(null);
    const navigate = useNavigate();

    
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const payload = Object.fromEntries(formData);

        axios.post('http://localhost:8080/users/login', payload)
        .then(response => {
            const { token, user} = response.data;
            localStorage.setItem("token", token);
            console.log("User Logged in", user);
            navigate('/'); //TODO - CHANGE TO DASHBOARD WITH USER STATS (Protected Route)
        })
        .catch(err => {
            console.log("error");
            setErrorMessage("Login Failed");
        })
    }

    return(
       <>
           <Header showNav={false} textColor={"black"}/>
                <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
                        <div className="col-md-6 p-4 shadow rounded bg-light">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <h2>Login</h2>
                                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <input type="email" className="form-control" name="email" aria-describedby="emailHelp" placeholder="Enter email"/>
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
                            <p>Don't have an account? <a href="/Signup">Signup here</a></p> 
                    </div>
                </div>
       </>
    );
}

export default Login;