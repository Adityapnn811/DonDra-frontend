import '../styles/globals.css'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }) {
  return (
  <div className='flex-1 bg-primary'>
    <Component {...pageProps} />
  </div>)
}

export default MyApp
