import {
  declareFlatBaseColors,
  declareFlatPrimaryColors,
  declareInteractionColors,
  declareRaisedBaseColors,
  declareRaisedPrimaryColors
} from '../utilStyles'

const props = {
  theme: {
    colors: {
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
        ],
        paper: 'base_paper',
        text: 'base_text'
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
    })
  })
})
