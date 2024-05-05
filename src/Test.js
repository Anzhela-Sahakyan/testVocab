import React, { useState, useEffect } from "react";
import questionsData from "./questions";

const Test = () => {
  const [questions] = useState(questionsData);
  const [answers, setAnswers] = useState(() => {
    const localAnswers = localStorage.getItem("testAnswers");
    return localAnswers ? JSON.parse(localAnswers) : {};
  });
  const [submitted, setSubmitted] = useState(() => {
    const localSubmitted = localStorage.getItem("testSubmitted");
    return localSubmitted ? JSON.parse(localSubmitted) : false;
  });
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    localStorage.setItem("testAnswers", JSON.stringify(answers));
    localStorage.setItem("testSubmitted", JSON.stringify(submitted));
  }, [answers, submitted]);

  const handleAnswerSelect = (questionId, choiceId) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [questionId]: choiceId }));
  };

  const handleSubmit = () => {
    const count = questions.reduce((acc, question) => {
      return acc + (answers[question.id] === question.correctAnswer ? 1 : 0);
    }, 0);
    setCorrectCount(count);
    setSubmitted(true);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setCorrectCount(0);
    localStorage.removeItem("testAnswers");
    localStorage.removeItem("testSubmitted");
  };

  const allAnswered = questions.length === Object.keys(answers).length;

  const renderChoiceButton = (question, choice) => {
    const isSelected = answers[question.id] === choice.id;
    let buttonStyle = {
      margin: "5px",
      padding: "10px",
      width: "90%",
      maxWidth: "300px",
      fontSize: "16px",
    };

    if (isSelected) {
      buttonStyle = {
        ...buttonStyle,
        backgroundColor: "#ede231",
        border: "2px solid #ffd700",
        transform: "scale(1.1)",
      };
    }

    if (submitted) {
      if (choice.id === question.correctAnswer) {
        buttonStyle = { ...buttonStyle, backgroundColor: "green" };
      } else if (isSelected && choice.id !== question.correctAnswer) {
        buttonStyle = { ...buttonStyle, backgroundColor: "red" };
      }
    }

    return (
      <button
        key={choice.id}
        style={buttonStyle}
        onClick={() => handleAnswerSelect(question.id, choice.id)}
        disabled={submitted}
      >
        {choice.text}
      </button>
    );
  };

  return (
    <div style={{ padding: "10px", maxWidth: "600px", margin: "auto" }}>
      {questions.map((question, index) => (
        <div key={question.id}>
          <h3>{`${index + 1}. ${question.text}`}</h3>
          {question.choices.map((choice) =>
            renderChoiceButton(question, choice)
          )}
        </div>
      ))}
      <button
        style={{
          width: "90%",
          height: "60px",
          margin: "20px 5%",
          borderRadius: "6px",
          fontSize: "22px",
          maxWidth: "300px",
        }}
        onClick={handleSubmit}
        disabled={!allAnswered || submitted}
      >
        Submit Test
      </button>
      {submitted && (
        <div
          style={{
            color: "green",
            fontSize: "18px",
            textAlign: "center",
            margin: "20px",
          }}
        >
          You answered {correctCount} out of {questions.length} questions
          correctly!
        </div>
      )}
      <button
        style={{
          width: "90%",
          height: "60px",
          margin: "0px 5% 20px",
          borderRadius: "6px",
          fontSize: "22px",
          maxWidth: "300px",
          backgroundColor: "#f8d7da",
        }}
        onClick={handleReset}
        disabled={!submitted}
      >
        Reset Test
      </button>
    </div>
  );
};

export default Test;
