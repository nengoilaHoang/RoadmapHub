import React, { useEffect, useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { NodeResizer } from "@xyflow/react";
import './ResizableNode.css'

let allNodeHandles = 
  <div>
    {/* TOP */}
    <Handle  type="source" position="top" id="top-source" style={{ left: '50%' }} />
    <Handle  type="target" position="top" id="top-target" style={{ left: '50%' }} />

    {/* BOTTOM */}
    <Handle  type="source" position="bottom" id="bottom-source" style={{ left: '50%' }} />
    <Handle  type="target" position="bottom" id="bottom-target" style={{ left: '50%' }} />

    {/* LEFT */}
    <Handle  type="source" position="left" id="left-source" style={{ top: '50%' }} />
    <Handle  type="target" position="left" id="left-target" style={{ top: '50%' }} />

      {/* RIGHT */}
    <Handle  type="source" position="right" id="right-source" style={{ top: '50%' }} />
    <Handle  type="target" position="right" id="right-target" style={{ top: '50%' }} />
  </div>

export function ResizableNode(props) {
    const {data,id,selected,type } = props;
    const [checkList, setCheckList] = useState(data.itemsCheckList || []);
    useEffect(() => {
      if(data?.handle === "none"){
        allNodeHandles = 
        <div>
          {/* TOP */}
          <Handle className="hidden-handle"  type="source" position="top" id="top-source" style={{ left: '50%' }} />
          <Handle className="hidden-handle"  type="target" position="top" id="top-target" style={{ left: '50%' }} />

          {/* BOTTOM */}
          <Handle className="hidden-handle" type="source" position="bottom" id="bottom-source" style={{ left: '50%' }} />
          <Handle className="hidden-handle" type="target" position="bottom" id="bottom-target" style={{ left: '50%' }} />

          {/* LEFT */}
          <Handle className="hidden-handle" type="source" position="left" id="left-source" style={{ top: '50%' }} />
          <Handle className="hidden-handle" type="target" position="left" id="left-target" style={{ top: '50%' }} />

            {/* RIGHT */}
          <Handle className="hidden-handle" type="source" position="right" id="right-source" style={{ top: '50%' }} />
          <Handle className="hidden-handle" type="target" position="right" id="right-target" style={{ top: '50%' }} />
        </div>
      }
    }, []);
    useEffect(() => {
      setCheckList(data.itemsCheckList || []);
    }, [data.itemsCheckList]);
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
    let style = {
      // border: "2px solid #555",
      borderStyle: "solid",
      borderColor: "#555",
      borderRadius: "5px",
      background: "#fff",
      padding: "10px",
      width: data.width || `180px`,
      height: data.height || `45px`,
      fontFamily: "sans-serif",
      fontSize: sizes[data.fontSize] || "14px",
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    }
    switch(type){
      case "button":
        style={
          ...style,
          color:data.textColorButton||"#FFFFFF",
          background: data.backgroundColorButton ||"#2196F3",
          borderStyle: "solid",
          borderColor: data.borderColorButton||'#2196F3',
          borderRadius: data.borderRadiusButton?`${data.borderRadiusButton}px` : "5px",
        }
        break;
      case "topic":
        style={
          ...style,
          background:
            data.topicStatus === "done"
              ? "linear-gradient(to right, green, white, green)"
              : data.topicStatus === "progress"
              ? "linear-gradient(to right, darkgoldenrod, white, darkgoldenrod)" // vàng đậm hơn
              : data.topicStatus === "skip"
              ? "linear-gradient(to right, gray, white, gray)"
              : colorTopic[data.backGroundColorTopic] ||"#FFEB3B"
        }
        break;
      case "section":
        style={
          ...style,
          background: data.backgroundColorSection||"transfer",
          borderStyle: "solid",
          borderColor :data.borderColorSection || '#555',
          borderRadius:data.borderRadiusSection? `${data.borderRadiusSection}px` : "5px",
        }
        break;
      case "paragraph":
        style={
          ...style,
          background: data.backgroundColorParagraph||"transfer",
          borderStyle: "solid",
          borderColor:data.borderColorParagraph || "#555",
          color: data.textColorParagraph ||"#000000",
          padding: data.paddingParagraph? `${data.paddingParagraph}px` : "10px",
          textAlign: data.textAlignParagraph||"center",
          justifyContent: data.justificationParagraph ||"center",
        }
        break;
      case "checklist":
        style={
          ...style,
          paddingBottom: data.itemsCheckList?.length? `${13*data.itemsCheckList?.length}px` : "10px",
          paddingTop:data.itemsCheckList?.length? `${13*data.itemsCheckList?.length}px` : "10px",
          justifyContent: "start",
        }
        break;
      case "title":
        break;
    }
    const onCheckChange = (index, value) => {
      const newList = checkList.map((item, i) =>
        i === index ? { ...item, checked: value } : item
      );
      ////console.log("newList:", newList);
      setCheckList(newList);
      data.itemsCheckList = newList;
    };
    // const onCheckChange = (index, value) => {
    //   const newList = checkList.map((item, i) =>
    //     i === index ? { ...item, checked: value } : item
    //   );
    //   setCheckList(newList);
    //   data.itemsCheckList = newList;
    //   ////console.log(data);
    //   //data.onNodeDataChange(id, { itemsCheckList: newList });
    // };
    return(
        <div
        style={style}
    >
      <NodeResizer
        isVisible={selected}   
        minWidth={180}
        minHeight={45}
        onResize= {(_, params) => {
          data.onResize(id, params.width, params.height);
        }}
      />
      {type==="checklist"?(<div style={{ padding: "5px" }}>
        {checkList && checkList.length > 0 ? (
          checkList.map((item, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center" }}>
              <input
                type="checkbox"
                className="nodrag"
                checked={item.checked}
                onChange={(e) =>
                  onCheckChange(index, e.target.checked) 
                }
              />
              <span className="nodrag" style={{ marginLeft: "5px",  marginBottom:"2px", textDecoration: item.checked== true? "line-through":""}}>{item.text}</span>
            </div>
          ))
        ) : (
          <span>No items</span>
        )}
      </div>):(data.label)
      }
        {allNodeHandles}
      </div>
    )
}
