import {
  declareOverlay
} from '../utilStyles'

describe('tocco-ui', () => {
  describe('utilStyles', () => {
    describe('declareOverlay', () => {
      test(
        'should declare pseudo element to cover parent completely and stain it',
        () => {
          const css = declareOverlay('rgb(0,0,0)', 1)
          expect(css).to.match(/&:after/)
          expect(css).to.match(/content: '';/)
          expect(css).to.match(/position: absolute;/)
          expect(css).to.match(/top: 0;/)
          expect(css).to.match(/right: 0;/)
          expect(css).to.match(/bottom: 0;/)
          expect(css).to.match(/left: 0;/)
          expect(css).to.match(/background-color: rgb\(0,0,0\);/)
          expect(css).to.match(/opacity: 1;/)
          expect(css).to.match(/border-radius: inherit;/)
        }
      )
    })
  })
})
