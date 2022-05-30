export type Board = {
    board: undefined | ({ name: string; piece: { value: string; symbol: string; side: string; }; color: string; }[] | { name: string; piece: string; color: string; }[] | { name: string; piece: string; color: string; side: string; }[])[];
}