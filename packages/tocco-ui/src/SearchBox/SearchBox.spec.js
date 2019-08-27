import React from 'react'
import {mount} from 'enzyme'

import SearchBox from './SearchBox'

describe('tocco-ui', () => {
  describe('SearchBox', () => {
    const DEFAULT_TIMEOUT = SearchBox.defaultProps.debounce + 100
    const SEARCH_STRING = 'My Search String'

    test('should render', () => {
      const wrapper = mount(<SearchBox onSearch={() => {
      }}/>)
      expect(wrapper.find('form')).to.have.length(1)
    })

    test('should call search function on form submit (button click)', () => {
      const searchFunc = sinon.spy()
      const wrapper = mount(<SearchBox
        onSearch={searchFunc}
      />)

      wrapper.setState({inputValue: SEARCH_STRING})
      const form = wrapper.find('form')
      form.simulate('submit', {
        preventDefault: () => {
        }
      })

      expect(searchFunc).to.have.been.calledWith(SEARCH_STRING)
    })

    test('should not call search twice for same term in a row', () => {
      const searchFunc = sinon.spy()
      const wrapper = mount(<SearchBox
        onSearch={searchFunc}
      />)

      const form = wrapper.find('form')

      wrapper.setState({inputValue: 'same'})
      form.simulate('submit', {
        preventDefault: () => {
        }
      })

      wrapper.setState({inputValue: 'same'})
      form.simulate('submit', {
        preventDefault: () => {
        }
      })

      expect(searchFunc).to.have.been.calledOnce
      expect(searchFunc).to.have.been.calledWith('same')
    })

    test('should call search function on change event with live search', done => {
      const searchFunc = sinon.spy()
      const wrapper = mount(<SearchBox
        onSearch={searchFunc}
        liveSearch
      />)

      const input = wrapper.find('input')
      input.simulate('change', {target: {value: SEARCH_STRING}})

      setTimeout(() => {
        expect(searchFunc).to.have.been.calledWith(SEARCH_STRING)
        done()
      }, DEFAULT_TIMEOUT)
    })

    test(
      'should not call search function on keyDown events with live search but to short input',
      done => {
        const searchFunc = sinon.spy()
        const wrapper = mount(<SearchBox
          onSearch={searchFunc}
          liveSearch
        />)

        const input = wrapper.find('input')
        input.simulate('change', {target: {value: 'a'}})

        setTimeout(() => {
          expect(searchFunc).to.not.have.been.called
          done()
        }, DEFAULT_TIMEOUT)
      }
    )

    test('should await debounce time on livesearch', done => {
      const searchFunc = sinon.spy()
      const wrapper = mount(<SearchBox
        onSearch={searchFunc}
        liveSearch
        debounce={100}
      />)

      wrapper.setState({inputValue: SEARCH_STRING})

      const input = wrapper.find('input')
      input.simulate('change', {target: {value: SEARCH_STRING}})

      setTimeout(() => {
        expect(searchFunc).to.not.have.been.called
      }, 10)

      setTimeout(() => {
        expect(searchFunc).to.have.been.called
        done()
      }, 200)
    })

    test('should update the input value', () => {
      const searchFunc = sinon.spy()
      const wrapper = mount(<SearchBox
        onSearch={searchFunc}
      />)

      const input = wrapper.find('input')
      input.simulate('change', {target: {value: SEARCH_STRING}})

      expect(wrapper.state().inputValue).to.equal(SEARCH_STRING)
    })

    test('should accept an input value', () => {
      const inputValue = 'TEST'
      const wrapper = mount(<SearchBox onSearch={() => {}} value={inputValue}/>)

      expect(wrapper.state().inputValue).to.equal(inputValue)
    })
  })
})
