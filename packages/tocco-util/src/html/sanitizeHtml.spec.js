import sanitizeHtml from './sanitizeHtml'

describe('tocco-util', () => {
  describe('html', () => {
    describe('sanitizeHtml', () => {
      test(
        'should remove event handlers from html tags',
        () => {
          const dirty = '<img src="X" onLoad="alert(\'You have won a prize!\')">'
          const clean = '<img src="X">'
          expect(sanitizeHtml(dirty)).to.equal(clean)
        }
      )
      test(
        'should close all open tags',
        () => {
          const dirty = '<div><span>Hallo'
          const clean = '<div><span>Hallo</span></div>'
          expect(sanitizeHtml(dirty)).to.equal(clean)
        }
      )
      test(
        'should remove single closing tags',
        () => {
          const dirty = '</div>Hallo'
          const clean = 'Hallo'
          expect(sanitizeHtml(dirty)).to.equal(clean)
        }
      )
      test(
        'should remove script tags',
        () => {
          const dirty = '<div>Hi!<script>alert(\'You have won a prize!\')</script></div>'
          const clean = '<div>Hi!</div>'
          expect(sanitizeHtml(dirty)).to.equal(clean)
        }
      )
      test(
        'should be able to handle null values',
        () => {
          const dirty = null
          const clean = null
          expect(sanitizeHtml(dirty)).to.equal(clean)
        }
      )
      test(
        'should be able to handle undefined values',
        () => {
          const dirty = undefined
          const clean = undefined
          expect(sanitizeHtml(dirty)).to.equal(clean)
        }
      )
      test(
        'should be able to handle empty strings',
        () => {
          const dirty = ''
          const clean = ''
          expect(sanitizeHtml(dirty)).to.equal(clean)
        }
      )
    })
  })
})
