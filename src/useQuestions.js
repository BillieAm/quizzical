import { useState, useEffect } from "react";
import { decode } from "html-entities";
import { nanoid } from "nanoid";

function useQuestions() {
  const [questions, setQuestions] = useState([]);
  const [newRound, setNewRound] = useState(1);

  useEffect(() => {
    (async function getQuestions() {
      const res = await fetch("https://opentdb.com/api.php?amount=5");
      const data = await res.json();

      const questionsData = data.results.map((item) => {
        const correctAnswer = decode(item.correct_answer).trim();
        const incorrectAnswers = item.incorrect_answers.map((answer) =>
          decode(answer).trim()
        );
        return {
          id: nanoid(),
          question: decode(item.question),
          correct_answer: correctAnswer,
          incorrect_answers: incorrectAnswers,
          shuffledAnswers: [...incorrectAnswers, correctAnswer].sort(
            () => Math.random() - 0.5
          ),
        };
      });
      setQuestions(questionsData);
    })();
  }, [newRound]);

  function handleAnswer(q, a) {
    setQuestions((prevQuestions) => {
      return prevQuestions.map((question) => {
        return question.id === q ? { ...question, playerAnswer: a } : question;
      });
    });
  }

  function roundCounter() {
    setNewRound((prevcount) => prevcount + 1);
  }

  return { questions, handleAnswer, roundCounter };
}

export default useQuestions;
