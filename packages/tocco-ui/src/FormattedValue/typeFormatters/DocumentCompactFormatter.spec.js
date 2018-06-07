import React from 'react'
import {shallow} from 'enzyme'

import DocumentCompactFormatter from './DocumentCompactFormatter'

describe('tocco-ui', () => {
  describe('FormattedValue', () => {
    describe('typeFormatters', () => {
      describe('typeFormatters', () => {
        describe('DocumentCompactFormatter ', () => {
          it('should render a link', () => {
            const binaryLink = 'http://test.ch/link/to/image.png'
            const fileName = 'FileName.png'
            const thumbnailLink = 'http://test.com/link/to/thumbnail.png'

            const wrapper = shallow(<DocumentCompactFormatter value={{
              fileName,
              thumbnailLink,
              binaryLink
            }}
            options={{downloadTitle: 'test'}}/>)

            expect(wrapper.find('a')).to.have.length(1)
          })
        })
      })
    })
  })
})
