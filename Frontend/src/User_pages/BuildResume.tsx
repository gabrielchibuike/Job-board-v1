import MainContainer from '../Reuseables/MainContainer'
import Nav from '../Components/Nav'
import ResumeComponent from '../Reuseables/ResumeComponent'
import Footer from '../Components/Footer'

function BuildResume() {
    return (
        <>
            <MainContainer>
                <Nav activeRoute={'/build-resume'} />
                <ResumeComponent />
                <Footer />
            </MainContainer>
        </>
    )
}

export default BuildResume