export default function Question(props) {
  const allAnswersArr = [props.correctAnswer, ...props.incorrectAnswers];
  const shuffleAnswers = allAnswersArr.sort(() => Math.random() - 0.5);
  const answersDisplay = shuffleAnswers.map((answer, index) => {
    return (
      <p
        key={index + 1}
        onClick={props.handlePlayerAnswer}
        style={{
          backgroundColor: props.playerAnswer === answer ? "red" : "white",
        }}
      >
        {answer}
      </p>
    );
  });

  return (
    <div className="questions-container">
      <h3>{props.title}</h3>
      {answersDisplay}
    </div>
  );
}
