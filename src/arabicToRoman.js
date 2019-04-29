import { toRoman } from './conversions'

const decimals = [1000, 100, 10, 1]

function arabicToRoman (numeral = 0) {
  // if (Number.isNaN(Number(numeral)) || numeral < 0 || numeral > 3999) {
  if (isNaN(numeral) || numeral < 0) {
    throw new Error(`${numeral} is not a valid arabic numeral`)
  }

  const group = groupInDecimals(numeral)

  return decimals.reduce((acc, val) => {
    if (group[val]) return acc + convertToRoman(val, group[val])

    return acc
  }, '')
}

export function groupInDecimals (numeral = 0) {
  return decimals.reduce((acc, val) => {
    if (numeral >= val) {
      acc[val] = Math.floor(numeral / val)
      numeral -= val * acc[val]
    }

    return acc
  }, {})
}

export function convertToRoman (decimalValue, valueCount) {
  const decimalRomanNumeral = toRoman[decimalValue]
  const fiveTimesDecimalRomanNumeral = toRoman[decimalValue * 5]
  const tenTimesDecimalRomanNumeral = toRoman[decimalValue * 10]

  switch (valueCount) {
    case 1:
    case 2:
    case 3: {
      return decimalRomanNumeral.repeat(valueCount)
    }
    case 4: {
      return decimalRomanNumeral + fiveTimesDecimalRomanNumeral
    }
    case 5:
    case 6:
    case 7:
    case 8: {
      return fiveTimesDecimalRomanNumeral + decimalRomanNumeral.repeat(valueCount - 5)
    }
    case 9: {
      return decimalRomanNumeral + tenTimesDecimalRomanNumeral
    }
  }
}

export default arabicToRoman
