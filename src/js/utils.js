const VALUE_DAY_IN_MILLISECONDS = 86400000;

function getTwoDigitFormat(value) {
  if (value < 10) {
    return `0${value}`
  }

  return `${value}`
}

export function getDateAsYMD(dateObject) {
  const year = dateObject.getUTCFullYear()
  const month = getTwoDigitFormat(dateObject.getUTCMonth() + 1)
  const day = getTwoDigitFormat(dateObject.getUTCDate())

  return `${year}-${month}-${day}`
}

/**
 * @param  {number} days
 * @param  {string} date1 // 2020-12-31
 * @param  {string} date2 // 2020-12-31
 * @return {boolean}
 */
export function isMoreNDaysBetweenDates(days, date1, date2) {
  return (
    new Date(date1).getTime() - new Date(date2).getTime() + (VALUE_DAY_IN_MILLISECONDS * days)) < 0
}