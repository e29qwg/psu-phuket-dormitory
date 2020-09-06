import './styles.css'
import '../component/NavigationBar'
import NavigationBar from '../component/NavigationBar'
import Footer from '../component/Footer'
import { LoginState } from '../utils/Login'
import LoginModal from '../component/Login'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
    const [isLogin, setIsLogin] = React.useState(false)
    return (
        <LoginState.Provider value={[isLogin, setIsLogin]}>
            <div className="root-container">
                <NavigationBar />
                <LoginModal>
                    <Component {...pageProps} />
                    <style jsx global>{`
                html, body{
                    margin:0;
                    padding:0;
                    background: hsla(0, 0%, 80%, .65);
                    width:100;
                    font-size: 16px;
                }
            `}</style>
                    <Footer />
                </LoginModal >
            </div>
        </LoginState.Provider>
    )
}