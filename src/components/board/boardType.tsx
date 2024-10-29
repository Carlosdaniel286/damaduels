export type SquareColor = 'black' | 'gray';
export type PiecesColor = 'red' | 'blue' | 'green'| undefined;


export type Positions ={
    id?:number | string
    position:PiecePositions,
    color?:PiecesColor
  }
   export type PiecePositions ={
    bottom: number,
    top: number,
    left: number,
   right: number,
  }
  export type BackgroundPieces= 'red'| 'blue' | 'gray'

  