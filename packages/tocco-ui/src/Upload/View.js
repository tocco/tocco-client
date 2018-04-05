import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import {theme} from 'styled-system'

import Button from '../Button'
import ButtonLink from '../ButtonLink'
import Preview from '../Preview'

const ViewStyled = styled.div`
    display: inline-block;
    position: relative;

    > div {
      position: absolute;
      top: ${theme('space.4')};
      right: ${theme('space.4')};
      left: ${theme('space.4')};
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: flex-start;
      align-content: space-between;
      opacity: 0;
      transition: opacity 300ms;
    }

    &:hover > div {
      opacity: 1;
    }
`

const View = props => (
  <ViewStyled>
    <div>
      <ButtonLink
        icon="fa-download"
        iconPosition="solely"
        download={props.value.fileName}
        href={props.value.binaryLink}
        title={props.downloadTitle || 'download'}
      />
      {!props.readOnly
      && <Button
        icon="fa-trash-o"
        iconPosition="solely"
        onClick={() => props.onUpload(null)}
        title={props.deleteTitle || 'delete'}
      />
      }
    </div>
    <Preview
      srcUrl={props.value.binaryLink}
      thumbnailUrl={props.value.thumbnailLink}
      caption={props.value.fileName}
      alt={props.value.fileName}
    />
  </ViewStyled>
)

View.propTypes = {
  readOnly: PropTypes.bool,
  onUpload: PropTypes.func,
  value: PropTypes.shape({
    fileName: PropTypes.string.isRequired,
    binaryLink: PropTypes.string.isRequired,
    thumbnailLink: PropTypes.string,
    mimeType: PropTypes.string
  }).isRequired,
  deleteTitle: PropTypes.string,
  downloadTitle: PropTypes.string
}

export default View
