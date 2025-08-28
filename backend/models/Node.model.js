export default class Node {
  constructor({
    id,
    roadmapId,
    title,
    x = 0,
    y = 0,
    width = 180,
    height = 45,
    fontSize = 12,
    layer = 0,
    props = {}
  }) {
    this.id = id;
    this.roadmapId = roadmapId;
    this.title = title;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.fontSize = fontSize;
    this.props = props; // chỗ để custom data cho từng loại node
  }

  static fromRow(row) {
    return new Node({
      id: row.id,
      roadmapId: row.roadmapId,
      title: row.title,
      x: row.x,
      y: row.y,
      width: row.width,
      height: row.height,
      fontSize: row.fontSize,
      layer: row.layer,
      props: row.props || {}
    });
  }
}
