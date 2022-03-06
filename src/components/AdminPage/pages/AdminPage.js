import "../styles/AdminPage.css";
import data from "../../../assests/data";
import QuestionsTable from "./QuestionTable";
import { useEffect, useState } from "react";
import GameRules from "./GamesRules";
import QuestionForm from "./QuestionForm";

//funksion qe na ndihmon per te kthyer nje array me objekte , kopjon json data
const cloneArray = (list) => {
  return list.map((object) => ({ ...object }));
};


const AdminPage = () => {
  const [create, setCreate] = useState(false); //nese state i create behet true ,ben te mundur hapjen e formes create question
  const [questions, setQuestions] = useState(cloneArray(data));
  // const [questions, setQuestions] = useState([]);
  const [editableQuestion, setEditableQuestion] = useState(null); //nese state i editableQuestion ka vlere ,ben te mundur hapjen e formes
  const [error, setError] = useState(false);

  const onEdit = (question) => {
    setQuestions((previousQuestions) => {
      const newQuestions = cloneArray(previousQuestions);
      const index = previousQuestions.findIndex(
        (question) => question.id === editableQuestion.id
      );
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
    if (!question.title && !question.answer) {
      setError(true);
      return;
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
  };

  useEffect(() => {
    const existingValue = localStorage.getItem("questions");
    if (existingValue) {
      const q = JSON.parse(existingValue);
      debugger;
      if (JSON.stringify(q) !== JSON.stringify(questions)) {
        setQuestions(questions);
        localStorage.setItem("questions", JSON.stringify(questions));
        debugger;
      }
    } else {
      localStorage.setItem("questions", JSON.stringify(questions));
      debugger;
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
              currentQuestion={editableQuestion}
            />
          )}
          {!editableQuestion && create && (
            <QuestionForm
              onSubmit={onSubmit}
              onCancel={onCancel}
              error={error}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
