import {
  declareFlatBaseColors,
  declareFlatPrimaryColors,
  declareInteractionColors,
  declareRaisedBaseColors,
  declareRaisedPrimaryColors,
  getInteractionColor,
  shadeColor
} from '../utilStyles'

const props = {
  theme: {
    colors: {
      paper: 'base_paper',
      text: 'base_text',
      base: {
        fill: [
          'base_fill_0',
          'base_fill_1',
          'base_fill_2'
        ],
        line: [
          'base_line_0',
          'base_line_1',
          'base_line_2'
        ]
      },
      primary: {
        fill: [
          'primary_fill_0',
          'primary_fill_1',
          'primary_fill_2'
        ],
        line: [
          'primary_line_0',
          'primary_line_1',
          'primary_line_2'
        ],
        fillContrast: [
          'primary_fillContrast_0',
          'primary_fillContrast_1',
          'primary_fillContrast_2'
        ]
      }
    }
  }
}

const colorSet = {
  defaultBackground: 'defaultBackground',
  defaultColor: 'defaultColor',
  focusBackground: 'focusBackground',
  focusColor: 'focusColor',
  activeBackground: 'activeBackground',
  activeColor: 'activeColor'
}

describe('tocco-ui', () => {
  describe('utilStyles', () => {
    describe('declareInteractionColors', () => {
      test('should be color set for flat base', () => {
        const colors = declareFlatBaseColors(props)
        expect(Object.keys(colors)).to.have.lengthOf(6)
        expect(colors.defaultColor).to.equal('base_text')
        expect(colors.defaultBackground).to.equal('base_paper')
        expect(colors.focusColor).to.equal('base_line_1')
        expect(colors.focusBackground).to.equal('base_fill_0')
        expect(colors.activeColor).to.equal('base_line_2')
        expect(colors.activeBackground).to.equal('base_fill_1')
      })

      test('should be color set for flat primary', () => {
        const colors = declareFlatPrimaryColors(props)
        expect(Object.keys(colors)).to.have.lengthOf(6)
        expect(colors.defaultColor).to.equal('primary_line_0')
        expect(colors.defaultBackground).to.equal('base_paper')
        expect(colors.focusColor).to.equal('primary_line_1')
        expect(colors.focusBackground).to.equal('base_fill_0')
        expect(colors.activeColor).to.equal('primary_line_2')
        expect(colors.activeBackground).to.equal('base_fill_1')
      })

      test('should be color set for raised base', () => {
        const colors = declareRaisedBaseColors(props)
        expect(Object.keys(colors)).to.have.lengthOf(6)
        expect(colors.defaultColor).to.equal('base_line_0')
        expect(colors.defaultBackground).to.equal('base_fill_0')
        expect(colors.focusColor).to.equal('base_line_1')
        expect(colors.focusBackground).to.equal('base_fill_1')
        expect(colors.activeColor).to.equal('base_line_2')
        expect(colors.activeBackground).to.equal('base_fill_2')
      })

      test('should be color set for raised primary', () => {
        const colors = declareRaisedPrimaryColors(props)
        expect(Object.keys(colors)).to.have.lengthOf(6)
        expect(colors.defaultColor).to.equal('primary_fillContrast_0')
        expect(colors.defaultBackground).to.equal('primary_fill_0')
        expect(colors.focusColor).to.equal('primary_fillContrast_1')
        expect(colors.focusBackground).to.equal('primary_fill_1')
        expect(colors.activeColor).to.equal('primary_fillContrast_2')
        expect(colors.activeBackground).to.equal('primary_fill_2')
      })

      test(
        'should declare color and background for default state, :focus, :hover and :active',
        () => {
          const css = declareInteractionColors(colorSet)
          expect(css).to.match(/background-color: defaultBackground;[\n\s]*color: defaultColor;/)
          expect(css).to.match(/&:focus,[\n\s]*&:hover {[\n\s]*background-color: focusBackground;[\n\s]*color: focusColor;[\n\s]*}/)  // eslint-disable-line
          expect(css).to.match(/&:active {[\n\s]*background-color: activeBackground;[\n\s]*color: activeColor;[\n\s]*}/)
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
          expect(getInteractionColor(color, options)).to.deep.equal(expectation)
        })
      })
    })
  })
})
