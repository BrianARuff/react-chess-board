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

    const onDragEnter = (e: React.BaseSyntheticEvent) => {
        destination = e.target;
        e.preventDefault();
        e.stopPropagation();
    }

    const onDragEnd = () => {
        updateBoardState(source, destination, pieceRef.current);
    }

    const onDragStart = (e: React.BaseSyntheticEvent) => {
        source = e.target.parentNode;
    }

    return (
        <Flex data-color={color} data-name={name} onDragStart={onDragStart} onDragEnter={onDragEnter} onDragEnd={onDragEnd} justifyContent='center' alignItems='center' h={itemSize} w={itemSize} bg={bg}>
            <Text data-side={piece.side} data-symbol={piece.symbol} data-value={piece.value} ref={pieceRef} draggable color={textColor} fontSize='lg' cursor='pointer'>{piece.symbol}</Text>
        </Flex>
    )
}

export { BoardSquare };