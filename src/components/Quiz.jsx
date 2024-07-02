import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const Quiz = ({ quizzes }) => {
  const { quizId } = useParams();
  const quiz = quizzes[quizId];
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const handleAnswerChange = (questionIndex, answer) => {
    setAnswers({ ...answers, [questionIndex]: answer });
  };

  const handleSubmit = () => {
    let correctCount = 0;
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctCount++;
      }
    });
    setScore(correctCount);
  };

  return (
    <div>
      <h2>{quiz.title}</h2>
      {quiz.questions.map((question, index) => (
        <div key={index} className="question-container">
          <p>{question.question}</p>
          <div className="option-container">
            {question.options.map(option => (
              <label key={option} className="option-label">
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option}
                  className="option-radio"
                  onChange={() => handleAnswerChange(index, option)}
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      ))}
      <button className="submit-btn" onClick={handleSubmit}>Submit</button>
      {score !== null && (
        <div className={`feedback ${score === quiz.questions.length ? 'correct' : 'incorrect'}`}>
          <p>Your score: {score} / {quiz.questions.length}</p>
          <p>{score === quiz.questions.length ? 'Great job!' : 'Better luck next time!'}</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
