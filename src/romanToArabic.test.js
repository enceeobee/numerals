import romanToArabic, { splitIntoGroups, sumCharGroup } from './romanToArabic'

const invalidRomanNumeral = 'invalid roman numeral'

describe('romanToArabic', () => {
  describe('should convert roman numerals to decimals', () => {
    it('when numerals are compound', () => {
      let numeral = 'XXIX'
      let expected = 29
      let actual = romanToArabic(numeral)
      expect(actual).toBe(expected)

      numeral = 'XXXIX'
      expected = 39
      actual = romanToArabic(numeral)
      expect(actual).toBe(expected)

      numeral = 'CCXLVI'
      expected = 246
      actual = romanToArabic(numeral)
      expect(actual).toBe(expected)

      numeral = 'MMCDXXI'
      expected = 2421
      actual = romanToArabic(numeral)
      expect(actual).toBe(expected)

      numeral = 'CLX'
      expected = 160
      actual = romanToArabic(numeral)
      expect(actual).toBe(expected)

      numeral = 'CCVII'
      expected = 207
      actual = romanToArabic(numeral)
      expect(actual).toBe(expected)

      numeral = 'MLXVI'
      expected = 1066
      actual = romanToArabic(numeral)
      expect(actual).toBe(expected)
    })

    it('when characters are mixed case', () => {
      let numeral = 'mdc'
      let expected = 1600
      let actual = romanToArabic(numeral)
      expect(actual).toBe(expected)

      numeral = 'MmIiI'
      expected = 2003
      actual = romanToArabic(numeral)
      expect(actual).toBe(expected)

      numeral = 'i'
      expected = 1
      actual = romanToArabic(numeral)
      expect(actual).toBe(expected)
    })

    it('when numeral is empty string', () => {
      const numeral = ''
      const expected = 0
      const actual = romanToArabic(numeral)

      expect(actual).toBe(expected)
    })
  })

  describe('should throw an error', () => {
    it('when the numeral does not exist', () => {
      let numeral = 'Z'
      expect(() => romanToArabic(numeral)).toThrow(invalidRomanNumeral)

      numeral = 'ZX'
      expect(() => romanToArabic(numeral)).toThrow(invalidRomanNumeral)
    })

    // TODO - when the sum is larger than 3999?

    // it('when a character repeats more than 3 times', () => {
    //   let numeral = 'iiii'
    //   expect(() => romanToArabic(numeral)).toThrow(invalidRomanNumeral)

    //   numeral = 'iiiiV'
    //   expect(() => romanToArabic(numeral)).toThrow(invalidRomanNumeral)
    // })

    // it('when a complex numeral can be represented by a simple numeral', () => {
    //   let numeral = 'DD'
    //   expect(() => romanToArabic(numeral)).toThrow(invalidRomanNumeral)

    //   numeral = 'VV'
    //   expect(() => romanToArabic(numeral)).toThrow(invalidRomanNumeral)

    //   numeral = 'DD'
    //   expect(() => romanToArabic(numeral)).toThrow(invalidRomanNumeral)

    //   numeral = 'XXL'
    //   expect(() => romanToArabic(numeral)).toThrow(invalidRomanNumeral)

    //   numeral = 'lxvv'
    //   expect(() => romanToArabic(numeral)).toThrow(invalidRomanNumeral)

    //   numeral = 'iiv'
    //   expect(() => romanToArabic(numeral)).toThrow(invalidRomanNumeral)
    // })

    // it('when numerals are incorrectly placed', () => {
    //   // we've hit a character that's smaller than the current sum (going right to left)
    //   // that char is 'V'
    //   let numeral = 'MDCLXVMDCLXVI'

    //   expect(() => romanToArabic(numeral)).toThrow(invalidRomanNumeral)
    // })
  })
})

describe('splitIntoGroups', () => {
  it('groups the same digits', () => {
    let numeral
    let expected
    let actual

    numeral = 'XX'
    expected = ['XX']
    actual = splitIntoGroups(numeral)
    expect(actual).toEqual(expected)
  })

  it('splits additive digits', () => {
    let numeral
    let expected
    let actual

    numeral = 'VI'
    expected = ['V', 'I']
    actual = splitIntoGroups(numeral)
    expect(actual).toEqual(expected)
  })

  it('splits subtractive groups', () => {
    let numeral
    let expected
    let actual

    numeral = 'IV'
    expected = ['IV']
    actual = splitIntoGroups(numeral)
    expect(actual).toEqual(expected)

    numeral = 'IIV'
    expected = ['IIV']
    actual = splitIntoGroups(numeral)
    expect(actual).toEqual(expected)
  })

  it('splits compound numerals', () => {
    let numeral
    let expected
    let actual

    numeral = 'XXIX'
    expected = ['XX', 'IX']
    actual = splitIntoGroups(numeral)
    expect(actual).toEqual(expected)

    numeral = 'XXXIX'
    expected = ['XXX', 'IX']
    actual = splitIntoGroups(numeral)
    expect(actual).toEqual(expected)

    numeral = 'CCXLVI'
    expected = ['CC', 'XL', 'V', 'I']
    actual = splitIntoGroups(numeral)
    expect(actual).toEqual(expected)

    numeral = 'MMCDXXI'
    expected = ['MM', 'CD', 'XX', 'I']
    actual = splitIntoGroups(numeral)
    expect(actual).toEqual(expected)

    numeral = 'CLX'
    expected = ['C', 'L', 'X']
    actual = splitIntoGroups(numeral)
    expect(actual).toEqual(expected)

    numeral = 'CCVII'
    expected = ['CC', 'V', 'II']
    actual = splitIntoGroups(numeral)
    expect(actual).toEqual(expected)

    numeral = 'MLXVI'
    expected = ['M', 'L', 'X', 'V', 'I']
    actual = splitIntoGroups(numeral)
    expect(actual).toEqual(expected)
  })
})

describe('sumCharGroup', () => {
  it('should handle single characters', () => {
    let numeral = 'I'
    let expected = 1
    let actual = romanToArabic(numeral)
    expect(actual).toBe(expected)

    numeral = 'V'
    expected = 5
    actual = romanToArabic(numeral)
    expect(actual).toBe(expected)

    numeral = 'X'
    expected = 10
    actual = romanToArabic(numeral)
    expect(actual).toBe(expected)

    numeral = 'L'
    expected = 50
    actual = romanToArabic(numeral)
    expect(actual).toBe(expected)

    numeral = 'C'
    expected = 100
    actual = romanToArabic(numeral)
    expect(actual).toBe(expected)

    numeral = 'M'
    expected = 1000
    actual = romanToArabic(numeral)
    expect(actual).toBe(expected)
  })

  it('should count consecutive numerals', () => {
    let numeral
    let expected
    let actual

    numeral = 'II'
    expected = 2
    actual = sumCharGroup(numeral)
    expect(actual).toBe(expected)

    numeral = 'III'
    expected = 3
    actual = sumCharGroup(numeral)
    expect(actual).toBe(expected)

    numeral = 'XX'
    expected = 20
    actual = sumCharGroup(numeral)
    expect(actual).toBe(expected)

    numeral = 'XXX'
    expected = 30
    actual = sumCharGroup(numeral)
    expect(actual).toBe(expected)
  })

  it('should count trailing smaller numerals', () => {
    let numeral = 'LX'
    let expected = 60
    let actual = sumCharGroup(numeral)
    expect(actual).toBe(expected)

    numeral = 'LXV'
    expected = 65
    actual = sumCharGroup(numeral)
    expect(actual).toBe(expected)

    numeral = 'LXVI'
    expected = 66
    actual = sumCharGroup(numeral)
    expect(actual).toBe(expected)
  })

  it('should count preceding smaller characters', () => {
    let numeral
    let expected
    let actual

    numeral = 'IX'
    expected = 9
    actual = sumCharGroup(numeral)
    expect(actual).toBe(expected)

    numeral = 'IIX'
    expected = 8
    actual = sumCharGroup(numeral)
    expect(actual).toBe(expected)

    numeral = 'XL'
    expected = 40
    actual = sumCharGroup(numeral)
    expect(actual).toBe(expected)

    numeral = 'IV'
    expected = 4
    actual = sumCharGroup(numeral)
    expect(actual).toBe(expected)

    numeral = 'VM'
    expected = 995
    actual = sumCharGroup(numeral)
    expect(actual).toBe(expected)
  })
})
