import {addParameterToURL, getDownloadUrl} from './download'

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
    describe('getDownloadUrl', () => {
      test('should add download param to url without query params', () => {
        const result = getDownloadUrl('https://tocco.ch/files/test.pdf')
        expect(result).to.eql('https://tocco.ch/files/test.pdf?download=true')
      })

      test('should add download param to url with query params', () => {
        const result = getDownloadUrl('www.tocco.ch/245df43d/test.pdf?yc=a234ms')
        expect(result).to.eql('www.tocco.ch/245df43d/test.pdf?yc=a234ms&download=true')
      })
    })
  })
})
