export const parseLocalDate = s => {
  if (!s || !/^\d{4}-\d{2}-\d{2}$/.test(s)) {
    return null
  }

  const parts = s.split(/\D/)

  const year = parseInt(parts[0])
  const month = parseInt(parts[1]) - 1
  const day = parseInt(parts[2])

  return new Date(year, month, day)
}
