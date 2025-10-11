import ClassroomService from "../services/Classroom.service.js";
class ClassroomController {
  async createClassroom(req, res) {
    const { name, description, accountId } = req.body;
    const responseCheck = await ClassroomService.checkClassroom(
      name,
      accountId
    );
    if (!responseCheck.success) {
      res.json(responseCheck);
    } else {
      const response = await ClassroomService.createClassroom(
        name,
        description,
        accountId
      );
      res.json(response);
    }
  }
  async checkYourClassroom(req, res) {
    // req.authenticate exists from requireAuth middleware
    const { name } = req.body;
    const accountId = req.authenticate.id;
    const responseCheck = await ClassroomService.checkClassroom(
      name,
      accountId
    );
    if (!responseCheck.success) {
      res.json({
        success: true,
        message: "Classroom is yours",
      });
    } else {
      res.json({
        success: false,
        message: "Classroom is not yours",
      });
    }
  }
  async getNameAll(req, res) {
    const accountId = req.authenticate.id;
    const response = await ClassroomService.getNameAll(accountId);
    res.json(response);
  }
  async addRoadmapIntoClass(req, res) {
    const accountId = req.authenticate.id;
    const { roadmapId, classroomId } = req.body;
    const response = await ClassroomService.addRoadmapIntoClass(
      accountId,
      roadmapId,
      classroomId
    );
    res.json(response);
  }
  async getRoadmapInClass(req, res) {
    const { classroomId } = req.query;
    const response = await ClassroomService.getRoadmapInClass(classroomId);
    res.json(response);
  }
  async getLearningClass(req, res) {
    const accountId = req.authenticate.id;
    const response = await ClassroomService.getLearningClass(accountId);
    res.json(response);
  }
  async getTeachingClass(req, res) {
    const accountId = req.authenticate.id;
    const response = await ClassroomService.getTeachingClass(accountId);
    res.json(response);
  }
  async checkLearningClass(req, res) {
    // req.authenticate exists from requireAuth middleware
    const { classroomId } = req.body;
    const accountId = req.authenticate.id;
    //console.log("sss",accountId,classroomId)
    const responseCheck = await ClassroomService.checkLearningClass(
      accountId,
      classroomId
    );
    res.json(responseCheck);
  }
}
export default new ClassroomController(ClassroomService);
