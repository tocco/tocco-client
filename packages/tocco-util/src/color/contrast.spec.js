import {getContrastColor} from './contrast'

const white = '#fff'
const khaki = '#C3B091'
const black = '#000000'

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

      it('should return bright for the color red', () => {
        const red = '#ff0000'
        expect(getContrastColor(red, bright, dark)).to.eql(bright)
      })

      it('should return default values for bright and dark', () => {
        expect(getContrastColor(black)).to.eql('#FFFFFF')
        expect(getContrastColor(white)).to.eql('#000000')
      })
    })
  })
})
