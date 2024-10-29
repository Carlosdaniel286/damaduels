//import Image from "next/image";
"use client"
import styles from "./page.module.css";
import Board from "@/components/board/board";

export default function Home() {
  return (
    <div className={styles.page}>
     <Board/>
    </div>
  );
}
