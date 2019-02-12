import {condenseNumber} from './condenseNumber'

describe('tocco-util', () => {
  describe('units', () => {
    describe('condenseNumber', () => {
      test('shorten numbers correctly', () => {
        const scenarios = [
          [0, '0'],
          [1, '1'],
          [999, '999'],
          [1000, '1k'],
          [12345, '12k'],
          [123456, '123k'],
          [999499, '999k'],
          [999500, '1M'],
          [12345678, '12M'],
          [123456789, '123M'],
          [999499000, '999M'],
          [999500000, '1G'],
          [1234567890, '1G'],
          [12345678901, '12G'],
          [123456789012, '123G'],
          [999499000000, '999G'],
          [999500000000, '1T'],
          [1234567890123, '1T'],
          [12345678901234, '12T'],
          [123456789012345, '123T'],
          [999499000000000, '999T'],
          [999500000000000, '1P'],
          [1234567890123456, '1P'],
          [12345678901234567, '12P'],
          [123456789012345678, '123P'],
          [1234567890123456789, '1235P'],
          [12345678901234567890, '12346P']
        ]
        scenarios.map(scenario => condenseNumber(scenario[0]))
        scenarios.map(scenario => expect(condenseNumber(scenario[0])).to.equal(scenario[1]))
      })
    })
  })
})
