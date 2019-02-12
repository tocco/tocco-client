import React from 'react'
import {shallow} from 'enzyme'

import Upload from './Upload'

const EMPTY_FUNC = () => {}

const sampleValue = {
  binaryLink: 'https://unsplash.it/150',
  thumbnailLink: 'https://unsplash.it/150',
  fileName: 'example_file.jpg'
}

describe('tocco-ui', () => {
  describe('Upload', () => {
    test('should show input if no value set', () => {
      const wrapper = shallow(<Upload onUpload={EMPTY_FUNC}/>)
      expect(wrapper.find('UploadInput')).to.have.length(1)
    })

    test('should show view if value set', () => {
      const wrapper = shallow(<Upload onUpload={EMPTY_FUNC} value={sampleValue}/>)
      expect(wrapper.find('View')).to.have.length(1)
    })
  })
})
