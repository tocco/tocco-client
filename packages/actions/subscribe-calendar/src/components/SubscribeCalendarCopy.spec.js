import {intlEnzyme} from 'tocco-test-util'

import SubscribeCalendarCopy from './SubscribeCalendarCopy'

describe('subscribe-calendar', () => {
  describe('components', () => {
    describe('SubscribeCalendarCopy', () => {
      test('should render link', () => {
        const fetchCalendarLink = sinon.spy()
        const copyCalendarLink = sinon.spy()
        const link = 'http://localhost:8080/my/path/1234567890'

        const wrapper = intlEnzyme.mountWithIntl(
          <SubscribeCalendarCopy
            fetchCalendarLink={fetchCalendarLink}
            copyCalendarLink={copyCalendarLink}
            link={link}
          />
        )

        expect(wrapper.find('code')).to.have.length(1)
        expect(wrapper.find('code').first().text()).to.equal(link)
      })

      test('should fetch link', () => {
        const fetchCalendarLink = sinon.spy()
        const copyCalendarLink = sinon.spy()
        const link = undefined

        const wrapper = intlEnzyme.mountWithIntl(
          <SubscribeCalendarCopy
            fetchCalendarLink={fetchCalendarLink}
            copyCalendarLink={copyCalendarLink}
            link={link}
          />
        )

        expect(wrapper.find('code')).to.have.length(0)
        expect(fetchCalendarLink).to.have.been.calledOnce
      })

      test('should copy link', () => {
        const fetchCalendarLink = sinon.spy()
        const copyCalendarLink = sinon.spy()
        const link = 'http://localhost:8080/my/path/1234567890'

        const wrapper = intlEnzyme.mountWithIntl(
          <SubscribeCalendarCopy
            fetchCalendarLink={fetchCalendarLink}
            copyCalendarLink={copyCalendarLink}
            link={link}
          />
        )

        expect(wrapper.find('button')).to.have.length(1)
        wrapper.find('button').first().simulate('click')
        expect(copyCalendarLink).to.have.been.calledOnce
      })
    })
  })
})
