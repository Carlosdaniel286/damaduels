import { LegacyRef } from "react"

export type squareType = {
  typeColor?:"black"|"gray"|'yellow',
  ref?: LegacyRef<HTMLDivElement> | undefined,
  id?:string,
  onClick?:((event: React.MouseEvent<HTMLDivElement>)=>void)
  data_key?:string
  data_position?:string
}