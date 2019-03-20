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

const colorSet = {
  defaultBackground: '#000',
  defaultColor: '#300',
  focusBackground: '#030',
  focusColor: '#330',
  activeBackground: '#003',
  activeColor: '#033'
}

describe('tocco-ui', () => {
  describe('utilStyles', () => {
    describe('declareInteractionColors', () => {
      test('should be color set for flat base', () => {
        const colors = generateFlatBaseColors(props)
        expect(Object.keys(colors)).to.have.lengthOf(6)
        expect(colors).to.deep.equal({
          defaultColor: '#900',
          defaultBackground: '#300',
          focusColor: '#c00',
          focusBackground: '#600',
          activeColor: '#f00',
          activeBackground: '#900'
        })
      })

      test('should be color set for flat primary', () => {
        const colors = generateFlatPrimaryColors(props)
        expect(Object.keys(colors)).to.have.lengthOf(6)
        expect(colors).to.deep.equal({
          defaultColor: '#600',
          defaultBackground: '#300',
          focusColor: '#900',
          focusBackground: '#600',
          activeColor: '#c00',
          activeBackground: '#900'
        })
      })

      test('should be color set for raised base', () => {
        const colors = generateRaisedBaseColors(props)
        expect(Object.keys(colors)).to.have.lengthOf(6)
        expect(colors).to.deep.equal({
          defaultColor: '#900',
          defaultBackground: '#600',
          focusColor: '#c00',
          focusBackground: '#900',
          activeColor: '#f00',
          activeBackground: '#c00'
        })
      })

      test('should be color set for raised primary', () => {
        const colors = generateRaisedPrimaryColors(props)
        expect(Object.keys(colors)).to.have.lengthOf(6)
        expect(colors).to.deep.equal({
          defaultColor: '#900',
          defaultBackground: '#600',
          focusColor: '#c00',
          focusBackground: '#900',
          activeColor: '#f00',
          activeBackground: '#c00'
        })
      })

      test(
        'should declare color and background for default state, :focus, :hover and :active',
        () => {
          const css = declareInteractionColors(colorSet)
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
