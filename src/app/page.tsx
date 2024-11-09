//import Image from "next/image";
"use client"
import { PiecesProvider } from "./context/piecePositions";
import { BoardProvider } from "./context/useSquare";
import styles from "./page.module.css";
import Board from "@/components/board/board";

export default function Home() {
  return (
    <div className={styles.page}>
      <BoardProvider>
       <PiecesProvider>
         <Board/>
        </PiecesProvider>
     </BoardProvider>
    
    </div>
  );
}
