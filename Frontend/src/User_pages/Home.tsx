import MainContainer from "../Reuseables/MainContainer";
import Nav from "../Components/Nav";
import PopularSearch from "../Components/PopularSearch";
import CardSection from "../Components/CardSection";
import GetStarted from "../Components/GetStarted";
import Footer from "../Components/Footer";
import SideNav from "../Components/SideNav";
import SearchInput from "../Reuseables/SearchInput";

function Home() {
  return (
    <>
      <MainContainer>
        <SideNav />
        <Nav activeRoute={"/"} />
        <div className="px-20 max-lg:px-4">
          <div className="">
            <SearchInput />
            <PopularSearch />
            <GetStarted />
            <CardSection />
            <GetStarted />
          </div>
        </div>
        <Footer />
      </MainContainer>
    </>
  );
}

export default Home;
