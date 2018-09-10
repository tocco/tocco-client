import React from 'react'
import {mount} from 'enzyme'
import {FormattedMessage} from 'react-intl'
import {intlEnzyme} from 'tocco-test-util'
import {Typography} from 'tocco-ui'

import TitleMessage from './TitleMessage'

describe('tocco-util', () => {
  describe('notifier', () => {
    describe('Components', () => {
      describe('TitleMessage', () => {
        it('should render title as <Typography.H4> and message as <Typography.P>', () => {
          const title = 'Title'
          const message = 'Message'
          const wrapper = mount(
            <TitleMessage
              title={title}
              message={message}
            />
          )
          expect(wrapper.find(Typography.H4).text()).to.be.equal(title)
          expect(wrapper.find(Typography.P).text()).to.be.equal(message)
        })

        it('should not show message if not given', () => {
          const title = 'Title'
          const wrapper = mount(
            <TitleMessage
              title={title}
            />
          )
          expect(wrapper.find(Typography.H4).text()).to.be.equal(title)
          expect(wrapper.find(Typography.P)).to.have.length(0)
        })

        it('should not show title if not given', () => {
          const message = 'Message'
          const wrapper = mount(
            <TitleMessage
              message={message}
            />
          )
          expect(wrapper.find(Typography.H4)).to.have.length(0)
          expect(wrapper.find(Typography.P).text()).to.be.equal(message)
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
