import Header from "../components/ui/header";
import SignupForm from "../components/ui/signupForm";

function Signup() {
  

  return (
    <>
      <Header showNav={false} textColor={"white"} loggedIn={false} />
      <div className="home-grid">
        <SignupForm/>
      </div>
    </>
  );
}
export default Signup;
