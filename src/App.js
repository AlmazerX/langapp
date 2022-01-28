import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Header from './components/Header/Header';
import Library from './components/Library/Library';
import Learn from './components/Learn/Learn';
import Games from './components/Games/Games';
import Writeit from './components/Games/AppGames/Writeit';
import Checkit from './components/Games/AppGames/Checkit';
import SelectRight from './components/Games/AppGames/SelectRight';
import { useEffect, useState } from 'react';
import styles from './App.module.css'
import {BrowserRouter as Router, NavLink, Route, Routes} from 'react-router-dom';
import SprintGuess from './components/Games/AppGames/SprintGuess';
function App() {
  const [library, setLibrary] = useState(JSON.parse(localStorage.getItem('library')) || [])
  const [wordIndex, setWordIndex] = useState(0)
  const [correctWords, setCorrectWords] = useState(0)
  const [errorWords, setErrorWords] = useState(0)
  const [points, setPoints] = useState(0)
  const [playWords, setPlayWords] = useState(library.slice(-10))

  useEffect(() => {
    setPoints(points + correctWords)
  }, [correctWords])

  const progressBarWidth = {
    width: `${(100 / library.slice(-10).length) * (wordIndex + 1)}vw`
  }

  const speak = (word) => {
    const speakInstance = new SpeechSynthesisUtterance(word)
    speakInstance.voice = speechSynthesis.getVoices()[1]
    speechSynthesis.speak(speakInstance)
  }
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/dashboard' element={ <Dashboard /> }></Route>
        <Route path='/library' element={ <Library library={library} setLibrary={setLibrary}/> }></Route>
        <Route path='/games' element={ <Games /> }></Route>
        <Route path='/games/write-it' element={
          <>
            <div className={styles.progressBarContainer}>
              <div className={styles.progressBar} style={progressBarWidth}></div>
            </div>
            <nav className={styles.gameNav}>
              <NavLink className={styles.btnBack} to={'/games'}>

              </NavLink>
              <ul className={styles.results}>
                <li>Errors: {errorWords}</li>
                <li>Correct: {correctWords}</li>
                <li>Points: {points}</li>
              </ul>
            </nav>

            <section className={styles.gameContainer}>
              <Writeit playWords={playWords} wordIndex={wordIndex} setWordIndex={setWordIndex} 
                correctWords={correctWords}
                setCorrectWords={setCorrectWords}
                errorWords={errorWords} 
                setErrorWords={setErrorWords}
                speak={speak}
                /> 
            </section>
          </>
        }></Route>
        <Route path='/games/check-it' element={
          <>
            <div className={styles.progressBarContainer}>
              <div className={styles.progressBar} style={progressBarWidth}></div>
            </div>
            <nav className={styles.gameNav}>
              <NavLink className={styles.btnBack} to={'/games'}>

              </NavLink>
              <ul className={styles.results}>
                <li>Errors: {errorWords}</li>
                <li>Correct: {correctWords}</li>
                <li>Points: {points}</li>
              </ul>
            </nav>

            <section className={styles.gameContainer}>
              <Checkit playWords={playWords} wordIndex={wordIndex} setWordIndex={setWordIndex} 
                correctWords={correctWords}
                setCorrectWords={setCorrectWords}
                errorWords={errorWords} 
                setErrorWords={setErrorWords}
                speak={speak}
                /> 
            </section>
          </>
        }></Route>
        <Route path='/games/select-right' element={
          <>
            <div className={styles.progressBarContainer}>
              <div className={styles.progressBar} style={progressBarWidth}></div>
            </div>
            <nav className={styles.gameNav}>
              <NavLink className={styles.btnBack} to={'/games'}>

              </NavLink>
              <ul className={styles.results}>
                <li>Errors: {errorWords}</li>
                <li>Correct: {correctWords}</li>
                <li>Points: {points}</li>
              </ul>
            </nav>

            <section className={styles.gameContainer}>
              <SelectRight playWords={playWords} wordIndex={wordIndex} setWordIndex={setWordIndex} 
                correctWords={correctWords}
                setCorrectWords={setCorrectWords}
                errorWords={errorWords} 
                setErrorWords={setErrorWords}
                /> 
            </section>
          </>
        }></Route>
                <Route path='/games/sprint-guess' element={
          <>
            <div className={styles.progressBarContainer}>
              <div className={styles.progressBar} style={progressBarWidth}></div>
            </div>
            <nav className={styles.gameNav}>
              <NavLink className={styles.btnBack} to={'/games'}>

              </NavLink>
              <ul className={styles.results}>
                <li>Errors: {errorWords}</li>
                <li>Correct: {correctWords}</li>
                <li>Points: {points}</li>
              </ul>
            </nav>

            <section className={styles.gameContainer}>
              <SprintGuess playWords={playWords} wordIndex={wordIndex} setWordIndex={setWordIndex} 
                correctWords={correctWords}
                setCorrectWords={setCorrectWords}
                errorWords={errorWords} 
                setErrorWords={setErrorWords}
                speak={speak}
                /> 
            </section>
          </>
        }></Route>
        <Route path='/learn' element={
          <>
            <div className={styles.progressBarContainer}>
              <div className={styles.progressBar} style={progressBarWidth}></div>
            </div> 
            <Learn  speak={speak} library={library} wordIndex={wordIndex} setWordIndex={setWordIndex}/>

            <div onClick={() => {
              if(wordIndex === library.length - 1) {
                setWordIndex(0)
              } else {
                setWordIndex(wordIndex + 1)
              }
            }} className={styles.btnNext}></div>
          </>
          }>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
