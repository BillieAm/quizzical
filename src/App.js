import React from "react";
import Question from "./Question";
import Button from "./Button";
import data from "./data";

function App() {
  const [gameStart, setGameStart] = React.useState(false);

  const startGame = () => {
    setGameStart(true);
  };
  return (
    <div className="App">
      {gameStart ? (
        <div className="quizzical">
          <Question content={data} />
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
