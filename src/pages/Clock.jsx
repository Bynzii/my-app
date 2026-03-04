import { useState, useEffect } from "react";
import '../assets/css/Clock.css'

function Clock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const pad = (n) => String(n).padStart(2,'0')

  const hours = pad(time.getHours())
  const minutes = pad(time.getMinutes())
  const seconds = pad(time.getSeconds())

  const days = ['일요일','월요일','화요일','수요일','목요일','금요일','토요일']
  const date = `${time.getFullYear()}년 ${time.getMonth() + 1}월 ${time.getDate()}일`
  const day = days[time.getDay()]

  return (
    <div className="clock__wrap">
      <div className="clock__time">
        <span>{hours}</span>
        <span className="clock__sep">:</span>
        <span>{minutes}</span>
        <span className="clock__sep">:</span>
        <span>{seconds}</span>
      </div>

      <div className="clock__date">{date}</div>
      <div className="clock__day">{day}</div>
    </div>
  )
}

export default Clock;