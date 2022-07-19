import '@fontsource/share-tech-mono';

import '../styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div className="bg-slate-900 flex flex-col  min-h-screen text-white">
            <main className="container mt-16 mx-auto">
                <Component {...pageProps} />
            </main>
        </div>
    );
}

export default MyApp;
