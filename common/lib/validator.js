/**
 * @file provides the utility functions for validating
 * Vuetify forms.
 *
 * @version 1.0.0
 * @author arish <arishsultan104@gmail.com>
 */

/**
 * @param {string} value
 * @returns {boolean|string}
 */
export const required = (value) => !!value || 'Please provide some value'

/**
 * @param {string} value
 * @returns {boolean|string}
 */
export const price = (value) =>
  +value > 0 || 'You have entered an invalid price'

/**
 * @param {string} value
 * @returns {boolean|string}
 */
export const priceWZ = (value) =>
  +value > 0 || 'You have entered an invalid number'

export const rentHelper = (value) =>
  +value >= 0 || 'You have entered an invalid number'

/**
 * @param {string} value
 * @returns {boolean|string}
 */
export const priceDM = (value) =>
  +value <= 999999 || 'Price provided is too high'

/**
 * @param {string} value
 * @returns {boolean|string}
 */
export const priceRules = [required, price, priceDM]

export const city = (v, list) => {
  let count = 0
  for (const item of list) {
    if (item.city === v) {
      count++
    }
  }

  return count > 1 ? 'City is already selected.' : true
}
