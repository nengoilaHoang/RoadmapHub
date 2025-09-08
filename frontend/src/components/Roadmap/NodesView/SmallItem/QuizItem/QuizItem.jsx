import React from "react";
import "./QuizItem.css";

function QuizItem({ name, onDoQuiz }) {
  return (
    <div className="quiz-item">
      <div className="quiz-info">
        <h5 className="quiz-name">{name}</h5>
      </div>
      <button className="quiz-action" onClick={onDoQuiz}>
        Làm Quiz
      </button>
    </div>
  );
}

export default QuizItem;
