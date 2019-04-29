import arabicToRoman from '../src/arabicToRoman'
import romanToArabic from '../src/romanToArabic'

const arabicInputId = 'arabicInput'
const romanInputId = 'romanInput'

const getArabicInput = () => document.getElementById(arabicInputId)
const getRomanInput = () => document.getElementById(romanInputId)

function handleConversion ({ target }) {
  if (target.value.length === 0) return clearInputs()

  try {
    if (target.id === romanInputId) {
      const uppercaseValue = target.value.toUpperCase()

      getRomanInput().value = uppercaseValue
      getArabicInput().value = romanToArabic(uppercaseValue)
    } else {
      getRomanInput().value = arabicToRoman(target.value)
    }
  } catch (error) {
    console.error(error)

    document.querySelector('.error').textContent = error
  }
}

function handleKeyUp ({ key }) {
  if (key === 'Escape') {
    clearInputs()
  }
}

function clearInputs () {
  getRomanInput().value = ''
  getArabicInput().value = ''
  document.querySelector('.error').textContent = ''
}

function domReady (fn) {
  // DOM isn't ready yet
  document.addEventListener('DOMContentLoaded', fn)

  // DOM is ready, fire callback
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    fn()
  }
}

function init () {
  const clearButton = document.getElementById('clearButton')

  clearButton.addEventListener('click', clearInputs)

  document.addEventListener('keyup', handleKeyUp)
  getRomanInput().addEventListener('keyup', handleConversion)
  getArabicInput().addEventListener('keyup', handleConversion)
}

domReady(init)
