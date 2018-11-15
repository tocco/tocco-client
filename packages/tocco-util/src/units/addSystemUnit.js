import _round from 'lodash/round'

export const addSystemUnit = value => {
  const ranges = [
    {base: 15, symbol: 'P'},
    {base: 12, symbol: 'T'},
    {base: 9, symbol: 'G'},
    {base: 6, symbol: 'M'},
    {base: 3, symbol: 'k'},
    {base: 0, symbol: ''}
  ]
  const log10 = Math.log10(value)
  const range = ranges.find(range => log10 >= range['base'])
  return `${_round(value / 10 ** range['base'])}${range['symbol']}`
}
