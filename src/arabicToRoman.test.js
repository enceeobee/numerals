import arabicToRoman, { convertToRoman, groupInDecimals } from './arabicToRoman'

const notValidError = 'not a valid arabic numeral'

describe('arabicToRoman', () => {
  describe('returns a roman numeral', () => {
    it('with a single character', () => {
      let numeral
      let expected
      let actual

      numeral = 1
      expected = 'I'
      actual = arabicToRoman(numeral)
      expect(actual).toBe(expected)

      numeral = 5
      expected = 'V'
      actual = arabicToRoman(numeral)
      expect(actual).toBe(expected)

      numeral = 10
      expected = 'X'
      actual = arabicToRoman(numeral)
      expect(actual).toBe(expected)

      numeral = 50
      expected = 'L'
      actual = arabicToRoman(numeral)
      expect(actual).toBe(expected)

      numeral = 100
      expected = 'C'
      actual = arabicToRoman(numeral)
      expect(actual).toBe(expected)

      numeral = 500
      expected = 'D'
      actual = arabicToRoman(numeral)
      expect(actual).toBe(expected)

      numeral = 1000
      expected = 'M'
      actual = arabicToRoman(numeral)
      expect(actual).toBe(expected)
    })

    it('with repeating characters', () => {
      let numeral
      let expected
      let actual

      numeral = 3
      expected = 'III'
      actual = arabicToRoman(numeral)
      expect(actual).toBe(expected)

      numeral = 20
      expected = 'XX'
      actual = arabicToRoman(numeral)
      expect(actual).toBe(expected)
    })

    it('with trailing smaller characters', () => {
      let numeral
      let expected
      let actual

      numeral = 6
      expected = 'VI'
      actual = arabicToRoman(numeral)
      expect(actual).toBe(expected)

      numeral = 7
      expected = 'VII'
      actual = arabicToRoman(numeral)
      expect(actual).toBe(expected)

      numeral = 70
      expected = 'LXX'
      actual = arabicToRoman(numeral)
      expect(actual).toBe(expected)

      numeral = 73
      expected = 'LXXIII'
      actual = arabicToRoman(numeral)
      expect(actual).toBe(expected)

      numeral = 1666
      expected = 'MDCLXVI'
      actual = arabicToRoman(numeral)
      expect(actual).toBe(expected)
    })

    it('with preceding smaller characters', () => {
      let numeral
      let expected
      let actual

      numeral = 9
      expected = 'IX'
      actual = arabicToRoman(numeral)
      expect(actual).toBe(expected)
    })

    it('with compound structure', () => {
      let numeral
      let expected
      let actual

      numeral = 29
      expected = 'XXIX'
      actual = arabicToRoman(numeral)
      expect(actual).toBe(expected)

      numeral = 39
      expected = 'XXXIX'
      actual = arabicToRoman(numeral)
      expect(actual).toBe(expected)

      numeral = 1994
      expected = 'MCMXCIV'
      actual = arabicToRoman(numeral)
      expect(actual).toBe(expected)
    })

    // TODO - this might not be necessary
    // it('in simple form', () => {
    //   let numeral
    //   let expected
    //   let actual

    //   numeral = 10
    //   expected = 'M'
    //   actual = arabicToRoman(numeral)
    //   expect(actual).toBe(expected)
    // })
  })

  describe('throws an error', () => {
    it('when the input number is negative', () => {
      let numeral = -199
      expect(() => arabicToRoman(numeral)).toThrow(notValidError)
    })

    // TODO - Maybe do this? I dunno
    // it('when the input is higher than 3999', () => {
    //   let numeral = 4000
    //   expect(() => arabicToRoman(numeral)).toThrow(notValidError)
    // })

    it('when the input is not a number', () => {
      let numeral = 'Invalid AF'
      expect(() => arabicToRoman(numeral)).toThrow(notValidError)
    })
  })
})

describe('groupInDecimals', () => {
  it('converts an arabic numeral into roman numeral groups', () => {
    let numeral
    let expected
    let actual

    numeral = 1
    expected = { 1: 1 }
    actual = groupInDecimals(numeral)
    expect(actual).toEqual(expected)

    numeral = 5
    expected = { 1: 5 }
    actual = groupInDecimals(numeral)
    expect(actual).toEqual(expected)

    numeral = 10
    expected = { 10: 1 }
    actual = groupInDecimals(numeral)
    expect(actual).toEqual(expected)

    numeral = 50
    expected = { 10: 5 }
    actual = groupInDecimals(numeral)
    expect(actual).toEqual(expected)

    numeral = 100
    expected = { 100: 1 }
    actual = groupInDecimals(numeral)
    expect(actual).toEqual(expected)

    numeral = 500
    expected = { 100: 5 }
    actual = groupInDecimals(numeral)
    expect(actual).toEqual(expected)

    numeral = 1000
    expected = { 1000: 1 }
    actual = groupInDecimals(numeral)
    expect(actual).toEqual(expected)

    numeral = 17
    expected = { 10: 1, 1: 7 }
    actual = groupInDecimals(numeral)
    expect(actual).toEqual(expected)

    // MMMCMXCIX
    numeral = 3999
    expected = { 1000: 3, 100: 9, 10: 9, 1: 9 }
    actual = groupInDecimals(numeral)
    expect(actual).toEqual(expected)
  })
})

describe('convertToRoman', () => {
  it('returns a roman numeral', () => {
    let decimalValue
    let valueCount
    let expected
    let actual

    decimalValue = 1
    valueCount = 1
    expected = 'I'
    actual = convertToRoman(decimalValue, valueCount)
    expect(actual).toBe(expected)

    decimalValue = 100
    valueCount = 1
    expected = 'C'
    actual = convertToRoman(decimalValue, valueCount)
    expect(actual).toBe(expected)

    decimalValue = 10
    valueCount = 2
    expected = 'XX'
    actual = convertToRoman(decimalValue, valueCount)
    expect(actual).toBe(expected)

    decimalValue = 100
    valueCount = 3
    expected = 'CCC'
    actual = convertToRoman(decimalValue, valueCount)
    expect(actual).toBe(expected)

    decimalValue = 1000
    valueCount = 3
    expected = 'MMM'
    actual = convertToRoman(decimalValue, valueCount)
    expect(actual).toBe(expected)

    decimalValue = 100
    valueCount = 4
    expected = 'CD'
    actual = convertToRoman(decimalValue, valueCount)
    expect(actual).toBe(expected)

    decimalValue = 1
    valueCount = 4
    expected = 'IV'
    actual = convertToRoman(decimalValue, valueCount)
    expect(actual).toBe(expected)

    decimalValue = 100
    valueCount = 5
    expected = 'D'
    actual = convertToRoman(decimalValue, valueCount)
    expect(actual).toBe(expected)

    decimalValue = 10
    valueCount = 5
    expected = 'L'
    actual = convertToRoman(decimalValue, valueCount)
    expect(actual).toBe(expected)

    decimalValue = 10
    valueCount = 6
    expected = 'LX'
    actual = convertToRoman(decimalValue, valueCount)
    expect(actual).toBe(expected)

    decimalValue = 1
    valueCount = 7
    expected = 'VII'
    actual = convertToRoman(decimalValue, valueCount)
    expect(actual).toBe(expected)

    decimalValue = 100
    valueCount = 8
    expected = 'DCCC'
    actual = convertToRoman(decimalValue, valueCount)
    expect(actual).toBe(expected)

    decimalValue = 10
    valueCount = 8
    expected = 'LXXX'
    actual = convertToRoman(decimalValue, valueCount)
    expect(actual).toBe(expected)

    decimalValue = 10
    valueCount = 9
    expected = 'XC'
    actual = convertToRoman(decimalValue, valueCount)
    expect(actual).toBe(expected)

    decimalValue = 100
    valueCount = 9
    expected = 'CM'
    actual = convertToRoman(decimalValue, valueCount)
    expect(actual).toBe(expected)
  })
})
