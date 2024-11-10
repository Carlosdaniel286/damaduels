import { PiecesColor } from "../board/boardType";
export type colorPiece ={
    background?:PiecesColor
    onClick?:((event: React.MouseEvent<HTMLDivElement>)=>void);
    data_key?: string,
    id?:string,
    data_position?:string
}