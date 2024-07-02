import React from 'react';
import { Link } from 'react-router-dom';

const QuizList = ({ quizzes }) => {
  return (
    <div>
      <h2>Available Quizzes</h2>
      <ul className="quiz-list">
        {quizzes.map((quiz, index) => (
          <li key={index} className="quiz-item">
            <Link to={`/quiz/${index}`} className="quiz-link">{quiz.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizList;
