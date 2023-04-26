import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [deletedQuestionId, setDeletedQuestionId] = useState(null);
  
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }, [deletedQuestionId]);

  const handleQuestionDelete =(id) => {
    fetch(`http://localhost:4000/questions/${id}`,{
      method: "DELETE",
    })
    .then(() => {
      setDeletedQuestionId(id);
    })
  }
  const questionItems = questions.map((question) => (
    <QuestionItem 
    key={question.id} 
    question={question} 
    onDelete={() => handleQuestionDelete(question.id)}
    />
  ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
