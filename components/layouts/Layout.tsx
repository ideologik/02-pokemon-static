import { FC } from 'react'
import Head from 'next/head'

import { Navbar } from '../ui/Navbar'
import { useRouter } from 'next/router'
interface Props {
    children: React.ReactNode,
    title?: string
}

const origin = (typeof window !== 'undefined') ? window.location.origin : 'http://localhost:3000'
export const Layout: FC<Props> = ({ children, title }) => {
    const router = useRouter();
    router.basePath
    return (
        <>
            <Head>
                <title>{title || 'PokémonApp'}</title>
                <meta name="author" content="Fox D'Angelo" />
                <meta name="description" content={`Información sobre el pokémon ${title}`} />
                <meta name="keywords" content={`pokémon, ${title}, pokémon ${title}, pokedex`} />

                <meta property="og:title" content={`Pokémon - ${title}`} />
                <meta property="og:description" content={`Ésta es la página sobre ${title}`} />
                <meta property="og:image" content= {`${origin}/img/banner.png`} />

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
