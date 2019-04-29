import { toArabic } from './conversions'

function romanToArabic (numeral = '') {
  let validGroups

  try {
    validGroups = splitIntoGroups(numeral.toUpperCase())
  } catch (error) {
    console.error(error)
    throw new Error(`${numeral} is an invalid roman numeral`)
  }

  return validGroups.reduce((acc, val) => acc + sumCharGroup(val), 0)
}

/**
 * Returns an array of logical groups from a roman numeral
 * @param {String} numeral - An uppercase roman numeral
 */
export function splitIntoGroups (numeral = '') {
  let group = ''
  let nextChar

  return numeral.split('').reduce((groups, char, i) => {
    group += char

    if (!toArabic[char]) {
      throw new Error(`${char} is not a valid roman numeral character`)
    }

    nextChar = numeral[i + 1]

    if (!nextChar || toArabic[nextChar] < toArabic[char]) {
      groups.push(group)
      group = ''
    }

    return groups
  }, [])
}

/**
 * Returns the sum of a group of roman numeral characters
 * @param {String} group - A grouping of roman numeral characters
 */
export function sumCharGroup (group = '') {
  let digit
  let prevDigit

  return group.split('').reduce((acc, char, i) => {
    digit = toArabic[char]
    prevDigit = toArabic[group[i - 1]]

    if (!prevDigit || prevDigit >= digit) {
      return acc + digit
    }

    return digit - acc
  }, 0)
}

export default romanToArabic
