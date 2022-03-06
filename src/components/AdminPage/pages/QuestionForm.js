import React, { useState } from "react";
import { Input, Button, Space, Select } from "antd";
import { FormOutlined } from "@ant-design/icons";
import Choices from "./Choices";
import "../styles/AddQuestionForm.css";
import choices from "./Choices";

const cloneArray = (arr) => {
  return JSON.parse(JSON.stringify(arr));
};

const QuestionForm = ({ error, onSubmit, onCancel, currentQuestion }) => {
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
  const onChoiceDelete = (choice) => {
    setQuestion((question) => {
      const filterChoices = question.choices.filter(
        (x) => x.key !== choice.key
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

  const onChoiceChange = (attr, value, index, key) => {
    //kte
    setQuestion((previousQuestion) => {
      const newChoices = [...previousQuestion.choices];

      const existingChoice = newChoices.find((x) => x.key === key);
      const newChoice = {
        ...existingChoice,
        title: value, //kte ?, te gjithe metoden,
      };

      //ktu e beje gabim sepse ndryshoje vleren e correct answer kur sduhet, ndrysho vtm title? asgje tjt si posht

      newChoices.splice(index, 1, newChoice);

      return {
        ...previousQuestion,
        choices: newChoices,
      };
    });
  };

  const handleSave = () => {
    onSubmit(question);
  };

  const { Option } = Select;

  const onChange = (key) => {
    debugger;
    setQuestion({
      ...question,
      answer: key,
    });
  };

  console.log("------", question);

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
            onChange={onChange}
            value={question.answer}
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
          <Choices
            list={question.choices}
            createChoice={createChoice}
            handleDelete={onChoiceDelete}
            onChoiceChange={onChoiceChange}
          />
        </Space>
      </form>
      <div className="new-input-buttons">
        {error && (
          <p style={{ color: "red", paddingTop: "10px", marginRight: "20px" }}>
            Please fill the fields !!
          </p>
        )}
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
