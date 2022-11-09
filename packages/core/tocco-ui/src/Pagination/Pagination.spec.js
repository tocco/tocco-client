import {screen, fireEvent} from '@testing-library/react'
import {testingLibrary} from 'tocco-test-util'

import Pagination from './'

describe('tocco-ui', () => {
  const basicTestProps = {
    totalCount: 1000,
    currentPage: 3,
    recordsPerPage: 10,
    onPageChange: () => {}
  }

  describe('Pagination', () => {
    test('should disable first and second button when on first page', () => {
      testingLibrary.renderWithIntl(<Pagination {...basicTestProps} currentPage={1} />)

      const firstPageBtn = screen.getByTitle('client.component.pagination.firstPageTitle')
      const prePageBtn = screen.getByTitle('client.component.pagination.prePageTitle')
      const nextPageBtn = screen.getByTitle('client.component.pagination.nextPageTitle')
      const lastPageBtn = screen.getByTitle('client.component.pagination.lastPageTitle')

      expect(firstPageBtn.getAttribute('disabled')).not.equal(null)
      expect(prePageBtn.getAttribute('disabled')).not.equal(null)
      expect(nextPageBtn.getAttribute('disabled')).equal(null)
      expect(lastPageBtn.getAttribute('disabled')).equal(null)
      expect(firstPageBtn).exist
      expect(prePageBtn).exist
      expect(nextPageBtn).exist
      expect(lastPageBtn).exist
    })

    test('should disable last and second-last button when on last page', () => {
      const lastPage = Math.ceil(basicTestProps.totalCount / basicTestProps.recordsPerPage)
      testingLibrary.renderWithIntl(<Pagination {...basicTestProps} currentPage={lastPage} />)

      const firstPageBtn = screen.getByTitle('client.component.pagination.firstPageTitle')
      const prePageBtn = screen.getByTitle('client.component.pagination.prePageTitle')
      const nextPageBtn = screen.getByTitle('client.component.pagination.nextPageTitle')
      const lastPageBtn = screen.getByTitle('client.component.pagination.lastPageTitle')

      expect(firstPageBtn.getAttribute('disabled')).equal(null)
      expect(prePageBtn.getAttribute('disabled')).equal(null)
      expect(lastPageBtn.getAttribute('disabled')).not.equal(null)
      expect(nextPageBtn.getAttribute('disabled')).not.equal(null)
      expect(firstPageBtn).exist
      expect(prePageBtn).exist
      expect(nextPageBtn).exist
      expect(lastPageBtn).exist
    })

    test('should call callback with correct new page', () => {
      const onChangeSpy = sinon.spy()
      testingLibrary.renderWithIntl(<Pagination {...basicTestProps} onPageChange={onChangeSpy} />)

      const firstPageBtn = screen.getByTitle('client.component.pagination.firstPageTitle')
      const prePageBtn = screen.getByTitle('client.component.pagination.prePageTitle')
      const nextPageBtn = screen.getByTitle('client.component.pagination.nextPageTitle')
      const lastPageBtn = screen.getByTitle('client.component.pagination.lastPageTitle')

      fireEvent.click(nextPageBtn)
      expect(onChangeSpy).calledWith(4)
      fireEvent.click(prePageBtn)
      expect(onChangeSpy).calledWith(2)
      fireEvent.click(firstPageBtn)
      expect(onChangeSpy).calledWith(1)
      fireEvent.click(lastPageBtn)
      expect(onChangeSpy).calledWith(100)
    })

    test('should show correct page information', () => {
      const intlMessages = {
        'client.component.pagination.text': '{start} bis {to} von {total}'
      }

      testingLibrary.renderWithIntl(<Pagination currentPage={1} recordsPerPage={25} totalCount={50} />, {intlMessages})

      const paginationMessage = screen.getByText('1 bis 25 von 50')
      expect(paginationMessage).exist
    })

    test('should handle less entries than page size', () => {
      const intlMessages = {
        'client.component.pagination.text': '{start} bis {to} von {total}'
      }

      testingLibrary.renderWithIntl(<Pagination currentPage={1} recordsPerPage={25} totalCount={10} />, {intlMessages})

      const paginationMessage = screen.getByText('1 bis 10 von 10')
      expect(paginationMessage).exist
    })

    test('should handle no entries', () => {
      const intlMessages = {
        'client.component.pagination.text': '{start} bis {to} von {total}'
      }

      testingLibrary.renderWithIntl(<Pagination currentPage={1} recordsPerPage={25} totalCount={0} />, {intlMessages})

      expect(screen.queryAllByText('1 bis 25 von 0')).length(0)
    })
  })
})
