/* eslint-disable react/prop-types */
import {screen} from '@testing-library/react'
import {MemoryRouter} from 'react-router-dom'
import {testingLibrary} from 'tocco-test-util'
import {RouterLink} from 'tocco-ui'

import InfoPart from './InfoPart'

describe('delete', () => {
  describe('components', () => {
    describe('InfoPart', () => {
      it('should information and Links', () => {
        testingLibrary.renderWithIntl(
          <MemoryRouter>
            <InfoPart
              rootEntities={{
                User: {
                  entityLabel: 'Person',
                  keys: ['1', '3']
                }
              }}
              relatedEntities={{
                Document: {
                  entityLabel: 'Dokument',
                  keys: ['103'],
                  keysOtherBu: ['23']
                },
                Address: {
                  entityLabel: 'Adresse',
                  keys: [],
                  keysOtherBu: ['23']
                }
              }}
              maxCountLink={100}
              navigationStrategy={{
                ListLink: ({entityName, children}) => <RouterLink to={`${entityName}/list`}>{children}</RouterLink>
              }}
            />
          </MemoryRouter>
        )

        expect(
          screen.getByText(
            (content, element) => content !== '' && element.textContent === 'Person (2) / Dokument (2), Adresse (1)'
          )
        ).to.exist

        expect(screen.queryAllByRole('link')).to.have.length(2)
      })

      it('should display zeros', () => {
        testingLibrary.renderWithIntl(
          <MemoryRouter>
            <InfoPart
              rootEntities={{
                User: {
                  entityLabel: 'Person',
                  keys: []
                }
              }}
              relatedEntities={{}}
              maxCountLink={100}
            />
          </MemoryRouter>
        )

        expect(screen.getByText((content, element) => content !== '' && element.textContent === 'Person (0)')).to.exist
      })
    })
  })
})
