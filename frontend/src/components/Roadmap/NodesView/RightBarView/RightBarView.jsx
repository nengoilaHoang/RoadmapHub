import TopicRightBar from "../TopicRightBar/TopicRightBar";
function RightBarView({node}){
    if(node?.type === 'topic'){
        return <TopicRightBar selectedNode={node}/>
    }
}
export default RightBarView;