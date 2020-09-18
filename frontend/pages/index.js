import React from 'react'
import Hooks from '../utils/customhook'

const Index = () => {
    const setTest = Hooks()
    React.useEffect(() => {
        setTest("BB")
    }, [])

    return (
        <div className="index-container">
            <img className="index-background" src='background/cover.jpg' alt="cover" />
        </div>
    )
}

// Index.getInitialProps = async (ctx) => {

//     return { result: "Test" }
// }
export default Index