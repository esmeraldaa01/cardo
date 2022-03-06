import React, { useEffect, useState } from "react";
import Image from '../../../assests/puzzle.png';
import '../styles/puzzle.css'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from '../layout/layout';

const Puzzle = () => {
  const [count, setCount] = useState(0);
  const [width] = useState(800);
  const [height] = useState(524);
  const [style, setStyle] = useState();
  const level = useSelector((state) => state.level);
  let navigate = useNavigate();

  useEffect(() => {
    if (!level) return;

    let numberSlices = 0;
    let timer = 500;

    if (level === "easy") {
      numberSlices = 2;
      timer = timer + 2000;
    }
    if (level === "medium") {
      numberSlices = 30;
      timer = timer + 1000;
    }

    if (level === "hard") numberSlices = 4;

    const doCalculation = () => {
      setCount((count) => {
        const isVertical = count >= numberSlices && count <= numberSlices * 2;
        const hasEnded = count > numberSlices * 2 - 1;

        if (!isVertical && !hasEnded) {
          let top = (count * height) / numberSlices;
          let bottom = height / numberSlices + top;
          let left = 0;
          let right = width;
          setStyle(`${top}px , ${right}px , ${bottom}px, ${left}px`);
        } else if (isVertical && !hasEnded) {
          let left = ((count - numberSlices) * width) / numberSlices;
          let right = width / numberSlices + left;
          let top = 0;
          let bottom = height;
          setStyle(`${top}px , ${right}px , ${bottom}px, ${left}px`);
        }

        if (count > numberSlices * 2 - 1) {
          clearInterval(interval);
          navigate(`/quiz`);
        }

        return count + 1;
      });
    };

    doCalculation();

    const interval = setInterval(() => {
      doCalculation();
    }, timer);

    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
    <div className="slice">
      <img style={{ clip: `rect(${style})` }} className="img" src={Image} />
    </div>
    </Layout>
  );
};
export default Puzzle;