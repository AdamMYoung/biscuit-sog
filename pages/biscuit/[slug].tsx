import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Biscuit, getContentfulRepositry } from '../../src/utils/contentful';

import front from '../../public/tea-cup-front.png';
import back from '../../public/tea-cup-back.png';

type Props = {
    biscuit: Biscuit;
};

const Biscuit: NextPage<Props> = ({ biscuit }) => {
    const [isDunking, setIsDunk] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [isInfoVisible, setIsInfoVisible] = useState(false);

    useEffect(() => {
        if (isDunking) {
            setTimeout(() => {
                setIsHidden(true);
            }, 3000);
        }
    }, [isDunking]);

    useEffect(() => {
        if (isHidden) {
            setTimeout(() => setIsInfoVisible(true), 500);
        }
    }, [isHidden]);

    return (
        <div className="text-center grid gap-8">
            <Head>
                <title>{`${biscuit.name} - The Biscuit Sog Index`}</title>
            </Head>
            <div className="grid gap-4">
                <h1 className="text-center font-semibold text-5xl">{biscuit.name}</h1>
                <div>
                    <Link passHref href="/">
                        <a className="underline">{'< Back'}</a>
                    </Link>
                </div>
            </div>
            <div>
                <button
                    disabled={isDunking}
                    onClick={() => setIsDunk(true)}
                    className="border px-8 py-2 text-xl rounded-lg transition-all hover:bg-white hover:text-black active:bg-slate-200 disabled:cursor-auto disabled:text-gray-500 disabled:bg-slate-200"
                >
                    Dunk
                </button>
            </div>

            <div className="relative">
                <div
                    className={`absolute left-0 right-0 transition-all duration-300 ${
                        isHidden ? 'pointer-events-none opacity-0' : 'pointer-events-auto opacity-100 '
                    } ${isInfoVisible && 'h-0'}`}
                >
                    <div
                        style={{ width: 250 }}
                        className={`p-4 relative z-20 mx-auto transition-all ${isDunking && 'dunk'}`}
                    >
                        <Image width="250" height="150" alt={biscuit.name} src={biscuit.pictureURL} />
                    </div>
                    <div style={{ maxWidth: '500px' }} className="mt-16 mx-auto">
                        <div className="relative">
                            <div className="relative z-10">
                                <Image width="500" height="300" alt="Tea Cup" src={back} placeholder="blur" />
                            </div>
                            <div className="absolute top-0">
                                <div className="z-30 relative">
                                    <Image width="500" height="300" alt="Tea Cup" src={front} placeholder="blur" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={`absolute left-0 right-0 px-2 transition-all duration-300 ${
                        isInfoVisible ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0 '
                    }`}
                >
                    <div className="grid gap-4 text-xl">
                        <p>Our expert scientists have deduced that a {biscuit.name} takes...</p>
                        <p className="text-5xl font-bold">{biscuit.duration} seconds</p>
                        <p className="max-w-3xl mx-auto">
                            before they get too <sup>soggy</sup> in your tea, and you get those horrible bits at the
                            bottom, you know?
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const repository = getContentfulRepositry();
    const biscuits = await repository.getBiscuits();

    const paths = biscuits.map((b) => ({ params: { slug: b.slug } }));

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    if (!params) {
        return { notFound: true };
    }

    const repository = getContentfulRepositry();
    const biscuit = await repository.getBiscuit(params.slug as string);

    return {
        props: {
            biscuit,
        },
    };
};

export default Biscuit;
