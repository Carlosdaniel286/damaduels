export type colorPiece ={
    background?:'blue' | 'red' | 'green' | undefined
    onClick?:((event: React.MouseEvent<HTMLDivElement>)=>void);
    data_key?: string,
    id?:string,
    data_position?:string
}