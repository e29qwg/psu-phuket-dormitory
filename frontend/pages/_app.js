import './styles.css'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
    return <div><Component {...pageProps} /><style jsx>{`body{margin:0;padding:0;}`}</style></div>
}