import { useState, useEffect } from 'react'

const Clock = () => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000)

    return () => clearInterval(timerId)
  }, [])

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`
  }

  return (
    <div className="btn btn-outline px-5 hover:bg-[#299ec4] hover:text-white hover:border-none">
      {formatTime(time)}
    </div>
  )
}

export default Clock
