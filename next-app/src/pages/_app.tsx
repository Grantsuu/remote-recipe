import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react';

const MyApp = ({ Component, pageProps }: AppProps) => {
    useEffect(() => {
        require('bootstrap/dist/js/bootstrap.bundle.min.js');
      }, []);
    return <Component {...pageProps} />
}

export default MyApp