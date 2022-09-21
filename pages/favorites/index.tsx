import { useEffect, useState } from "react"

import { Card, Grid } from "@nextui-org/react"
import { NextPage } from "next"

import { FavoritePokemons, NoFavorites } from "../../components/ui"
import { localFavorites } from "../../utils"
import { Layout } from "../../components/layouts"

const FavoritesPage: NextPage = () => {
    const [favorites, setFavorites] = useState<number[]>([])
    useEffect(() => {
        const favorites = localFavorites.getFavorites();
        setFavorites(favorites);



    }, [])

    return (
        <Layout title='Favoritos'>
            {
                favorites.length === 0
                    ? (<NoFavorites />)
                    : (<FavoritePokemons pokemons={favorites} />)
            }
        </Layout>
    )
}

export default FavoritesPage


