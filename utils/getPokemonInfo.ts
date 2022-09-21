import { pokeApi } from "../api";
import { PokemonLite } from "../interfaces";

export const getPokemonInfo = async (id: string) => {
    const { data } = await pokeApi.get<PokemonLite>('/pokemon/' + id);
    const pokemon:PokemonLite  = {
        id: data.id,
        name: data.name,
        sprites: {
            front_default: data.sprites.front_default,
            back_default: data.sprites.back_default,
            front_shiny: data.sprites.front_shiny,
            back_shiny: data.sprites.back_shiny,
            other: {   
                dream_world: {
                    front_default: data.sprites.other?.dream_world.front_default
                }
            }
        },
    }
    return pokemon;
}