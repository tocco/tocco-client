import React from 'react'
import {shallow} from 'enzyme'
import Upload from '../../Upload'

import DocumentFormatter from './DocumentFormatter'

describe('tocco-ui', () => {
  describe('FormattedValue', () => {
    describe('typeFormatters', () => {
      describe('DocumentFormatter ', () => {
        it('should render Upload component as readonly', () => {
          const binaryLink = 'http://test.ch/link/to/image.png'
          const fileName = 'FileName.png'
          const thumbnailLink = 'http://test.com/link/to/thumbnail.png'

          const wrapper = shallow(<DocumentFormatter value={{
            fileName,
            thumbnailLink,
            binaryLink
          }}
          options={{downloadTitle: 'test'}}/>)

          expect(wrapper.find(Upload)).to.have.length(1)
          expect(wrapper.find(Upload)).to.have.prop('readOnly', true)
        })
      })
    })
  })
})
