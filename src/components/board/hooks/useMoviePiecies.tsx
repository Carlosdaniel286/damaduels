import { useRef, useState } from "react";
import { usePieceSetup } from "./useCreatePieces";
import { PiecePositions, BackgroundPieces, Positions, SquareFull } from "../boardType";

export function useMovePieces() {
    const squareRefs = useRef<(HTMLDivElement | null)[]>([]);
    const { setRedPieces, redPieces, bluePieces, setBluePieces } = usePieceSetup(squareRefs);
    const [currentBackground, setCurrentBackground] = useState<BackgroundPieces>('gray');
    const storedSquares = localStorage.getItem('duels');
    const occupiedSquarePositions: SquareFull[] = storedSquares ? JSON.parse(storedSquares) : [];
   
   console.log(occupiedSquarePositions)
    const updateSquare = (squareId: number, pieceId: number, position: PiecePositions,index:number,color:'red'|'blue') => {
        const updatedSquareArray = [...occupiedSquarePositions];
        const isSomeIndex = updatedSquareArray.filter((item)=>{
          if(item.index!=index) return item
        })

        isSomeIndex.push({ idSquare: squareId, idPieces: pieceId,index, position ,color});
        localStorage.setItem("duels", JSON.stringify(isSomeIndex));
    };

    const movePiece = (
        piece: Positions, 
        squareId: number, 
        newPosition: PiecePositions,
        index:number
    
    ) => {
        if (piece.color === 'green') {
             piece.color = currentBackground === 'blue' ? 'blue' : 'red';
            piece.position = newPosition;
            piece.isMovedPieces = true;
            updateSquare(squareId, piece.id?? 0, newPosition,index,piece.color);
        }
       //  applyMoveRules();
        return piece; // Retorna o item original caso a cor não seja 'green'
    };

   
  const hasPiecesInSquare=(piecesId:number)=>{
    let num = piecesId
    occupiedSquarePositions.forEach((item)=>{
     if(item.idPieces==piecesId) num = item.idSquare
    })
    console.log(num)
    return num
  }
   
   
   
   
   
   
   
    const handlePieceMovement = (
        background: BackgroundPieces,
        targetId: number,
        targetType: string,
        newPosition: PiecePositions
    ) => {
        if (background === 'blue') setCurrentBackground('blue');
        if (background === 'red') setCurrentBackground('red');

        const pieceColor = background !== 'blue' && background !== 'red' ? currentBackground : background;
        const pieces = pieceColor === 'red' ? redPieces : bluePieces;
        const isRedPiece = pieceColor === 'red';
        const isBluePiece = pieceColor === 'blue';

        if (targetType === 'piece') {
            const updatedPieces = pieces.map((piece) => {
                if(piece.isMovedPieces==true)return piece
                if (piece.id === targetId && piece.color !== 'green') {
                    piece.color = 'green';
                    piece.id= hasPiecesInSquare(piece.id)
                    return piece;
                }
               
                if (piece.color === 'green') {
                   
                    const newBackgroundColor = currentBackground === 'blue' ? 'blue' : 'red';
                    piece.color = newBackgroundColor;
                    
                    setCurrentBackground(newBackgroundColor);
                    return piece;
                }
               
                return piece;
            });

            if (isRedPiece) setRedPieces(updatedPieces);
            if (isBluePiece) setBluePieces(updatedPieces);
        }

        if (targetType === 'squares') {
            const updatedPieces = pieces.map((piece,index) => {
                if(piece.isMovedPieces==true) return piece
                if (piece.id === undefined || typeof piece.id === 'string') return piece;
                
                let isValidMove = false;
                if (pieceColor === 'red') {
                    if (targetId - piece.id === 7 || targetId - piece.id === 9) {
                        isValidMove = true;
                    }
                } else if (pieceColor === 'blue') {
                    if (piece.id - targetId === 7 || piece.id - targetId === 9) {
                        isValidMove = true;
                    }
                }
                if (isValidMove) {
                    return movePiece(piece, targetId, newPosition,index);
                }
                return piece;
            });

            if (isRedPiece) setRedPieces(updatedPieces);
            if (isBluePiece) setBluePieces(updatedPieces);
        }
    };

    const handleMovePieces = (event: React.MouseEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const { left, right, top, bottom } = rect;
        const targetType = event.currentTarget.id;
        const background = event.currentTarget.style.background as BackgroundPieces;
        const key = event.currentTarget.getAttribute('data-key');
        const targetId = typeof key === 'string' ? Number(key) : -1;

        handlePieceMovement(background, targetId, targetType, { left, right, top, bottom });
    };

    return { handleMovePieces, redPieces, squareRefs, bluePieces };
}
