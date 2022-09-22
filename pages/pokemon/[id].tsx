import { useEffect, useState } from 'react';

import { GetStaticProps, NextPage } from 'next';
import { Card, Grid, Text, Button, Container, Image } from '@nextui-org/react';

import confetti from 'canvas-confetti'

import { Layout } from '../../components/layouts';
import { localFavorites } from '../../utils';
import { pokeApi } from '../../api';
import { PokemonFull, PokemonLite } from '../../interfaces';
import { getPokemonInfo } from '../../utils/getPokemonInfo';

interface Props {
    pokemon: PokemonFull;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {

    const [isInfavorites, setIsInFavorites] = useState(false);

    useEffect(() => {
        const isFavorite = localFavorites.existsInFavorites(pokemon.id);
        setIsInFavorites(isFavorite);
    }, [pokemon]);

    const onToggleFavorite = () => {
        localFavorites.toggleFavorite(pokemon.id);
        setIsInFavorites(!isInfavorites);
        if (!isInfavorites) {
            confetti({
                particleCount: 100,
                spread: 160,
                angle: -100,
                origin: { x: 1, y: 0 }
            });
        }
    };
    return (
        <Layout title={pokemon.name}>
            <Grid.Container css={{ marginTop: '5px' }} gap={2}>
                <Grid xs={12} sm={4}>
                    <Card isHoverable css={{ padding: '30px' }}>
                        <Card.Body >
                            <Card.Image src={pokemon.sprites.other?.dream_world.front_default || '/no-imege.png'}
                                alt={pokemon.name}
                                css={{ width: '100%', height: '200px' }}
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
                                ghost={!isInfavorites}
                                onPress={onToggleFavorite}
                            >
                                {isInfavorites ? 'En Favoritos' : 'Guardar en favoritos'}
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
        // fallback: false, // can also be true or 'blocking'
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { id } = params as { id: string };
    const pokemon = await getPokemonInfo(id);
    if (!pokemon) {
        return {
            redirect: {
                destination: '/',
                permanent: false

            }
        }
    }

    return {
        props: {
            pokemon,
        },
        revalidate: 86400 //60 * 60 * 24
    }
}