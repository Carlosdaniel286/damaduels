'use client'

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Board } from '@/components/board/boardType';  // Importe o tipo Board

// Definição do tipo do contexto
interface BoardContextType {
  square: Board[];
  setSquare: React.Dispatch<React.SetStateAction<Board[]>>;
}

// Criação do contexto
const BoardContext = createContext<BoardContextType | undefined>(undefined);

// Provedor do contexto
export const BoardProvider = ({ children }: { children: ReactNode }) => {
  const [square, setSquare] = useState<Board[]>([]);  // Estado de square

  return (
    <BoardContext.Provider value={{ square, setSquare }}>
      {children}
    </BoardContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useBoard = (): BoardContextType => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error('useBoard must be used within a BoardProvider');
  }
  return context;
};
