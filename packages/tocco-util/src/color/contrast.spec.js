import {getContrastColor} from './contrast'

const white = {r: 255, g: 255, b: 255}
const khaki = {r: 240, g: 230, b: 140}
const black = {r: 0, g: 0, b: 0}

const bright = 'bright'
const dark = 'dark'

describe('tocco-util', () => {
  describe('color', () => {
    describe('contrast', () => {
      it('should return bright value for a dark color', () => {
        expect(getContrastColor(black, bright, dark)).to.eql(bright)
      })

      it('should return dark value for a bright color', () => {
        expect(getContrastColor(white, bright, dark)).to.eql(dark)
        expect(getContrastColor(khaki, bright, dark)).to.eql(dark)
      })

      it('should return default values for bright and dark', () => {
        expect(getContrastColor(black)).to.eql('#FFFFFF')
        expect(getContrastColor(white)).to.eql('#000000')
      })
    })
  })
})
