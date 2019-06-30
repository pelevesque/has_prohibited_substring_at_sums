[![Build Status](https://travis-ci.org/pelevesque/has_prohibited_substring_at_sums.svg?branch=master)](https://travis-ci.org/pelevesque/has_prohibited_substring_at_sums)
[![Coverage Status](https://coveralls.io/repos/github/pelevesque/has_prohibited_substring_at_sums/badge.svg?branch=master)](https://coveralls.io/github/pelevesque/has_prohibited_substring_at_sums?branch=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# has_prohibited_substring_at_sums

Checks if a string has a prohibited substring after given sums.

## Node Repository

https://www.npmjs.com/package/@pelevesque/has_prohibited_substring_at_sums

## Installation

`npm install @pelevesque/has_prohibited_substring_at_sums`

## Tests

### Standard Style & Unit Tests

`npm test`

### Unit Tests & Coverage

`npm run cover`

## Usage

### Parameters

```js
str                  (required)
prohibitedSubstrings (required)
options              (optional) default = { substringsToDigits = null, sumPlainDigits = true,  allowSubstringBleeding = false }
```

### Requiring

```js
const hasProhibitedSubstringAtSums = require('@pelevesque/has_prohibited_substring_at_sums')
```

### Basic Usage

@see https://github.com/pelevesque/sum-digits to understand how the sum is calculated.

`prohibitedSubstrings` is an object of sum -> substring pairs. `true` is returned
if at least one substring is found directly following its associated sums.

```js
const str = '123a45'
const prohibitedSubstrings = { 1: 'a' }
const result = hasProhibitedSubstringAtSums(str, prohibitedSubstrings)
// result === false
```

```js
const str = '123a45'
const prohibitedSubstrings = { 6: 'a' }
const result = hasProhibitedSubstringAtSums(str, prohibitedSubstrings)
// result === true
```

```js
// only one substring needs to match
const str = '123man45dinosaur'
const prohibitedSubstrings = { 6: 'man', 150: 'dinosaur' }
const result = hasProhibitedSubstringAtSums(str, prohibitedSubstrings)
// result === true
```

```js
// the substring must come directly after the sum (here b is directly after the sum, not a)
const str = '123ba45'
const prohibitedSubstrings = { 6: 'a' }
const result = hasProhibitedSubstringAtSums(str, prohibitedSubstrings)
// result === false
```

### SubstringsToDigits

You can use the `substringsToDigits` object to give numeric values to substrings
so that they are counted during summing.

```js
const str = '123!$$$a'
const prohibitedSubstrings = { 15: 'a' }
const substringsToDigits = { '!': 4, '$$$': 5 }
const result = hasProhibitedSubstringAtSums(str, prohibitedSubstrings, {
  substringsToDigits: substringsToDigits
})
// result === true
```

### SumPlainDigits Flag

You can set the `sumPlainDigits` flag to false if you only want to sum
`substringsToDigits`.

In the following example, `1`, `2`, and `3` are not summed.

```js
const str = '123!a'
const prohibitedSubstrings = { 4: 'a' }
const substringsToDigits = { '!': 4 }
const sumPlainDigits = false
const result = hasProhibitedSubstringAtSums(str, prohibitedSubstrings, {
  substringsToDigits: substringsToDigits,
  sumPlainDigits: sumPlainDigits
})
// result === true
```

### AllowSubstringBleeding Flag

The `allowSubstringBleeding` flag is `false` by default. It it used when you want
to allow the last substring to be incomplete if the string is too short.
In the following example, the last substring `canal` starts after the right sum,
but remains incomplete since the string ends. Normally this would return `false`.
With `allowSubstringBleeding` set to `true`, it returns `true`.

```js
const str = '123can'
const prohibitedSubstrings = { 6: 'canal' }
const allowSubstringBleeding = true
const result = hasProhibitedSubstringAtSums(str, prohibitedSubstrings, {
  allowSubstringBleeding: allowSubstringBleeding
})
// result === true
```
