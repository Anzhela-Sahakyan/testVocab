import React, { useState } from "react";
import questionsData from "./questions"; // Assume this is imported correctly

const Test = () => {
  const [questions, setQuestions] = useState(questionsData);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerSelect = (questionId, choiceId) => {
    setAnswers({ ...answers, [questionId]: choiceId });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const allAnswered = questions.length === Object.keys(answers).length;

  const renderChoiceButton = (question, choice, index) => {
    const isSelected = answers[question.id] === choice.id;
    let buttonStyle = {
      margin: "5px",
      padding: "10px",
      width: "200px",
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
    <div>
      {questions.map((question, index) => (
        <div key={question.id}>
          <h3>{`${index + 1}. ${question.text}`}</h3>
          {question.choices.map((choice) =>
            renderChoiceButton(question, choice, index)
          )}
        </div>
      ))}
      <button
        style={{
          width: "200px",
          height: "60px",
          margin: "20px",
          borderRadius: "6px",
          fontSize: "22px",
        }}
        onClick={handleSubmit}
        disabled={!allAnswered || submitted}
      >
        Submit Test
      </button>
    </div>
  );
};

export default Test;
