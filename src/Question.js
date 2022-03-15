import Answer from "./Answer";

export default function Question(props) {
  const allAnswersArr = [props.correctAnswer, ...props.incorrectAnswers];
  const shuffleAnswers = allAnswersArr.sort(() => Math.random() - 0.5);
  const answersDisplay = shuffleAnswers.map((answer, index) => {
    return <Answer key={index + 1} content={answer} />;
  });

  return (
    <div className="questions-container">
      <h3>{props.title}</h3>
      {answersDisplay}
    </div>
  );
}
