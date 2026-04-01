const billInput = document.getElementById('bill')
const numberOfPeopleInput = document.getElementById('people')

const tipSelectors = document.querySelector('.tip-selector')
const buttons = tipSelectors.querySelectorAll('button')
const customPercentageInput = document.getElementById('custom-percentage')

const resultTip = document.querySelector('.result-tip')
const resultTotalPerPerson = document.querySelector('.result-total-per-person')
const resetBtn = document.querySelector('.reset-btn')

const errorSpanBill = document.querySelector('.error-span-bill')
const errorSpanNumPeople = document.querySelector('.error-span-num')


let billValue = ''
let numberOfPeople = ''
let percentageValue = ''

const results = {
  tipPerPerson: 0,
  totalPerPerson: 0
}

function cleanErrors() {
  errorSpanBill.classList.remove('error')
  errorSpanNumPeople.classList.remove('error')
  numberOfPeopleInput.classList.remove('error')
  billInput.classList.remove('error')
}

function calculateTipAndTotal(bill, percentage, numberOfPeople) {
  resetBtn.disabled = false
  if (bill == 0) {
    errorSpanBill.classList.add('error')
    billInput.classList.add('error')
  }

  if (numberOfPeople == 0) {
    errorSpanNumPeople.classList.add('error')
    numberOfPeopleInput.classList.add('error')
  }

  if (bill == 0 || numberOfPeople == 0) {
    results.tipPerPerson = 0
    results.totalPerPerson = 0
    return
  }

  const tip = ((bill * (percentage / 100)) / numberOfPeople)
  const totalPerPerson = (bill / numberOfPeople) + tip
  results.tipPerPerson = tip.toFixed(2)
  results.totalPerPerson = totalPerPerson.toFixed(2)
}

function updateUI(tip, totalPerPerson) {
  resultTip.innerHTML = `$${tip}`
  resultTotalPerPerson.innerHTML = `$${totalPerPerson}`
}

function runCalculationAndUpdate(billValue, percentageValue, numberOfPeople) {
  if (billInput.value === '' || numberOfPeopleInput.value === '' || percentageValue === '') return
  calculateTipAndTotal(billValue, percentageValue, numberOfPeople)
  updateUI(results.tipPerPerson, results.totalPerPerson)
}

billInput.addEventListener('input', () => {
  cleanErrors()
  billInput.value = billInput.value
    .replace(',', '.')
    .replace(/[^0-9.]/g, '')
    .replace(/(\..*?)\..*/g, '$1')
    .replace(/(\.\d{2}).+/, '$1')
  billValue = billInput.value
  runCalculationAndUpdate(billValue, percentageValue, numberOfPeople)
})

numberOfPeopleInput.addEventListener('input', () => {
  cleanErrors()
  numberOfPeopleInput.value = numberOfPeopleInput.value
    .replace(/[^0-9.]/g, '')
    .replace(/\./g, '')
  numberOfPeople = numberOfPeopleInput.value
  runCalculationAndUpdate(billValue, percentageValue, numberOfPeople)
})

customPercentageInput.addEventListener('input', () => {
  buttons.forEach(btn => btn.classList.remove('active'))
  customPercentageInput.value = customPercentageInput.value
    .replace(',', '.')
    .replace(/[^0-9.]/g, '')
    .replace(/(\..*?)\..*/g, '$1')
    .replace(/(\.\d{2}).+/, '$1')
  percentageValue = customPercentageInput.value
  runCalculationAndUpdate(billValue, percentageValue, numberOfPeople)
})

tipSelectors.addEventListener('click', (event) => {
  const button = event.target.closest('button')
  if (!button) return

  customPercentageInput.value = ''
  buttons.forEach(btn => btn.classList.remove('active'))
  button.classList.add('active')
  percentageValue = button.dataset.tip

  runCalculationAndUpdate(billValue, percentageValue, numberOfPeople)
})

resetBtn.addEventListener('click', () => {
  billInput.value = ''
  numberOfPeopleInput.value = ''
  customPercentageInput.value = ''
  resultTip.innerHTML = '$--.--'
  resultTotalPerPerson.innerHTML = '$--.--'
  resetBtn.disabled = true
  cleanErrors()
  buttons.forEach(btn => btn.classList.remove('active'))
})