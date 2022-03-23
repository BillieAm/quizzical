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
      <span
        className="answer"
        key={index + 1}
        onClick={props.handlePlayerAnswer}
        style={styles}
      >
        {answer}
      </span>
    );
  });

  return (
    <div className="question-container">
      <h3 className="question">{props.title}</h3>
      <div className="answers-container">{answersDisplay}</div>
    </div>
  );
}
