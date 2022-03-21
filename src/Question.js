export default function Question(props) {
  const answersDisplay = props.answers.map((answer, index) => {
    return (
      <p
        key={index + 1}
        onClick={props.handlePlayerAnswer}
        style={{
          backgroundColor: props.playerAnswer === answer ? "grey" : "white",
        }}
      >
        {answer}
      </p>
    );
  });

  return (
    <div className="questions-container">
      <h3>{props.title}</h3>
      <div className="answers-container">{answersDisplay}</div>
    </div>
  );
}
