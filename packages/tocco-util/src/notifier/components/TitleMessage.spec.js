import React from 'react'
import {mount} from 'enzyme'
import {FormattedValue} from 'tocco-ui'
import {FormattedMessage} from 'react-intl'
import {intlEnzyme} from 'tocco-test-util'

import TitleMessage from './TitleMessage'

describe('tocco-util', () => {
  describe('notifier', () => {
    describe('Components', () => {
      describe('TitleMessage', () => {
        it('should render title and message ', () => {
          const title = 'Title'
          const message = 'message'
          const wrapper = mount(
            <TitleMessage
              title={title}
              message={message}
            />
          )

          expect(wrapper.find(FormattedValue)).to.have.length(2)
        })

        it('should not show message if not given', () => {
          const title = 'Title'
          const wrapper = mount(
            <TitleMessage
              title={title}
            />
          )

          expect(wrapper.find(FormattedValue)).to.have.length(1)
        })

        it('should render as formated value if key is passed', () => {
          const title = 'client.message.Title'
          const message = 'client.example.message'
          const wrapper = intlEnzyme.mountWithIntl(
            <TitleMessage
              title={title}
              message={message}
            />
          )

          expect(wrapper.find(FormattedMessage)).to.have.length(2)
        })

        it('should render components', () => {
          const MyComponent = () => <div/>
          const title = <MyComponent/>
          const message = <MyComponent/>

          const wrapper = intlEnzyme.mountWithIntl(
            <TitleMessage
              title={title}
              message={message}
            />
          )

          expect(wrapper.find(MyComponent)).to.have.length(2)
        })
      })
    })
  })
})
