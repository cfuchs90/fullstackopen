import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

const Button = function(props) {
  return(
    <button onClick={props.clickHandler}>{props.text}</button>
  );
};

const StatisticsLine = function({text, value}) {
  if(text != "positive") {
    return(
      <tr>
	<td>{text}</td>
	<td>{value.toFixed(2)}</td>
      </tr>
    );
  } else {
    return(
      <tr>
	<td>{text}</td>
	<td>{value.toFixed(2)} %</td>
      </tr>
    );
  }
};

const Statistics = function({good, neutral, bad}) {
  const feedbackSum = good + bad + neutral;

  if(feedbackSum > 0) {
    return(
      <div>
	  <h1>Statistics</h1>
	  <table>
            <tbody>
	      <StatisticsLine text="good" value={good}/>
	      <StatisticsLine text="neutral" value={neutral}/>
	      <StatisticsLine text="bad" value={bad}/>
	      <StatisticsLine text="all" value={feedbackSum}/>
	      <StatisticsLine text="average" value={(good - bad) / feedbackSum}/>
	      <StatisticsLine text="positive" value={good / feedbackSum}/>
            </tbody>
	  </table>
      </div>
    );
  } else {
    return(
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    );
  }
};


function App(props) {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
  };

  return(
    <div>
      <Button clickHandler={handleGood} text="good"/>
      <Button clickHandler={handleNeutral} text="neutral"/>
      <Button clickHandler={handleBad} text="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>

  );
}

export default App;
