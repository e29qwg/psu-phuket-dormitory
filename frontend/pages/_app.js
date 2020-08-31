import './styles.css'
import '../component/NavigationBar'
import NavigationBar from '../component/NavigationBar'
// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
    return (<NavigationBar>
        <Component {...pageProps} />
        <style jsx global>{`body{margin:0;padding:0;}`}</style>
    </NavigationBar>)
}