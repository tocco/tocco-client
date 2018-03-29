import {getElevation} from '../utilStyles'

const props = {
  theme: {
    shadows: {
      levels: [
        'none',
        '0 1px 1px 1px'
      ],
      color: 'rgba(33, 33, 33, .6)'
    }
  }
}

describe('tocco-ui', () => {
  describe('utilStyles', () => {
    describe('getElevation', () => {
      it('should be elevation 0', () => {
        expect(getElevation(props, 0)).to.equal('box-shadow: none rgba(33, 33, 33, .6);')
      })

      it('should be elevation 1', () => {
        expect(getElevation(props, 1)).to.equal('box-shadow: 0 1px 1px 1px rgba(33, 33, 33, .6);')
      })
    })
  })
})
