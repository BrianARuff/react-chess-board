export type Square = {
    itemSize: string,
    color: string,
    name: string,
    piece: {
        value: string,
        symbol: string,
        side: string,
    }
    updateBoardState: Function
}