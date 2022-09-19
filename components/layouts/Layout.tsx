import { FC } from 'react'
import Head from 'next/head'

import { Navbar } from '../ui/Navbar'
interface Props  {
    children: React.ReactNode,
    title?: string
}

export const Layout: FC<Props> = ({ children,title }) => {
    return (
        <>
            <Head>
                <title>{title || 'PokémonApp'}</title>
                <meta name="author" content="Fox D'Angelo" />
                <meta name="description" content={`Información sobre el pokémon ${title}`} />
                <meta name="keywords" content={`pokémon, ${title}, pokémon ${title}, pokedex`} />

            </Head>
            <Navbar />
            <main style={{
                padding: '0px 20px',
            }}>
                {children}
            </main>
        </>
    )
}
