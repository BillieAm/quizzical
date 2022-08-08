function Start({ startGame }) {
  return (
    <div className="not-started">
      <h1>Quizzical</h1>
      <p>Test your general knowledge</p>
      <button className="start-btn" onClick={startGame}>
        Start Quiz
      </button>
    </div>
  );
}

export default Start;
