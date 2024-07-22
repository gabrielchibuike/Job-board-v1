import MainContainer from "../Reuseables/MainContainer";
import Nav from "../Components/Nav";
import GetStarted from "../Components/GetStarted";
import SideNav from "../Components/SideNav";
import HeaderSection from "../Components/HeaderSection";
import BodyPage from "../Components/BodyPage";
import CategoryPage from "../Components/CategoryPage";
import CardSection2 from "../Components/CardSection2";
import ReviewPage from "../Components/ReviewPage";
import Footer from "../Components/Footer";


function Home() {
  return (
    <>
      <MainContainer>
        <SideNav />
        <Nav activeRoute={"/"} />
        <div className="px-20  max-lg:px-4">
          <div className="">
            <HeaderSection />
            <BodyPage />
            <CategoryPage />
            <CardSection2 />
            {/* <BillBoard /> */}
            <GetStarted />
            <ReviewPage />
            {/* <SearchInput />
            <PopularSearch />
            <CardSection />
            <GetStarted /> */}
          </div>
        </div>
        <Footer />
      </MainContainer>
    </>
  );
}

export default Home;
