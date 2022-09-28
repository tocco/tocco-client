import {screen, fireEvent} from '@testing-library/react'
import {testingLibrary} from 'tocco-test-util'

import SubscribeCalendarCopy from './SubscribeCalendarCopy'

describe('subscribe-calendar', () => {
  describe('components', () => {
    describe('SubscribeCalendarCopy', () => {
      test('should render link', () => {
        const fetchCalendarLinks = sinon.spy()
        const copyCalendarLink = sinon.spy()
        const label = 'label'
        const link = 'http://localhost:8080/my/path/1234567890'

        testingLibrary.renderWithIntl(
          <SubscribeCalendarCopy
            fetchCalendarLinks={fetchCalendarLinks}
            copyCalendarLink={copyCalendarLink}
            links={[{link, label}]}
          />
        )

        expect(screen.getByText(link)).to.exist
      })

      test('should fetch link', () => {
        const fetchCalendarLinks = sinon.spy()
        const copyCalendarLink = sinon.spy()
        const link = undefined

        testingLibrary.renderWithIntl(
          <SubscribeCalendarCopy
            fetchCalendarLinks={fetchCalendarLinks}
            copyCalendarLink={copyCalendarLink}
            link={link}
          />
        )

        expect(screen.queryAllByRole('button')).to.have.length(0)
        expect(fetchCalendarLinks).to.have.been.calledOnce
      })

      test('should copy link', () => {
        const fetchCalendarLinks = sinon.spy()
        const copyCalendarLink = sinon.spy()
        const label = 'label'
        const link = 'http://localhost:8080/my/path/1234567890'

        testingLibrary.renderWithIntl(
          <SubscribeCalendarCopy
            fetchCalendarLinks={fetchCalendarLinks}
            copyCalendarLink={copyCalendarLink}
            links={[{link, label}]}
          />
        )

        expect(screen.queryAllByRole('button')).to.have.length(1)
        expect(screen.getByText(link)).to.exist
        fireEvent.click(screen.getByRole('button'))
        expect(copyCalendarLink).to.have.been.calledOnce
      })
    })
  })
})
