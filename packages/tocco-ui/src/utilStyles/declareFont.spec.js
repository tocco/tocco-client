import {declareFont} from '../utilStyles'

const props = {
  theme: {
    fontFamily: {
      sansSerif: 'Arial, sans-serif'
    },
    fontSizes: [
      '.5rem', '.707rem', '1rem', '1.414rem', '1.999rem', '2.827rem', '3.998rem', '5.653172rem'
    ],
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
  fontSize: '10px',
  fontStyle: 'oblique',
  fontWeight: 900,
  lineHeight: 2
})

describe('tocco-ui', () => {
  describe('utilStyles', () => {
    describe('declareFont', () => {
      it('should declare font according theme', () => {
        const css = declareFont(props)
        expect(css).to.match(/font-family: Arial, sans-serif;/)
        expect(css).to.match(/font-size: 1rem;/)
        expect(css).to.match(/font-style: normal;/)
        expect(css).to.match(/font-weight: 400;/)
        expect(css).to.match(/line-height: 1.4;/)
      })

      it('should declare font according options', () => {
        const css = declareFont(props, options)
        expect(css).to.match(/font-family: Times serif;/)
        expect(css).to.match(/font-size: 10px;/)
        expect(css).to.match(/font-style: oblique;/)
        expect(css).to.match(/font-weight: 900;/)
        expect(css).to.match(/line-height: 2;/)
      })
    })
  })
})
