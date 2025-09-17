import TopicRightBar from "../TopicRightBar/TopicRightBar";
function RightBarView({node, setIsReload, isReload}){
    if(node?.type === 'topic'){
        return <TopicRightBar selectedNode={node} setIsReload={setIsReload} isReload={isReload}/>
    }
}
export default RightBarView;