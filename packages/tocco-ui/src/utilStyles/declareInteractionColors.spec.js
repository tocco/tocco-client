import {
  declareInteractionColors,
  generateInteractionColors,
  generateShades,
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
          expect(generateShades(color, options)).to.deep.equal(expectation)
        })
      })

      test('should generate interaction color', () => {
        const scenarios = [{
          scheme: 'flatBase',
          expectation: {
            bg: ['#300', '#600', '#900'],
            fg: ['#900', '#c00', '#f00']
          }
        }, {
          scheme: 'flatPrimary',
          expectation: {
            bg: ['#300', '#600', '#900'],
            fg: ['#600', '#900', '#c00']
          }
        }, {
          scheme: 'raisedBase',
          expectation: {
            bg: ['#600', '#900', '#c00'],
            fg: ['#900', '#c00', '#f00']
          }
        }, {
          scheme: 'raisedPrimary',
          expectation: {
            bg: ['#600', '#900', '#c00'],
            fg: ['#900', '#c00', '#f00']
          }
        }, {
          scheme: {
            bg: 'colors.primary',
            fg: 'colors.text, colors.paper'
          },
          expectation: {
            bg: ['#600', '#900', '#c00'],
            fg: ['#900', '#c00', '#f00']
          }
        }, {
          scheme: {
            bg: '#d33b17',
            fg: '#dddddd'
          },
          expectation: {
            bg: ['#d33b17', '#e95734', '#ee7d62'],
            fg: ['#dddddd', '#f7f7f7', '#fff']
          }
        }, {
          scheme: {
            bg: '#3A5696',
            fg: 'colors.paper, colors.text'
          },
          expectation: {
            bg: ['#3A5696', '#4a6cb9', '#6f8ac7'],
            fg: ['#300', '#600', '#900']
          }
        }, {
          scheme: {
            bg: '#bad6ff',
            fg: 'colors.paper, colors.text'
          },
          expectation: {
            bg: ['#bad6ff', '#87b8ff', '#5499ff'],
            fg: ['#300', '#000', '#000']
          }
        }]
        scenarios.map(scenario => {
          const {scheme, expectation} = scenario
          expect(generateInteractionColors(props, scheme)).to.deep.equal(expectation)
        })
      })
    })
  })
})
