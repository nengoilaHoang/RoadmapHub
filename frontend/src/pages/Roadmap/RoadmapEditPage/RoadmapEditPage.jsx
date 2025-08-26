import { useState, useCallback } from 'react';
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  ReactFlowProvider,
  useReactFlow,
} from '@xyflow/react';
import { Background, BackgroundVariant, Controls, MiniMap } from '@xyflow/react';
import '@xyflow/react/dist/style.css';


import Topic from '#components/Roadmap/Nodes/Topic/Topic.jsx';
import Title from '#components/Roadmap/Nodes/Title/Title.jsx';
import Button from '#components/Roadmap/Nodes/Button/Button.jsx';
import Section from '#components/Roadmap/Nodes/Section/Section.jsx';
import CheckList from '#components/Roadmap/Nodes/CheckList/CheckList.jsx';
import HorizontalLine from '#components/Roadmap/Nodes/HorizontalLine/HorizontalLine.jsx';
import VerticalLine from '#components/Roadmap/Nodes/VerticalLine/VerticalLine.jsx';
import Paragraph from '#components/Roadmap/Nodes/Paragraph/Paragraph.jsx';

import NodesBar from '#components/Roadmap/Nodes/NodesBar/NodeBar.jsx';
import { DnDProvider, useDnD } from '#components/Roadmap/Nodes/NodesBar/DnDContext.jsx';
import RightBar from '#components/Roadmap/Nodes/RightBar/RightBar.jsx';
import TopBar from '#components/Roadmap/Nodes/TopBar/TopBar.jsx';

let id = 0;
const getId = () => `dndnode_${id++}`;

const nodeTypes = {  topic: Topic, title: Title, button: Button, section: Section, checklist: CheckList, horizontalline: HorizontalLine, verticalline: VerticalLine, paragraph: Paragraph };

const initialNodes = [];
const initialEdges = [];


function FlowCanvas({ nodes, setNodes, edges, setEdges, setSelectedNode , setRightBarOpen, rightBarOpen}) {
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const nodeType = event.dataTransfer.getData('application/reactflow') || type;
      if (!nodeType) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        type: nodeType,
        position,
        data: { label: `${nodeType} node`, 
        width: 180,
        height: 45,
        onResize: (id, w, h) => {
        setNodes((nds) =>
          nds.map((n) =>
            n.id === id ? { ...n, data: { ...n.data, width: w, height: h } } : n
          )
        );
      }, },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type, setNodes]
  );

  const onNodeClick = useCallback((_, node) => {
    setSelectedNode(node);
    setRightBarOpen(300);
    setNodeClick(true);
  }, [setSelectedNode]);
  const onPaneClick = useCallback(() => {
  setSelectedNode(null);
  setRightBarOpen(0);
}, []);


  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onNodeClick={onNodeClick}
      onPaneClick={onPaneClick} 
      fitView
    >
      <Background color="#ccc" variant={BackgroundVariant.Cross} />
      <Controls showFitView={false} style={{ left: 260, bottom:100 }} />
      <MiniMap pannable 
      style={{ height: 150,  width: 250,    bottom: 100, right: rightBarOpen,     
  }} />
    </ReactFlow>
  );
}

export default function RoadmapEditPage() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
    const [selectedNode, setSelectedNode] = useState(null);
    const [rightBarOpen, setRightBarOpen] = useState(0);

    const handleDeleteNode = (nodeId) => {
    setNodes((nds) => nds.filter((n) => n.id !== nodeId));
    setEdges((eds) => eds.filter((e) => e.source !== nodeId && e.target !== nodeId));
    setSelectedNode(null);
    };
    return (
        <div style={{ display: 'flex',width:'100%',height:'100vh', flexDirection: "column"}}>
        <TopBar />
        <ReactFlowProvider>
            <DnDProvider>
            <NodesBar />
            <div style={{ flexGrow: 1 }} >
                <FlowCanvas nodes={nodes} setNodes={setNodes} edges={edges} setEdges={setEdges} 
                setSelectedNode={setSelectedNode} setRightBarOpen={setRightBarOpen} rightBarOpen={rightBarOpen}/>
            </div>
            {selectedNode &&<RightBar selectedNode={selectedNode} onDeleteNode={handleDeleteNode} />}
            
            </DnDProvider>
        </ReactFlowProvider>
        </div>
    );
}
