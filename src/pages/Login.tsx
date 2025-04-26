import Header from "../components/ui/header";
import "../css/containers.css";
import LoginForm from "../components/ui/loginForm";

function Login() {
  return (
    <>
      <Header showNav={false} textColor={"white"} loggedIn={false} />
      <div className="home-grid">
        <LoginForm />
      </div>
    </>
  );
}

export default Login;
