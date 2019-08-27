import _round from 'lodash/round'

export const condenseNumber = value => {
  const ranges = [
    {base: 0, symbol: ''},
    {base: 3, symbol: 'k'},
    {base: 6, symbol: 'M'},
    {base: 9, symbol: 'G'},
    {base: 12, symbol: 'T'},
    {base: 15, symbol: 'P'}
  ]

  const index = ranges.findIndex(range =>
    _round(value / 10 ** range.base) < 1000)

  const range = index >= 0
    ? ranges[index]
    : ranges[ranges.length - 1]

  return `${_round(value / 10 ** range.base)}${range.symbol}`
}
