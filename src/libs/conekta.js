export const initConekta = (conekta_key) => {
  window['Conekta'].setPublicKey(conekta_key)
}

export const getCardBrand = (cardNumber) => {
  return window['Conekta'].card.getBrand(cardNumber)
}

export const validateCardNumber = (cardNumber) => {
  return window['Conekta'].card.validateNumber(cardNumber)
}

export const validateCvc = (cvc) => {
  return window['Conekta'].card.validateCVC(cvc)
}

export const validateExpirationDate = (expiryMonth, expiryYear) => {
  let year = new Date().getFullYear().toString()
  return window['Conekta'].card.validateExpirationDate(expiryMonth, `${year.substring(0,2)}${expiryYear}`)
}

export const tokenize = (number, name, exp_month, exp_year, cvc) => {
  return new Promise((resolve, reject) => {
    const tokenParams = {
      card: {
        number,
        name,
        exp_year,
        exp_month,
        cvc
      }
    }
    window['Conekta'].Token.create(tokenParams, resolve, reject)
  });
}