import {mount} from 'enzyme'
import {TestThemeProvider} from 'tocco-test-util'

import Document from './Document'

const EMPTY_FUNC = () => {}

const mockValue = {
  mimeType: 'image/png',
  fileExtension: 'png',
  sizeInBytes: 3336,
  fileName: 'example.js',
  thumbnailLink: '',
  binaryLink: ''
}

const mockOptions = {
  uploadText: 'upload',
  uploadingText: 'uploading...',
  upload: EMPTY_FUNC
}

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('editors', () => {
      describe('Document ', () => {
        test('should render', () => {
          const wrapper = mount(
            <TestThemeProvider>
              <Document value={mockValue} options={mockOptions} />
            </TestThemeProvider>
          )
          expect(wrapper.find('Upload')).to.have.length(1)
        })
      })
    })
  })
})
