export default class Line{
    constructor({id, roadmapId, x,y,length,style,color,layer,typeLine})
    {
        this.id = id;
        this.roadmapId = roadmapId;
        this.x = x;
        this.y = y;
        this.length = length;
        this.style = style;
        this.color = color;
        this.layer = layer;
        this.typeLine = typeLine; 
    }
    static fromRow(row) {
        return new Line(row.id, row.roadmapId, row.x,row.y,row.length,row.style,row.color,row.layer,row.typeLine);
    }
}