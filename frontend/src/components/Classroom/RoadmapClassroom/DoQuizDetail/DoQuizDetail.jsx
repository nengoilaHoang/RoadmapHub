import {useEffect, useState } from "react";
import "./DoQuizDetail.css";
export default function DoQuizDetail(props) {
    const { 
        topic, 
        selectedQuizIndex,
        setSelectedQuizIndex,
        updateQuiz,
        setStep,
        selectedTopic,
        submitQuiz
    } = props;
    const [title,setTitle] = useState(topic.tests[selectedQuizIndex].title);
    const [startTime,setStartTime] = useState(topic.tests[selectedQuizIndex].startTime);
    const [endTime,setEndTime] = useState(topic.tests[selectedQuizIndex].endTime);
    const [duration,setDuration] = useState(topic.tests[selectedQuizIndex].duration);
    const [durationDo,setDurationDo] = useState(topic.tests[selectedQuizIndex].durationDo===0?duration:topic.tests[selectedQuizIndex].durationDo);
    const [submit,setSubmit] = useState(topic.tests[selectedQuizIndex].submit);
    const [questions,setQuestion] = useState(topic.tests[selectedQuizIndex].questions)
    const [newQuiz , setNewQuiz] = useState({
        title:title,
        startTime:startTime,
        endTime:endTime,
        duration:duration,
        durationDo:durationDo,
        questions:questions
        })
    useEffect(()=>{
            setNewQuiz({
            title:title,
            startTime:startTime,
            endTime:endTime,
            duration:duration,
            durationDo:durationDo,
            questions:questions
        })},[questions])
    const [selectedAnswers, setSelectedAnswers] = useState(
        Array(questions.length).fill(null)
    );    
     const handleAnswerSelect = (index,currentIndex) => {
        //console.log("index",currentIndex);
        const newSelectedAnswers = [...selectedAnswers];
        //console.log("sdasdasdatt",newSelectedAnswers);
        newSelectedAnswers[currentIndex] = index;
        setSelectedAnswers(newSelectedAnswers);
        const updatedQuestions = [ ...questions ];
        updatedQuestions[currentIndex].answers = updatedQuestions[currentIndex].answers.map((ans, i) => ({
            ...ans,
            userChoose: i === index
        }));
        setQuestion(updatedQuestions);
        const updatedQuiz = { ...newQuiz, questions: updatedQuestions };
        setNewQuiz(updatedQuiz); 
        updateQuiz(selectedTopic,selectedQuizIndex, updatedQuiz);
    }; 
    const [timeLeft, setTimeLeft] = useState(durationDo * 60); // Convert duration from minutes to seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    submitQuiz(selectedTopic,selectedQuizIndex,0);
                    setStep(2);
                    return 0;
                }
                setDurationDo(Math.ceil(prevTime/60));
                return prevTime - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);
     const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };
    const [currentIndex, setCurrentIndex] = useState(0); 
    const [canTakeQuiz, setCanTakeQuiz] = useState(false);
    const [message, setMessage] = useState("");  
    useEffect(() => {
        const checkQuizTime = () => {
            const now = new Date().getTime();
            const start = new Date(startTime).getTime();
            const end = new Date(endTime).getTime();

            if (now < start) {
                setMessage(`Quiz will be available at ${new Date(startTime).toLocaleString()}`);
                setCanTakeQuiz(false);
            } else if (now > end) {
                setMessage(`Quiz ended at ${new Date(endTime).toLocaleString()}`);
                setCanTakeQuiz(false);
            } 
            else if(submit) {
                setMessage("You have already submitted this quiz.");
                setCanTakeQuiz(false);
            }
            else {
                setCanTakeQuiz(true);
                setMessage("");
            }
        };

        checkQuizTime();

        // Check every minute
        const interval = setInterval(checkQuizTime, 60000);

        return () => clearInterval(interval);
    }, [startTime, endTime]);
    const saveTimeLeft = (time) => {
        const updatedQuiz = { ...newQuiz, durationDo: time };
        setNewQuiz(updatedQuiz); 
        updateQuiz(selectedTopic,selectedQuizIndex, updatedQuiz);
    }
    if (!canTakeQuiz) {
        return (
            <div className="quiz-unavailable">
                <h2>{title}</h2>
                <div className="alert alert-info">
                    <i className="bi bi-clock me-2"></i>
                    {message}
                </div>
                <button 
                    className="btn btn-secondary" 
                    onClick={() => setSelectedQuizIndex(null)}
                >
                    ← Back to Quizzes
                </button>
            </div>
        );
    } 
    return (<>
        <div className="quiz-container">
            <div className="quiz-header">
                <h2>{title}</h2>
                <div className="timer-container">
                        <div className={`timer ${timeLeft < 300 ? 'timer-warning' : ''}`}>
                            Time Remaining: {formatTime(timeLeft)}
                        </div>
                </div>
            </div>
           
            <div className="quiz-content">
                <div className="question-box">
                    <h3>Question:</h3>
                    <p>{currentIndex}</p>
                </div>

                <div className="answers-container">
                    {questions[currentIndex].answers.map((answer, index) => (
                        <div 
                            key={index}
                            className={`answer-option ${selectedAnswers[currentIndex] === index ? 'selected' : ''}`}
                            onClick={() => handleAnswerSelect(index,currentIndex)}
                        >
                            <span className="answer-letter">
                                {String.fromCharCode(65 + index)}
                            </span>
                            <span className="answer-text">{answer.text}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="quiz-navigation">
                <button 
                    className="nav-button"
                    disabled={currentIndex === 0}
                    onClick={() => setCurrentIndex(currentIndex - 1)}
                >
                    Previous
                </button>
                {currentIndex === questions.length - 1 ? (
                    <button 
                        className="nav-button submit-button"
                        onClick={() => {setStep(2);submitQuiz(selectedTopic,selectedQuizIndex,timeLeft);}}
                    >
                        Submit Quiz
                    </button>
                ) : (
                    <button 
                        className="nav-button"
                        onClick={() =>{setCurrentIndex(currentIndex + 1)} } 
                    >
                        Next
                    </button>
                )}
            </div>

        </div>
        <button className="btn btn-secondary ms-2 mt-4" onClick={() => {setSelectedQuizIndex(null); saveTimeLeft(durationDo);}}>
                 ← Back to Quizzes
        </button>
    </>
    
    );

}