import mongoose from "mongoose";
const AnswerSchema = new mongoose.Schema({
  text: { type: String, default: "" },
  correct: { type: Boolean, default: false },
  userChoose: { type: Boolean, default: false }
}, { _id: false });

const QuestionSchema = new mongoose.Schema({
  question: { type: String, default: "" },
  answers: { type: [AnswerSchema], default: [] }
}, { _id: false });
const TestSchema = new mongoose.Schema({
  title: { type: String, default: "" },
  startTime: { type: Date, default: "" },  
  endTime: { type: Date, default: "" },
  duration: { type: Number, default: 30 },
  point: { type: Number, default: 0 },
  durationDo: { type: Number, default: 0 },
  submit: { type: Boolean, default: false },
  questions: { type: [QuestionSchema], default: [] }
}, { _id: false });
const TopicSchema = new mongoose.Schema({
  topicId: { type: String, required: true },
  topicName: { type: String, required: true },
  tests: { type: [TestSchema], default: [] }
}, { _id: false });

const QuizResultSchema = new mongoose.Schema({
  userDoQuiz: { type: String, required: true },
  roadmapId: { type: String, required: true },
  classroomId: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
  topics: { type: [TopicSchema], default: [] }
}, { timestamps: true, versionKey: false });
export default mongoose.model("QuizResult", QuizResultSchema);