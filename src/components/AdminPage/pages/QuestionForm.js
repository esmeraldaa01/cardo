import React, { useState } from "react";
import { Input, Button, Space, Select } from "antd";
import { FormOutlined } from "@ant-design/icons";
import Choices from "./Choices";
import "../styles/AddQuestionForm.css";

const QuestionForm = ({
  errorCreate,
  onSubmit,
  onCancel,
  currentQuestion,
  setEditableQuestion,
}) => {

  const [question, setQuestion] = useState(() => {
    const initialState = { title: "", answer: "", choices: [], id: 0 };

    if (currentQuestion) {
      initialState.title = currentQuestion.title;
      initialState.answer = currentQuestion.answer;
      initialState.choices = currentQuestion.choices;
      initialState.id = currentQuestion.id;
    }

    return initialState;
  });

  const [errorEditing, setErrorEditing] = useState({
    title: null,
    answer: null,
    choices : []
  });


  const onAnswerChange = (key) => {
    setQuestion({
      ...question,
      answer: key,
    });
  };

  React.useEffect(() => {
    const answerChoice = question.choices.find(
      (choice) => choice.key === question.answer
    );

    if (!answerChoice) {
      onAnswerChange(null);
    }
  }, [question.choices]);


  const onChoiceDelete = (choice) => {
    setQuestion((question) => {
      const filterChoices = question.choices.filter(
        (chosenChoice) => chosenChoice.key !== choice.key
      );
      return {
        ...question,
        choices: filterChoices,
      };
    });
  };

  const handleChange = (event) => {
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newForm = { ...question };
    newForm[fieldName] = fieldValue;
    setQuestion(newForm);
  };

  const createChoice = () => {
    setQuestion((previousQuestion) => {
      const previousChoices = previousQuestion.choices;

      return {
        ...previousQuestion,
        choices: [
          ...previousChoices,
          {
            key: "",
            title: "",
          },
        ],
      };
    });
  };

  const onChoiceChange = (attr, value, index) => {
    setQuestion((previousQuestion) => {
      const newChoices = [...previousQuestion.choices];

      const currentChoice = newChoices[index];

      currentChoice[attr] = value;

      return {
        ...previousQuestion,
        choices: newChoices,
      };
    });
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


  const handleSave = () => {
    onSubmit(question);
    if(!question.title && !question.answer && question.choices.length <= 2 && (!checkChoices(question.choices)) ){
      setErrorEditing({title: "Question Title is required!", answer: "Question Answer is required!", choices: "Insert at least two choices and choose an answer."})
      return;
    }else if(!question.title && !question.answer){
      setErrorEditing({title: "Question Title is required!", answer: "Question Answer is required!"})
      return;
    } else if(question.title && !question.answer){
      setErrorEditing({title: "Answer Title is required! Please choose an answer."})
      return;
    }else if(!question || !question.answer && question.choices.length < 2) {
      setErrorEditing({ choices: "Insert at least two choices and choose an answer." });
      return;
    }else if(!question.answer && question.choices.length >= 2 && (!checkChoices(question.choices)))  {
      setErrorEditing({title: "Question Answer is required! Choose an answer."})
      return;
    }else if (checkChoices(question.choices)) {
      setErrorEditing({ choices: "Choice Title and Choice Key are required. Please fill the options!" });
      return;
    }else if (!question.title && question.answer && question.choices.length !== 0) {
      setErrorEditing({ title: "Question Title is required! Please write a question title." });
      return;
    }
    else setErrorEditing({title: null, answer: null , choices : []});

    setEditableQuestion(null);
    setQuestion({ title: "", answer: "", choices: [], id: 0 });
  };


  const { Option } = Select;

  return (
    <div className="form-container">
      <h3 style={{ textAlign: "center", paddingTop: "10px" }}>Form</h3>
      <form className="input-form">
        <Space direction="vertical">
          <label>Question Title </label>
          <Input
            type="text"
            size="large"
            name="title"
            value={question.title}
            onChange={handleChange}
            placeholder=" Enter the question..."
            addonBefore={<FormOutlined />}
            style={{ width: 500 }}
          />
          <label>Correct Answer</label>

          <Select
            showSearch
            placeholder="Select the correct answer"
            value={question.answer}
            onChange={onAnswerChange}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            style={{ width: 400 }}
          >
            {question.choices.map((choice, index) => {
              return (
                <Option key={index} value={choice.key}>
                  {choice.title}
                </Option>
              );
            })}
          </Select>
          <p
            style={{ color: "red", paddingTop: "10px", marginRight: "20px" }}
          ></p>
          <Choices
            list={question.choices}
            createChoice={createChoice}
            handleDelete={onChoiceDelete}
            onChoiceChange={onChoiceChange}
          />
        </Space>
      </form>
      <div className="new-input-buttons">
        <p style={{ color: "red", paddingTop: "10px", marginRight: "20px", fontSize: '16px ', fontWeight:'500' }}>
          {errorCreate?.title}
          {errorCreate?.answer}
          {errorCreate?.choices}
          {currentQuestion && errorEditing?.answer}
          {currentQuestion && errorEditing?.title}
          {currentQuestion && errorEditing?.choices}
        </p>
        <Button shape="round" type="primary" onClick={handleSave}>
          SAVE
        </Button>
        <Button shape="round" onClick={onCancel}>
          CANCEL
        </Button>
      </div>
    </div>
  );
};

export default QuestionForm;
