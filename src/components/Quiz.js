function Quiz({ questionsDisplay, game, questions, playAgain, checkAnswers }) {
  console.log(questions);
  return (
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
  );
}

export default Quiz;
