"use client"
import { useEffect, useState} from "react";
import { initialBoard } from "../constants/positions";
import { Board } from "../boardType";
import { useBoard } from "@/app/context/useSquare";


export function useSetupBoard() {
  const [board] = useState(initialBoard);
  const { setSquare } = useBoard();
 
  const newSquares:Board[]=[]
   for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === 1) {
          newSquares.push(
            {
              data_key:`${1}`,
              typeColor:"gray",
              data_position:`${row}-${col}`
          })
        }  if (board[row][col] === 0) {
          newSquares.push(
            {
              data_key:`${0}`,
              typeColor:'black',
              data_position:`${row}-${col}`
          }
        )
        } if (board[row][col] === 2) {
          newSquares.push(
            {
              data_key:`${2}`,
              typeColor:"gray",
              data_position:`${row}-${col}`
          })
        }
        if (board[row][col] === 3) {
          newSquares.push(
            {
              data_key:`${3}`,
              typeColor:"gray",
              data_position:`${row}-${col}`
          })
        }
       
        // Adicione mais condições para as peças "reis" (3 e 4) se necessário
      }
    }
   
  useEffect(()=>{
  setSquare(newSquares)
  console.log('atulizou')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[board])
  
  return{board}
}
//0 representa uma posição vazia.
//1 representa uma peça vermelha.
//2 representa uma peça azul.
//3 e 4 representam, respectivamente, "reis" vermelhos e azuis.