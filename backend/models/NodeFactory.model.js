import Node from "./Node.model.js";
import Line from "./Line.model.js";
export default class NodeFactory{
    static createNode(type, options) {
        switch (type) {
            case 'Title':
                return new Node({...options,type: 'Title'});
            case 'Topic':
                return new Node({...options,type: 'Topic',color:'#fff',typeTopic:'subTopic'});
            case 'Paragraph':
                return new Node({...options,type: 'Paragraph', background:'#fff', borderColor :'#000',textColor:'#000',padding:16, textAlign:'left',justification:'flex-start'});
            case 'Button':
                return new Node({...options,type: 'Button', background:'#fff', borderColor :'#000',textColor:'#000',url:'',borderRadius:0});
            case 'Section':
                return new Node({...options,type: 'Section', background:'#fff', borderColor :'#000',borderRadius:0});
            case 'CheckList':
                return new Node({...options,type: 'CheckList', items: []});
            case 'HorizontalLine':
                return new Line({...options,typeLine:'HorizontalLine', style:'solid', color:'#000'});
            case 'VerticalLine':
                return new Line({...options,typeLine:'VerticalLine', style:'solid', color:'#000'});
            default:
                throw new Error(`Unknown node type: ${type}`);
        }
    }
}