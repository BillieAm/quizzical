import { useState } from "react";
import Question from "./Question";
import Button from "./Button";
import data from "./data";

const shuffleAnswers = data.map((item) => {
  return {
    ...item,
    shuffledAnswers: [...item.incorrect_answers, item.correct_answer].sort(
      () => Math.random() - 0.5
    ),
  };
});

function App() {
  const [gameStart, setGameStart] = useState(false);
  const [questions, setQuestions] = useState(
    setQuestionsFromData(shuffleAnswers)
  );

  console.log(questions);

  // Happens only once at the beginnig
  const startGame = () => {
    setGameStart(true);
  };

  function setQuestionsFromData(questionsArr) {
    return questionsArr.map((question, index) => {
      return { ...question, id: index + 1 };
    });
  }

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
        title={question.question}
        answers={question.shuffledAnswers}
        playerAnswer={question.playerAnswer}
        handlePlayerAnswer={(e) =>
          addPlyerAnswer(question.id, e.target.innerText)
        }
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
