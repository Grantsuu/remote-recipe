import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
config.autoAddCss = false
library.add(fas)

const MyApp = ({ Component, pageProps }: AppProps) => {
    useEffect(() => {
        require('bootstrap/dist/js/bootstrap.bundle.min.js');
      }, []);
    return <Component {...pageProps} />
}

export default MyApp