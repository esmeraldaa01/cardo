

const SCORE_MAP = {
    easy: 3,
    medium: 5,
    hard: 6,
  };
  
  export const checkIfWon = (score) => SCORE_MAP[score.level] < score.score;