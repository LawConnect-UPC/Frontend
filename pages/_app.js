import { Provider } from 'react-redux'
import store from "../redux/store"
import '../styles/globals.scss'
import GlobaLayout from '../components/layout/GlobalLayout'



function MyApp({ Component, pageProps }) {
  return (
    <>  
      <Provider store={store}>
            <GlobaLayout>
              <Component {...pageProps} />
            </GlobaLayout>
      </Provider>
    </>
  )
}

export default MyApp
