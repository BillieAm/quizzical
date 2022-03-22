import { useState, useEffect } from "react";
import { decode } from "html-entities";
import Question from "./Question";

export default function App() {
  const [game, setGame] = useState({
    hasStarted: false,
    hasAllAnswered: false,
    hasChecked: false,
    round: 1,
  });
  const [questions, setQuestions] = useState([]);
  console.log("questions", questions);
  console.log("game", game);
  useEffect(() => {
    (async function getQuestions() {
      const res = await fetch("https://opentdb.com/api.php?amount=5");
      const data = await res.json();

      const questionsData = data.results.map((item, index) => {
        const correctAnswer = decode(item.correct_answer);
        const incorrectAnswers = item.incorrect_answers.map((answer) =>
          decode(answer)
        );
        return {
          id: index + 1,
          question: decode(item.question),
          correct_answer: correctAnswer,
          incorrect_answers: incorrectAnswers,
          shuffledAnswers: [...incorrectAnswers, correctAnswer].sort(
            () => Math.random() - 0.5
          ),
        };
      });
      setQuestions(questionsData);
    })();
  }, [game.round]);

  useEffect(() => {
    setGame((prevGame) => ({
      ...prevGame,
      hasAllAnswered: questions.every((question) => question.playerAnswer),
    }));
  }, [questions]);

  // Happens only once at the beginning
  const startGame = () => {
    setGame((prevGame) => ({ ...prevGame, hasStarted: !prevGame.hasStarted }));
  };

  const roundsCounter = () => {
    setGame((prevGame) => ({ ...prevGame, round: prevGame.round + 1 }));
  };

  function addPlayerAnswer(questionId, answer) {
    !game.hasChecked &&
      setQuestions((prevQuestions) => {
        return questions.map((question) => {
          return question.id === questionId
            ? { ...question, playerAnswer: answer }
            : question;
        });
      });
  }

  function checkAnswers() {
    setGame((prevGame) => ({
      ...prevGame,
      hasChecked: prevGame.hasAllAnswered,
    }));
  }

  const questionsDisplay = questions.map((question) => {
    return (
      <Question
        key={question.id}
        id={question.id}
        title={question.question}
        answers={question.shuffledAnswers}
        playerAnswer={question.playerAnswer}
        handlePlayerAnswer={(e) =>
          addPlayerAnswer(question.id, e.target.innerText)
        }
        hasChecked={game.hasChecked}
      />
    );
  });

  return (
    <div className="App">
      {game.hasStarted ? (
        <div className="quizzical">
          {questionsDisplay}
          <h3 className="err-msg hidden">Please answer all the questions</h3>
          <section className="results">
            <h3 className="score hidden">
              You scored {}/{questions.length} correct answers
            </h3>
            <button className="gameBtn" onClick={checkAnswers}>
              {game.hasChecked ? "Play Again" : "Check Answers"}
            </button>
          </section>
        </div>
      ) : (
        <div className="not-started">
          <h1>Quizzical</h1>
          <p>Test your general knowledge with some trivia questions</p>
          <button className="startBtn" onClick={startGame}>
            Start Game
          </button>
        </div>
      )}
    </div>
  );
}
