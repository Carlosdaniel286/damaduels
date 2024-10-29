import { SquareColor } from "../boardType";

export function useSquares() {
    const squares: SquareColor[] = ['gray']; // Inicializa com um array de 64 elementos
  
    // Loop para preencher os 64 quadrados do tabuleiro
    for (let i = 1; i < 64; i++) {
      const previousColor = squares[i - 1]; // Obtém a cor do quadrado anterior
      
      // Alterna a cor do quadrado atual com base na cor anterior
      if (previousColor === 'black') {
        squares.push('gray');
      } else {
        squares.push('black');
      }
  
     const isEndOfRow = (i % 8 === 0);
      
      // Se for o final de uma linha (múltiplo de 8), mantém a cor do quadrado anterior
      if (isEndOfRow) {
        squares[i] = previousColor;
      }
    }
  return {squares}
}