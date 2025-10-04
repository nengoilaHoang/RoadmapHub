export default class Classroom {
    constructor(id, teacherId, name, description)
    {
        this.id = id;
        this.teacherId = teacherId;
        this.name = name;
        this.description = description;
    }
    static fromRow(row) {
        return new Classroom(row.id, row.teacherId, row.name, row.description);
    }
}