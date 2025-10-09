import { useState, useCallback, useEffect } from 'react';
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
import Edge from '#components/Roadmap/Nodes/Edge/Edge.jsx';

import NodesBar from '#components/Roadmap/Nodes/NodesBar/NodeBar.jsx';
import { DnDProvider, useDnD } from '#components/Roadmap/Nodes/NodesBar/DnDContext.jsx';
import RightBar from '#components/Roadmap/Nodes/RightBar/RightBar.jsx';
import TopBar from '#components/Roadmap/Nodes/TopBar/TopBar.jsx';
import api from '#utils/api.js'
//import {useCheckLogin} from '#hooks/userCheckLogin.jsx';
import { useParams,useNavigate } from "react-router-dom";
import RightBarEdge from '#components/Roadmap/Nodes/RightBar/RightBarEdge/RightBarEdge';

import RoadmapDemo, {useRoadmapDemo} from "../../../components/Roadmap/RoadmapDemo/RoadmapDemo";

import ChatBox from '#components/Roadmap/AIChatBox/AIChatBox.jsx';
const getRandomId = () => {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
}

import axios from 'axios';
//let id = 0;
const getId = () => getRandomId();

const nodeTypes = {  topic: Topic, title: Title, button: Button, section: Section, checklist: CheckList, horizontalline: HorizontalLine, verticalline: VerticalLine, paragraph: Paragraph };
const edgeTypes = { default :Edge}

// const initialNodes = [];
// const initialEdges = [];


function FlowCanvas({ nodes, setNodes, edges, setEdges, setSelectedNode , setRightBarOpen, rightBarOpen,setSelectedEdge}) {
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
  // const onConnect = useCallback(
  //   (params) => setEdges((eds) => addEdge(params, eds)),
  //   []
  // );
  const onConnect = useCallback((params) => setEdges((eds) => addEdge({
    ...params,
    type:"default"
    }, eds)),[])
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
        data: { label: nodeType!=="section"?`${nodeType} node`:"", 
        width: nodeType === "horizontalline" ? 150 : nodeType === "verticalline" ? 10 : 180,
        height: nodeType === "horizontalline" ? 10 : nodeType === "verticalline" ? 150 : 45,
        onResize: (id, w, h) => {
        setNodes((nds) =>
          nds.map((n) =>
            n.id === id ? { ...n, data: { ...n.data, width: w, height: h } } : n
          )
        );  
      },
        },

      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type, setNodes]
  );
  const onNodeDrag = useCallback((event,node)=>{
    setSelectedNode(node);
  })

  const onNodeClick = useCallback((_, node) => {
    setSelectedNode(node);
    setSelectedEdge(null)
    setRightBarOpen(360);
  }, [setSelectedNode]);
  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
    setSelectedEdge(null)
    setRightBarOpen(0);
  }, []);
 const onEdgeClick = useCallback((event, edge) => {
    // event.stopPropagation(); // để không bị pane click clear
    setSelectedEdge(edge);
    setSelectedNode(null);
    setRightBarOpen(360);
  }, [setSelectedEdge]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      connectionLineStyle={{ stroke: "#1e90ff", strokeWidth: 2 }}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onNodeClick={onNodeClick}
      onEdgeClick={onEdgeClick}
      onPaneClick={onPaneClick} 
      onNodeDrag={onNodeDrag}
      fitView
    >
      <Background color="#ccc" variant={BackgroundVariant.Cross} />
      <Controls showFitView={false} style={{ left: 260, bottom:100 }} />
      <MiniMap pannable 
      style={{ height: 150,  width: 250,    bottom: 150, right: rightBarOpen,     
  }} />
    </ReactFlow>
  );
}

export default function RoadmapEditPage() {
  //const { isLoggedIn, user } = useCheckLogin();
  const navigate = useNavigate();
  const { name,id } = useParams();
  useEffect( ()=>{
    async function checkLogin(){
      const response = await api.post('/roadmaps/check-your-roadmap',{name:name},{
        withCredentials: true
      }) ;
      //console.log(response)
      if(!response.data.success){
      navigate("/");
      }
    }
    checkLogin()  
    
  },[])
  //const [nodes, setNodes] = useState(initialNodes);
  //const [edges, setEdges] = useState(initialEdges);

  //nodes in page
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  //nodes in demo
  const [demoNodes, setDemoNodes] = useState([]);
  const [demoEdges, setDemoEdges] = useState([]);
  // quản lý roadmap demo
  const { isOpen, openDemo, closeDemo, roadmapData } = useRoadmapDemo();
  const fetchAPI = async () => {
      const roadmap = await api.get(`/roadmaps/getYourRoadmap/${name}`,{
          withCredentials: true
      })
      const res = await api.get(`/roadmaps/edit/view/${roadmap.data?.id}`,{
          withCredentials: true
      })
      //console.log(res.data)
      if(res.data.status==="success"){
        const nodesWithHandlers = res.data.roadmap?.nodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          onResize: (id, w, h) => {
            setNodes((nds) =>
              nds.map((n) =>
                n.id === id
                  ? { ...n, data: { ...n.data, width: w, height: h } }
                  : n
              )
            );
          },
        },
      }));

      setNodes(nodesWithHandlers);
        // setNodes(res.data.roadmap?.nodes);
        setEdges(res.data.roadmap?.edges);
      }
  };
  useEffect(()=>{
      fetchAPI();
  },[])
  // Hàm xử lý khi click vào nút "Xem Demo"
  const handleViewDemo = useCallback(() => {
    // console.log(demoNodes);
    // console.log(demoNodes);
    openDemo(demoNodes, demoEdges, "Roadmap Demo");
  }, [openDemo]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [rightBarOpen, setRightBarOpen] = useState(0);
  const [selectedEdge, setSelectedEdge] = useState(null);

  const handleDeleteNode = (nodeId) => {
  setNodes((nds) => nds.filter((n) => n.id !== nodeId));
  setEdges((eds) => eds.filter((e) => e.source !== nodeId && e.target !== nodeId));
  setSelectedNode(null);
  };
  const onSaveNodes = async (e) => {
      e.preventDefault();
      //console.log('Nodes:', nodes);
      //console.log('Edges:', edges);
      console.log()
      const response = await api.post('/roadmaps/edit-nodes',{name:name,nodes:nodes,edges:edges,id:id},{
          withCredentials: true
      });
      //console.log(response);
  }
  
  const handleNodeChange = (updatedNode)=>{
  setNodes((nds)=>nds.map((node)=>(
    node.id === updatedNode.id ? updatedNode : node
  )))
  setSelectedNode(updatedNode);
  }
  const handleEdgeChange = (updatedEdge)=>{
  setEdges((eds)=>eds.map((edge)=>(
    edge.id === updatedEdge.id ? updatedEdge : edge
  )))
  setSelectedEdge(updatedEdge);
  }
  return (
    <div style={{ display: 'flex',width:'100%',height:'100vh', flexDirection: "column"}}>
      <TopBar onSaveNode={onSaveNodes}/>
      <ReactFlowProvider>
          <DnDProvider>
          <NodesBar />
          <div style={{ flexGrow: 1 }} >
              <FlowCanvas nodes={nodes} setNodes={setNodes} edges={edges} setEdges={setEdges} 
              setSelectedNode={setSelectedNode} setRightBarOpen={setRightBarOpen} rightBarOpen={rightBarOpen}
              setSelectedEdge={setSelectedEdge}/>
          </div>
          {selectedNode &&<RightBar selectedNode={selectedNode} onDeleteNode={handleDeleteNode} onNodeChange={handleNodeChange} />}
          {selectedEdge &&<RightBarEdge selectedEdge={selectedEdge}  onEdgeChange={handleEdgeChange} />}
          
          </DnDProvider>
          <ChatBox nodes={nodes} edges={edges} demoNodes={demoNodes} demoEdges={demoEdges} setDemoNodes={setDemoNodes} setDemoEdges={setDemoEdges} handleViewDemo={handleViewDemo}/>
          {/* Popup RoadmapDemo */}
          <RoadmapDemo
            isOpen={isOpen}
            onClose={closeDemo}
            nodes={demoNodes}
            edges={demoEdges}
            roadmapName={roadmapData.name}
            showTopBar={true} // Có thể tùy chọn hiển thị TopBar
            setNodes={setNodes}
            setEdges={setEdges}
          />
      </ReactFlowProvider>
    </div>

  );
}
