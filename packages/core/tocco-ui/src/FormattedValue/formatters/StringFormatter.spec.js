import {mount} from 'enzyme'

import StringFormatter from './StringFormatter'

describe('tocco-ui', () => {
  describe('FormattedValue', () => {
    describe('formatters', () => {
      describe('StringFormatter ', () => {
        test('should format value', () => {
          const wrapper = mount(<StringFormatter value="TEST TEST" />)
          expect(wrapper.text()).to.equal('TEST TEST')
        })

        test('should format number 0', () => {
          const wrapper = mount(<StringFormatter value={0} />)
          expect(wrapper.text()).to.equal('0')
        })
      })
    })
  })
})
