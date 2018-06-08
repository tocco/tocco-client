import {objectToCss} from '../utilStyles'

const props = {
  theme: {
    space: [0, '1rem', '2rem'],
    lineHeights: [1, 2, 3],
    colors: {
      base: {
        fill: [
          '#FFF',
          '#EEE',
          '#DDD'
        ],
        paper: '#CCC',
        text: '#BBB'
      }
    }
  }
}

describe('tocco-ui', () => {
  describe('utilStyles', () => {
    describe('objectToCss', () => {
      it('should be one css declaration without declared theme prop', () => {
        const declarations = {
          'background-color': '#AAA'
        }
        expect(objectToCss(declarations)).to.equal('background-color: #AAA;')
      })

      it('should be two css declarations without declared theme prop', () => {
        const declarations = {
          'background-color': '#AAA',
          'opacity': 0.5
        }
        expect(objectToCss(declarations)).to.equal('background-color: #AAA;\nopacity: 0.5;')
      })

      it('should be one css declaration with one value from theme', () => {
        const declarations = {
          'line-height': ['lineHeights', 1]
        }
        expect(objectToCss(declarations, props)).to.equal('line-height: 2;')
      })

      it('should be one css declaration with two values from theme', () => {
        const declarations = {
          'padding': ['space', 0, 2]
        }
        expect(objectToCss(declarations, props)).to.equal('padding: 0 2rem;')
      })

      it('should be one css declaration with one deep nested array value from theme', () => {
        const declarations = {
          'background-color': ['colors.base.fill', 1]
        }
        expect(objectToCss(declarations, props)).to.equal('background-color: #EEE;')
      })

      it('should be one css declaration with one deep nested string value from theme', () => {
        const declarations = {
          'color': ['colors.base.text']
        }
        expect(objectToCss(declarations, props)).to.equal('color: #BBB;')
      })
    })
  })
})
