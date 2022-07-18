import '../styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div className="bg-slate-900 flex flex-col  min-h-screen text-white">
            <h1 className="mt-8 text-center text-4xl">The Biscuit Sog Index</h1>
            <main className="container mt-16 mx-auto">
                <Component {...pageProps} />
            </main>
        </div>
    );
}

export default MyApp;
