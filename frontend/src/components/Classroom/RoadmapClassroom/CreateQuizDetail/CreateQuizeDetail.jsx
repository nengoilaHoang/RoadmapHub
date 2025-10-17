import { useEffect, useState } from "react";
import "./CreateQuizeDetail.css";

export default function CreateQuizDetail(props){
    const { topic,
            selectedQuizIndex,
            selectedTopic,
            updateQuiz,
            setSelectedQuizIndex
    } = props; 
    const [title,setTitle] = useState(topic.tests[selectedQuizIndex].title);
    const [startTime,setStartTime] = useState(topic.tests[selectedQuizIndex].startTime);
    const [endTime,setEndTime] = useState(topic.tests[selectedQuizIndex].endTime);
    const [duration,setDuration] = useState(topic.tests[selectedQuizIndex].duration);
    const [questions,setQuestion] = useState(topic.tests[selectedQuizIndex].questions)
    const [newQuiz , setNewQuiz] = useState({
        title:title,
        startTime:startTime,
        endTime:endTime,
        duration:duration,
        questions:questions
    })
    useEffect(()=>{
        setNewQuiz({
        title:title,
        startTime:startTime,
        endTime:endTime,
        duration:duration,
        questions:questions
    })
    },[title,startTime,endTime,duration,questions])
    const getMinEndTime = () => {
        if (!startTime) return "";
        const start = new Date(startTime);
        start.setMinutes(start.getMinutes() + duration); // cộng thêm duration phút
        return start.toISOString().slice(0, 16); // format lại cho datetime-local
    };
    
    return(
    <div className="quiz-editor-container">
        {/* Header */}
        <div className="quiz-header">
            <h2>
                <i className="bi bi-pencil-square"></i>
                Edit Quiz
            </h2>
            <p>Update your quiz details, questions, and answers</p>
        </div>

        {/* Basic Info Section */}
        <div className="quiz-basic-info">
            <h4>
                <i className="bi bi-info-circle"></i>
                Basic Information
            </h4>
            
            <div className="mb-3">
                <label className="form-label">
                    <i className="bi bi-card-heading"></i>
                    Quiz Title
                </label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter quiz title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>

            <div className="time-inputs-grid">
                <div className="mb-3">
                    <label className="form-label">
                        <i className="bi bi-calendar-check"></i>
                        Start Time
                    </label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        <i className="bi bi-calendar-x"></i>
                        End Time
                    </label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        min={getMinEndTime()}
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        <i className="bi bi-clock"></i>
                        Duration (minutes)
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        min="10"
                        placeholder="e.g. 60"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        required
                    />
                </div>
            </div>
        </div>

        {/* Questions Section */}
        <div className="questions-section">
            <div className="questions-header">
                <h4>
                    <i className="bi bi-question-circle"></i>
                    Questions
                </h4>
                <span className="questions-count">
                    {questions.length} {questions.length === 1 ? 'Question' : 'Questions'}
                </span>
            </div>

            {questions.length === 0 ? (
                <div className="empty-state">
                    <i className="bi bi-inbox"></i>
                    <h5>No questions yet</h5>
                    <p>Click the button below to add your first question</p>
                </div>
            ) : (
                questions.map((q, qIndex) => (
                    <div key={qIndex} className="question-card">
                        <div className="question-header">
                            <div className="question-number">{qIndex + 1}</div>
                            <div className="question-input-wrapper">
                                <input
                                    type="text"
                                    className="question-input"
                                    placeholder={`Enter question ${qIndex + 1}...`}
                                    value={q.question}
                                    onChange={(e) => {
                                        const newQuestions = [...questions];
                                        newQuestions[qIndex] = {
                                            ...newQuestions[qIndex],
                                            question: e.target.value
                                        };
                                        setQuestion(newQuestions);
                                    }}
                                />
                                <button
                                    className="btn-delete-question"
                                    onClick={() => {
                                        let newQuestions = [...questions];
                                        newQuestions = newQuestions.filter((a, index) => index !== qIndex);
                                        setQuestion(newQuestions);
                                    }}
                                >
                                    <i className="bi bi-trash"></i>
                                    Delete
                                </button>
                            </div>
                        </div>

                        <div className="answers-section">
                            <h5>
                                <i className="bi bi-list-check"></i>
                                Answers
                            </h5>
                            
                            {q.answers.map((a, aIndex) => (
                                <div key={aIndex} className="answer-item">
                                    <div className="answer-index">{String.fromCharCode(65 + aIndex)}</div>
                                    <input
                                        type="text"
                                        className="answer-input"
                                        placeholder={`Answer ${String.fromCharCode(65 + aIndex)}...`}
                                        value={a.text}
                                        onChange={(e) => {
                                            const newQuestions = [...questions];
                                            newQuestions[qIndex].answers[aIndex] = {
                                                ...newQuestions[qIndex].answers[aIndex],
                                                text: e.target.value
                                            };
                                            setQuestion(newQuestions);
                                        }}
                                    />
                                    <div className={`answer-correct-checkbox ${a.correct ? 'checked' : ''}`}>
                                        <input
                                            type="checkbox"
                                            checked={a.correct}
                                            onChange={(e) => {
                                                const newQuestions = [...questions];
                                                newQuestions[qIndex].answers[aIndex] = {
                                                    ...newQuestions[qIndex].answers[aIndex],
                                                    correct: e.target.checked
                                                };
                                                setQuestion(newQuestions);
                                            }}
                                        />
                                        <span>{a.correct ? 'Correct' : 'Mark as Correct'}</span>
                                    </div>
                                    <button
                                        className="btn-delete-answer"
                                        onClick={() => {
                                            const newQuestions = [...questions];
                                            newQuestions[qIndex].answers = newQuestions[qIndex].answers.filter(
                                                (a, index) => index !== aIndex
                                            );
                                            setQuestion(newQuestions);
                                        }}
                                    >
                                        <i className="bi bi-x-lg"></i>
                                    </button>
                                </div>
                            ))}

                            <button
                                className="btn-add-answer"
                                onClick={() => {
                                    const newQuestions = [...questions];
                                    newQuestions[qIndex].answers = [
                                        ...newQuestions[qIndex].answers,
                                        { text: "", correct: false }
                                    ];
                                    setQuestion(newQuestions);
                                }}
                            >
                                <i className="bi bi-plus-circle"></i>
                                Add Answer
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>

        {/* Action Buttons */}
        <div className="quiz-actions">
            <button 
                className="btn-add-question" 
                onClick={() => {
                    const newQuestion = [...questions];
                    newQuestion.push({
                        question: "",
                        answers: [{ text: "", correct: false }]
                    });
                    setQuestion(newQuestion);
                }}
            >
                <i className="bi bi-plus-circle-fill"></i>
                Add Question
            </button>

            <button 
                className="btn-save-quiz" 
                onClick={() => updateQuiz(selectedTopic, selectedQuizIndex, newQuiz)}
            >
                <i className="bi bi-check-circle-fill"></i>
                Save Quiz
            </button>

            <button 
                className="btn-back" 
                onClick={() => setSelectedQuizIndex(null)}
            >
                <i className="bi bi-arrow-left"></i>
                Back to Quizzes
            </button>
        </div>
    </div>
    )
}