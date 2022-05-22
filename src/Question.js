export default function Question(props) {
  const answersDisplay = props.answers.map((answer, index) => {
    let cssClass = "";
    let style = {};

    if (!props.hasChecked && props.playerAnswer === answer) {
      cssClass = "player-answer";
    }

    if (props.hasChecked && props.playerAnswer === answer) {
      cssClass = "incorrect";
    }

    if (props.hasChecked && props.correct === answer) {
      cssClass = "correct";
    }

    if (props.hasChecked) {
      style = {
        cursor: "default",
      };
    }

    return (
      <span
        className={`answer ${cssClass}`}
        key={index + 1}
        onClick={props.handlePlayerAnswer}
        disabled={props.hasChecked && props.correct !== answer ? true : false}
        style={style}
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
