function prettyDate (timesamp) {
  function appendLeadingZeroes (n) {
    if (n <= 9) {
      return '0' + n
    }
    return n
  }

  const currentDatetime = new Date(timesamp)

  const formattedDate = currentDatetime.getFullYear() +
      '-' + appendLeadingZeroes(currentDatetime.getMonth() + 1) +
      '-' + appendLeadingZeroes(currentDatetime.getDate()) +
      ' ' + appendLeadingZeroes(currentDatetime.getHours()) +
      ':' + appendLeadingZeroes(currentDatetime.getMinutes()) +
      ':' + appendLeadingZeroes(currentDatetime.getSeconds())
  return formattedDate
}

export default prettyDate
