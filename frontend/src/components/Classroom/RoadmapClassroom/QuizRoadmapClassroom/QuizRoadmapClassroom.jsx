import { useEffect, useState } from "react";
import CreateQuizDetail from "../CreateQuizDetail/CreateQuizeDetail.jsx";
import DoQuizDetail from "../DoQuizDetail/DoQuizDetail.jsx";
export default function QuizRoadmapClassroom(props) {
  const {
    edit,
    submitQuiz,
    addQuiz,
    setStep,
    updateQuiz,
    removeQuiz,
    quizzes,
    selectedTopic
  } = props;
  const [selectedQuizIndex, setSelectedQuizIndex] = useState(null);
  //console.log("dd",quizzes)
  const topic = quizzes.topics.find(t => t.topicId === selectedTopic.id);
  const [newQuiz, setQuiz] = useState({
    title: "",
    startTime: "",
    endTime: "",
    duration: 30,
    questions: [
      {
        question: "",
        answers: [{ text: "", correct: false }]
      }
    ]
  })
  return (
    <>
      {edit &&(
      <h2 className="mb-3">
        ✏️ Create Quiz for topic:{" "}
        {topic.topicName}
      </h2>)
      }
      {!edit &&(
      <h2 className="mb-3">
        📝 Quiz for topic:{" "}
        {topic.topicName}
      </h2>)
      }
      {selectedQuizIndex === null && (<>
        <div className="container">
          <div className="row">
            {topic.tests.map((quiz, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card shadow-sm h-100">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-truncate">{quiz.title || `Quiz ${index + 1}`}</h5>
                    <p className="card-text text-muted small mb-2">
                      🕒 Duration: {quiz.duration} min
                    </p>
                    <p className="card-text text-muted small mb-2">
                      📅 {new Date(quiz.startTime).toLocaleString()} → {new Date(quiz.endTime).toLocaleString()}
                    </p>
                    <p className="card-text text-muted small mb-3">
                      ❓ {quiz.questions?.length || 0} Questions
                    </p>
                    {edit && (
                      <>
                        <button
                          className="btn btn-primary mt-auto"
                          onClick={() => setSelectedQuizIndex(index)}
                        >
                          Edit Quiz
                        </button>
                        <button
                          className="btn btn-danger mt-auto"
                          onClick={() => removeQuiz(selectedTopic, index)}
                        >
                          Delete Quiz
                        </button>
                      </>)}
                    {!edit && (
                      <>
                      <p className="card-text text-muted small mb-3">
                      <i className="bi bi-trophy-fill text-warning"></i> Point: {quiz.point}/10 
                      </p>
                      <button
                        className="btn btn-primary mt-auto"
                        onClick={() => setSelectedQuizIndex(index)}
                      >
                        Do Quiz
                      </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {edit && (
            <div className="col-md-4 mb-4">
              <div
                className="card shadow-sm h-100 d-flex align-items-center justify-content-center text-center border-primary"
                style={{ cursor: "pointer" }}
                onClick={() => addQuiz(selectedTopic, newQuiz)}
              >
                <div className="card-body">
                  <h5 className="card-title text-primary">+ Add New Quiz</h5>
                </div>
              </div>
            </div>
            )}
          </div>
        </div>
        <button className="btn btn-secondary ms-2" onClick={() => setStep(2)}>
          ← Back to topic
        </button>
      </>
      )}

      {edit && selectedQuizIndex !== null && <CreateQuizDetail
        topic={topic}
        selectedQuizIndex={selectedQuizIndex}
        setSelectedQuizIndex={setSelectedQuizIndex}
        updateQuiz={updateQuiz}
        setStep={setStep}
        selectedTopic={selectedTopic}
      />}
      {!edit && selectedQuizIndex !== null && <DoQuizDetail
        topic={topic}
        selectedQuizIndex={selectedQuizIndex}
        setSelectedQuizIndex={setSelectedQuizIndex}
        updateQuiz={updateQuiz}
        setStep={setStep}
        selectedTopic={selectedTopic}
        submitQuiz={submitQuiz}
      />}
    </>
  )
}