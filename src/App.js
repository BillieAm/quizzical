import useQuestions from "./hooks/useQuestions";
import Question from "./Question";
import { useState, useEffect } from "react";

export default function App() {
  const { questions, handleAnswer, roundsCounter } = useQuestions();
  const [game, setGame] = useState({
    hasStarted: false,
    hasAllAnswered: false,
    hasChecked: false,
    errMessage: false,
    correctCount: 0,
  });

  useEffect(() => {
    setGame((prevGame) => ({
      ...prevGame,
      hasAllAnswered: questions.every((question) => question.playerAnswer),
    }));
  }, [questions]);

  const startGame = () => {
    setGame((prevGame) => ({ ...prevGame, hasStarted: true }));
  };

  function addPlayerAnswer(questionId, answer) {
    !game.hasChecked && handleAnswer(questionId, answer);
  }

  function checkAnswers() {
    if (!game.hasAllAnswered) {
      setGame((prevGame) => ({ ...prevGame, errMessage: true }));
    } else {
      const correctCount = questions.filter((question) => {
        return question.correct_answer === question.playerAnswer;
      });

      setGame((prevGame) => ({
        ...prevGame,
        hasChecked: prevGame.hasAllAnswered,
        correctCount: correctCount.length,
        errMessage: false,
      }));
    }
  }

  const playAgain = () => {
    setGame((prevGame) => ({
      hasStarted: false,
      hasAllAnswered: false,
      hasChecked: false,
      errMessage: false,
      correctCount: 0,
    }));
    roundsCounter();
  };

  const questionsDisplay = questions.map((question) => {
    return (
      <Question
        key={question.id}
        id={question.id}
        title={question.question}
        answers={question.shuffledAnswers}
        playerAnswer={question.playerAnswer}
        correct={question.correct_answer}
        handlePlayerAnswer={(e) =>
          addPlayerAnswer(question.id, e.target.innerText)
        }
        hasChecked={game.hasChecked}
      />
    );
  });

  return (
    <div className="app">
      {game.hasStarted ? (
        <div className="quizzical">
          {questionsDisplay}
          <h3 className={game.errMessage ? "errMsg" : "hidden"}>
            Please answer all the questions
          </h3>
          <section className="results">
            <h3 className={`score ${!game.hasChecked && "hidden"}`}>
              You scored {game.correctCount}/{questions.length} correct answers
            </h3>
            <button
              className="game-btn"
              onClick={game.hasChecked ? playAgain : checkAnswers}
            >
              {game.hasChecked ? "Play Again" : "Check Answers"}
            </button>
          </section>
        </div>
      ) : (
        <div className="not-started">
          <h1>Quizzical</h1>
          <p>Test your general knowledge</p>
          <button className="start-btn" onClick={startGame}>
            Start Quiz
          </button>
        </div>
      )}
    </div>
  );
}
