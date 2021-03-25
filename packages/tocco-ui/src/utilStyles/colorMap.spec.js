import {colorizeBorder, colorizeText} from './colorMap'

const props = {
  theme: {
    colors: {
      paper: '#fff',
      primary: '#9E2124',
      text: '#212121',
      signal: {
        success: {
          paper: '#A5D6A7',
          text: '#1B5E20'
        }
      }
    }
  },
  signal: 'success'
}

describe('tocco-ui', () => {
  describe('utilStyles', () => {
    describe('colorizeText', () => {
      test('should return signal color', () => {
        const value = colorizeText.signal(props)
        expect(value).to.equal('#1B5E20')
      })
      test('should return text color', () => {
        const value = colorizeText.shade0(props)
        expect(value).to.equal('#212121')
      })
      test('should return shade 1 of text color', () => {
        const value = colorizeText.shade1(props)
        expect(value).to.equal('#7a7a7a')
      })
      test('should return shade 2 of text color', () => {
        const value = colorizeText.shade2(props)
        expect(value).to.equal('#adadad')
      })
    })
    describe('colorizeBorder', () => {
      test('should return shade 1 of paper color', () => {
        const value = colorizeBorder.shade1(props)
        expect(value).to.equal('#ccc')
      })
      test('should return shade 2 of paper color', () => {
        const value = colorizeBorder.shade2(props)
        expect(value).to.equal('#999')
      })
      test('should return signal color', () => {
        const value = colorizeBorder.signal(props)
        expect(value).to.equal('#1B5E20')
      })
      test('should return text color', () => {
        const value = colorizeBorder.transparent(props)
        expect(value).to.equal('transparent')
      })
    })
  })
})
