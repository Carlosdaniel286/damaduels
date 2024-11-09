'use client'
import { useState } from "react";
import { Board, OptionsPositionsMove, PiecePositions, ToggleColor } from "../boardType";
import { getLastPiecesMoved, setLastPieceMoved, setPiecesPositionLocal } from "@/app/lib/piecesPositionLib";
import { initialMoveOptions } from "../constants/positions";
import { usePieces } from "@/app/context/piecePositions";

export function useMovePieces() {
  const [moveOptions, setMoveOptions] = useState<OptionsPositionsMove[]>([]);
  const { piecesPositions, setPiecesPositions } = usePieces();
  const lastMovedPieceColor = getLastPiecesMoved();
const [selectedPieceStatus, setSelectedPieceStatus] = useState<ToggleColor>({
  background: 'red',
  position: null
});

  const getAvailableMoves = (selectedPiece: PiecePositions) => {
    // Define a nova opção de movimento com a posição e cor da peça selecionada
    setMoveOptions([{ ...initialMoveOptions, targetPosition: selectedPiece.dataPosition, background: selectedPiece.background }]);

    // Salva o background da peça atual, se for azul ou vermelho
    if (['blue', 'red'].includes(selectedPiece.background)) {
      setSelectedPieceStatus({
        ...selectedPieceStatus,
        background: selectedPiece.background,
        position: selectedPiece.dataPosition
      });
    }

    // Atualiza o estado das peças no tabuleiro
    const modifiedPieces = piecesPositions.map((piece) => {
      const isSelectedPiece = piece.dataPosition === selectedPiece.dataPosition;
      const isRevertingBackground = selectedPieceStatus.position !== null && piece.dataPosition === selectedPieceStatus.position;

      // Se a peça selecionada já está com background verde, restaura para a cor original (se houver)
      if (isSelectedPiece && piece.background === 'green') {
        piece.background =selectedPieceStatus.background ?? piece.background;
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
        piece.background = selectedPieceStatus.background;
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
    if (moveOptions.length === 0) return;

    const targetCoords = moveOptions[0].targetPosition.split('-').map(Number);
    const currentCoords = selectedSquare.data_position
      ? selectedSquare.data_position.split('-').map(Number)
      : [];
    const targetString = `${targetCoords[0]}-${targetCoords[1]}`;
    const isAdjacentColumn = Math.abs(targetCoords[1] - currentCoords[1]) === 1;
    const squareRect = event.currentTarget.getBoundingClientRect();
    const { height, width, left, right, top, bottom } = squareRect;
    const backgroundPiece = moveOptions[0].background;

    capturePieces(currentCoords, squareRect);

    let isForwardMove = false;
    if (backgroundPiece === 'blue' && targetCoords[0] - currentCoords[0] === 1) isForwardMove = true;
    if (backgroundPiece === 'red' && currentCoords[0] - targetCoords[0] === 1) isForwardMove = true;

    if (backgroundPiece === lastMovedPieceColor) return;

    if (isForwardMove && isAdjacentColumn) {
      setLastPieceMoved(backgroundPiece);

      const updatedPiecesPositions = piecesPositions.map((piece) => {
        if (piece.dataPosition === targetString) {
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

  const capturePieces = (
    currentSquareCoords: number[], // Coordenadas da peça selecionada
    squareRect: DOMRect, // Propriedades do quadrado (como posição e tamanho)
  ) => {
    // Extraímos as coordenadas do alvo a partir de moveOptions e calculamos as diferenças
    const targetPositionCoords = moveOptions[0].targetPosition.split('-').map(Number);

    // A cor de fundo da peça a ser movida
    const backgroundPiece = moveOptions[0].background;

    // Calcula as coordenadas intermediárias (onde a peça pode ser capturada)
    const candidateTargetCoordinates = `${(targetPositionCoords[0] + currentSquareCoords[0]) / 2}-${(targetPositionCoords[1] + currentSquareCoords[1]) / 2}`;

    // Cria uma nova posição de dados para a peça que está sendo movida
    const newDataPosition = `${currentSquareCoords[0]}-${currentSquareCoords[1]}`;

    // Extraímos as propriedades do DOMRect do quadrado para aplicar nas peças movidas
    const { bottom, top, left, right, height, width } = squareRect;
    const isPiecesOnSquare = piecesPositions.some((item) => item.dataPosition === candidateTargetCoordinates && item.background !== backgroundPiece);

    if (!isPiecesOnSquare) return;

    // Filtra a peça candidata para captura com base nas coordenadas intermediárias
    const capturePiece = piecesPositions.filter((item) => {
      if (item.dataPosition === candidateTargetCoordinates && item.background !== backgroundPiece) {
        return item.dataPosition !== candidateTargetCoordinates;
      }
      return item;
    });

    // Atualiza a peça capturada e move para a nova posição
    const capturingPieceUpdated = capturePiece.map((item) => {
      if (item.dataPosition === moveOptions[0].targetPosition) {
        return {
          ...item,
          bottom,
          top,
          right,
          width,
          left,
          height,
          dataPosition: newDataPosition,
          background: selectedPieceStatus.background
        };
      }
      return item;
    });

    // Atualiza o estado das peças se a captura for válida
    setLastPieceMoved(backgroundPiece);
    setPiecesPositions(capturingPieceUpdated);
    setPiecesPositionLocal(capturingPieceUpdated);
    setMoveOptions([]);
  };

  return { getAvailableMoves, moveOptions, setMoveOptions, updatePiecePosition };
}

//localStorage.clear()