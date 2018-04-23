import {hexToRgb} from './hexToRgb'

const shortBlack = '#00'
const blackRgb = {r: 0, g: 0, b: 0}

const color2Hex = '#1EA959'
const color2Rgb = {r: 30, g: 169, b: 89}

describe('tocco-util', () => {
  describe('color', () => {
    describe('hexToRgb', () => {
      it('should convert a color with r, g and b value', () => {
        expect(hexToRgb(color2Hex)).to.eql(color2Rgb)
      })

      it('should handle short form of colors', () => {
        expect(hexToRgb(shortBlack)).to.eql(blackRgb)
      })

      it('should handle absent hashtag', () => {
        expect(hexToRgb(color2Hex.replace('#', ''))).to.eql(color2Rgb)
      })

      it('should return fallback if no valid hex is given', () => {
        expect(hexToRgb('noValidHex', color2Rgb)).to.eql(color2Rgb)
      })

      it('should return fallback if undefined hex color is given', () => {
        expect(hexToRgb(undefined, color2Rgb)).to.eql(color2Rgb)
      })
    })
  })
})
