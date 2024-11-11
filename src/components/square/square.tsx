"use client"
import './square.css'
import { squareType } from './squareTypes';

export default function Square({typeColor,ref,onClick,id,data_key,data_position,occupied}:squareType) {
    return (
      <div className='square'
      style={{background:typeColor }}
      ref={ref}
      id={id}
      onClick={onClick}
      data-key={data_key}
      data-position={data_position}
      data-occupied={occupied??typeColor }
      >
     </div>
    );
  }
  