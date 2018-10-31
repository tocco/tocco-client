import {
  fontScale,
  scaleExponential,
  spaceScale,
  trimDecimalPlaces
} from '../utilStyles'

describe('tocco-ui', () => {
  describe('utilStyles', () => {
    describe('scaleExponential', () => {
      const scenarios = [{
        expectation: [0.25, 0.5, 1, 2, 4],
        base: 1,
        scale: 2,
        exponents: [-2, -1, 0, 1, 2]
      }, {
        expectation: [1, 2, 4, 8, 16],
        base: 4,
        scale: 2,
        exponents: [-2, -1, 0, 1, 2]
      }, {
        expectation: [0.0001, 0.001, 0.01, 0.1, 1, 10, 100, 1000, 10000],
        base: 1,
        scale: 10,
        exponents: [-4, -3, -2, -1, 0, 1, 2, 3, 4]
      }, {
        expectation: [1 / 9, 1 / 3, 1, 3, 9],
        base: 1,
        scale: 3,
        exponents: [-2, -1, 0, 1, 2]
      }]

      test('should calculate product correctly', () => {
        scenarios.map(scenario => {
          const {base, exponents, scale} = scenario
          exponents.map((exponent, i) => {
            expect(scaleExponential(base, exponent, scale)).to.equal(scenario.expectation[i])
          })
        })
      })
    })

    describe('trimDecimalPlaces', () => {
      const expectation = [1.235, 1, 1.2, 1.23, 1.235, 1.2346]
      const maxDecimalPlaces = [undefined, 0, 1, 2, 3, 4]
      const value = 1.23456

      test('should trim floats', () => {
        maxDecimalPlaces.map((places, i) => {
          expect(trimDecimalPlaces(value, places)).to.equal(expectation[i])
        })
      })
    })

    describe('fontScale', () => {
      const expectation = ['0.25rem', '0.5rem', '1rem', '2rem', '4rem']
      const exponents = [-2, -1, 0, 1, 2]
      const props = {
        theme: {
          fontSizeBase: 1,
          fontSizeScale: 2,
          lineHeights: [1, 1.5]
        }
      }
      const unit = undefined

      test('should be valid scale in rem', () => {
        exponents.map((exponent, i) => {
          expect(fontScale(props, exponent, unit)).to.equal(expectation[i])
        })
      })
    })

    describe('spaceScale in em', () => {
      const expectation = ['0.375em', '0.75em', '1.5em', '3em', '6em']
      const exponents = [-2, -1, 0, 1, 2]
      const props = {
        theme: {
          spaceBase: 1,
          spaceScale: 2,
          lineHeights: [1, 1.5]
        }
      }
      const unit = 'em'

      test('should be valid scale in em', () => {
        exponents.map((exponent, i) => {
          spaceScale(props, exponent, unit)
          expect(spaceScale(props, exponent, unit)).to.equal(expectation[i])
        })
      })
    })
  })
})
