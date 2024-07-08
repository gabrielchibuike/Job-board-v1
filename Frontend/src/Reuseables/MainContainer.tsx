import React from 'react'
interface MainContainerType {
    children: React.ReactNode;
}
function MainContainer({ children }: MainContainerType) {
    return (
        <>
            <div className='w-full min-h-screen'>
                {children}
            </div>
        </>
    )
}

export default MainContainer