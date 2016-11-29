import React from 'react'
import SearchBox from './SearchBox'
import Button from '../Button'

import {shallow} from 'enzyme'

describe('tocco-ui', function() {
  describe('SearchBox', function() {
    const DEFAULT_DEBOUNCE = 200
    const SEARCH_STRING = 'My Search String'

    it('should render', () => {
      const wrapper = shallow(<SearchBox onSearch={() => {}}/>)
      expect(wrapper.find('.tocco-searchbox')).to.have.length(1)
    })

    it('should call search function on button click', done => {
      const searchFunc = sinon.spy()
      const wrapper = shallow(<SearchBox
        onSearch={searchFunc}
      />)

      wrapper.setState({'inputValue': SEARCH_STRING})
      const button = wrapper.find(Button)
      button.simulate('click')
      setTimeout(() => {
        expect(searchFunc).to.have.been.calledWith(SEARCH_STRING)
        done()
      }, DEFAULT_DEBOUNCE)
    })

    it('should not call search function on button click on empty input value', done => {
      const searchFunc = sinon.spy()
      const wrapper = shallow(<SearchBox
        onSearch={searchFunc}
      />)

      const button = wrapper.find(Button)
      button.simulate('click')
      setTimeout(() => {
        expect(searchFunc).to.have.been.calledWith('')
        done()
      }, DEFAULT_DEBOUNCE)
    })

    it('should call search function on key `Enter`', done => {
      const searchFunc = sinon.spy()
      const wrapper = shallow(<SearchBox
        onSearch={searchFunc}
      />)

      wrapper.setState({'inputValue': SEARCH_STRING})
      wrapper.find('input').simulate('keyDown', {key: 'Enter'})
      setTimeout(() => {
        expect(searchFunc).to.have.been.calledWith(SEARCH_STRING)
        done()
      }, DEFAULT_DEBOUNCE)
    })

    it('should call search function on key `Enter` on empty input value', done => {
      const searchFunc = sinon.spy(() => {})
      const wrapper = shallow(<SearchBox
        onSearch={searchFunc}
      />)
      const input = wrapper.find('input')
      input.simulate('keyDown', {key: 'Enter'})

      setTimeout(() => {
        expect(searchFunc).to.not.have.been.calledWith(undefined)
        done()
      }, DEFAULT_DEBOUNCE)
    })

    it('should not call search function on any other key than `Enter`', done => {
      const func = sinon.spy(() => {})
      const wrapper = shallow(<SearchBox
        onSearch={func}
      />)

      const input = wrapper.find('input')
      input.simulate('keyDown', {key: 'ArrowLeft'})
      setTimeout(() => {
        expect(func).to.not.have.been.called
        done()
      }, DEFAULT_DEBOUNCE)
    })

    it('should render the placeholder', () => {
      const placeholder = 'MyPlaceHolder'
      const wrapper = shallow(<SearchBox
        onSearch={() => {}}
        placeholder={placeholder}
      />)
      const searchBox = wrapper.find('.tocco-searchbox')

      expect(searchBox).to.have.length(1)
      expect(searchBox.find('input').prop('placeholder')).to.equal(placeholder)
    })

    it('should call search function on keyDown events with live search', done => {
      const searchFunc = sinon.spy()
      const wrapper = shallow(<SearchBox
        onSearch={searchFunc}
        liveSearch
      />)

      wrapper.setState({'inputValue': SEARCH_STRING})

      const input = wrapper.find('input')
      input.simulate('keyDown', {key: 'a'})

      setTimeout(() => {
        expect(searchFunc).to.have.been.calledWith(SEARCH_STRING)
        done()
      }, DEFAULT_DEBOUNCE)
    })

    it('should not call search function on keyDown events with live search', done => {
      const searchFunc = sinon.spy()
      const wrapper = shallow(<SearchBox
        onSearch={searchFunc}
        liveSearch
      />)

      wrapper.setState({'inputValue': 'ab'})

      const input = wrapper.find('input')
      input.simulate('keyDown', {key: 'a'})

      setTimeout(() => {
        expect(searchFunc).to.not.have.been.called
        done()
      }, DEFAULT_DEBOUNCE)
    })

    it('should call search function on keyDown events with live search and minInputLength', done => {
      const searchFunc = sinon.spy()
      const wrapper = shallow(<SearchBox
        onSearch={searchFunc}
        liveSearch
        minInputLength={1}
      />)

      wrapper.setState({'inputValue': 'ab'})

      const input = wrapper.find('input')
      input.simulate('keyDown', {key: 'a'})

      setTimeout(() => {
        expect(searchFunc).to.have.been.calledWith('ab')
        done()
      }, DEFAULT_DEBOUNCE)
    })

    it('should not call search function on keyDown events with live search and minInputLength', done => {
      const searchFunc = sinon.spy()
      const wrapper = shallow(<SearchBox
        onSearch={searchFunc}
        liveSearch
        minInputLength={5}
      />)

      wrapper.setState({'inputValue': 'abcd'})

      const input = wrapper.find('input')
      input.simulate('keyDown', {key: 'a'})

      setTimeout(() => {
        expect(searchFunc).to.not.have.been.called
        done()
      }, DEFAULT_DEBOUNCE)
    })

    it('should call search function on keyDown events after debounce time', done => {
      const searchFunc = sinon.spy()
      const wrapper = shallow(<SearchBox
        onSearch={searchFunc}
        liveSearch
        debounce={10}
      />)

      wrapper.setState({'inputValue': SEARCH_STRING})

      const input = wrapper.find('input')
      input.simulate('keyDown', {key: 'a'})

      setTimeout(() => {
        expect(searchFunc).to.have.been.calledWith(SEARCH_STRING)
        done()
      }, 10)
    })

    it('should not call search function on keyDown events before debounce time', done => {
      const searchFunc = sinon.spy()
      const wrapper = shallow(<SearchBox
        onSearch={searchFunc}
        liveSearch
        debounce={10}
      />)

      wrapper.setState({'inputValue': SEARCH_STRING})

      const input = wrapper.find('input')
      input.simulate('keyDown', {key: 'a'})

      setTimeout(() => {
        expect(searchFunc).to.not.have.been.called
        done()
      }, 5)
    })

    it('should update the input value', () => {
      const searchFunc = sinon.spy()
      const wrapper = shallow(<SearchBox
        onSearch={searchFunc}
      />)

      const input = wrapper.find('input')
      input.simulate('change', { target: { value: SEARCH_STRING } })

      expect(wrapper.state().inputValue).to.equal(SEARCH_STRING)
    })
  })
})
