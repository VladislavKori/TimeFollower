import React, {useEffect, useState, useRef} from 'react';
import './App.css';

import {periods} from './configs/settings'

import timealgorithm from './assets/timealgorithm';

import click from './assets/click2.wav'

function App() {

  const [timertime, setTimertime] = useState(30);
  const [isStart, setStart] = useState(false);
  const [currentTime, setCurrentTime] = useState('loading...');
  const [pause, setPause] = useState(false);
  const currentSec = useRef();

  const interval = useRef(null);

  useEffect( () => {
    if (currentSec.current === 0) {
      clearInterval(interval.current)
    }
  }, [currentSec.current])

  function startTimer(time) {
    audioClick()
    setStart(true);
    currentSec.current = time;
    interval.current = setInterval( () => {
        let result = timealgorithm(currentSec.current);
        currentSec.current -= 1;
        setCurrentTime(`${result.hours}:${result.minutes}:${result.seconds}`);
    }, 1000)
  }

  function stopTimer() {
    audioClick()
    setStart(false);
    setCurrentTime('loading...');
    setPause(false);
    clearInterval(interval.current);
  }

  function pauseTimer() {
    audioClick()
    if (pause) {
        startTimer(currentSec.current);
        return setPause(false);
    }
    clearInterval(interval.current);
    return setPause(true)
  }

  function audioClick() {
    const audioElement = new Audio(click);
    audioElement.play();
  }

  return (
    <div className="container">

      <div className="timer">
        { isStart ? currentTime : `${timertime}min` }
      </div>

      <div className="timer__periods">
        {periods.map( (item, index) => (
          <button key={index} onClick={() => {audioClick(); setTimertime(item)}} className="timer__period-btn" type="button">{item}min</button>
        ))}
      </div>

      <div className="timer__btns">
      {isStart ?
        (<>
        <button className="timer__btn timer__pause-btn" type="button" onClick={() => pauseTimer() } >Pause</button>
        <button className="timer__btn timer__stop-btn" type="button" onClick={() => stopTimer() } >Stop</button>
        </>)
      :
      (<button className="timer__btn timer__start-btn" type="button" onClick={ () => startTimer(timertime*60) } >Start</button>)
      }
      </div>

    </div>
  )
}

export default App

// TimeFollower
// ⏰It`s timer for follow your concentrated on work
