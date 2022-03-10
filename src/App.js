import React, {useEffect, useState} from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import AdminPage from "./components/AdminPage/pages/AdminPage";
import GamePage from "../src/components/GamePage/pages/GamePage";
import Puzzle from "./components/GamePage/pages/Puzzle";
import Quiz from "./components/GamePage/pages/Quiz";
import Result from "./components/GamePage/pages/Result";
import "./components/GamePage/styles/layout.css";


const App = () => {
    const [authorised , setAuthorised] = useState(false)
    const [authorisedGame , setAuthorisedGame] = useState(false)
  return (
      <>
      <Routes>
        <Route path = "/"  element={<LoginPage setAuthorised={setAuthorised} setAuthorisedGame={setAuthorisedGame} />} />
        <Route path= "/admin"   element={ <AdminPage authorized={authorised} />}  />
            <Route path="/game"  element={ <GamePage authorisedGame={authorisedGame} /> }/>
            <Route path="/puzzle" element={<Puzzle />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/result" element={<Result />} />
          </Routes>
      </>
  );
};

export default App;
