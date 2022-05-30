import { Grid, GridItem, useMediaQuery } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { BoardContext } from '../App';
import { Board } from '../types/Board';
import { Square } from '../types/Square';
import { BoardSquare } from './Square';

const updateSquare = (row: any, startingSquare: any, stopSquare: any, startIndex: number, stopIndex: number) => {
    const data = row?.squares?.map((prevBoardSquare: Square) => {
        const numFromSquare = prevBoardSquare.name.replace(/[a-z.]|[A-Z.]/g, '')

        if (numFromSquare === String(startIndex)) {
            if (startingSquare.dataset.name === stopSquare.dataset.name) return prevBoardSquare;
            if (prevBoardSquare.name === startingSquare.dataset.name) {
                const newBoardSquare: Square = {
                    ...prevBoardSquare,
                    piece: {
                        value: '',
                        symbol: '',
                        side: '',
                    }
                }
                return newBoardSquare;
            }
        } else if (numFromSquare === String(stopIndex)) {
            const pieceDataset = startingSquare?.firstElementChild.dataset;
            if (prevBoardSquare.name === stopSquare.dataset.name) {
                // replace previous square's piece data with stop square's dataset
                const newBoardSquare: Square = {
                    ...prevBoardSquare,
                    piece: {
                        ...pieceDataset
                    },
                }

                return newBoardSquare;

                // if the previous state square's name matches the starting sauare's name
            } else {
                return prevBoardSquare;
            }
        }

        return prevBoardSquare;
    });


    return data;
}

const getNewBoardState = (prevBoardState: Board | any, startRowIndex: number, stopRowIndex: number, stopSquare: any, startingSquare: any) => {
    const newBoardState = prevBoardState.board.map((row: any) => {
        const newRowData = updateSquare(row, startingSquare, stopSquare, startRowIndex, stopRowIndex);

        return newRowData;
    });

    const newBoardStateWithBoardWrapper = {
        board: newBoardState,
    }

    const newBoardStateWithRowIds = newBoardStateWithBoardWrapper?.board.map((row: any, index: number) => {
        const rowId = 8 - index;
        const newRow = {
            squares: row,
            [rowId]: rowId,
        }
        return newRow;
    });

    const final = {
        board: newBoardStateWithRowIds,
    }

    console.log(final);
    return final;
}

function ChessBoard() {
    const [isSmallerThan425px] = useMediaQuery('(max-width: 767px)');
    const boardState = useContext(BoardContext);
    const [getBoardState, setBoardState] = useState<any>(boardState);
    const itemSize = isSmallerThan425px ? '35px' : '80px';
    const updateBoardState = (start: any, stop: any, piece: any) => {
        const startingSquare = start.dataset.name ? start : start.parentNode;
        const stopSquare = stop.dataset.name ? stop : stop.parentNode;
        const startRowIndex: any = (start.dataset.name || start.parentNode.dataset.name as string).replace(/[a-z.]|[A-Z.]/g, '');
        const stopRowIndex: any = (stop.dataset.name || stop.parentNode.dataset.name as string).replace(/[a-z.]|[A-Z.]/g, '');

        setBoardState((prevBoardState: Board | any) => {
            const newState = getNewBoardState(prevBoardState, startRowIndex, stopRowIndex, stopSquare as HTMLElement, startingSquare as HTMLElement);
            debugger
            return newState;
        });

    }

    return (
        <Grid templateColumns={`repeat(8, ${itemSize})`} templateRows={`repeat(8, ${itemSize})`} templateAreas={'a b c d e f g h'} justifyContent='center' alignContent='center' minH='100vh' minW='300px' w='100%'>
            {
                getBoardState?.board?.map((row: any) => {
                    return (
                        row?.squares?.map(({ color, name, piece }: { color: string, name: string, piece: any }) => {
                            return (
                                <GridItem key={Date.now() + Math.random() * 1000}>
                                    <BoardSquare updateBoardState={updateBoardState} color={color} name={name} piece={piece} itemSize={itemSize} />
                                </GridItem>
                            )
                        })
                    )
                })
            }
        </Grid>
    )
}

export default ChessBoard;