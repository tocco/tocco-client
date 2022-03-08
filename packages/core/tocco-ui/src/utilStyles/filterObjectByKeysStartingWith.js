import _pickBy from 'lodash/pickBy'

/**
 * Return each key-value-pair if the key starts with one of the identifiers.
 * By default no key-value-pair get forwarded.
 *
 * May use {...filterObjectByKeysStartingWith(props, ['data-', 'aria-'])} in
 * JSX to forward all data and aria attributes.
 *
 * @param  {object} props       Pass in React props
 * @param  {array} identifier   Define which key/value pairs are returned
 * @return {object}             Filtered props
 */

const filterObjectByKeysStartingWith = (props = {}, identifiers = []) =>
  _pickBy(props, (value, key) => identifiers.some(identifier => key.startsWith(identifier)))

export default filterObjectByKeysStartingWith
