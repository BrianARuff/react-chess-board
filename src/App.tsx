import ChessBoard from "./components/ChessBoard";
import ErrorBoundary from "./components/ErrorBoundary";
import boardState from './board.json';
import React, { useEffect, useState } from 'react';
import { Flex } from "@chakra-ui/react";
import { Square } from "./types/Square";
import { Board } from "./types/Board";

export const BoardContext = React.createContext<Board>({ board: [], setBoard: () => {}, updateSquares: () => { }});

function App() {
  const [state, setState] = useState<any>();
  const updateSquares = (row: any, startingSquare: any, stopSquare: any, startIndex: number, stopIndex: number, piece: any) => {
    const data = row?.squares?.map((prevBoardSquare: Square) => {
      if (prevBoardSquare.name === startingSquare.dataset.name) {
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
      } else if (prevBoardSquare.name === stopSquare.dataset.name) {
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

  const setNewBoardState = (prevBoardState: any, startRowIndex: number, stopRowIndex: number, stopSquare: any, startingSquare: any, piece: HTMLElement) => {
    const newBoardState = prevBoardState?.map((row: any) => {
      const newRowData = updateSquares(row, startingSquare as HTMLElement, stopSquare as HTMLElement, startRowIndex, stopRowIndex, piece as HTMLElement);

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
      updateSquares,
      setBoard: setNewBoardState
    }

    console.log(final);
    setState(() => final);
    return final;
  }

  useEffect(() => {
    const appState = {
      ...boardState,
      updateSquares,
      setBoard: setNewBoardState,
    }

    setState(() => appState)
  }, []);

  return (
    <ErrorBoundary>
      <BoardContext.Provider value={state}>
        <Flex bg='lightgreen'>
          <ChessBoard />
        </Flex>
      </BoardContext.Provider>
    </ErrorBoundary>
  )
}

export default App;