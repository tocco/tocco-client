import React from 'react'
import {mount} from 'enzyme'

import DocumentFormatter from './DocumentFormatter'

describe('tocco-ui', () => {
  describe('FormattedValue', () => {
    describe('typeFormatters', () => {
      describe('DocumentFormatter ', () => {
        test('should pass five props', () => {
          const wrapper = mount(<DocumentFormatter value={{
            alt: 'alt text',
            binaryLink: 'binary url',
            caption: 'caption text',
            fileName: 'file name',
            thumbnailLink: 'thumbnail url'
          }}/>)

          const {
            alt,
            binaryLink,
            caption,
            fileName,
            thumbnailLink
          } = wrapper.props().value

          expect(alt).to.equal('alt text')
          expect(binaryLink).to.equal('binary url')
          expect(caption).to.equal('caption text')
          expect(fileName).to.equal('file name')
          expect(thumbnailLink).to.equal('thumbnail url')
        })

        test('should render link and image', () => {
          const wrapper = mount(<DocumentFormatter value={{
            alt: 'alt text',
            binaryLink: 'binary url',
            caption: 'caption text',
            fileName: 'file name',
            thumbnailLink: 'thumbnail url'
          }}/>)

          expect(wrapper.find('a')).to.have.length(1)
          expect(wrapper.find('img')).to.have.length(1)
        })
      })
    })
  })
})
