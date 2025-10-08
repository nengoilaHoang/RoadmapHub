import { useState, useEffect } from "react";
import TopBarView from "#components/Roadmap/TopBarView/TopBarView.jsx"
import { useCallback } from "react";
import {
  ReactFlow,
} from '@xyflow/react';
import { Background, BackgroundVariant, Controls, MiniMap, ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
//nodes type, edges type
import Topic from '#components/Roadmap/Nodes/Topic/Topic.jsx';
import Title from '#components/Roadmap/Nodes/Title/Title.jsx';
import Button from '#components/Roadmap/Nodes/Button/Button.jsx';
import Section from '#components/Roadmap/Nodes/Section/Section.jsx';
import CheckList from '#components/Roadmap/Nodes/CheckList/CheckList.jsx';
import HorizontalLine from '#components/Roadmap/Nodes/HorizontalLine/HorizontalLine.jsx';
import VerticalLine from '#components/Roadmap/Nodes/VerticalLine/VerticalLine.jsx';
import Paragraph from '#components/Roadmap/Nodes/Paragraph/Paragraph.jsx';
import Edge from '#components/Roadmap/Nodes/Edge/Edge.jsx';
import './RoadmapDemo.css';

const nodeTypes = {  
  topic: Topic, 
  title: Title, 
  button: Button, 
  section: Section, 
  checklist: CheckList, 
  horizontalline: HorizontalLine, 
  verticalline: VerticalLine, 
  paragraph: Paragraph 
};

const edgeTypes = { default: Edge }

// Component RoadmapDemo được sửa để hoạt động như popup
export default function RoadmapDemo({ 
  isOpen, 
  onClose, 
  nodes = [], 
  edges = [], 
  roadmapName = "Roadmap Demo",
  showTopBar = true,
  setNodes,
  setEdges
}) {
  // Không render gì khi popup không mở
  if (!isOpen) return null;
  // Xử lý đóng popup khi click outside
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('roadmap-demo-overlay')) {
      onClose();
    }
  };
  
  const saveChangeFromDemo = () =>{
    setNodes(nodes);
    setEdges(edges);
  }

  return (
    <div className="roadmap-demo-overlay" onClick={handleOverlayClick}>
      <div className="roadmap-demo-container">
        {/* Header với nút đóng */}
        <div className="roadmap-demo-header">
          <h2 className="roadmap-demo-title">{roadmapName}</h2>
          <button 
            className="roadmap-demo-close-btn" 
            onClick={onClose}
            aria-label="Đóng popup"
            type="button"
          >
            ✕
          </button>
        </div>

        {/* Content chính */}
        <div className="roadmap-demo-content">
          <div className="roadmap-demo-flow-container">
            <ReactFlowProvider>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                connectionLineStyle={{ stroke: "#1e90ff", strokeWidth: 2 }}
                fitView
                fitViewOptions={{ 
                  padding: 0.1,
                  includeHiddenNodes: false,
                  maxZoom: 1.2,
                  minZoom: 0.1 
                }}
                className="roadmap-demo-reactflow"
              >
                <Background color="#ccc" variant={BackgroundVariant.Cross} />
                <Controls 
                  showFitView={true}
                  showZoom={true}
                  showInteractive={true}
                />
                <MiniMap 
                  pannable 
                  zoomable
                  style={{ 
                    height: 120,  
                    width: 200, 
                    bottom: 10, 
                    right: 10, 
                    margin: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    border: '1px solid #e2e8f0'
                  }} 
                />
              </ReactFlow>
            </ReactFlowProvider>
          </div>
        </div>

        {/* Footer với các nút hành động */}
        <div className="roadmap-demo-footer">
          <div className="roadmap-demo-stats">
            <span className="stats-item">Nodes: {nodes.length}</span>
            <span className="stats-item">Edges: {edges.length}</span>
          </div>
          <div className="roadmap-demo-actions">
            <button className="btn-primary" onClick={saveChangeFromDemo}>
              Put into edit mode
            </button>
            <button className="btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Hook để quản lý state của RoadmapDemo popup
export const useRoadmapDemo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [roadmapData, setRoadmapData] = useState({ nodes: [], edges: [], name: '' });

  const openDemo = ((nodes = [], edges = [], name = 'Roadmap Demo') => {
    console.log(nodes);
    console.log(edges);
    setRoadmapData({ nodes, edges, name });
    setIsOpen(true);
  });

  const closeDemo = (() => {
    setIsOpen(false);
  });

  const updateRoadmapData = ((nodes, edges, name) => {
    setRoadmapData({ nodes, edges, name });
  });

  return {
    isOpen,
    openDemo,
    closeDemo,
    roadmapData,
    updateRoadmapData,
  };
};

// Component wrapper để sử dụng dễ dàng hơn
export const RoadmapDemoProvider = ({ children }) => {
  const roadmapDemo = useRoadmapDemo();
  return (
    <div>
      {children}
      <RoadmapDemo
        isOpen={roadmapDemo.isOpen}
        onClose={roadmapDemo.closeDemo}
        nodes={roadmapDemo.roadmapData.nodes}
        edges={roadmapDemo.roadmapData.edges}
        roadmapName={roadmapDemo.name}
      />
    </div>
  );
};