import './styles.css'
import '../component/NavigationBar'
import NavigationBar from '../component/NavigationBar'
import Footer from '../component/Footer'
import { LoginState } from '../utils/context'
import LoginModal from '../component/Login'

// This default export is required in a new `pages/_app.js` file.
const MyApp = ({ Component, pageProps }) => {
    const [token, setToken] = React.useState(null)
    const [showModal, setShowModal] = React.useState(false)
    const [axiosConfig, setAxiosConfig] = React.useState(null)
    const [menuBar, setMenubar] = React.useState('ลงชื่อเข้าใช้')

    React.useEffect(() => {
        if (!token && sessionStorage.getItem('token')) {
            setAxiosConfig({
                headers: {
                    authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token")).token}`
                }
            })
        }
    }, [])

    return (
        <LoginState.Provider
            value={{
                Token: [token, setToken],
                Modal: [showModal, setShowModal],
                AxiosConfig: [axiosConfig, setAxiosConfig],
                MenuBar: [menuBar, setMenubar]
            }}>
            <div className="root-container">
                <NavigationBar />
                <LoginModal>
                    <Component {...pageProps} />
                    <style jsx global>{`
                 html, body{
                    margin:0;
                    padding:0;
                    background: hsla(0, 0%, 80%, .65);
                    width:100vw;
                    font-size: 16px;
                }
            `}</style>
                    <Footer />
                </LoginModal >
            </div>
        </LoginState.Provider>
    )
}

export default MyApp