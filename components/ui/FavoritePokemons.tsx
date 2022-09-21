import { Grid, Card } from '@nextui-org/react';
import { FC } from 'react';
import favorites from '../../pages/favorites';
import { FavoriteCardPokemon } from './FavoriteCardPokemon';

interface Props {
    pokemons: number[]
}

export const FavoritePokemons: FC<Props> = ({ pokemons }) => {
    return (
        <Grid.Container gap={2} direction="row" justify="flex-start">
            {
                pokemons.map((id) => (
                    <FavoriteCardPokemon id={id} key={id} />
                ))
            }
        </Grid.Container>
    )
}
