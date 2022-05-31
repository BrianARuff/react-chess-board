export type Board = {
    board: ({ name: string; piece: { value: string; symbol: string; side: string; }; color: string; }[] | { name: string; piece: string; color: string; }[] | { name: string; piece: string; color: string; side: string; }[])[];
    setBoard: Function, 
    updateSquares: Function,
}