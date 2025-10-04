import { useEffect, useState } from "react";

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
    <>
     <div className="mb-3">
                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Start Time</label>
                <input
                    type="datetime-local"
                    className="form-control"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">End Time</label>
                <input
                    type="datetime-local"
                    className="form-control"
                    min={getMinEndTime()}
                    value={endTime}
                    onChange={(e) => {setEndTime(e.target.value)}}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Time to do the test (minutes)</label>
                <input
                    type="number"
                    className="form-control"
                    min="10"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    required
                />
            </div>

            {questions.map((q, qIndex) => (
                <div key={qIndex} className="mb-3 border rounded p-3 bg-light">
                    <div className="d-flex">
                        <input
                        type="text"
                        className="form-control mb-2"
                        placeholder={`Question ${qIndex + 1}`}
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
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => {
                                    let newQuestions = [...questions];
                                    newQuestions = newQuestions.filter((a,index)=>index != qIndex)
                                    setQuestion(newQuestions);
                                }}
                            >
                                - Delete Quiz
                            </button>
                    </div>
                    
                    {q.answers.map((a, aIndex) => (
                        <div key={aIndex} className="input-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder={`Câu trả lời ${aIndex + 1}`}
                                value={a.text}
                                onChange={(e) =>{
                                    const newQuestions = [...questions];
                                    newQuestions[qIndex].answers[aIndex] = {
                                        ...newQuestions[qIndex].answers[aIndex],
                                        text: e.target.value
                                    };
                                    setQuestion(newQuestions);
                                }
                                }
                            />
                            <span className="input-group-text">
                                <input
                                    type="checkbox"
                                    checked={a.correct}
                                    onChange={(e) =>
                                    {
                                        const newQuestions = [...questions];
                                        newQuestions[qIndex].answers[aIndex] = {
                                            ...newQuestions[qIndex].answers[aIndex],
                                            correct: e.target.checked
                                        };
                                        setQuestion(newQuestions);
                                    }
                                    }
                                />
                                Đúng
                            </span>
                            <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => {
                                    const newQuestions = [...questions];
                                    newQuestions[qIndex].answers = newQuestions[qIndex].answers.filter((a,index)=>index != aIndex)
                                    setQuestion(newQuestions);
                                }}
                            >
                                - Delete Answer
                            </button>
                        </div>
                    ))}
                    <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() =>{
                            const newQuestions = [...questions];
                            newQuestions[qIndex].answers = [
                                ...newQuestions[qIndex].answers,
                                { text: "", correct: false }
                            ];
                            setQuestion(newQuestions);
                        }}
                    >
                        + Add Answer
                    </button>
                    

                </div>
            ))}

            <button className="btn btn-outline-primary" onClick={()=>{
                const newQuestion = [...questions];
                newQuestion.push({
                    question: "",
                    answers: [{ text: "", correct: false }]
                })
                setQuestion(newQuestion);
            }}>
                + Add Quiz
            </button>
            <button className="btn btn-success ms-2" onClick={()=>updateQuiz(selectedTopic,selectedQuizIndex,newQuiz)}>
                Save Quiz
            </button>
            <button className="btn btn-secondary ms-2" onClick={() => setSelectedQuizIndex(null)}>
                 ← Back to Quizzes
            </button>
    </>)
}