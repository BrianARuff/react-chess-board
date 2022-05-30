import ChessBoard from "./components/ChessBoard";
import ErrorBoundary from "./components/ErrorBoundary";
import boardState from './board.json';
import React from 'react';
import { Flex } from "@chakra-ui/react";

export const BoardContext = React.createContext(boardState);

function App() {
  return (
    <ErrorBoundary>
      <BoardContext.Provider value={boardState}>
        <Flex bg='lightgreen'>
          <ChessBoard />
        </Flex>
      </BoardContext.Provider>
    </ErrorBoundary>
  )
}

export default App;