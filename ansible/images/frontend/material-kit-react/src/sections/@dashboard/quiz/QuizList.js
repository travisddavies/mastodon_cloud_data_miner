import React from 'react';
import ReactDOM from 'react-dom';
import './quizIndex.css';
import QuizQuestion from './QuizQuestion';
import questions from './Question';

function QuizList() {
  return (
    <React.StrictMode>
      <QuizQuestion questions={questions} />
    </React.StrictMode>
  );
}

const root = document.getElementById('root');
if (root !== null) {
  ReactDOM.createRoot(root).render(<QuizList />);
}
export default QuizList;

