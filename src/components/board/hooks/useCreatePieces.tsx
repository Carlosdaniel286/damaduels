// src/hooks/useFetchData.js

import { useState, MutableRefObject, useEffect } from 'react';
import { Positions, SquareFull } from '../boardType';
import { initPositions } from '../constants/positions';

const MAX_PIECES = 12; // Número máximo de peças para cada cor

export function usePieceSetup(squareRefs: MutableRefObject<(HTMLDivElement | null)[]>) {
  const [redPieces, setRedPieces] = useState<Positions[]>([initPositions]);
  const [bluePieces, setBluePieces] = useState<Positions[]>([initPositions]);

  const updatePiecePositions = (color: 'red' | 'blue') => {
    const pieces: Positions[] = [];

    squareRefs.current.forEach((square, index) => {
      if (!square || pieces.length >= MAX_PIECES) return; // Verifica se a referência existe e não excede o limite

      const { left, bottom, right, top } = square.getBoundingClientRect();

      const isGraySquare = square.style.background === 'gray';
      const isRedPiece = color === 'red' && isGraySquare;
      const isBluePiece = color === 'blue' && isGraySquare && index >= 40;

      if (isRedPiece || isBluePiece) {
        pieces.push({
          position: { left, bottom, right, top },
          color,
          id: index,
          isMovedPieces: false,
        });
      }
    });
 
    const positionedPieces = restorePreviousPositions(pieces);
    if (color === 'red') {
      setRedPieces(positionedPieces);
    } else {
      setBluePieces(positionedPieces);
    }
  };

  const restorePreviousPositions = (pieces: Positions[]): Positions[] => {
    const savedData = localStorage.getItem('duels');
    const previousPositions: SquareFull[] = savedData ? JSON.parse(savedData) : [];
 
    const updatedPieces = [...pieces];
    previousPositions.forEach((savedPiece) => {
      updatedPieces.forEach((piece,index) => {
        if (savedPiece.index==index && savedPiece.color==piece.color ) {
          piece.id=savedPiece.idSquare
          piece.position = savedPiece.position;
          piece.isMovedPieces = true
        }
      });
    });
   const mapPositions = previousPositions.map((item)=>{
      item.idPieces=item.idSquare
       return item
   })
   console.log(mapPositions)
   localStorage.setItem("duels", JSON.stringify(mapPositions));
    console.log(updatedPieces)
    return updatedPieces;
  };

  useEffect(() => {
    updatePiecePositions('red');
    updatePiecePositions('blue');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [squareRefs]);

  return { redPieces, setRedPieces, bluePieces, setBluePieces };
}
