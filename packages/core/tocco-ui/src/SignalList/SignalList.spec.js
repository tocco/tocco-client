import {shallow} from 'enzyme'

import SignalList from './'

describe('tocco-ui', () => {
  describe('SignalList', () => {
    test('should render children', () => {
      const wrapper = shallow(
        <SignalList.List>
          <span />
          <span />
        </SignalList.List>
      )
      expect(wrapper.find('span')).to.have.length(2)
    })
  })
})
