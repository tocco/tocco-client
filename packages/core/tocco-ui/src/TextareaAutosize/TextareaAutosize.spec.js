import {intlEnzyme} from 'tocco-test-util'
import {userAgent} from 'tocco-util'

import {StyledSizeWrapper} from './StyledComponents'
import TextareaAutosize from './TextareaAutosize'

describe('tocco-ui', () => {
  describe('TextareaAutosize', () => {
    describe('TextareaAutosize', () => {
      test('should have replicated value', () => {
        const value = 'abcd'
        const wrapper = intlEnzyme.mountWithIntl(<TextareaAutosize value={value} />)

        expect(wrapper.find(StyledSizeWrapper).prop('data-replicated-value')).to.equal(value)
      })

      test('should skip replicated value for Safari', () => {
        const stub = sinon.stub(userAgent, 'isSafari').returns(true)

        const value = 'abcd'
        const wrapper = intlEnzyme.mountWithIntl(<TextareaAutosize value={value} />)

        stub.restore()

        expect(wrapper.find(StyledSizeWrapper).prop('data-replicated-value')).to.be.undefined
      })

      test('should update replicated value', () => {
        const clock = sinon.useFakeTimers()
        const value = 'abcd'
        const wrapper = intlEnzyme.mountWithIntl(<TextareaAutosize value={value} />)
        wrapper.setProps({value: 'test'})

        clock.tick(1000)
        wrapper.update()

        expect(wrapper.find(StyledSizeWrapper).prop('data-replicated-value')).to.equal('test')
      })
    })
  })
})
