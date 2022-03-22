export default function Question(props) {
  const answersDisplay = props.answers.map((answer, index) => {
    const styles = {
      backgroundColor: props.playerAnswer === answer ? "grey" : "white",
    };

    return (
      <p key={index + 1} onClick={props.handlePlayerAnswer} style={styles}>
        {answer}
      </p>
    );
  });

  return (
    <div className="questions-container">
      <h2>{props.title}</h2>
      <div className="answers-container">{answersDisplay}</div>
    </div>
  );
}
