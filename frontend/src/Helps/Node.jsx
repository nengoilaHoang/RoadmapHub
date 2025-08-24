import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { NodeResizer } from "@xyflow/react";
export function ResizableNode(props) {
    const {data,id,selected, name, border, borderRadius, background } = props;
    return(
        <div
        style={{
            border: border,
            borderRadius: borderRadius,
            background: background,
            padding: '10px',
            width: data.width||`180px`,
            height: data.height|| `45px`,
            fontFamily: "sans-serif",
            fontSize: "14px",
            textAlign: "center",
            display: 'flex',         // Add this
            alignItems: 'center',    // Add this
            justifyContent: 'center' // Add this
        }}
    >
      {/* Thêm NodeResizer */}
      <NodeResizer
        isVisible={selected}   
        minWidth={180}
        minHeight={45}
        onResize= {(_, params) => {
          data.onResize(id, params.width, params.height);
        }}
      />
        
        {name}
      </div>
    )
}
