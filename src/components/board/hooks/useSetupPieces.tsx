import { useEffect, useRef } from "react";
import {  PiecePositions } from "../boardType";
import { getPiecesPosition } from "@/app/lib/piecesPositionLib";
import { usePieces } from "@/app/context/piecePositions";
import { useBoard } from "@/app/context/useSquare";

export function useSetupPieces() {
    const{setPiecesPositions}=usePieces()
    const { square} = useBoard();
    const squareRefs = useRef<(HTMLDivElement | null)[]>([]);
    const newArry: PiecePositions[] = [];
    
     const positionPiecesOnBoard =()=>{
        if (!squareRefs.current) return;
    
        // Limpando o array antes de adicionar novos valores
        newArry.length = 0;
      
        squareRefs.current.forEach((item) => {
          if (!item) return;
          const { top, left, bottom, right, width, height } = item.getBoundingClientRect();
          const dataKey = item.getAttribute('data-key') ?? '';
          const dataPosition = item.getAttribute('data-position') ?? '';
          if (dataKey === '1' || dataKey === '2') {
            const background = dataKey === '1' ? 'red' : 'blue';
            newArry.push({ top, left, bottom, right, width, height, dataKey, background,dataPosition });
          }
        });
      
        
        setPiecesPositions(newArry);
     }
    
     const positionPiecesOnBoardOfLocalStorage =()=>{
        const isPieces = getPiecesPosition()
        if(isPieces== null) return  positionPiecesOnBoard()
        const up:PiecePositions[] = JSON.parse(isPieces)
        
        const getAtualPosition = squareRefs.current
        if (!getAtualPosition) return
        const updatedPiecePositions: PiecePositions[] = []; // Nome mais claro para o array de posições atualizadas

        up.forEach((piece) => { // 'up' foi renomeado para 'piece' para clareza
          getAtualPosition.forEach((square) => { // 'item' foi renomeado para 'square' para refletir melhor o contexto
            const positionData = square?.getAttribute('data-position'); // 'dataPosition' para refletir o propósito
            const squarePosition = square?.getBoundingClientRect(); // 'position' renomeado para 'squarePosition'
            if (squarePosition) {
              const { left, right, top, bottom,height,width } = squarePosition; // Desestruturação de posição
             
              // Verifica se a posição corresponde e atualiza a posição da peça
              if (piece.dataPosition === positionData) {
                updatedPiecePositions.push({
                  ...piece, // Mantém as propriedades originais da peça
                  bottom, // Atualiza a posição
                  left,
                  top,
                  right,
                  width,
                  height
                });
              }
            }
          });
        });
        
    
        setPiecesPositions(updatedPiecePositions)
     }
    
    
    
   
   
   
   
     
    
    
    //duels
    useEffect(() => {
      if(getPiecesPosition()==null) return positionPiecesOnBoard()
       positionPiecesOnBoardOfLocalStorage()
      
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [squareRefs,square]);
    
      
   
 return {squareRefs}
}