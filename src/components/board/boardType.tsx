export type SquareColor = 'black' | 'gray';
export type PiecesColor = 'red' | 'blue' | 'green'| undefined | '#A8C3A1'


export type Positions ={
    id?:number 
    position:PiecePositions,
    color?:PiecesColor,
    isMovedPieces:boolean
  }
   export type PiecePositions ={
    bottom: number,
    top: number,
    left: number,
   right: number,
  }
  export type BackgroundPieces= 'red'| 'blue' | 'gray' |'green'
 
 export type SquareFull={
    idSquare: number;
    idPieces: number;
    index:number;
    position:PiecePositions,
    color:PiecesColor
}

  