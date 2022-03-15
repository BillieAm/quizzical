import { useState } from "react";
import Question from "./Question";
import Button from "./Button";
import data from "./data";

function App() {
  const [gameStart, setGameStart] = useState(false);
  const [newQuestions, setNewQuestions] = useState();
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  // Happens only once at the beginnign
  const startGame = () => {
    setGameStart(true);
  };

  const questionsDisplay = data.map((question, index) => {
    return (
      <Question
        key={index + 1}
        title={question.question}
        correctAnswer={question.correct_answer}
        incorrectAnswers={question.incorrect_answers}
      />
    );
  });

  return (
    <div className="App">
      {gameStart ? (
        <div className="quizzical">
          {questionsDisplay}
          <Button />
        </div>
      ) : (
        <div className="not-started">
          <h1>Quizzical</h1>
          <p>Test yourself with trivia questions</p>
          <button onClick={startGame}>Start Game</button>
        </div>
      )}
    </div>
  );
}

export default App;
