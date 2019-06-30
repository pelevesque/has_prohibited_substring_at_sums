'use strict'

const sumDigits = require('@pelevesque/sum-digits')

const isObjectEmpty = (obj) =>
  Object.entries(obj).length === 0 && obj.constructor === Object

module.exports = (str, prohibitedSubstrings,
  {
    substringsToDigits = null,
    sumPlainDigits = true,
    allowSubstringBleeding = false
  } = {}
) => {
  if (isObjectEmpty(prohibitedSubstrings) || str === '') return false
  let hasProhibitedSubstring = false
  for (let i = 0, len = str.length; i < len; i++) {
    const sum = sumDigits(str.substr(0, i + 1), {
      substringsToDigits: substringsToDigits,
      sumPlainDigits: sumPlainDigits
    })
    if (prohibitedSubstrings.hasOwnProperty(sum)) {
      let substring = prohibitedSubstrings[sum]
      if (allowSubstringBleeding) {
        const substringMaxLength = str.length - i - 1
        if (substring.length > substringMaxLength) {
          substring = substring.substr(0, substringMaxLength)
        }
      }
      const target = str.substr(i + 1, substring.length)
      if (substring.localeCompare(target) === 0) {
        hasProhibitedSubstring = true
        break
      } else {
        delete prohibitedSubstrings[sum]
      }
    }
  }
  return hasProhibitedSubstring
}
