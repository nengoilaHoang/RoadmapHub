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

export default function RightBar({ selectedNode, onDeleteNode }) {
  if (!selectedNode) return null;
  // const [activeTab, setActiveTab] = useState('properties');
  // const [links, setLinks] = useState([{ type: 'Video', title: '', url: '' }]);
  // const addLink = () => {
  //   setLinks([...links, { type: 'Video', title: '', url: '' }]);
  // };
  // const removeLink = (index) => {
  //   setLinks(links.filter((_, i) => i !== index));
  // };
  switch (selectedNode.type) {
    case 'topic':
      return <RightBarTopic selectedNode={selectedNode} onDeleteNode={onDeleteNode}/>
      break;
    case 'title':
      return <RightBarTitle selectedNode={selectedNode} onDeleteNode={onDeleteNode}/>
      break;
    case 'paragraph':
      return <RightBarParagraph selectedNode={selectedNode} onDeleteNode={onDeleteNode}/>
      break;
    case 'button':
      return <RightBarButton selectedNode={selectedNode} onDeleteNode={onDeleteNode}/>
      break;
    case 'section':
      return <RightBarSection selectedNode={selectedNode} onDeleteNode={onDeleteNode}/>
      break;
    case 'checklist':
      return <RightBarCheckList selectedNode={selectedNode} onDeleteNode={onDeleteNode}/>
      break;
    case 'horizontalline':
      return <RightBarLine selectedNode={selectedNode} onDeleteNode={onDeleteNode}/>
      break;
    case 'verticalline':
      return <RightBarLine selectedNode={selectedNode} onDeleteNode={onDeleteNode}/>
      break;
    default:
      break;
  }
}