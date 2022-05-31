import { Grid, GridItem, useMediaQuery } from '@chakra-ui/react';
import { useContext } from 'react';
import { BoardContext } from '../App';
import { BoardSquare } from './Square';

function ChessBoard() {
    const [isSmallerThan425px] = useMediaQuery('(max-width: 767px)');
    const appState = useContext(BoardContext);
    const itemSize = isSmallerThan425px ? '35px' : '80px';
    const updateBoardState = (start: any, stop: any, piece: HTMLElement) => {
        const startingSquare = start.dataset.name ? start : start.parentNode;
        const stopSquare = stop.dataset.name ? stop : stop.parentNode;
        const startRowIndex: any = (start.dataset.name || start.parentNode.dataset.name as string).replace(/[a-z.]|[A-Z.]/g, '');
        const stopRowIndex: any = (stop.dataset.name || stop.parentNode.dataset.name as string).replace(/[a-z.]|[A-Z.]/g, '');
        const newState = appState?.setBoard(appState?.board, startRowIndex, stopRowIndex, stopSquare as HTMLElement, startingSquare as HTMLElement, piece as HTMLElement);
        return newState;
    }

    console.log(appState)

    if (appState?.board?.length) {
        return (
            <Grid templateColumns={`repeat(8, ${itemSize})`} templateRows={`repeat(8, ${itemSize})`} templateAreas={'a b c d e f g h'} justifyContent='center' alignContent='center' minH='100vh' minW='300px' w='100%'>
                {
                    appState?.board?.map((row: any) => {
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
    } else {
        return (
            <h1>Error Loading Board</h1>
        )
    }
}

export default ChessBoard;