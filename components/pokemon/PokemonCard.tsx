import { Card, Row, Text } from '@nextui-org/react'
import { useRouter } from 'next/router';
import React from 'react'
import { FC } from 'react';
import { SmallPokemon } from '../../interfaces';

interface Props {
    pokemon: SmallPokemon;
}

export const PokemonCard: FC<Props> = ({ pokemon }) => {
    const { id, img, name } = pokemon;

    const router = useRouter();
    const onClick = () => {
        router.push(`/pokemon/${id}`);
    }

    return (
        <>
            <Card isHoverable isPressable onClick={onClick}>
                <Card.Body>
                    <Card.Image src={img} width="100%" height={140} />
                </Card.Body>
                <Card.Footer>
                    <Row justify='space-between'>
                        <Text transform='capitalize'>{name}</Text>
                        <Text>#{id}</Text>
                    </Row>
                </Card.Footer>
            </Card>
        </>
    )
}
