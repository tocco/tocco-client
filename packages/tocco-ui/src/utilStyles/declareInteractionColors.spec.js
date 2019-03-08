import {
  generateFlatBaseColors,
  generateFlatPrimaryColors,
  declareInteractionColors,
  generateRaisedBaseColors,
  generateRaisedPrimaryColors,
  generateInteractionColor,
  shadeColor
} from '../utilStyles'

const props = {
  theme: {
    colors: {
      paper: '#300',
      primary: '#600',
      text: '#900',
      signal: {
        danger: {
          paper: '#030',
          text: '#090'
        },
        info: {
          paper: '#330',
          text: '#990'
        },
        success: {
          paper: '#003',
          text: '#009'
        },
        warning: {
          paper: '#033',
          text: '#099'
        }
      }
    }
  }
}

describe('tocco-ui', () => {
  describe('utilStyles', () => {
    describe('declareInteractionColors', () => {
      test('should be color set for flat base', () => {
        const colors = generateFlatBaseColors(props)
        expect(Object.keys(colors)).to.have.lengthOf(2)
        expect(colors).to.deep.equal({
          bg: ['#300', '#600', '#900'],
          fg: ['#900', '#c00', '#f00']
        })
      })

      test('should be color set for flat primary', () => {
        const colors = generateFlatPrimaryColors(props)
        expect(Object.keys(colors)).to.have.lengthOf(2)
        expect(colors).to.deep.equal({
          bg: ['#300', '#600', '#900'],
          fg: ['#600', '#900', '#c00']
        })
      })

      test('should be color set for raised base', () => {
        const colors = generateRaisedBaseColors(props)
        expect(Object.keys(colors)).to.have.lengthOf(2)
        expect(colors).to.deep.equal({
          bg: ['#600', '#900', '#c00'],
          fg: ['#900', '#c00', '#f00']
        })
      })

      test('should be color set for raised primary', () => {
        const colors = generateRaisedPrimaryColors(props)
        expect(Object.keys(colors)).to.have.lengthOf(2)
        expect(colors).to.deep.equal({
          bg: ['#600', '#900', '#c00'],
          fg: ['#900', '#c00', '#f00']
        })
      })

      test(
        'should declare color and background for default state, :focus, :hover and :active',
        () => {
          const css = declareInteractionColors({
            bg: ['#000', '#030', '#003'],
            fg: ['#300', '#330', '#033']
          })
          expect(css).to.match(/background-color: #000;[\n\s]*color: #300;/)
          expect(css).to.match(/&:focus,[\n\s]*&:hover {[\n\s]*background-color: #030;[\n\s]*color: #330;[\n\s]*}/)  // eslint-disable-line
          expect(css).to.match(/&:active,[\n\s]*&\[aria-pressed="true"\] {[\n\s]*background-color: #003;[\n\s]*color: #033;[\n\s]*}/)  // eslint-disable-line
          expect(css).to.match(/&:disabled {[\n\s]*background-color: #7f7f7f;[\n\s]*color: #997f7f;[\n\s]*}/)  // eslint-disable-line
        }
      )

      test('should shade colors', () => {
        const scenarios = [{
          color: '#777',
          expectation: '#919191'
        }, {
          color: '#777',
          expectation: '#aaa',
          step: 2
        }, {
          color: '#777',
          expectation: '#aaa',
          options: {shadeFactor: 0.2}
        }, {
          color: '#777',
          expectation: '#aaa',
          options: {shadeOffset: 0.1}
        }]

        scenarios.map(scenario => {
          const {color, expectation, options, step} = scenario
          expect(shadeColor(color, step, options)).to.equal(expectation)
        })
      })

      test('should ligthen or darken depending on luminosity', () => {
        const scenarios = [{
          color: '#bdbdbd',
          expectation: '#a4a4a4'
        }, {
          color: '#bdbdbd',
          expectation: '#d7d7d7',
          options: {action: 'lighten'}
        }, {
          color: '#9e9e9e',
          expectation: '#b8b8b8'
        }, {
          color: '#9e9e9e',
          expectation: '#858585',
          options: {action: 'darken'}
        }]

        scenarios.map(scenario => {
          const {color, expectation, options} = scenario
          expect(shadeColor(color, 1, options)).to.equal(expectation)
        })
      })

      test('should calculate interaction color', () => {
        const scenarios = [{
          color: '#fff',
          expectation: ['#fff', '#e6e6e6', '#ccc']
        }, {
          color: '#fff',
          expectation: ['#e6e6e6', '#b3b3b3', '#808080'],
          options: {shadeFactor: 0.2, shadeOffset: 0.1}
        }]

        scenarios.map(scenario => {
          const {color, expectation, options} = scenario
          expect(generateInteractionColor(color, options)).to.deep.equal(expectation)
        })
      })
    })
  })
})
