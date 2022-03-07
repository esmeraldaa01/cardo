import "../styles/AdminPage.css";
import data from "../../../assests/data";
import QuestionsTable from "./QuestionTable";
import { useEffect, useState } from "react";
import GameRules from "./GamesRules";
import QuestionForm from "./QuestionForm";


const cloneArray = (list) => {
  return list.map((object) => ({ ...object }));
};


const AdminPage = () => {
  const [create, setCreate] = useState(false);
  const [questions, setQuestions] = useState(cloneArray(data));
  const [editableQuestion, setEditableQuestion] = useState(null);
  const [errorCreate , setErrorCreate] = useState('');


  const onEdit = (question) => {
    setQuestions((previousQuestions) => {
      const newQuestions = cloneArray(previousQuestions);
      const index = previousQuestions.findIndex((question) => question.id === editableQuestion.id);
      newQuestions[index] = question;
      return newQuestions;
    });
  };

  const onCreate = (question) => {
    const newQuestion = { id: Math.random(), ...question };
    setQuestions((previousQuestions) => {
      return [...previousQuestions, newQuestion];
    });
  };


  const onSubmit = (question) => {
    if (!question.title){
      setErrorCreate('Please fill the title !!');
      return
    } else if(  question.choices.length < 2 ) {
      setErrorCreate("Add at least 2 options");
      return
    }else if(question.choices.title === ''  || question.choices.key === ''){
      setErrorCreate('Choices must have values');
      return ;
    } else if( !question.answer) {
      setErrorCreate('Please fill the answer');
      return
    } else {
      setErrorCreate(false);
    }
    return editableQuestion ? onEdit(question) : onCreate(question);

  };


  const onCancel = () => {
    if (editableQuestion) setEditableQuestion(null);
    else setCreate(null);
  };

  const onDelete = (record) => {
    setQuestions(questions.filter((question) => question.id !== record.id));
  };

  const onQuestionCreate = () => {
    if (editableQuestion) setEditableQuestion(null);
    setCreate(true);
  };

  const onQuestionEdit = (record) => {
    if (create) setCreate(false);
    setEditableQuestion(record);
 if(editableQuestion) setEditableQuestion(null)
  };

  useEffect(() => {
    const existingValue = localStorage.getItem("questions");
    if (existingValue) {
      const q = JSON.parse(existingValue);
      if (JSON.stringify(q) !== JSON.stringify(questions)) {
        setQuestions(questions);
        localStorage.setItem("questions", JSON.stringify(questions));
      }
    } else {
      localStorage.setItem("questions", JSON.stringify(questions));
    }
  }, [questions]);

  return (
    <div style={{ display: "flex", flexDirection: "column", margin: "5px" }}>
      <div className="container">
        <QuestionsTable
          questions={questions}
          onDelete={onDelete}
          onEdit={onQuestionEdit}
          onCreate={onQuestionCreate}
        />
      </div>

      <div className="con-2">
        <GameRules />
        <div style={{ width: "50%" }}>
          {editableQuestion && !create && (
            <QuestionForm
              onSubmit={onSubmit}
              onCancel={onCancel}
              create={create}
              setEditableQuestion={setEditableQuestion}
              currentQuestion={editableQuestion}
            />
          )}
          {!editableQuestion && create && (
            <QuestionForm
              onSubmit={onSubmit}
              onCancel={onCancel}
              errorCreate={errorCreate}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
