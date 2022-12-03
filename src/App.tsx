import React, { useEffect, useState, useRef } from 'react';
import './App.css';

interface SettingsInterface {
  periods: Array<number>
}

import { periods } from './configs/settings';

import timealgorithm from './assets/timealgorithm';

import click from './assets/click2.wav'

import SettingsIcon from './assets/settings.svg';
import { Settings } from './components/imports';
import Stat from './components/stat/Stat';

import { useAppSelector, useAppDispatch } from './redux/hooks/hooks'
import { change } from './redux/reducers/modalReducer'

function App() {

  const [settingsIsOpen, setSettingsOpen] = useState(false)
  const [statIsOpen, setStatOpen] = useState(false)

  const [timertime, setTimertime] = useState(30);
  const [isStart, setStart] = useState(false);
  const [currentTime, setCurrentTime] = useState('loading...');
  const [pause, setPause] = useState(false);
  const currentSec: any = useRef();

  const [whatdo, setWhatdo] = useState('')

  const interval: any = useRef(null);

  useEffect(() => {
    if (currentSec.current === 0) {
      clearInterval(interval.current)
    }
  }, [currentSec.current])

  function startTimer(time: number) {
    audioClick()
    setStart(true);
    currentSec.current = time;
    interval.current = setInterval(() => {
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
    setWhatdo('')
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

  const closeSettings = () => setSettingsOpen(false);
  const closeStat = () => setStatOpen(false);

  return (
    <div className="container">

      {settingsIsOpen ? (<Settings close={closeSettings} />) : null}
      {statIsOpen ? (<Stat close={closeStat} />) : null}

      <div className="timer">
        {isStart ? currentTime : `${timertime}min`}
      </div>

      <div className="timer__periods">
        {periods.map((item, index) => (
          <button key={index} onClick={() => { audioClick(); setTimertime(item) }} className="timer__period-btn" type="button">{item}min</button>
        ))}
      </div>

      <div className="timer__do">
        {isStart ? (
          <div>
            {whatdo}
          </div>
        )
          : (
            <input onChange={ (e) => setWhatdo(e.target.value)} className="timer__input" placeholder="What are you going to do?" />
          )}
      </div>

      <div className="timer__btns">
        {isStart ?
          (<>
            <button className="timer__btn timer__pause-btn" type="button" onClick={() => pauseTimer()} >Pause</button>
            <button className="timer__btn timer__stop-btn" type="button" onClick={() => stopTimer()} >Stop</button>
          </>)
          :
          (<button className="timer__btn timer__start-btn" type="button" onClick={() => startTimer(timertime * 60)} >Start</button>)
        }
      </div>

      <div className="timer__btns">
        <button
          className="timer__btn timer__settings-btn"
          type="button"
          onClick={() => { setSettingsOpen(true) }}
        >
          <img className="timer__settings-icon" src={SettingsIcon} />
          Settings
        </button>

        <button
          className="timer__btn timer__statistics-btn"
          onClick={ () => { setStatOpen(true) }}
        >
          Stats
        </button>
      </div>

    </div>
  )
}

export default App

// TimeFollower
// ⏰It`s timer for follow your concentrated on work
