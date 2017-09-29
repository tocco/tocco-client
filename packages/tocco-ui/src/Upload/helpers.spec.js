import { bytesToSize } from './helpers'

describe('tocco-ui', () => {
  describe('Upload', () => {
    describe('helpers', () => {
      describe('bytesToSize', () => {
        it('should return a formatted string for various byte sizes', () => {
          expect(bytesToSize(2)).to.eql('2 Bytes')
          expect(bytesToSize(22323)).to.eql('21.8 KB')
          expect(bytesToSize(1000000)).to.eql('976.56 KB')
          expect(bytesToSize(1110000)).to.eql('1.06 MB')
          expect(bytesToSize(1111111)).to.eql('1.06 MB')
        })
      })
    })
  })
})
