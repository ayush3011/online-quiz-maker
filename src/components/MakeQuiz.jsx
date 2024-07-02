import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MakeQuiz = ({ addQuiz }) => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: '' }]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = questions.map((q, i) => 
      i === index ? { ...q, [field]: value } : q
    );
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = questions.map((q, i) => 
      i === questionIndex ? { ...q, options: q.options.map((opt, j) => j === optionIndex ? value : opt) } : q
    );
    setQuestions(updatedQuestions);
  };

  const handleSubmit = () => {
    const newQuiz = { title, questions };
    addQuiz(newQuiz);
    navigate('/');
  };

  return (
    <div>
      <h2 className="create-quiz-heading">Create a New Quiz</h2>
      <input 
        className='quiz-title'
        type="text" 
        placeholder="Quiz Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />
      {questions.map((question, index) => (
        <div key={index} className="question-container">
          <input 
            className="question-input"
            type="text" 
            placeholder="Question" 
            value={question.question} 
            onChange={(e) => handleQuestionChange(index, 'question', e.target.value)} 
          />
          {question.options.map((option, i) => (
            <input 
              key={i}
              type="text"
              placeholder={`Option ${i + 1}`}
              className="option-input"
              value={option}
              onChange={(e) => handleOptionChange(index, i, e.target.value)}
            />
          ))}
          <input
            type="text" 
            placeholder="Correct Answer" 
            className="correct-answer-input"
            value={question.correctAnswer} 
            onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)} 
          />
        </div>
      ))}
      <button className="add-question-btn" onClick={addQuestion}>Add Question</button>
      <button className="submit-btn" onClick={handleSubmit}>Submit Quiz</button>
    </div>
  );
};

export default MakeQuiz;
