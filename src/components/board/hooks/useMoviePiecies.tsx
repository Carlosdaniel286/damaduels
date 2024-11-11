'use client'
import { useState } from "react";
import { Board, OptionsPositionsMove, PiecePositions, PiecesColor, ToggleColor } from "../boardType";
import { getLastPiecesMoved, setLastPieceMoved, setPiecesPositionLocal } from "@/app/lib/piecesPositionLib";
import { initialMoveOptions } from "../constants/positions";
import { usePieces } from "@/app/context/piecePositions";
import { useBoard } from "@/app/context/useSquare";
export function useMovePieces() {
  const {square,setSquare}= useBoard()
  const [moveOptions, setMoveOptions] = useState<OptionsPositionsMove[]>([]);
  const { piecesPositions, setPiecesPositions } = usePieces();
  const lastMovedPieceColor = getLastPiecesMoved();
  const [selectedPieceStatus, setSelectedPieceStatus] = useState<ToggleColor>({
   background: null,
   position: null
  });

 localStorage.clear()
  const mapPositionToNumbers=(position:string)=>{
    const dataPosition= position.split('-').map(Number)
    const targetRow = dataPosition[0]
    const targetCol = dataPosition[1]
    return{dataPosition,targetCol,targetRow}
  }

  const convertCoordsArrayToString=(coords:number[])=>{
    return coords.toString().replace(',','-')
  }
  
  const convertNumberToCoords=(backgroundPiece:'red'|'blue',targetRow:number,targetCol:number)=>{
   const coords ={
       leftCoordinates:'',
       rightCoordinates:''
    }
     switch(backgroundPiece){
       case 'red': 
        return {...coords,
          leftCoordinates:targetCol==0? '':`${targetRow+1}-${targetCol -1}`,
          rightCoordinates: targetCol==7?'':`${targetRow+1}-${targetCol +1}` 
        }
        
     }
     return coords
  }
   const showAvailableSquareMoves=(selectedPiece: PiecePositions)=>{
    const {targetCol,targetRow}=mapPositionToNumbers(selectedPiece.dataPosition)
    const {leftCoordinates,rightCoordinates,}=convertNumberToCoords('red',targetRow,targetCol)
    console.log(rightCoordinates)
    const  isSquareOccupeid = checkSquareFull(leftCoordinates,rightCoordinates)
    if(isSquareOccupeid.length==2) return
    
    const newSquare =square.map((item)=>{
      const squarePosition =mapPositionToNumbers(item.data_position??'')
      const squarePositionToString = convertCoordsArrayToString(squarePosition.dataPosition)
      const occupeid = isSquareOccupeid.find((ocp)=>ocp.dataPosition==item.data_position)
      if(occupeid) return item
      if(squarePositionToString ==leftCoordinates || squarePositionToString==rightCoordinates ) {
       item.typeColor='yellow'
      }
      return item
    }) 
  
  setSquare(newSquare)
  }
 
 
 const checkSquareFull =(leftCoordinates:string,rightCoordinates:string)=>{
 const  positionOccupeid = piecesPositions.filter((item)=>{
     if(item.dataPosition == leftCoordinates || item.dataPosition==rightCoordinates){
       return item
     }
 })
 

  return  positionOccupeid
 }
 
 
 
 
 
 
 
 
  const markPieceMove = (selectedPiece: PiecePositions) => {
    // Define a nova opção de movimento com a posição e cor da peça selecionada
    setMoveOptions([{ ...initialMoveOptions, targetPosition: selectedPiece.dataPosition, background: selectedPiece.background }]);
    
    // Salva o background da peça atual, se for azul ou vermelho
    if (['blue', 'red'].includes(selectedPiece.background??'')) {
      setSelectedPieceStatus({
        ...selectedPieceStatus,
        background: selectedPiece.background,
        position: selectedPiece.dataPosition
      });
    }
    showAvailableSquareMoves(selectedPiece)
    // Atualiza o estado das peças no tabuleiro
    const modifiedPieces = piecesPositions.map((piece) => {
      const isSelectedPiece = piece.dataPosition === selectedPiece.dataPosition;
      const isRevertingBackground = selectedPieceStatus.position !== null && piece.dataPosition === selectedPieceStatus.position;

      // Se a peça selecionada já está com background verde, restaura para a cor original (se houver)
      if (isSelectedPiece && piece.background === 'green') {
       // piece.background =selectedPieceStatus.background ?? piece.background;
        return piece;
      }

      // Caso contrário, define a peça selecionada como verde
      if (isSelectedPiece) {
        if(lastMovedPieceColor==selectedPiece.background) return piece
        piece.background = 'green';
        return piece;
      }

      // Se a posição salva no background não é a mesma da peça atual, restaura a cor original
      if (isRevertingBackground && selectedPiece.dataPosition !== selectedPieceStatus.position) {
       // piece.background = selectedPieceStatus.background;
        return piece;
      }
   
      return piece;
    });
     
    setPiecesPositions(modifiedPieces);
  };
  



  
  
  
  
  
  
  
  
  
  
  
  const updatePiecePosition = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    selectedSquare: Board
  ) => {
    if (moveOptions.length ===0) return;
       
  const squareRect = event.currentTarget.getBoundingClientRect();
    const { height, width, left, right, top, bottom } = squareRect;
    const backgroundPiece = moveOptions[0].background;
     const squareBackground = selectedSquare.typeColor
    console.log(selectedSquare.data_position )

    if (squareBackground=='yellow') {
      setLastPieceMoved(backgroundPiece);

      const updatedPiecesPositions = piecesPositions.map((piece) => {
        if (selectedSquare.data_position !==piece.dataPosition && piece.background=='green' ) {
          return {
            ...piece,
            bottom,
            left,
            top,
            right,
            width,
            height,
            dataPosition: selectedSquare.data_position ?? '',
            background: selectedPieceStatus.background
          };
        }
        return piece;
      });

      setPiecesPositions(updatedPiecesPositions);
      setPiecesPositionLocal(updatedPiecesPositions);
      setMoveOptions([]);
    }
  };
 return{updatePiecePosition,markPieceMove}
}