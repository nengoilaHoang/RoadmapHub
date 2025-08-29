import React from "react";
import { useState } from "react";
import RightBarTopic from "./RightBarTopic/RightBarTopic";
import RightBarTitle from "./RightBarTitle/RightBarTitle";
import RightBarSection from "./RightBarSection/RightBarSection";
import RightBarParagraph from "./RightBarParagraph/RightBarParagraph";
import RightBarButton from "./RightBarButton/RightBarButton";
import RightBarCheckList from "./RightBarCheckList/RightBarCheckList";
import RightBarLine from "./RightBarLine/RightBarLine";
//import "./RightBar.css";

export default function RightBar({ selectedNode, onDeleteNode, onNodeChange }) {
  if (!selectedNode) return null;
  switch (selectedNode.type) {
    case 'topic':
      return <RightBarTopic selectedNode={selectedNode} onDeleteNode={onDeleteNode} onNodeChange={onNodeChange}/>
      break;
    case 'title':
      return <RightBarTitle selectedNode={selectedNode} onDeleteNode={onDeleteNode} onNodeChange={onNodeChange}/>
      break;
    case 'paragraph':
      return <RightBarParagraph selectedNode={selectedNode} onDeleteNode={onDeleteNode} onNodeChange={onNodeChange}/>
      break;
    case 'button':
      return <RightBarButton selectedNode={selectedNode} onDeleteNode={onDeleteNode} onNodeChange={onNodeChange}/>
      break;
    case 'section':
      return <RightBarSection selectedNode={selectedNode} onDeleteNode={onDeleteNode} onNodeChange={onNodeChange}/>
      break;
    case 'checklist':
      return <RightBarCheckList selectedNode={selectedNode} onDeleteNode={onDeleteNode} onNodeChange={onNodeChange}/>
      break;
    case 'horizontalline':
      return <RightBarLine selectedNode={selectedNode} onDeleteNode={onDeleteNode} onNodeChange={onNodeChange}/>
      break;
    case 'verticalline':
      return <RightBarLine selectedNode={selectedNode} onDeleteNode={onDeleteNode} onNodeChange={onNodeChange}/>
      break;
    default:
      break;
  }
}