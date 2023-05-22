import React from 'react';
import ReactDOM from 'react-dom';
import './quizIndex.css';
import Quiz from './quiz.js';

function App11() {
  return (
    <React.StrictMode>
      <Quiz />
    </React.StrictMode>
  );
}

ReactDOM.render(
  <App11 />,
  document.getElementById('root')
);

export default App11;









