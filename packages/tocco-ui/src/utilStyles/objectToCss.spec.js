import {objectToCss} from '../utilStyles'

const props = {
  theme: {
    space: [0, '1rem', '2rem'],
    lineHeights: {
      dense: 1,
      regular: 2.5
    },
    colors: {
      paper: '#CCC',
      text: '#BBB',
      base: {
        fill: [
          '#FFF',
          '#EEE',
          '#DDD'
        ]
      }
    }
  }
}

describe('tocco-ui', () => {
  describe('utilStyles', () => {
    describe('objectToCss', () => {
      test('should be one css declaration without declared theme prop', () => {
        const declarations = {
          'background-color': '#AAA'
        }
        expect(objectToCss(declarations)).to.equal('background-color: #AAA;')
      })

      test('should be two css declarations without declared theme prop', () => {
        const declarations = {
          'background-color': '#AAA',
          'opacity': 0.5
        }
        expect(objectToCss(declarations)).to.equal('background-color: #AAA;\nopacity: 0.5;')
      })

      test('should be one css declaration with one value from theme', () => {
        const declarations = {
          'line-height': ['lineHeights.regular']
        }
        expect(objectToCss(declarations, props)).to.equal('line-height: 2.5;')
      })

      test('should be one css declaration with two values from theme', () => {
        const declarations = {
          padding: ['space', 0, 2]
        }
        expect(objectToCss(declarations, props)).to.equal('padding: 0 2rem;')
      })

      test(
        'should be one css declaration with one deep nested array value from theme',
        () => {
          const declarations = {
            'background-color': ['colors.base.fill', 1]
          }
          expect(objectToCss(declarations, props)).to.equal('background-color: #EEE;')
        }
      )

      test(
        'should be one css declaration with one deep nested string value from theme',
        () => {
          const declarations = {
            color: ['colors.text']
          }
          expect(objectToCss(declarations, props)).to.equal('color: #BBB;')
        }
      )
    })
  })
})
