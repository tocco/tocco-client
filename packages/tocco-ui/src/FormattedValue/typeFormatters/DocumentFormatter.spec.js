/* eslint-disable no-unused-vars */
import React from 'react'
import {mount} from 'enzyme'

import DocumentFormatter from './DocumentFormatter'

describe('tocco-ui', () => {
  describe('FormattedValue', () => {
    describe('typeFormatters', () => {
      describe('DocumentFormatter ', () => {
        it('should render link', () => {
          const binaryLink = 'http://test.ch/link/to/image.png'
          const fileName = 'FileName.png'
          const thumbnailLink = 'http://test.com/link/to/thumbnail.png'

          const wrapper = mount(<DocumentFormatter value={{
            fileName,
            thumbnailLink,
            binaryLink
          }}/>)

          const anchors = wrapper.find('a')
          expect(anchors).to.have.length(1)
          const anchor = anchors.first()
          expect(anchor).to.have.attr('href', binaryLink)
          expect(anchor).to.have.text(fileName)
          expect(anchor).to.have.attr('download', '')

          const images = wrapper.find('img')
          expect(images).to.have.length(1)
          const image = images.first()
          expect(image).to.have.attr('src', thumbnailLink)
        })
      })
    })
  })
})
