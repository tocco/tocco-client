import {addParameterToURL} from './download'

describe('tocco-util', () => {
  describe('download', () => {
    describe('addParameterToURL', () => {
      test('should add query parameter if there are none', () => {
        const result = addParameterToURL('http://www.tocco.ch', 'test', true)
        expect(result).to.eql('http://www.tocco.ch?test=true')
      })

      test('should append query parameter', () => {
        const result = addParameterToURL('http://www.tocco.ch?test=true', 'test2', 'asd')
        expect(result).to.eql('http://www.tocco.ch?test=true&test2=asd')
      })
    })
  })
})
