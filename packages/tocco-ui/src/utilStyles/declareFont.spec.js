import {declareFont} from '../utilStyles'

const props = {
  theme: {
    fontFamily: {
      sansSerif: 'Arial, sans-serif'
    },
    fontSizeBase: 1.4,
    fontWeights: {
      light: 300,
      regular: 400,
      bold: 700
    },
    lineHeights: [
      1, 1.4
    ]
  }
}

const options = Object.assign({
  fontFamily: 'Times serif',
  fontSize: '1rem',
  fontStyle: 'oblique',
  fontWeight: 900,
  lineHeight: 2
})

describe('tocco-ui', () => {
  describe('utilStyles', () => {
    describe('declareFont', () => {
      test('should declare font according theme', () => {
        const css = declareFont(props)
        expect(css).to.match(/font-family: Arial, sans-serif;/)
        expect(css).to.match(/font-size: 1.4rem;/)
        expect(css).to.match(/font-style: normal;/)
        expect(css).to.match(/font-weight: 400;/)
        expect(css).to.match(/line-height: 1.4;/)
      })

      test('should declare font according options', () => {
        const css = declareFont(props, options)
        expect(css).to.match(/font-family: Times serif;/)
        expect(css).to.match(/font-size: 1rem;/)
        expect(css).to.match(/font-style: oblique;/)
        expect(css).to.match(/font-weight: 900;/)
        expect(css).to.match(/line-height: 2;/)
      })
    })
  })
})
