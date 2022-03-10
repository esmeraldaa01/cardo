import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import questions from "../../../questions";
import Confetti from "react-confetti";
import { IoTrophySharp } from "react-icons/io5";
import "../styles/result.css";
import Layout from '../layout/layout';


const Result = () => {
  let navigate = useNavigate();
  const level = useSelector((state) => state.level);
  const score = useSelector((state) => state.score);
  const [winConfetti, setWinConfetti] = useState(true);
  const style = { color: "rgba(212,175,55, 0.8)", marginTop: "20px" };
  const [gamRules , setGameRules] = useState({
      'easy' : {
          timeout : null,
          wrongAnswers : null ,
          slices : null
      },
      'medium' : {
          timeout : null,
          wrongAnswers : null ,
          slices : null
      },
      'hard' : {
          timeout : null,
          wrongAnswers : null ,
          slices : null
      }
  });


  useEffect(() => {
    const timer = setTimeout(() => {
      setWinConfetti(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);


    useEffect(() => {
        const gameRules = localStorage.getItem('gameRules');
        const rules = JSON.parse(gameRules);
        setGameRules(rules);
    }, [])


    const checkIfWon = () => {
        let index = 0;
        if(level === "medium") index = 0 + 1;
        if(level === "hard") index = 0 + 2;
        let entries = Object.values(gamRules);
        return (entries[index].wrongAnswers < score);
      // return gamRules[level].wrongAnswers
    }

  return checkIfWon() ?
   ( 
     <Layout>
   <div className="result">
      {winConfetti && <Confetti width={800} height={523} />}
      <p className="header-winner">
        You win <IoTrophySharp style={style} />, you score out {score} of{" "}
        {questions.length}
      </p>
      <button className="result-btn" onClick={() => navigate(`/game`)}>
        Menu
      </button>
    </div>
    </Layout>
  ) : (
    <Layout>
    <div className="result">
      <p className="header-lose">
        You have lost the game, you score out {score} of {questions.length}
      </p>
      <button className="result-btn" onClick={() => navigate(`/game`)}>
        Menu
      </button>
    </div>
    </Layout>
  );
};

export default Result;
