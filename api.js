const currencyConverterEndPoint = "https://api.frankfurter.app"

export const fetchCurrencyLatest = async() =>  {
  return await fetch(`${currencyConverterEndPoint}/latest`)
    .then(response => response.json())
    .then(data => Object.keys(data.rates))
}

export const convertCurrencyAPI = async (amount, sourceCurrency, targetCurrency) => {
  return await fetch(`${currencyConverterEndPoint}/latest?amount=${amount}&from=${sourceCurrency}&to=${targetCurrency}`)
    .then(response => response.json())
}
