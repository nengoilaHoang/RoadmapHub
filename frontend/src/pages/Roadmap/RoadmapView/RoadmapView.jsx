import { useState, useEffect } from "react";
import TopBarView from "#components/Roadmap/TopBarView/TopBarView.jsx"
import { useParams} from "react-router-dom";
import { useCallback } from "react";
import {
  ReactFlow,
//   applyNodeChanges,
//   applyEdgeChanges,
//   addEdge,
//   ReactFlowProvider,
//   useReactFlow,
} from '@xyflow/react';
import { Background, BackgroundVariant, Controls, MiniMap } from '@xyflow/react';
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
import axios from "axios";
import api from "../../../utils/api";
import RightBarView from "#components/Roadmap/NodesView/RightBarView/RightBarView.jsx";
import RightBarPopUp from "#components/Roadmap/NodesView/RightBarPopUp/RightBarPopUp.jsx"

const nodeTypes = {  topic: Topic, title: Title, button: Button, section: Section, checklist: CheckList, horizontalline: HorizontalLine, verticalline: VerticalLine, paragraph: Paragraph };
const edgeTypes = { default :Edge}
export default function RoadmapVuew(){
    const [nodes, setNodes] = useState();
    const [edges, setEdges] = useState();
    const [selectedNode, setSelectedNode] = useState(null);
    const {roadmapId} = useParams();
    const fetchAPI = async () => {
        const res = await api.get(`roadmaps/view/${roadmapId}`,{
            withCredentials: true
        })
        //console.log(res.data)
        const nodeFromRes = res.data.roadmap?.nodes;
        const secondRes = await api.post(`learnTopic/solve-nodes-progress`,{nodes: nodeFromRes},{withCredentials: true});
        console.log(secondRes.data.nodes);
        setNodes(secondRes.data.nodes);
        setEdges(res.data.roadmap?.edges);
    };
    useEffect(()=>{
        fetchAPI();
    },[selectedNode])
    const onNodeClick = useCallback((_, node) => {
        if(node.type==="topic"){
            setSelectedNode(node);
            console.log(node);
        }
    }, [setSelectedNode]);
    const onPaneClick = useCallback(() => {
        setSelectedNode(null);
    }, []);
    return(
        <div style={{ display: 'flex',width:'100%', height:'130vh', flexDirection: "column", margin: 0}}>
            <TopBarView />
            <div style={{ display: 'flex', width:'100%', height:'130vh', flexDirection: "row", margin: 0}}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    connectionLineStyle={{ stroke: "#1e90ff", strokeWidth: 2 }}
                    // onNodesChange={onNodesChange}
                    // onEdgesChange={onEdgesChange}
                    // onConnect={onConnect}
                    // onDrop={onDrop}
                    // onDragOver={onDragOver}
                    onNodeClick={onNodeClick}
                    //onEdgeClick={onEdgeClick}
                    onPaneClick={onPaneClick} 
                    // onNodeDrag={onNodeDrag}
                    fitView
                    style={{marginLeft: "0px", paddingRight: "100px"}}
                    >
                    {/* <Background color="#ccc" variant={BackgroundVariant.Cross} /> */}
                    <Controls showFitView={false} />
                    <MiniMap pannable 
                    style={{ height: 150,  width: 250, bottom: 0, right: 0, margin:0, color:"GrayText"
                        //, right: rightBarOpen,     
                    }} />
                </ReactFlow>
                <RightBarPopUp show={!!selectedNode} onClose={onPaneClick}>
                    {selectedNode && <RightBarView node={selectedNode} />}
                </RightBarPopUp>
            </div>
        </div>
    )
}