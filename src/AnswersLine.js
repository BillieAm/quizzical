export default function AnswersLine(props) {
  const allAnswersArr = [props.correct, ...props.incorrect];
  const shuffleAnswers = allAnswersArr.sort(() => Math.random() - 0.5);

  const answersDisplay = shuffleAnswers.map((answer, index) => {
    return <p key={index + 1}>{answer}</p>;
  });

  return <div className="answers-container">{answersDisplay}</div>;
}
