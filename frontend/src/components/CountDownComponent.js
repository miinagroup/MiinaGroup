import Countdown from "react-countdown";
import React from 'react'
import './page.css'

const CountDownComponent = () => {
    //日期的获取是一串数字，转换为正常的日期，然后截取前11个字符
    const currentDate = new Date().toJSON().slice(0, 11);
    //把截取到的日期转换为
    const ms = Date.parse(currentDate + "17:30:00");
    const cddt = ms - Date.now();

    return (
        <Countdown  className="countdown" date={Date.now() + cddt} />
    )
}

export default CountDownComponent


/* 
import React from "react";
import ReactDOM from "react-dom";
import Countdown from "react-countdown";

// Random component
const Completionist = () => <span>You are good to go!</span>;
let currentDate = new Date().toJSON().slice(0, 11);
let ms = Date.parse(currentDate + "23:59:59");
let first4 = String(ms).slice(0, 4);
let first4num = Number(first4);
let cddt = ms - Date.now();
let countd = String(first4num) + cddt;

ReactDOM.render(
  <Countdown date={Date.now() + cddt}>
    <Completionist />
  </Countdown>,
  document.getElementById("root")
);
console.log(Date.now());
console.log(currentDate);
console.log(ms);
console.log(Date());
console.log(first4num);
console.log(cddt);
console.log(countd);

*/


/* import React, { useState, useRef, useEffect } from 'react'


const CountDownComponent = () => {

    // We need ref in this, because we are dealing
    // with JS setInterval to keep track of it and
    // stop it when needed
    const Ref = useRef(null);

    // The state for our timer
    const [timer, setTimer] = useState('00:00:00');


    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        return {
            total, hours, minutes, seconds
        };
    }


    const startTimer = (e) => {
        let { total, hours, minutes, seconds }
                    = getTimeRemaining(e);
        if (total >= 0) {

            // update the timer
            // check if less than 10 then we need to
            // add '0' at the beginning of the variable
            setTimer(
                (hours > 9 ? hours : '0' + hours) + ':' +
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
        }
    }


    const clearTimer = (e) => {

        // If you adjust it you should also need to
        // adjust the Endtime formula we are about
        // to code next	
        setTimer('00:00:00');

        // If you try to remove this line the
        // updating of timer Variable will be
        // after 1000ms or 1sec
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }

    const getDeadTime = () => {
        let deadline = new Date();

        // This is where you need to adjust if
        // you entend to add more time
        deadline.setSeconds(deadline.getSeconds() + 60);
        return deadline;
    }

    // We can use useEffect so that when the component
    // mount the timer will start as soon as possible

    // We put empty array to act as componentDid
    // mount only
    useEffect(() => {
        clearTimer(getDeadTime());
    }, []);

    // Another way to call the clearTimer() to start
    // the countdown is via action event from the
    // button first we create function to be called
    // by the button


    return (
        <div className="App">
            <h2>{timer}</h2>

        </div>
    )
}

export default CountDownComponent; */



