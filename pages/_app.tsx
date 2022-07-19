import '@fontsource/share-tech-mono';

import '../styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div className="bg-slate-900 flex flex-col  min-h-screen text-white">
            <main className="container mt-16 mx-auto px-2">
                <Component {...pageProps} />
            </main>
            <div className="flex-grow" />
            <p className="mx-auto pb-2">
                Made by{' '}
                <a className="underline" href="https://aydev.uk" target="_blank" rel="noreferrer">
                    Adam Young
                </a>
            </p>
        </div>
    );
}

export default MyApp;
