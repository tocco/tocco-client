import {getDownloadUrl} from './View'

describe('tocco-ui', () => {
  describe('Upload', () => {
    describe('Viev', () => {
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
})
