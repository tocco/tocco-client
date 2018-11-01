import {declareDensity} from '../utilStyles'

const props = {
  theme: {
    lineHeights: [1, 1.4],
    spaceBase: 16,
    spaceScale: 2
  }
}

describe('tocco-ui', () => {
  describe('utilStyles', () => {
    describe('declareDensity', () => {
      test('should be normal padding', () => {
        props.dense = false
        expect(declareDensity(props)).to.equal('line-height: 1.4;\npadding: 2rem 4rem;')
      })

      test('should be dense padding', () => {
        props.dense = true
        expect(declareDensity(props)).to.equal('line-height: 1;\npadding: 1rem;')
      })
    })
  })
})
