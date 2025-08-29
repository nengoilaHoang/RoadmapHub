import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { NodeResizer } from "@xyflow/react";
export function ResizableNode(props) {
    const {data,id,selected } = props;
    const sizes = {
    'S': '12px',
    'M': '14px',
    'L': '16px',
    'XL': '20px',
    'XXL': '24px'
  };
    const colorTopic = {
      'A':'#FF5252',
      'B':'#FF9800',
      'C':'#FFEB3B',
      'D':'#4CAF50',
      'E':'#2196F3',
      'F':'#9C27B0',
      'G':'#607D8B',
      'H':'#795548'
    }
    return(
        <div
        style={{
            border: data.border||'2px solid #555',
            borderRadius: data.borderRadius||'8px',
            background: colorTopic[data.backGroundColorTopic]||data.backgroundColorButton||'#fff',
            padding: data.padding||'10px',
            width: data.width||`180px`,
            height: data.height|| `45px`,
            fontFamily: "sans-serif",
            fontSize: sizes[data.fontSize]||"14px",
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
        
                    {data.label}
               {/* TOP */}
                <Handle type="source" position="top" id="top-source" style={{ left: '50%' }} />
                <Handle type="target" position="top" id="top-target" style={{ left: '50%' }} />

                {/* BOTTOM */}
               <Handle type="source" position="bottom" id="bottom-source" style={{ left: '50%' }} />
               <Handle type="target" position="bottom" id="bottom-target" style={{ left: '50%' }} />

                {/* LEFT */}
                <Handle type="source" position="left" id="left-source" style={{ top: '50%' }} />
                <Handle type="target" position="left" id="left-target" style={{ top: '50%' }} />

                 {/* RIGHT */}
                <Handle type="source" position="right" id="right-source" style={{ top: '50%' }} />
                <Handle type="target" position="right" id="right-target" style={{ top: '50%' }} />
      </div>
    )
}
