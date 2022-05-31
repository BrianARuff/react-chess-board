import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Square } from "../types/Square";


let source: any;
let destination: any;
function BoardSquare(props: Square) {
    const pieceRef = React.createRef() as React.MutableRefObject<HTMLInputElement>;
    const { color, itemSize, name, piece, updateBoardState } = props;
    const bg = color === 'dark' ? '#000' : '#fff';
    const textColor = color === 'dark' ? '#fff' : '#000';

    const onDragOver = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        destination = e.target.dataset.name ? e.target : e.target.parentNode;
    }

    const onDrop = () => {
        if (source.dataset.name === destination.dataset.name) return;

        updateBoardState(source, destination, pieceRef.current);
    }

    const onDragStart = (e: React.BaseSyntheticEvent) => {
        source = e.target.dataset.name ? e.target : e.target.parentNode;
    }

    return (
        <Flex draggable={false} data-color={color} data-name={name} onDragStart={onDragStart} onDragOver={onDragOver} onDrop={onDrop} justifyContent='center' alignItems='center' h={itemSize} w={itemSize} bg={bg}>
            <Text draggable data-side={piece.side} data-symbol={piece.symbol} data-value={piece.value} ref={pieceRef} color={textColor} fontSize='3xl' cursor='pointer'>{piece.symbol}</Text>
        </Flex>
    )
}

export { BoardSquare };