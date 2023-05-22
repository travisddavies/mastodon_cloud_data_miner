// import React, { useState } from 'react';
//
// export default function QuizQuestion() {
// 	const questions = [
// 		{
// 			questionText: 'How many states/territories are discussed in our project?',
// 			answerOptions: [
// 				{ answerText: '4', isCorrect: false },
// 				{ answerText: '6', isCorrect: false },
// 				{ answerText: '7', isCorrect: false },
// 				{ answerText: '8', isCorrect: true },
// 			],
// 		},
// 		{
// 			questionText: 'How many climate related tweets in our project?',
// 			answerOptions: [
// 				{ answerText: '12.68k', isCorrect: true },
// 				{ answerText: '12.88k', isCorrect: false },
// 				{ answerText: '14.48k', isCorrect: false },
// 				{ answerText: '16.68k', isCorrect: false },
// 			],
// 		},
// 		{
// 			questionText: 'Which city in Victoria has the highest number of coffee related tweets?',
// 			answerOptions: [
// 				{ answerText: 'Melbourne', isCorrect: false },
// 				{ answerText: 'Ararat', isCorrect: false },
// 				{ answerText: 'Sydney', isCorrect: false },
// 				{ answerText: 'Wangaratta', isCorrect: true },
// 			],
// 		},
// 		{
// 			questionText: 'What is the name of the CCC lecturer?',
// 			answerOptions: [
// 				{ answerText: 'Roger', isCorrect: false },
// 				{ answerText: 'James', isCorrect: false },
// 				{ answerText: 'Richard', isCorrect: true },
// 				{ answerText: 'Peter', isCorrect: false },
// 			],
// 		},
// 		{
// 			questionText: 'Could we get an H1?',
// 			answerOptions: [
// 				{ answerText: 'Yes!', isCorrect: true },
// 				{ answerText: 'Yes!!', isCorrect: true },
// 				{ answerText: 'Yes!!!', isCorrect: true },
// 				{ answerText: 'Yes!!!!', isCorrect: true },
// 			],
// 		},
// 	];
//
// 	const [currentQuestion, setCurrentQuestion] = useState(0);
// 	const [showScore, setShowScore] = useState(false);
// 	const [score, setScore] = useState(0);
// 	const [wrongQuestions, setWrongQuestions] = useState([]);
//
// 	const handleAnswerOptionClick = (isCorrect, questionIndex) => {
// 	  if (!isCorrect) {
// 		setWrongQuestions([...wrongQuestions, questionIndex]);
// 	  }
//
// 	  if (isCorrect) {
// 		setScore(score + 1);
// 	  }
//
// 	  const nextQuestion = currentQuestion + 1;
// 	  if (nextQuestion < questions.length) {
// 		setCurrentQuestion(nextQuestion);
// 	  } else {
// 		setShowScore(true);
// 	  }
// 	};
//
// 	return (
// 	  <div className='app'>
// 		{showScore ? (
// 		  <div className='score-section'>
// 			You scored {score} out of {questions.length}
// 		  </div>
// 		) : (
// 		  <>
// 			<div className='question-section'>
// 			  <div className='question-count'>
// 				<span>Question {currentQuestion + 1}</span>/{questions.length}
// 			  </div>
// 			  <div className='question-text'>{questions[currentQuestion].questionText}</div>
// 			</div>
// 			<div className='answer-section'>
// 			  {questions[currentQuestion].answerOptions.map((answerOption, index) => (
// 				<button
// 				  type="button"
// 				  onClick={() => handleAnswerOptionClick(answerOption.isCorrect, currentQuestion)}
// 				  className={wrongQuestions.includes(currentQuestion) && !answerOption.isCorrect ? 'wrong' : ''}
// 				  key={index}
// 				>
// 				  {answerOption.answerText}
// 				</button>
// 			  ))}
// 			</div>
// 		  </>
// 		)}
// 	  </div>
// 	);
// }

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FireworkAnimation from "./FireworkAnimation";

export default function QuizQuestion({ questions }) {
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
	const [wrongQuestions, setWrongQuestions] = useState([]);

	const handleAnswerOptionClick = (isCorrect, questionIndex) => {
	  if (!isCorrect) {
		setWrongQuestions([...wrongQuestions, questionIndex]);
	  }

	  if (isCorrect) {
		setScore(score + 1);
	  }

	  const nextQuestion = currentQuestion + 1;
	  if (nextQuestion < questions.length) {
		setCurrentQuestion(nextQuestion);
	  } else {
		setShowScore(true);
	  }
	};

	return (
	  <div className='app'>
		{showScore ? (
		  <div className='score-section'>
			  <div style={{ display: 'flex', justifyContent: 'center', width: '100%',marginLeft: '125px' }}>
			  	<p style={{ fontSize: '30px', color: 'red', fontWeight: 'bold'}}>
        			You scored {score} out of {questions.length}
    			</p>
			  </div>
		    {score > questions.length / 2 ? (
				<div style={{ display: 'flex', justifyContent: 'center', width: '100%',marginLeft: '125px' }}>
            		<FireworkAnimation/>
				</div>
			) : (
				<div style={{ display: 'flex', justifyContent: 'center', width: '100%',marginLeft: '125px' }}>
					<span style={{fontSize: "100px"}}>😢</span>
				</div>
			)}
		  </div>
		) : (
		  <>
			<div className='question-answer-section'>
              <div className='question-section'>
                <div className='question-count'>
                  <span>Question {currentQuestion + 1}</span>/{questions.length}
                </div>
                <div className='question-text'>{questions[currentQuestion].questionText}</div>
              </div>
              <div className='answer-section'>
                {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                  <button
                    type="button"
                    onClick={() => handleAnswerOptionClick(answerOption.isCorrect, currentQuestion)}
                    className={wrongQuestions.includes(currentQuestion) && !answerOption.isCorrect ? 'wrong' : ''}
                    key={index}
                  >
                    {answerOption.answerText}
                  </button>
                ))}
              </div>
            </div>
		  </>
		)}
	  </div>
	);
}

QuizQuestion.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      questionText: PropTypes.string.isRequired,
      answerOptions: PropTypes.arrayOf(
        PropTypes.shape({
          answerText: PropTypes.string.isRequired,
          isCorrect: PropTypes.bool.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

