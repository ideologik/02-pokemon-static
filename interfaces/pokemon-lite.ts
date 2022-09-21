export interface PokemonLite {
    id: number;
    name: string;
    sprites: SpritesLite;
}
export interface SpritesLite {
    back_default: string;
    back_shiny: string;
    front_default: string;
    front_shiny: string;
    other?: OtherLite;
}

export interface OtherLite {
    dream_world: DreamWorldLite;
}
export interface DreamWorldLite {
    front_default?: string;
}

