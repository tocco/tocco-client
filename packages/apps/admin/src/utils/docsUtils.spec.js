import {getDocsUrl} from './docsUtils'

describe('admin', () => {
  describe('utils', () => {
    describe('docsUtils', () => {
      describe('getDocsUrl', () => {
        test('should handle 2.29', () => {
          const url = getDocsUrl('2.29')

          expect(url).to.equal('https://229.docs.tocco.ch/')
        })

        test('should handle 3.0', () => {
          const url = getDocsUrl('3.0')

          expect(url).to.equal('https://300.docs.tocco.ch/')
        })

        test('should handle 3.1', () => {
          const url = getDocsUrl('3.1')

          expect(url).to.equal('https://301.docs.tocco.ch/')
        })

        test('should handle 3.10', () => {
          const url = getDocsUrl('3.10')

          expect(url).to.equal('https://310.docs.tocco.ch/')
        })
      })
    })
  })
})
