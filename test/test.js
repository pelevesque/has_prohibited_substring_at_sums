/* global describe, it */
'use strict'

const expect = require('chai').expect
const hasProhibitedSubstringAtSums = require('../index')

describe('#hasProhibitedSubstringAtSums()', () => {
  describe('value check', () => {
    it('should return false when prohibitedSubstrings is an empty object', () => {
      const str = '1a2b3c'
      const prohibitedSubstrings = {}
      const result = hasProhibitedSubstringAtSums(str, prohibitedSubstrings)
      const expected = false
      expect(result).to.equal(expected)
    })

    it('should return false when str is empty, but prohibitedSubstrings is not empty', () => {
      const str = ''
      const prohibitedSubstrings = { 0: 'a' }
      const result = hasProhibitedSubstringAtSums(str, prohibitedSubstrings)
      const expected = false
      expect(result).to.equal(expected)
    })
  })

  describe('basic summing', () => {
    describe('single character substrings', () => {
      it('should return false when one of one substring is not found', () => {
        const str = '123a45'
        const prohibitedSubstrings = { 1: 'a' }
        const result = hasProhibitedSubstringAtSums(str, prohibitedSubstrings)
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return false when the substring is not immediately after sum', () => {
        const str = '123za5'
        const prohibitedSubstrings = { 6: 'a' }
        const result = hasProhibitedSubstringAtSums(str, prohibitedSubstrings)
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return true when one of one substring is found', () => {
        const str = '123a45'
        const prohibitedSubstrings = { 6: 'a' }
        const result = hasProhibitedSubstringAtSums(str, prohibitedSubstrings)
        const expected = true
        expect(result).to.equal(expected)
      })

      it('should return false when none of many substrings is found', () => {
        const str = '12a34b5c'
        const prohibitedSubstrings = { 0: 'a', 2: 'b', 4: 'c' }
        const result = hasProhibitedSubstringAtSums(str, prohibitedSubstrings)
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return true when at least one substring is found', () => {
        const str = '1a2b3c45'
        const prohibitedSubstrings = { 10: 'a', 3: 'b', 12: 'c' }
        const result = hasProhibitedSubstringAtSums(str, prohibitedSubstrings)
        const expected = true
        expect(result).to.equal(expected)
      })

      it('should return true when all of many substrings are found', () => {
        const str = '1a2b3c45'
        const prohibitedSubstrings = { 1: 'a', 3: 'b', 6: 'c' }
        const result = hasProhibitedSubstringAtSums(str, prohibitedSubstrings)
        const expected = true
        expect(result).to.equal(expected)
      })
    })

    describe('multi character substrings', () => {
      it('should return false when one of one substring is not found', () => {
        const str = '123abc45'
        const prohibitedSubstrings = { 1: 'abc' }
        const result = hasProhibitedSubstringAtSums(str, prohibitedSubstrings)
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return false when the substring is not immediately after sum', () => {
        const str = '123zabc5'
        const prohibitedSubstrings = { 6: 'abc' }
        const result = hasProhibitedSubstringAtSums(str, prohibitedSubstrings)
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return true when one of one substring is found', () => {
        const str = '123abc45'
        const prohibitedSubstrings = { 6: 'abc' }
        const result = hasProhibitedSubstringAtSums(str, prohibitedSubstrings)
        const expected = true
        expect(result).to.equal(expected)
      })

      it('should return false when none of many substrings is found', () => {
        const str = '12abc34bcd5cde'
        const prohibitedSubstrings = { 0: 'abc', 2: 'bcd', 4: 'cde' }
        const result = hasProhibitedSubstringAtSums(str, prohibitedSubstrings)
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return true when at least one substring is found', () => {
        const str = '1abc2bcd3cde45'
        const prohibitedSubstrings = { 10: 'abc', 3: 'bcd', 12: 'cde' }
        const result = hasProhibitedSubstringAtSums(str, prohibitedSubstrings)
        const expected = true
        expect(result).to.equal(expected)
      })

      it('should return true when all of many substrings are found', () => {
        const str = '1abc2bcd3cde45'
        const prohibitedSubstrings = { 1: 'abc', 3: 'bcd', 6: 'cde' }
        const result = hasProhibitedSubstringAtSums(str, prohibitedSubstrings)
        const expected = true
        expect(result).to.equal(expected)
      })
    })

    describe('allowSubstringBleeding flag', () => {
      it('should not allow bleeding when set to false', () => {
        const str = '123ma'
        const prohibitedSubstrings = { 6: 'man' }
        const allowSubstringBleeding = false
        const result = hasProhibitedSubstringAtSums(str, prohibitedSubstrings, {
          allowSubstringBleeding: allowSubstringBleeding
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should allow bleeding when set to true', () => {
        const str = '123ma'
        const prohibitedSubstrings = { 6: 'man' }
        const allowSubstringBleeding = true
        const result = hasProhibitedSubstringAtSums(str, prohibitedSubstrings, {
          allowSubstringBleeding: allowSubstringBleeding
        })
        const expected = true
        expect(result).to.equal(expected)
      })
    })
  })

  describe('substringsToDigits summing', () => {
    describe('single character substrings', () => {
      it('should return false when one of one substring is not found', () => {
        const str = '1!a'
        const prohibitedSubstrings = { 1: 'a' }
        const substringsToDigits = { '!': 2 }
        const result = hasProhibitedSubstringAtSums(str, prohibitedSubstrings, {
          substringsToDigits: substringsToDigits
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return false when the substring is not immediately after sum', () => {
        const str = '1!za'
        const prohibitedSubstrings = { 3: 'a' }
        const substringsToDigits = { '!': 2 }
        const result = hasProhibitedSubstringAtSums(str, prohibitedSubstrings, {
          substringsToDigits: substringsToDigits
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return true when one of one substring is found', () => {
        const str = '1!a'
        const prohibitedSubstrings = { 3: 'a' }
        const substringsToDigits = { '!': 2 }
        const result = hasProhibitedSubstringAtSums(str, prohibitedSubstrings, {
          substringsToDigits: substringsToDigits
        })
        const expected = true
        expect(result).to.equal(expected)
      })

      it('should return false when none of many substrings is found', () => {
        const str = '1!a2!b3!c'
        const prohibitedSubstrings = { 0: 'a', 2: 'b', 4: 'c' }
        const substringsToDigits = { '!': 2 }
        const result = hasProhibitedSubstringAtSums(str, prohibitedSubstrings, {
          substringsToDigits: substringsToDigits
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return true when at least one substring is found', () => {
        const str = '1!a2!b3!c'
        const prohibitedSubstrings = { 1: 'a', 7: 'b', 2: 'c' }
        const substringsToDigits = { '!': 2 }
        const result = hasProhibitedSubstringAtSums(str, prohibitedSubstrings, {
          substringsToDigits: substringsToDigits
        })
        const expected = true
        expect(result).to.equal(expected)
      })

      it('should return true when all of many substrings are found', () => {
        const str = '1!a2!b3!c'
        const prohibitedSubstrings = { 3: 'a', 7: 'b', 12: 'c' }
        const substringsToDigits = { '!': 2 }
        const result = hasProhibitedSubstringAtSums(str, prohibitedSubstrings, {
          substringsToDigits: substringsToDigits
        })
        const expected = true
        expect(result).to.equal(expected)
      })
    })

    describe('multi character substrings', () => {
      it('should return false when one of one substring is not found', () => {
        const str = '1!abc'
        const prohibitedSubstrings = { 1: 'abc' }
        const substringsToDigits = { '!': 2 }
        const result = hasProhibitedSubstringAtSums(str, prohibitedSubstrings, {
          substringsToDigits: substringsToDigits
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return false when the substring is not immediately after sum', () => {
        const str = '1!zabc'
        const prohibitedSubstrings = { 3: 'abc' }
        const substringsToDigits = { '!': 2 }
        const result = hasProhibitedSubstringAtSums(str, prohibitedSubstrings, {
          substringsToDigits: substringsToDigits
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return true when one of one substring is found', () => {
        const str = '1!abc'
        const prohibitedSubstrings = { 3: 'abc' }
        const substringsToDigits = { '!': 2 }
        const result = hasProhibitedSubstringAtSums(str, prohibitedSubstrings, {
          substringsToDigits: substringsToDigits
        })
        const expected = true
        expect(result).to.equal(expected)
      })

      it('should return false when none of many substrings is found', () => {
        const str = '1!abc2!bcd3!cde'
        const prohibitedSubstrings = { 0: 'abc', 2: 'bcd', 4: 'cde' }
        const substringsToDigits = { '!': 2 }
        const result = hasProhibitedSubstringAtSums(str, prohibitedSubstrings, {
          substringsToDigits: substringsToDigits
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return true when at least one substring is found', () => {
        const str = '1!abc2!bcd3!cde'
        const prohibitedSubstrings = { 1: 'abc', 7: 'bcd', 2: 'cde' }
        const substringsToDigits = { '!': 2 }
        const result = hasProhibitedSubstringAtSums(str, prohibitedSubstrings, {
          substringsToDigits: substringsToDigits
        })
        const expected = true
        expect(result).to.equal(expected)
      })

      it('should return true when all of many substrings are found', () => {
        const str = '1!abc2!bcd3!cde'
        const prohibitedSubstrings = { 3: 'abc', 7: 'bcd', 12: 'cde' }
        const substringsToDigits = { '!': 2 }
        const result = hasProhibitedSubstringAtSums(str, prohibitedSubstrings, {
          substringsToDigits: substringsToDigits
        })
        const expected = true
        expect(result).to.equal(expected)
      })
    })

    describe('allowSubstringBleeding flag', () => {
      it('should not allow bleeding when set to false', () => {
        const str = '123!ma'
        const prohibitedSubstrings = { 10: 'man' }
        const substringsToDigits = { '!': 4 }
        const allowSubstringBleeding = false
        const result = hasProhibitedSubstringAtSums(str, prohibitedSubstrings, {
          substringsToDigits: substringsToDigits,
          allowSubstringBleeding: allowSubstringBleeding
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should allow bleeding when set to true', () => {
        const str = '123!ma'
        const prohibitedSubstrings = { 10: 'man' }
        const substringsToDigits = { '!': 4 }
        const allowSubstringBleeding = true
        const result = hasProhibitedSubstringAtSums(str, prohibitedSubstrings, {
          substringsToDigits: substringsToDigits,
          allowSubstringBleeding: allowSubstringBleeding
        })
        const expected = true
        expect(result).to.equal(expected)
      })
    })
  })

  describe('sumPlainDigits flag', () => {
    describe('single character substrings', () => {
      it('should return false when one of one substring is not found', () => {
        const str = '1!a'
        const prohibitedSubstrings = { 1: 'a' }
        const substringsToDigits = { '!': 2 }
        const result = hasProhibitedSubstringAtSums(str, prohibitedSubstrings, {
          substringsToDigits: substringsToDigits,
          sumPlainDigits: false
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return false when the substring is not immediately after sum', () => {
        const str = '1!za'
        const prohibitedSubstrings = { 2: 'a' }
        const substringsToDigits = { '!': 2 }
        const result = hasProhibitedSubstringAtSums(str, prohibitedSubstrings, {
          substringsToDigits: substringsToDigits,
          sumPlainDigits: false
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return true when one of one substring is found', () => {
        const str = '1!a'
        const prohibitedSubstrings = { 2: 'a' }
        const substringsToDigits = { '!': 2 }
        const result = hasProhibitedSubstringAtSums(str, prohibitedSubstrings, {
          substringsToDigits: substringsToDigits,
          sumPlainDigits: false
        })
        const expected = true
        expect(result).to.equal(expected)
      })

      it('should return false when none of many substrings is found', () => {
        const str = '1!a2!b3!c'
        const prohibitedSubstrings = { 0: 'a', 2: 'b', 4: 'c' }
        const substringsToDigits = { '!': 2 }
        const result = hasProhibitedSubstringAtSums(str, prohibitedSubstrings, {
          substringsToDigits: substringsToDigits,
          sumPlainDigits: false
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return true when at least one substring is found', () => {
        const str = '1!a2!b3!c'
        const prohibitedSubstrings = { 1: 'a', 4: 'b', 2: 'c' }
        const substringsToDigits = { '!': 2 }
        const result = hasProhibitedSubstringAtSums(str, prohibitedSubstrings, {
          substringsToDigits: substringsToDigits,
          sumPlainDigits: false
        })
        const expected = true
        expect(result).to.equal(expected)
      })

      it('should return true when all of many substrings are found', () => {
        const str = '1!a2!b3!c'
        const prohibitedSubstrings = { 2: 'a', 4: 'b', 6: 'c' }
        const substringsToDigits = { '!': 2 }
        const result = hasProhibitedSubstringAtSums(str, prohibitedSubstrings, {
          substringsToDigits: substringsToDigits,
          sumPlainDigits: false
        })
        const expected = true
        expect(result).to.equal(expected)
      })
    })

    describe('multi character substrings', () => {
      it('should return false when one of one substring is not found', () => {
        const str = '1!abc'
        const prohibitedSubstrings = { 1: 'abc' }
        const substringsToDigits = { '!': 2 }
        const result = hasProhibitedSubstringAtSums(str, prohibitedSubstrings, {
          substringsToDigits: substringsToDigits,
          sumPlainDigits: false
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return false when the substring is not immediately after sum', () => {
        const str = '1!zabc'
        const prohibitedSubstrings = { 2: 'abc' }
        const substringsToDigits = { '!': 2 }
        const result = hasProhibitedSubstringAtSums(str, prohibitedSubstrings, {
          substringsToDigits: substringsToDigits,
          sumPlainDigits: false
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return true when one of one substring is found', () => {
        const str = '1!abc'
        const prohibitedSubstrings = { 2: 'abc' }
        const substringsToDigits = { '!': 2 }
        const result = hasProhibitedSubstringAtSums(str, prohibitedSubstrings, {
          substringsToDigits: substringsToDigits,
          sumPlainDigits: false
        })
        const expected = true
        expect(result).to.equal(expected)
      })

      it('should return false when none of many substrings is found', () => {
        const str = '1!abc2!bcd3!cde'
        const prohibitedSubstrings = { 0: 'abc', 2: 'bcd', 4: 'cde' }
        const substringsToDigits = { '!': 2 }
        const result = hasProhibitedSubstringAtSums(str, prohibitedSubstrings, {
          substringsToDigits: substringsToDigits,
          sumPlainDigits: false
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return true when at least one substring is found', () => {
        const str = '1!abc2!bcd3!cde'
        const prohibitedSubstrings = { 1: 'abc', 4: 'bcd', 2: 'cde' }
        const substringsToDigits = { '!': 2 }
        const result = hasProhibitedSubstringAtSums(str, prohibitedSubstrings, {
          substringsToDigits: substringsToDigits,
          sumPlainDigits: false
        })
        const expected = true
        expect(result).to.equal(expected)
      })

      it('should return true when all of many substrings are found', () => {
        const str = '1!abc2!bcd3!cde'
        const prohibitedSubstrings = { 2: 'abc', 4: 'bcd', 6: 'cde' }
        const substringsToDigits = { '!': 2 }
        const result = hasProhibitedSubstringAtSums(str, prohibitedSubstrings, {
          substringsToDigits: substringsToDigits,
          sumPlainDigits: false
        })
        const expected = true
        expect(result).to.equal(expected)
      })
    })

    describe('allowSubstringBleeding flag', () => {
      it('should not allow bleeding when set to false', () => {
        const str = '123!ma'
        const prohibitedSubstrings = { 4: 'man' }
        const substringsToDigits = { '!': 4 }
        const allowSubstringBleeding = false
        const result = hasProhibitedSubstringAtSums(str, prohibitedSubstrings, {
          substringsToDigits: substringsToDigits,
          sumPlainDigits: false,
          allowSubstringBleeding: allowSubstringBleeding
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should allow bleeding when set to true', () => {
        const str = '123!ma'
        const prohibitedSubstrings = { 4: 'man' }
        const substringsToDigits = { '!': 4 }
        const allowSubstringBleeding = true
        const result = hasProhibitedSubstringAtSums(str, prohibitedSubstrings, {
          substringsToDigits: substringsToDigits,
          sumPlainDigits: false,
          allowSubstringBleeding: allowSubstringBleeding
        })
        const expected = true
        expect(result).to.equal(expected)
      })
    })
  })
})
