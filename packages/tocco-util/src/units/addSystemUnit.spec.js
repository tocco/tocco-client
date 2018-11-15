import {addSystemUnit} from './addSystemUnit'

describe('tocco-util', () => {
  describe('units', () => {
    describe('addSystemUnit', () => {
      test('shorten numbers correctly', () => {
        const scenarios = [
          [1, '1'],
          [12, '12'],
          [123, '123'],
          [1234, '1k'],
          [12345, '12k'],
          [123456, '123k'],
          [1234567, '1M'],
          [12345678, '12M'],
          [123456789, '123M'],
          [1234567890, '1G'],
          [12345678901, '12G'],
          [123456789012, '123G'],
          [1234567890123, '1T'],
          [12345678901234, '12T'],
          [123456789012345, '123T'],
          [1234567890123456, '1P'],
          [12345678901234567, '12P'],
          [123456789012345678, '123P'],
          [1234567890123456789, '1235P'],
          [12345678901234567890, '12346P']
        ]
        scenarios.map(scenario => expect(addSystemUnit(scenario[0])).to.equal(scenario[1]))
      })
    })
  })
})
