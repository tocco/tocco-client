import React from 'react'
import {mount} from 'enzyme'

import SearchBox from './SearchBox'

describe('tocco-ui', () => {
  describe('SearchBox', () => {
    const TIMEOUT = 400
    const SEARCH_STRING = 'My Search String'

    test('should render', () => {
      const wrapper = mount(<SearchBox onSearch={() => {
      }}/>)
      expect(wrapper.find('input')).to.have.length(1)
    })

    test(
      'should not call search function on keyDown events with live search but to short input',
      done => {
        const searchFunc = sinon.spy()
        const wrapper = mount(<SearchBox
          onSearch={searchFunc}
        />)

        const input = wrapper.find('input')
        input.simulate('change', {target: {value: 'a'}})

        setTimeout(() => {
          expect(searchFunc).to.not.have.been.called
          done()
        }, TIMEOUT)
      }
    )

    test('should await debounce time onSearch', done => {
      const searchFunc = sinon.spy()
      const wrapper = mount(<SearchBox
        onSearch={searchFunc}
      />)

      const input = wrapper.find('input')
      input.simulate('change', {target: {value: SEARCH_STRING}})

      setTimeout(() => {
        expect(searchFunc).to.not.have.been.called
      }, 10)

      setTimeout(() => {
        expect(searchFunc).to.have.been.called
        done()
      }, TIMEOUT)
    })

    test('should accept an input value', () => {
      const inputValue = 'TEST'
      const wrapper = mount(<SearchBox onSearch={() => {}} value={inputValue}/>)

      expect(wrapper.find('input').props().value).to.eql(inputValue)
    })
  })
})
