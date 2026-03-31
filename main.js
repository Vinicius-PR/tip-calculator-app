const billValue = document.getElementById('bill')
const numberOfPeople = document.getElementById('people')

billValue.addEventListener('input', () => {
  billValue.value = billValue.value
    .replace(',', '.')
    .replace(/[^0-9.]/g, '')
    .replace(/(\..*?)\..*/g, '$1')
    .replace(/(\.\d{2}).+/, '$1')
})

numberOfPeople.addEventListener('input', () => {
  numberOfPeople.value = numberOfPeople.value
    .replace(/[^0-9.]/g, '')
    .replace(/\./g, '')
})