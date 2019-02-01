import {getPopUpFeatures} from './popUp'

describe('sso-login', () => {
  describe('utils', () => {
    describe('popUp', () => {
      describe('getPopUpFeatures', () => {
        test('should return a string', () => {
          const features = getPopUpFeatures(450, 400)
          expect(typeof features).to.eql('string')
          expect(features).to.contain('width=400')
          expect(features).to.contain('height=450')
        })
      })
    })
  })
})
