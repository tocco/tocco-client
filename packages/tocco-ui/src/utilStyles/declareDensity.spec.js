import {declareDensity} from '../utilStyles'

const props = {
  theme: {
    lineHeights: [1, 1.4],
    space: [0, '.0625rem', '.125rem', '.25rem', '.5rem', '1rem', '2rem', '4rem', '8rem', '16rem', '32rem']
  }
}

describe('tocco-ui', () => {
  describe('utilStyles', () => {
    describe('declareDensity', () => {
      it('should be elevation 0', () => {
        props.dense = false
        expect(declareDensity(props)).to.equal('line-height: 1.4;\npadding: .25rem .5rem;')
      })

      it('should be elevation 1', () => {
        props.dense = true
        expect(declareDensity(props)).to.equal('line-height: 1;\npadding: .125rem;')
      })
    })
  })
})
