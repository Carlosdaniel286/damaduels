"use client";

import './piece.css'
import { colorPiece } from './pieceType'

export default function Piece({background,onClick,data_key,id}:colorPiece) {
     
    return(
        <div className='piece'
         style={{background}}
         onClick={onClick}
         data-key={data_key}
         id={id}
        >


        </div>
     )
}