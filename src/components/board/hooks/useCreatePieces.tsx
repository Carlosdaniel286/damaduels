// src/hooks/useFetchData.js

import { useState, MutableRefObject, useEffect } from 'react';
import { Positions } from '../boardType';
import { initPositions } from '../constants/positions';

const MAX_PIECES = 12; // Constante para o número máximo de peças

export function useCreatePieces(squareRefs: MutableRefObject<(HTMLDivElement | null)[]>) {
  const [redPieces, setRedPieces] = useState<Positions[]>([initPositions]);
  const [bluePieces, setBluePieces] = useState<Positions[]>([initPositions]);

  const handlePositions = (color: 'red' | 'blue') => {
    const newArray: Positions[] = [];

    squareRefs.current.forEach((element, index) => {
      if (!element || newArray.length >= MAX_PIECES) return; // Verifica se a referência é válida e se atingiu o limite

      const { left, bottom, right, top } = element.getBoundingClientRect();

      if ((color === 'red' && element.style.background === 'gray') || 
          (color === 'blue' && element.style.background === 'gray' && index >= 40)) {
        newArray.push({
          position: {
            left,
            bottom,
            right,
            top,
          },
          color,
          id: index,
        });
      }
    });

    if (color === 'red') {
      setRedPieces(newArray);
    } else {
      setBluePieces(newArray);
    }
  };

  useEffect(() => {
    handlePositions('red'); // Chama a função para atualizar as posições das peças vermelhas
    handlePositions('blue'); // Chama a função para atualizar as posições das peças azuis
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [squareRefs]);

  return { redPieces, setRedPieces, bluePieces, setBluePieces };
}
