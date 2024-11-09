import React, { createContext, useContext, useState } from 'react';
import { PiecePositions } from '@/components/board/boardType';


// Cria o contexto para piecesPositions
const PiecesContext = createContext<{
  piecesPositions: PiecePositions[];
  setPiecesPositions: React.Dispatch<React.SetStateAction<PiecePositions[]>>;
} | undefined>(undefined);

// Hook para acessar piecesPositions e setPiecesPositions
export const usePieces = (): {
    piecesPositions: PiecePositions[];
    setPiecesPositions: React.Dispatch<React.SetStateAction<PiecePositions[]>>;
  } => {
    const context = useContext(PiecesContext);
  
    if (!context) {
      throw new Error('usePieces must be used within a PiecesProvider');
    }
  
    return context;
  };
  
  // Componente de provedor do contexto
export const PiecesProvider = ({ children }: { children: React.ReactNode }) => {
    const [piecesPositions, setPiecesPositions] = useState<PiecePositions[]>([]);
  
    // Inicializa o contexto diretamente com o estado
    const contextValue = { piecesPositions, setPiecesPositions };
  
    return (
      <PiecesContext.Provider value={contextValue}>
        {children}
      </PiecesContext.Provider>
    );
  };
  