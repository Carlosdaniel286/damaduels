export type SquareColor = 'black' | 'gray';
export type PiecesColor = 'red' | 'blue' | 'green'


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
   width:number,
   height:number,
   dataKey:string,
   dataPosition:string,
   background:PiecesColor
  }
  export type BackgroundPieces= 'red'| 'blue' | 'gray' |'green'
 
 export type SquareFull={
    idPieces: number;
    position:PiecePositions,
    color:PiecesColor
}

export type Board ={
    typeColor?: "black" | "gray";
    id?: string;
    data_key?: string;
    data_position?:string;
}

export type OptionsPositionsMove ={
    targetPosition:string
    background:PiecesColor
    
}

export type ToggleColor ={
     background:PiecesColor,
     position:string | null
}
  