export default class StudentClassroom {
    constructor(id, classroomId,studentId)
    {
        this.id = id;
        this.classroomId = classroomId;
        this.studentId = studentId;
    }
    static fromRow(row) {
        return new StudentClassroom(row.id, row.classroomId, row.studentId);
    }
}