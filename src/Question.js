export default function Question(props) {
  const answersDisplay = props.answers.map((answer, index) => {
    let styles = {};

    if (!props.hasChecked) {
      styles = {
        backgroundColor: props.playerAnswer === answer && "grey",
      };
    }

    if (props.hasChecked && props.playerAnswer === answer) {
      styles = {
        backgroundColor: "red",
      };
    }

    if (props.hasChecked && props.correct === answer) {
      styles = {
        backgroundColor: "green",
      };
    }

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
