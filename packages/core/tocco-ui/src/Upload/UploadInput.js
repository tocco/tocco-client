import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'

import Button from '../Button'
import {StyledUploadInput, StyledSection, StyledDropzone} from './StyledComponents'

const UploadInput = ({onDrop: onDropProp, immutable, text, onChoose}) => {
  const onDrop = acceptedFiles => {
    const previewAddedFiles = acceptedFiles.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    )
    onDropProp(previewAddedFiles[0])
  }
  const handleClick = e => {
    onChoose()
    e.stopPropagation()
  }

  return (
    <StyledUploadInput immutable={immutable}>
      <Dropzone onDrop={onDrop} multiple={false} disabled={immutable} title={text || 'drag and drop or click'}>
        {({getRootProps, getInputProps}) => (
          <StyledSection>
            <StyledDropzone {...getRootProps()}>
              <input {...getInputProps()} />
              <Button icon="arrow-to-top" />
            </StyledDropzone>
          </StyledSection>
        )}
      </Dropzone>
      {onChoose && <Button onClick={handleClick} icon="folder" label={'browse docs'} iconOnly={true} />}
    </StyledUploadInput>
  )
}

UploadInput.propTypes = {
  immutable: PropTypes.bool,
  onDrop: PropTypes.func.isRequired,
  onChoose: PropTypes.func,
  text: PropTypes.string
}

export default UploadInput
