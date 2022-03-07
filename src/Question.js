import QuestionLine from "./QuestionLine";
import AnswersLine from "./AnswersLine";
import { nanoid } from "nanoid";

export default function Question(props) {
  const questionsList = props.content.map((question, index) => {
    return (
      <div className="question" key={index}>
        <QuestionLine key={nanoid()} question={question.question} />
        <AnswersLine
          key={nanoid()}
          correct={question.correct_answer}
          incorrect={question.incorrect_answers}
        />
      </div>
    );
  });
  return <div className="questions-container">{questionsList}</div>;
}
