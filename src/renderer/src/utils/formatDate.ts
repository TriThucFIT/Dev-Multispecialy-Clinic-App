import dayjs from 'dayjs'
export const formatDate = (date: string) => {
  const [day, month, year] = date.split('/')
  return `${year}-${month}-${day}`
}

export const checkCurentDate = (date: string) => {
  const now = dayjs()
  const appointmentDate = dayjs(date)

  return now.isSame(appointmentDate, 'day')
}
export const checkAfterDate = (date: string) => {
  const now = dayjs()
  const appointmentDate = dayjs(date)

  return appointmentDate.isAfter(now, 'day')
}
export const checkBeforeDate = (date: string) => {
  const now = dayjs()
  const appointmentDate = dayjs(date)

  return appointmentDate.isBefore(now, 'day')
}

export const checkAfterTime = (time: string) => {
  const now = dayjs()
  const appointmentTime = dayjs(time, 'HH:mm')
  return appointmentTime.isAfter(now, 'minute')
}

export const checkExpiredTime = (time: string) => {
  // expired time is 30 minutes
  const now = dayjs()
  const appointmentTime = dayjs(time, 'HH:mm')

  return appointmentTime.isBefore(now.subtract(30, 'minute'), 'minute')
}
