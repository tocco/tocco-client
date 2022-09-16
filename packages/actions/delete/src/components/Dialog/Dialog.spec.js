import {screen} from '@testing-library/react'
import {testingLibrary} from 'tocco-test-util'

import {dialogInfo} from '../../dev/dialogInfoExample'
import Dialog from './Dialog'

describe('delete', () => {
  describe('components', () => {
    describe('Dialog', () => {
      it('should render Dialog if dialogInfo is set', () => {
        testingLibrary.renderWithIntl(
          <Dialog doDelete={() => {}} onCancel={() => {}} dialogInfo={dialogInfo} navigationStrategy={{}} />
        )

        expect(screen.getByText((content, element) => content !== '' && element.textContent === 'Person (1)')).to.exist
        expect(screen.getByText((content, element) => content !== '' && element.textContent === 'Person (2)')).to.exist
        expect(screen.getByText('client.delete.unreadableEntities')).not.to.be.undefined
        expect(screen.queryAllByRole('button')).to.have.length('2')
      })
    })
  })
})
