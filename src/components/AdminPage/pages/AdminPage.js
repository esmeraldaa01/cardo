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
  const [errorCreate, setErrorCreate] = useState({ title: null, answer: null , choices : []});

  const onEdit = (question) => {
    setQuestions((previousQuestions) => {
      const newQuestions = cloneArray(previousQuestions);
      const index = previousQuestions.findIndex(
        (question) => question.id === editableQuestion.id
      );
      newQuestions[index] = question;
      return newQuestions;
    });
    setEditableQuestion(null);
  };

  const onCreate = (question) => {
    const newQuestion = { id: Math.random(), ...question };
    setQuestions((previousQuestions) => {
      return [...previousQuestions, newQuestion];
    });
    setCreate(false);
  };

  const checkChoices = (choices) => {
    let foundError = false;
    choices.forEach((choice) => {
      if (choice.title === "" || choice.key === "") {
        foundError = true;
      }
    });
    return foundError;
  };

  const onSubmit = (question) => {
    if(!question.title && !question.answer) {
      setErrorCreate({
        title: "Please fill the name!  ",
        answer: "Please select an answer ! ",
        choices:"Insert at least 2 choices !  Please Fill options! "  });
      return;
    } else setErrorCreate({ title: null, answer: null , choices: null});
    if(!question.title) {
      setErrorCreate({
        ...errorCreate ,
        title: "Please fill the name! " });
      return;
    } else setErrorCreate({...errorCreate, title: null});
      if (question.choices.length < 2) {
      setErrorCreate({
        choices: "Insert at least 2 options! "
      });
      return;
    } else  setErrorCreate({ title: null, answer: null , choices : []});
      if (checkChoices(question.choices)) {
      setErrorCreate({
        choices: "Please fill the options! "
      });
      return;
    } else  setErrorCreate({ title: null, answer: null , choices : []})
      if (!question.answer) {
      setErrorCreate({
        answer: "Please fill the answer! "
      });
      return;
    } else  setErrorCreate({ title: null, answer: null , choices : []})

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
    if (editableQuestion) setEditableQuestion(null);
  };

  useEffect(() => {
    const existingValue = localStorage.getItem("questions");
    if (existingValue) {
      const existingQuestions = JSON.parse(existingValue);
      if (JSON.stringify(existingQuestions) !== JSON.stringify(questions)) {
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
