import Header from "../components/ui/header";
import Hero from "../components/Hero";

function HomeScreen() {
  return (
    <>
      <Header showNav={false} textColor="white" loggedIn={true}></Header>
      <Hero></Hero>
    </>
  );
}

export default HomeScreen;
