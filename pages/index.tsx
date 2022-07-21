import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { useState } from 'react';
import { Biscuit, getContentfulRepositry } from '../src/utils/contentful';

type Props = {
    biscuits: Biscuit[];
};

const Home: NextPage<Props> = ({ biscuits }) => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="grid gap-16">
            <Head>
                <title>The Biscuit Sog Index</title>
            </Head>
            <div className="grid gap-4">
                <h1 className="text-center font-semibold text-5xl">The Biscuit Sog Index</h1>
                <div className="align-middle mx-auto">
                    <ins
                        className="adsbygoogle"
                        style={{ display: 'inline-block', width: 'auto', height: '90px' }}
                        data-ad-client="ca-pub-9732665435466396"
                        data-ad-slot="4130274861"
                    ></ins>
                    <Script
                        id="title-ad"
                        dangerouslySetInnerHTML={{ __html: '(adsbygoogle = window.adsbygoogle || []).push({});' }}
                    />
                </div>
            </div>
            <div className="grid gap-1 text-center mx-auto font-semibold">
                <p>The Biscuit Finder</p>
                <div>
                    <input
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-72 rounded-lg py-2 px-2 text-black"
                        placeholder="Fox's Golden Crunch"
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {biscuits
                    .filter((b) => b.name.includes(searchTerm))
                    .map((b) => (
                        <section className="group text-center cursor-pointer" key={b.slug}>
                            <Link href={`/biscuit/${b.slug}`}>
                                <div className="grid gap-4">
                                    <div>
                                        <Image
                                            width="250"
                                            height="150"
                                            alt={b.name}
                                            src={b.pictureURL}
                                            className="p-4 transition-all group-hover:-translate-y-1"
                                        />
                                    </div>
                                    <h2 className="transition-all font-bold text-xl group-hover:text-gray-200">
                                        {b.name}
                                    </h2>
                                </div>
                            </Link>
                        </section>
                    ))}
            </div>
        </div>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const repository = getContentfulRepositry();
    const biscuits = await repository.getBiscuits();

    return {
        props: {
            biscuits,
        },
    };
};

export default Home;
