import { useEffect, useRef, useState } from "react";
import { useCreatePieces } from "./useCreatePieces";
import { PiecesColor, PiecePositions, BackgroundPieces, Positions } from "../boardType";

export function useMovePieces() {
    const squareRefs = useRef<(HTMLDivElement | null)[]>([]);
    const { setRedPieces, redPieces, bluePieces, setBluePieces } = useCreatePieces(squareRefs);
    const [savedBackground, setSavedBackground] = useState<BackgroundPieces>('blue');

    const movePiece = (item: Positions, id: number, position: PiecePositions) => {
        if (item.color === 'green') {
            return {
                ...item,
                id,
                position, // Mantendo o tipo PiecePositions
            };
        }
        return item; // Retorna o item original caso a cor não seja 'green'
    };

    const handleMovePieceWithColor = (
        background: BackgroundPieces,
        id: number,
        pieceOrSquare: string,
        position: PiecePositions
    ) => {
        if (background === 'blue') setSavedBackground('blue');
        if (background === 'red') setSavedBackground('red');
        
        const color = background === 'gray' ? savedBackground : background;
        const pieces = color === 'red' ? redPieces : bluePieces;
        const isRedPiece = color === 'red';
        const isBluePiece = color === 'blue';

        if (pieceOrSquare === 'piece') {
            const updatedPieces = pieces.map((item) => {
                if (item.color === 'green') {
                    return { ...item,  color:color  as PiecesColor };
                }
                if (item.id === id) {
                    return { ...item, color: 'green' as PiecesColor };
                }
                return item;
            });

            if (isRedPiece) setRedPieces(updatedPieces);
            if (isBluePiece) setBluePieces(updatedPieces);
        }

        if (pieceOrSquare === 'squares') {
            const updatedPieces = pieces.map((item) => {
                if (item.id === undefined || typeof item.id === 'string') return item;

                if (
                    (color === 'red' && (id - item.id === 7 || id - item.id === 9)) ||
                    (color === 'blue' && (item.id - id === 7 || item.id - id === 9))
                ) {
                    return movePiece(item, id, position);
                }
                return item;
            });

            if (isRedPiece) setRedPieces(updatedPieces);
            if (isBluePiece) setBluePieces(updatedPieces);
        }
    };

    const handleMovePieces = (event: React.MouseEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const { left, right, top, bottom } = rect;
        const pieceOrSquare = event.currentTarget.id;
        const background = event.currentTarget.style.background as BackgroundPieces;
        const key = event.currentTarget.getAttribute('data-key');
        const id = typeof key === 'string' ? Number(key) : -1;

        handleMovePieceWithColor(background, id, pieceOrSquare, { left, right, top, bottom });
    };

    useEffect(() => {
        console.log(savedBackground);
    }, [savedBackground]);

    return { handleMovePieces, redPieces, squareRefs, bluePieces };
}
