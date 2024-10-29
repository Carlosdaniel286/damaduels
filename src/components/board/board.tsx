"use client"

import Square from "../square/square"; // Importa o componente Square
import './board.css'; // Importa o estilo do tabuleiro
import Piece from "../piece/piece";

import { useMovePieces } from "./hooks/useMoviePiecies";
import { useSquares } from "./hooks/useSquares";



export default function Board() {
  const{squareRefs,redPieces,handleMovePieces,bluePieces}=useMovePieces ()
 const {squares}= useSquares()
  
 

return (
    <div className='board'>
     
      { redPieces.map((color, index) => (
       <div
          key={index}
           className="piece"
           style={{
             position:'fixed',
             left:redPieces[index].position.left+11,
             bottom:redPieces[index].position.bottom,
             top:redPieces[index].position.top,
            right:redPieces[index].position.right
          }}
         
        >
          <Piece
            background={color?.color}
            onClick={((ev)=>
              handleMovePieces(ev)
                  )}
            data_key={color?.id?.toString()}
            id="piece"
            
          />
        </div>
      ))}
     
     {squares.map((color, index) => (
        <Square
         key={index}
         id='squares'
         data_key={index.toString()}
         onClick={((ev)=>handleMovePieces(ev)  )}
          typeColor={color}
          ref={element => {squareRefs?.current.push(element)}}
        />
        
      ))} 
      { bluePieces.map((color, index) => (
      <div
         key={index}
          className="piece"
          style={{
            position:'fixed',
            left:bluePieces[index].position.left+11,
            bottom:bluePieces[index].position.bottom,
            top:bluePieces[index].position.top,
           right:bluePieces[index].position.right
         }}
        
       >
         <Piece
           background={color?.color}
           onClick={((ev)=>handleMovePieces(ev)
           )}
           data_key={color?.id?.toString()}
           id="piece"
           
         />
       </div>
       
       
     ))}
    </div>
   
  );
}
