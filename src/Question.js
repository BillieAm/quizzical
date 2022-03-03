import QuestionLine from "./QuestionLine";
import AnswersLine from "./AnswersLine";

export default function Question(props) {
  return (
    <div>
      <QuestionLine />
      <AnswersLine />
    </div>
  );
}
