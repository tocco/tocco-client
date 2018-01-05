import React from 'react'
import TitleMessage from './TitleMessage'
import {shallow} from 'enzyme'
import {FormattedValue} from 'tocco-ui'
import {FormattedMessage} from 'react-intl'

describe('tocco-util', () => {
  describe('notifier', () => {
    describe('Components', () => {
      describe('TitleMessage', () => {
        it('should render title and message ', () => {
          const title = 'Title'
          const message = 'message'
          const wrapper = shallow(
            <TitleMessage
              title={title}
              message={message}
            />
          )

          expect(wrapper.find(FormattedValue)).to.have.length(2)
        })

        it('should not show message if not given', () => {
          const title = 'Title'
          const wrapper = shallow(
            <TitleMessage
              title={title}
            />
          )

          expect(wrapper.find(FormattedValue)).to.have.length(1)
        })

        it('should render as formated value if key is passed', () => {
          const title = 'client.message.Title'
          const message = 'client.example.message'
          const wrapper = shallow(
            <TitleMessage
              title={title}
              message={message}
            />
          )

          expect(wrapper.find(FormattedMessage)).to.have.length(2)
        })
      })
    })
  })
})
