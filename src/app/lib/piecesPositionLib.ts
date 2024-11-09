'use client'
import { PiecePositions } from "@/components/board/boardType";
import { PiecesColor } from "@/components/board/boardType";

export const setPiecesPositionLocal=(piecesPositions:PiecePositions[])=>{
    if (typeof window == 'undefined') return
    localStorage.setItem('duels', JSON.stringify(piecesPositions));
}

export const getPiecesPosition=()=>{
    if (typeof window == 'undefined') return null
    return localStorage.getItem('duels')
}


export const setLastPieceMoved =(backgroundPieces:PiecesColor)=>{
    if (typeof window == 'undefined') return null
    localStorage.setItem('lastPiece', backgroundPieces);
}

export const getLastPiecesMoved=():PiecesColor|null=>{
    if (typeof window == 'undefined') return null
    const color = localStorage.getItem('lastPiece')
   const isString =  color!==null?color as PiecesColor:null
    return isString
}
