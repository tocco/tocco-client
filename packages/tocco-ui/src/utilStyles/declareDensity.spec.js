import {declareDensity} from '../utilStyles'

const props = {
  theme: {
    lineHeights: {
      dense: 2.1,
      regular: 4.2
    },
    space: {
      base: 16,
      factor: 2
    }
  }
}

describe('tocco-ui', () => {
  describe('utilStyles', () => {
    describe('declareDensity', () => {
      test('should be normal padding', () => {
        props.dense = false
        expect(declareDensity(props)).to.equal('line-height: 4.2;\npadding: 2rem 4rem;')
      })

      test('should be dense padding', () => {
        props.dense = true
        expect(declareDensity(props)).to.equal('line-height: 2.1;\npadding: 1rem;')
      })
    })
  })
})
