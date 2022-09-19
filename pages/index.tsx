import type { GetStaticProps, NextPage } from 'next'
import { Card, Grid, Row, Text } from '@nextui-org/react';

import { Layout } from '../components/layouts';
import { pokeApi } from '../api';
import { PokemonListResponse, SmallPokemon } from '../interfaces/pokemon-list';
import { PokemonCard } from '../components/pokemon/PokemonCard';

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title='Listado de Pokémons'>
      <Grid.Container gap={2} justify='flex-start'>
        {pokemons.map((pokemon) => (
          <Grid xs={6} sm={3} md={2} xl={1} key={pokemon.id}>
            <PokemonCard pokemon={pokemon} />
          </Grid>
        )
        )}
      </Grid.Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  // const { data } = await  // your fetch function here 

  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')

  const pokemons: SmallPokemon[] = data.results.map((pokemon: SmallPokemon, index: number) => ({
    ...pokemon,
    id: index + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index + 1}.svg`
  }));

  return {
    props: {
      pokemons
    }
  }
}

export default HomePage
