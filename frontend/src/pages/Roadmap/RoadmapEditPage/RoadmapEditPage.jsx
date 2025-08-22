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

import LabelNode from '#pages/Roadmap/Nodes/Label/Label.jsx';
import Topic from '#pages/Roadmap/Nodes/Topic/Topic.jsx';

import NodesBar from '../Nodes/NodesBar/NodeBar';
import { DnDProvider, useDnD } from '../Nodes/NodesBar/DnDContext.jsx';
import RightBar from '../Nodes/RightBar/RightBar.jsx';

let id = 0;
const getId = () => `dndnode_${id++}`;

const nodeTypes = { label: LabelNode, topic: Topic };

const initialNodes = [];
const initialEdges = [];

function FlowCanvas({ nodes, setNodes, edges, setEdges, setSelectedNode }) {
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
        data: { label: `${nodeType} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type, setNodes]
  );

  const onNodeClick = useCallback((_, node) => {
    setSelectedNode(node);
  }, [setSelectedNode]);

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
      fitView
    >
      <Background color="#ccc" variant={BackgroundVariant.Cross} />
      <Controls showFitView={false} />
      <MiniMap />
    </ReactFlow>
  );
}

export default function RoadmapEditPage() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
    const [selectedNode, setSelectedNode] = useState(null);

    const handleDeleteNode = (nodeId) => {
    setNodes((nds) => nds.filter((n) => n.id !== nodeId));
    setEdges((eds) => eds.filter((e) => e.source !== nodeId && e.target !== nodeId));
    setSelectedNode(null);
    };
    return (
        <div style={{ display: 'flex', width: '90vw', height: '80vh' }}>
        <ReactFlowProvider>
            <DnDProvider>
            <NodesBar />
            <div style={{ flexGrow: 1 }}>
                <FlowCanvas nodes={nodes} setNodes={setNodes} edges={edges} setEdges={setEdges} 
                setSelectedNode={setSelectedNode}/>
            </div>
            <RightBar selectedNode={selectedNode} onDeleteNode={handleDeleteNode} />
            </DnDProvider>
        </ReactFlowProvider>
        </div>
    );
}
