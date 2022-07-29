import { useState, useEffect } from "react";

import { decode } from "html-entities";
import { nanoid } from "nanoid";

function useFetchData() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [newRound, setNewRound] = useState(1);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("https://opentdb.com/api.php?amount=5");
        if (!res.ok) {
          throw new Error(`This is an HTTP error: The status is ${res.status}`);
        }
        const data = await res.json();
        arrangeData(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setQuestions(null);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [newRound]);

  function arrangeData(data) {
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
  }

  function handleAnswer(q, a) {
    setQuestions((prevQuestions) => {
      return prevQuestions.map((question) => {
        return question.id === q ? { ...question, playerAnswer: a } : question;
      });
    });
  }

  function roundsCounter() {
    setNewRound((prevcount) => prevcount + 1);
  }

  return { loading, error, questions, handleAnswer, roundsCounter };
}

export default useFetchData;
