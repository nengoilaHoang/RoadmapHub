import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { NodeResizer ,NodeResizeControl} from "@xyflow/react";
export function Line(props) {
    const {data,id,selected,type } = props;
    //console.log(data)
    let style = {
      background: '#2196F3',
    }
    switch(type){
      case "horizontalline":
        style={
          ...style,
          background:data.lineColor||'#2196F3',
          height:  data.thickness? `${data.thickness}px`: "10px",     
          width: data.width || '150px',
        }
        break;
      case "verticalline":
         style={
          ...style,
          background:data.lineColor||'#2196F3',
          width: data.thickness? `${data.thickness}px`: "10px",    
          height: data.height || '150px',
        }
        break;
    }
    return(
        <div
        style={style}
    >
     
      {/* Thêm NodeResizer */}
      <NodeResizer
       isVisible={selected}
        minWidth={20}
        minHeight={20}
        onResize= {(_, params) => {
          data.onResize(id, params.width, params.height);
        }}
        shouldResize = {(event,direction) =>{
           if (type === "horizontalline") {
            return direction === "left" || direction === "right";
          }
          if (type === "verticalline") {
            return direction === "top" || direction === "bottom";
          }
          return true; 
        }}
      />
      </div>
    )
}
