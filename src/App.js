import { useState, useEffect } from "react";
import useFetchData from "./hooks/useFetchData";
import Question from "./Question";
import Start from "./components/Start";
import Quiz from "./components/Quiz";

export default function App() {
  const { loading, error, questions, handleAnswer, roundsCounter } =
    useFetchData();
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
        <Quiz
          questionsDisplay={questionsDisplay}
          game={game}
          questions={questions}
          playAgain={playAgain}
          checkAnswers={checkAnswers}
        />
      ) : (
        <Start startGame={startGame} />
      )}
    </div>
  );
}
