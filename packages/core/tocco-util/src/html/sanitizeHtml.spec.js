import sanitizeHtml from './sanitizeHtml'

describe('tocco-util', () => {
  describe('html', () => {
    describe('sanitizeHtml', () => {
      test('should remove event handlers from html tags', () => {
        const dirty = '<img src="X" onLoad="alert(\'You have won a prize!\')">'
        const clean = '<img src="X">'
        expect(sanitizeHtml(dirty)).to.equal(clean)
      })
      test('should close all open tags', () => {
        const dirty = '<div><span>Hallo'
        const clean = '<div><span>Hallo</span></div>'
        expect(sanitizeHtml(dirty)).to.equal(clean)
      })
      test('should remove single closing tags', () => {
        const dirty = '</div>Hallo'
        const clean = 'Hallo'
        expect(sanitizeHtml(dirty)).to.equal(clean)
      })
      test('should remove script tags', () => {
        const dirty = "<div>Hi!<script>alert('You have won a prize!')</script></div>"
        const clean = '<div>Hi!</div>'
        expect(sanitizeHtml(dirty)).to.equal(clean)
      })
      test('should be able to handle null values', () => {
        const dirty = null
        const clean = null
        expect(sanitizeHtml(dirty)).to.equal(clean)
      })
      test('should be able to handle undefined values', () => {
        const dirty = undefined
        const clean = undefined
        expect(sanitizeHtml(dirty)).to.equal(clean)
      })
      test('should be able to handle empty strings', () => {
        const dirty = ''
        const clean = ''
        expect(sanitizeHtml(dirty)).to.equal(clean)
      })
      test('should remove style tags', () => {
        const dirty = '<div>Hi!<style>a {border: 1px solid red;}</style></div>'
        const clean = '<div>Hi!</div>'
        expect(sanitizeHtml(dirty)).to.equal(clean)
      })
      test('should remove style attributes', () => {
        const dirty = '<div style="border:1px solid red;">Hi!</div>'
        const clean = '<div style="border:1px solid red;">Hi!</div>'
        expect(sanitizeHtml(dirty)).to.equal(clean)
      })
      test('should remove invalid style properties', () => {
        const dirty = '<div style="border:1px solid red;position:absolute;">Hi!</div>'
        const clean = '<div style="border:1px solid red;">Hi!</div>'
        expect(sanitizeHtml(dirty)).to.equal(clean)
      })
      test('should remove style attributes when no style property is valid', () => {
        const dirty = '<div style="position:absolute;">Hi!</div>'
        const clean = '<div>Hi!</div>'
        expect(sanitizeHtml(dirty)).to.equal(clean)
      })
      test('should remove css functions', () => {
        const dirty = '<div style="width:calc(100% - 50px);">Hi!</div>'
        const clean = '<div>Hi!</div>'
        expect(sanitizeHtml(dirty)).to.equal(clean)
      })
      test('should ignore malformed css', () => {
        const dirty = '<div style="border:1px;width:100%">Hi!</div>'
        const clean = '<div style="border:1px;width:100%;">Hi!</div>'
        expect(sanitizeHtml(dirty)).to.equal(clean)
      })
      test('should allow target attribute on links', () => {
        const dirty = '<a href="https://www.google.ch" target="_blank">Hi!</a>'
        const clean = '<a target="_blank" href="https://www.google.ch">Hi!</a>'
        expect(sanitizeHtml(dirty)).to.equal(clean)
      })
      test('should allow links without target attribute', () => {
        const dirty = '<a href="https://www.google.ch">Hi!</a>'
        const clean = '<a href="https://www.google.ch">Hi!</a>'
        expect(sanitizeHtml(dirty)).to.equal(clean)
      })
    })
  })
})
