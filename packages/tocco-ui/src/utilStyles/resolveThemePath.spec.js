import theme from './resolveThemePath'

const props = {
  theme: {
    colors: {
      paper: '#fff',
      signal: {
        success: {
          text: '#388E3C'
        }
      }
    },
    fontFamily: {
      regular: 'sans-serif'
    },
    fontSize: {
      base: 1.4
    },
    fontWeights: {
      regular: 300
    },
    lineHeights: {
      regular: 1.5
    },
    radii: {
      regular: '4px'
    },
    space: {
      base: 3
    }
  }
}

describe('tocco-ui', () => {
  describe('utilStyles', () => {
    describe('resolveThemePath', () => {
      test('should get color', () => {
        [{
          path: 'paper',
          fallback: null,
          expectation: '#fff'
        }, {
          path: 'signal.success.text',
          fallback: '#aaa',
          expectation: '#388E3C'
        }, {
          path: 'none.existing.path1',
          expectation: 'inherit'
        }, {
          path: 'none.existing.path2',
          fallback: '#bbb',
          expectation: '#bbb'
        }].map(obj => {
          expect(theme.color(obj.path, obj.fallback)(props)).to.be.equal(obj.expectation)
        })
      })

      test('should get font family', () => {
        [{
          path: 'regular',
          expectation: 'sans-serif'
        }, {
          path: 'none.existing.path1',
          fallback: 'serif',
          expectation: 'serif'
        }, {
          path: 'none.existing.path2',
          expectation: 'inherit'
        }].map(obj => {
          expect(theme.fontFamily(obj.path, obj.fallback)(props)).to.be.equal(obj.expectation)
        })
      })

      test('should get font size', () => {
        [{
          path: 'base',
          expectation: 1.4
        }, {
          path: 'none.existing.path1',
          fallback: 3,
          expectation: 3
        }, {
          path: 'none.existing.path2',
          expectation: '1rem'
        }].map(obj => {
          expect(theme.fontSize(obj.path, obj.fallback)(props)).to.be.equal(obj.expectation)
        })
      })

      test('should get font weight', () => {
        [{
          path: 'regular',
          expectation: 300
        }, {
          path: 'none.existing.path1',
          fallback: 700,
          expectation: 700
        }, {
          path: 'none.existing.path2',
          expectation: 400
        }].map(obj => {
          expect(theme.fontWeight(obj.path, obj.fallback)(props)).to.be.equal(obj.expectation)
        })
      })

      test('should get line height', () => {
        [{
          path: 'regular',
          expectation: 1.5
        }, {
          path: 'none.existing.path1',
          fallback: 2.1,
          expectation: 2.1
        }, {
          path: 'none.existing.path2',
          expectation: 1
        }].map(obj => {
          expect(theme.lineHeight(obj.path, obj.fallback)(props)).to.be.equal(obj.expectation)
        })
      })

      test('should resolve any path', () => {
        [{
          path: 'colors.paper',
          expectation: '#fff'
        }, {
          path: 'fontFamily.regular',
          expectation: 'sans-serif'
        }, {
          path: 'none.existing.path1',
          fallback: 'fallback',
          expectation: 'fallback'
        }, {
          path: 'none.existing.path2',
          expectation: 'inherit'
        }].map(obj => {
          expect(theme.path(obj.path, obj.fallback)(props)).to.be.equal(obj.expectation)
        })
      })

      test('should get radii', () => {
        [{
          path: 'regular',
          expectation: '4px'
        }, {
          path: 'none.existing.path1',
          fallback: '1rem',
          expectation: '1rem'
        }, {
          path: 'none.existing.path2',
          expectation: 0
        }].map(obj => {
          expect(theme.radii(obj.path, obj.fallback)(props)).to.be.equal(obj.expectation)
        })
      })

      test('should get space', () => {
        [{
          path: 'base',
          expectation: 3
        }, {
          path: 'none.existing.path1',
          fallback: 4,
          expectation: 4
        }, {
          path: 'none.existing.path2',
          expectation: 2
        }].map(obj => {
          expect(theme.space(obj.path, obj.fallback)(props)).to.be.equal(obj.expectation)
        })
      })
    })
  })
})
