import type { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Biscuit, getContentfulRepositry } from '../src/utils/contentful';

type Props = {
    biscuits: Biscuit[];
};

const Home: NextPage<Props> = ({ biscuits }) => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div>
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
            <div className="grid grid-cols-2 md:grid-cols-3 mt-16">
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
