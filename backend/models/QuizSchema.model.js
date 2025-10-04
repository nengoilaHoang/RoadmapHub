import mongoose from "mongoose";
const AnswerSchema = new mongoose.Schema({
  text: { type: String, default: "" },
  correct: { type: Boolean, default: false }
}, { _id: false });

const QuestionSchema = new mongoose.Schema({
  question: { type: String, default: "" },
  answers: { type: [AnswerSchema], default: [] }
}, { _id: false });
const TestSchema = new mongoose.Schema({
  title: { type: String, default: "" },
  startTime: { type: Date, default: "" },  // có thể đổi sang Date nếu cần
  endTime: { type: Date, default: "" },
  duration: { type: Number, default: 10 },
  questions: { type: [QuestionSchema], default: [] }
}, { _id: false });
const TopicSchema = new mongoose.Schema({
  topicId: { type: String, required: true },
  topicName: { type: String, required: true },
  tests: { type: [TestSchema], default: [] }
}, { _id: false });

const QuizSchema = new mongoose.Schema({
  userCreateQuiz: { type: String, required: true },
  roadmapId: { type: String, required: true },
  classroomId: { type: String, required: true },
  topics: { type: [TopicSchema], default: [] }
}, { timestamps: true, versionKey: false });

export default mongoose.model("Quiz", QuizSchema);