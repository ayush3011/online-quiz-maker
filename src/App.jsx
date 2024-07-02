import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MakeQuiz from './components/MakeQuiz';
import QuizList from './components/QuizList';
import Quiz from './components/Quiz';
import './App.css';

const App = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetch('/quizData.json')
      .then(response => response.json())
      .then(data => setQuizzes(data));
  }, []);

  const addQuiz = (newQuiz) => {
    const updatedQuizzes = [...quizzes, newQuiz];
    setQuizzes(updatedQuizzes);
  };

  return (
    <Router>
      <div className="App">
        <h1>Online Quiz Maker</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/make-quiz">Make Quiz</Link>
        </nav>
        <Routes>
          <Route path="/" element={<QuizList quizzes={quizzes} />} />
          <Route path="/make-quiz" element={<MakeQuiz addQuiz={addQuiz} />} />
          <Route path="/quiz/:quizId" element={<Quiz quizzes={quizzes} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
