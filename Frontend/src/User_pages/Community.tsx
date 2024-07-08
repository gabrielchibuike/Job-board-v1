import MainContainer from '../Reuseables/MainContainer'
import Nav from '../Components/Nav'

function Community() {
    return (
        <>
            <MainContainer>
                <Nav activeRoute={'/companies'} />
            </MainContainer>
        </>
    )
}

export default Community