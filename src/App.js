import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import AdminPage from "./components/AdminPage/pages/AdminPage";
import GamePage from "../src/components/GamePage/pages/GamePage";
import Puzzle from "./components/GamePage/pages/Puzzle";
import Quiz from "./components/GamePage/pages/Quiz";
import Result from "./components/GamePage/pages/Result";
import "./components/GamePage/styles/layout.css";


const App = () => {
  return (
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/puzzle" element={<Puzzle />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/result" element={<Result />} />
          </Routes>
  );
};

export default App;
