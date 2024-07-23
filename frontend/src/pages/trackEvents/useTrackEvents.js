import { Row, Col } from "react-bootstrap";
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useIdleTimer } from 'react-idle-timer'
import axios from "axios";

export function useTrackEvents() {
    const [state, setState] = useState('Active')
    const [eventType, setEventType] = useState('noEvent')
    const [targetType, setTargetType] = useState('noTarget')
    const [targetId, setTargetId] = useState()
    const [targetContent, setTargetContent] = useState()
    const [location, setLocation] = useState()
    const [count, setCount] = useState(0)
    const [elapsed, setElapsed] = useState(0)
    const [remaining, setRemaining] = useState(0)
    const [time, setTime] = useState()
    const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);
    //console.log("userInfo", userInfo.isAdmin);

    const onIdle = () => {
        setState('Idle')
    }
    const onActive = () => {
        setState('Active')
    }
    const onAction = (event?: Event) => {
        if (!userInfo.isAdmin) {
            setEventType(event?.type ?? 'Event')
            //console.log("Event", event?.target.innerText, event?.target);
            var today = new Date();
            var dateNow = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            var timeNow = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var localDateTime = dateNow + ' ' + timeNow;

            if (event?.type !== "mousemove" && event?.type !== "wheel" && event?.type !== "noEvent" && event?.type !== "visibilitychange") {
                setTargetType(event?.target.tagName)
                setTargetId(event?.target.id)
                setTargetContent(event?.target.innerText)
                setLocation(window.location.href)
                setTime(localDateTime)
                var items = {
                    "event": eventType,
                    "targetType": targetType,
                    "targetId": targetId,
                    "targetContent": targetContent,
                    "location": location,
                    "timeSpend": elapsed + "s",
                    "timeFired": time,
                };
                var trackList = [];
                trackList = trackList.concat(JSON.parse(localStorage.getItem('trackData') || '[]'))
                if (items.event !== "mousemove" && items.eventType !== "wheel" && event?.type !== "visibilitychange") { trackList.push(items) }
                localStorage.setItem('trackData', JSON.stringify(trackList));
            } else if (event?.type === "mousemove" && state === "Idle") {
                if (event?.target.id === "stock_price" || event?.target.id === "minerals_price" || event?.target.id === "weather_forecast") {
                    setTargetType(event?.target.tagName)
                    setTargetId(event?.target.id)
                    setTargetContent(event?.target.innerText)
                    setLocation(window.location.href)
                    setTime(localDateTime)
                    var items = {
                        "event": eventType,
                        "targetType": targetType,
                        "targetId": targetId,
                        "targetContent": targetContent,
                        "location": location,
                        "timeSpend": elapsed + "s",
                        "timeFired": time,
                    };
                    var trackList = [];
                    trackList = trackList.concat(JSON.parse(localStorage.getItem('trackData') || '[]'))
                    if (event?.type === "mousemove" && state === "Idle" && targetType !== "noTarget") { trackList.push(items) }
                    localStorage.setItem('trackData', JSON.stringify(trackList));

                }
            }
            setCount(count + 1)
            var trackDataLogoutTime = localStorage.getItem("trackDataScheduledLogoutTime")
            const time_now = new Date().toString();
            if (time_now >= trackDataLogoutTime) {
                saveTrackEvents();
            }
        }
    }

    const { getRemainingTime } = useIdleTimer({
        onIdle,
        onActive,
        onAction,
        timeout: 3_000,
        throttle: 500
    })

    const { getElapsedTime } = useIdleTimer({
        onAction,
        timeout: 10_000,
        throttle: 500
    })
    useEffect(() => {
        const interval = setInterval(() => {
            setElapsed(Math.ceil(getElapsedTime() / 1000))
        }, 500)

        return () => {
            clearInterval(interval)
        }
    })


    return { state, eventType, targetType, targetId, targetContent, count, elapsed, remaining, location, time };
};

export function clearTrackEvents() {
    localStorage.clear("trackData")
};

export function saveTrackEvents() {
    var trackData = localStorage.getItem("trackData")
    const saveTrackData = async (trackData) => {
        const { data } = await axios.post(`/api/tracks/`, { ...trackData });
        return data;
    };

    var trackList = [];
    trackList = trackList.concat(JSON.parse(localStorage.getItem('trackData') || '[]'))
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var localDateTime = date + ' ' + time;
    //const localDateTime = new Date()
    trackList.push({ "logoutTime": localDateTime })
    localStorage.setItem('trackData', JSON.stringify(trackList));

    const finalTrackList = Array.from(new Set(trackList))
    const lastObject = trackList.pop();
    const firstObject = trackList.shift();

    const trackActivity = [];
    finalTrackList.map((event) => {
        if (!("logoutTime" in event))
            if (!("loginTime" in event))
                trackActivity.push(event)
    })

    const finalTrackData = {
        userId: firstObject?.userId,
        userName: firstObject?.userName,
        userCompany: firstObject?.userCompany,
        loginTime: firstObject?.loginTime,
        logoutTime: lastObject?.logoutTime,
        trackActivity: trackActivity,
    }
    if (trackActivity.length > 0) {
        localStorage.removeItem("trackDataScheduledLogoutTime");
        const time_now = new Date();
        time_now.setMinutes(time_now.getMinutes() + 30);
        localStorage.setItem('trackDataScheduledLogoutTime', time_now)

        const promise = saveTrackData(finalTrackData)
        promise.then((result) => {
            if (result.message === "Track Data Saved") {
                localStorage.removeItem('trackData');
                localStorage.setItem('trackData', JSON.stringify({ "userId": firstObject.userId, "userName": firstObject.userName, "userCompany": firstObject.userCompany, "loginTime": localDateTime }));
            }
        })
    }
};

