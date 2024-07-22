import MainContainer from '../Reuseables/MainContainer'
import Nav from '../Components/Nav'
import Footer from '../Components/Footer'

function BuildResume() {
    return (
        <>
            <MainContainer>
                <Nav activeRoute={'/build-resume'} />
                <Footer />
            </MainContainer>
        </>
    )
}

export default BuildResume