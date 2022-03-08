import {adjustedHTMLString} from './html'

describe('tocco-util', () => {
  describe('html', () => {
    describe('adjustedHTMLString', () => {
      test('should remove &spy', () => {
        expect(adjustedHTMLString('&shy;test&shy;string&shy;&shy;')).to.eql('teststring')
      })
    })
  })
})
