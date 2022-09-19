import { useRouter } from 'next/router';
import { Layout } from '../../components/layouts';
import { GetStaticProps, NextPage } from 'next';
import { pokeApi } from '../../api';
import { Pokemon } from '../../interfaces';
import { Card, Grid, Text, Button, Container, Image } from '@nextui-org/react';

interface Props {
    pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
    const router = useRouter();
    return (
        <Layout title='Algún pokémon'>
            <Grid.Container css={{ marginTop: '5px' }} gap={2}>
                <Grid xs={12} sm={4}>
                    <Card isHoverable css={{ padding: '30px' }}>
                        <Card.Body >
                            <Card.Image src={pokemon.sprites.other?.dream_world.front_default || '/no-imege.png'}
                                alt={pokemon.name}
                                css={{ width: '100%', height: '200px'}}
                            />
                        </Card.Body>
                    </Card>
                </Grid>
                <Grid xs={12} sm={8}>
                    <Card>
                        <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text h1 transform='capitalize'>{pokemon.name}</Text>
                            <Button
                                color="gradient"
                                ghost
                            >
                                Guardar en favoritos
                            </Button>
                        </Card.Header>
                        <Card.Body>
                            <Text h3>Sprites</Text>
                            <Container display='flex' direction='row'>
                            <Image src={pokemon.sprites.front_default} alt={pokemon.name} width={100} height={100} />
                            <Image src={pokemon.sprites.back_default} alt={pokemon.name} width={100} height={100} />
                            <Image src={pokemon.sprites.front_shiny} alt={pokemon.name} width={100} height={100} />
                            <Image src={pokemon.sprites.back_shiny} alt={pokemon.name} width={100} height={100} />
                            </Container>
                            <Text h3>Información</Text>
                            <Text >Altura: {pokemon.height}</Text>
                            <Text >Peso: {pokemon.weight}</Text>
                            <Text >Experiencia base: {pokemon.base_experience}</Text>
                            <Text >Tipos: {pokemon.types.map((type) => type.type.name).join(', ')}</Text>
                            <Text >Habilidades: {pokemon.abilities.map((ability) => ability.ability.name).join(', ')}</Text>
                        </Card.Body>
                    </Card>
                </Grid>

            </Grid.Container>


        </Layout>
    )
}
export default PokemonPage
export async function getStaticPaths() {
    const paths = new Array(151).fill(0).map((_, index) => ({
        params: {
            id: (index + 1).toString()
        }
    }));
    return {
        paths,
        fallback: false, // can also be true or 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    console.log('Entro en getStaticProps');

    const { id } = params as { id: string };

    const { data } = await pokeApi.get<Pokemon>('/pokemon/' + id);

    // const pokemons: SmallPokemon[] = data.results.map((pokemon: SmallPokemon, index: number) => ({
    //   ...pokemon,
    //   id: index + 1,
    //   img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index + 1}.svg`
    // }));

    return {
        props: {
            pokemon: data,

        }
    }
}