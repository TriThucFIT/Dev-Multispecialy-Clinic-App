import dayjs from 'dayjs'
export const formatDate = (date: string) => {
  const [day, month, year] = date.split('/')
  return `${year}-${month}-${day}`
}

export const checkDate = (date: string) => {
  const now = dayjs()
  const appointmentDate = dayjs(date)

  return now.isBefore(appointmentDate) || now.isSame(appointmentDate, 'day')
}
