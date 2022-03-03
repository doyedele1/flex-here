import '../styles/globals.css';
import store from '../store';
import { StoreProvider } from 'easy-peasy';

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider store={store}>
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp
