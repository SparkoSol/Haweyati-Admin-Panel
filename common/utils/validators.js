export function required(value) {
  return !!value || 'Enter a Value'
}
export const priceWZ = (value) =>
  +value > 0 || 'You have entered an invalid number'

export function requiredSelect(value) {
  return value.length !== 0 || 'Select an Option'
}

export function lengthValidator(value) {
  return value.length >= 8 || 'Enter at least 8 characters'
}

export function emailValidator(value) {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
  const matches = regex.exec(value)
  return !!matches || 'Enter valid email'
}

export function phoneValidator(value) {
  if (value !== undefined) {
    return (value.length >= 12 && value.length <= 15) || 'Enter valid phone'
  } else {
    return 'Enter valid phone'
  }
}

export function yearValidator(value) {
  return value <= new Date().getFullYear() || 'Enter Valid Year'
}
