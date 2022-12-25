/*
  guess the hex code for the randomly generated color 
  the color is displayed and there are three buttons displayed 
  under it with two wrong hex codes & the correct hex code in a randomly generated order
  if the correct hex code is selected then it randomly generates another color
  if the wrong hex code is chosen it outputs wrong color until the correct one is chosen
*/

import './App.css';
import { useEffect, useState } from "react";

// generate a random color
const getRandomColor = () => {
  // arr of hex code chars
  const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

  // create a random color by making a hex code
  const color = new Array(6).fill('').map(() => digits[Math.floor(Math.random() * digits.length)]).join("");
  return `#${color}`;
}


function App() {
  const [color, setColor] = useState("");
  const [answers, setAns] = useState([]);
  const [result, setResult] = useState(undefined);

  const generateColor = () => {
    // call to get a random color
    const correctColor = getRandomColor();
    setColor(correctColor);
    setAns([correctColor, getRandomColor(), getRandomColor()].sort(() => 0.5 - Math.random()));
  }

  useEffect(() => {
    generateColor();
  }, []);

  // when a button is clicked
  const handleAnswerClicked = (answer) => {
    if (answer === color) { // correct answer
      setResult(true);
      generateColor();
    } else { // wrong answer
      setResult(false);
    }
  }

  return (
    <div className="App">
      <div>
        <header className="heads">Click on the correct answer!</header>
        <div className="guess-me" style={{ background: color }}></div>
        {answers.map(answer => (
          <button onClick={() => handleAnswerClicked(answer)} key={answer}>{answer}</button>
        )
        )}

        {result === false && <div className="wrong"> Wrong Answer!</div>}
        {result === true && <div className="correct"> Correct!</div>}

      </div>
    </div>

  );
}

export default App;
