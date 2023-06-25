import React, { useEffect, useState } from 'react'

const TimeCounter = () => {

    const [count,setCount] = useState(0)
    const [isCounting,setIsCounting] = useState(false)
    const [pauseTime,setPauseTime] = useState(0)

    useEffect(()=>{
        let intervalID;

        if(isCounting){
            intervalID = setInterval(()=>{
                setCount((prevCount) => prevCount +1 )
                },1000)
        }
        return () => {
            clearInterval(intervalID)
        }
    },[isCounting])

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600)
        const minutes = Math.floor((time % 3600)/60)
        const seconds = Math.floor(time % 60)

        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
    }
    const pad = (value) => {
        return String(value).padStart(2,'0')
    }
    const startCounting = () => {
        setIsCounting(true)
    }
    const stopCounting = () => {
        setIsCounting(false)
        setPauseTime(count)
    }
    const resumeCounting = () => {
        setIsCounting(true)
        setCount(pauseTime)
    }
    const resetCounting = () => {
        setIsCounting(false)
        setCount(0)
        setPauseTime(0)
    }

  return (
    <div>
        <h1>{formatTime(count)}</h1>
        {
            isCounting ? (
                <button onClick={stopCounting}>Pause</button>
            ) : (
                <button onClick={startCounting}>Start</button>
            )}
            {!isCounting && count > 0 && (
                <>
                <button onClick={resumeCounting}>Resume</button>
                <button onClick={resetCounting}>Reset</button>
                </>
            )

            }
    </div>
  )
}

export default TimeCounter