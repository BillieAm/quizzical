import { useState, useEffect } from "react";
import { decode } from "html-entities";
import Question from "./Question";

export default function App() {
  const [gameRound, setGameRound] = useState(0);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    (async function getQuestions() {
      const res = await fetch("https://opentdb.com/api.php?amount=5");
      const data = await res.json();
      console.log(data.results);

      const DataWithShuffledAnswers = data.results.map((item, index) => {
        return {
          ...item,
          id: index + 1,
          shuffledAnswers: [
            ...item.incorrect_answers,
            item.correct_answer,
          ].sort(() => Math.random() - 0.5),
        };
      });
      setQuestions(DataWithShuffledAnswers);
    })();
  }, []);

  // Happens only once at the beginnig
  const startGame = () => {
    setGameRound((prevCount) => prevCount + 1);
  };

  function addPlyerAnswer(questionId, answer) {
    setQuestions((prevQuestions) => {
      return questions.map((question) => {
        return question.id === questionId
          ? { ...question, playerAnswer: answer }
          : question;
      });
    });
  }

  const questionsDisplay = questions.map((question) => {
    return (
      <Question
        key={question.id}
        id={question.id}
        title={decode(question.question)}
        answers={decode(question.shuffledAnswers)}
        playerAnswer={question.playerAnswer}
        handlePlayerAnswer={(e) =>
          addPlyerAnswer(question.id, e.target.innerText)
        }
      />
    );
  });

  return (
    <div className="App">
      {gameRound ? (
        <div className="quizzical">
          {questionsDisplay}
          <button>Check Answers</button>
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
