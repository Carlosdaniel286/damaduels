"use client"
import './board.css'; // Importa o estilo do tabuleiro
import Piece from "../piece/piece";
import { useSetupBoard } from "./hooks/useSetupBoard";
import Square from '../square/square';
import { useMovePieces } from './hooks/useMoviePiecies';
import { useSetupPieces } from './hooks/useSetupPieces';
import { usePieces } from '@/app/context/piecePositions';
import { useBoard } from '@/app/context/useSquare';

export default function Board() {
  const {square}= useBoard()
  useSetupBoard()
  const{piecesPositions}=usePieces()
  const {squareRefs}= useSetupPieces()
  const {markPieceMove,updatePiecePosition}= useMovePieces()

return (
    <div className='board'
   >
     {square.map((item,index)=>(
        <div 
         key={index}
        >
         <Square
         key={index}
         typeColor={item.typeColor}
         id={index.toString()}
         data_key={item.data_key}
         data_position={item.data_position}
         ref={element => {squareRefs?.current.push(element)}}
         onClick={((ev)=>{
        console.log(item.data_position,item.data_key)
         updatePiecePosition(ev, item,)
        
         })}
         />
         
         </div>
      ))}
    {  
      square.length==64 &&
      piecesPositions.map((item,index)=>(
        <div
        key={index}
        className='piece'
        id={index.toPrecision()}
        data-key={item.dataKey}
        data-position={item.dataPosition}
        onClick={() => {
         console.log(item.dataPosition)
         markPieceMove(item)
      }}
        style={{
          position:'absolute', 
          top:item.top,
          right:item.right,
          left:item.left,
          bottom:item.bottom,
          width:item.width,
          height:item.height,
          
         }}
        >
          <Piece
           background={item.background}
           id='piece'
           data_key={item.dataKey}
           data_position={item.dataPosition}
         />
         </div>
         ))
        }
    </div>
   
  );
}
