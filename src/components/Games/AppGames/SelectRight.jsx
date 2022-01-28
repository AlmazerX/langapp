import React, {useEffect, useMemo, useState} from 'react'

import styles from './AppGames.module.css'

const SelectRight = ({wordIndex, setWordIndex, playWords, errorWords, setErrorWords, correctWords, setCorrectWords}) => {

    const randomWords = useMemo(() => playWords.sort(() => Math.random(), []))
    
    const [currentWords, setCurrentWords] = useState(['random', 'correct', 'random2'])
    
    useEffect(() => {
        setCurrentWords([
            randomWords[wordIndex].translate,
            randomWords[(wordIndex + 1)%randomWords.length].translate,
            randomWords[(wordIndex + 2)%randomWords.length].translate,
        ].sort(() => Math.random() - 0.5))
    }, [correctWords])
    
    
    const checkWord = (word) => {
        if(word === randomWords[wordIndex].translate) {
            setCorrectWords(correctWords + 1)
            if(wordIndex !== playWords.length - 1) {
                setWordIndex(wordIndex + 1)
            } else {
                alert('Game is over')
            }

        } else {
            setErrorWords(errorWords + 1)
        }
    }

    return (
        <section>
            <span>Choose this word</span>
            <h3>{randomWords[wordIndex].word}</h3>
            <ul className={styles.btnContainer}>
                {currentWords.map((translate, index) => (
                    <li key={index} onClick={() => checkWord(translate)} className={styles.btnCheck}>{translate}</li>
                ))}
            </ul>
        </section>
    )
}
export default SelectRight