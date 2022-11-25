import PropTypes from 'prop-types'
import {useEffect, useState} from 'react'
import {FormattedMessage} from 'react-intl'
import {EditableValue, Button, LoadMask, StatedValue} from 'tocco-ui'

import {
  StyledContainer,
  StyledLogWrapper,
  StyledHeader,
  StyledLogFileStatedValue,
  StyledFileCountStatedValue,
  StyledButtonItem,
  StyledTextAreaItem,
  StyledTextarea
} from './StyledComponents'

const Log = ({data, fetchData, fileContent, fetchFileContent, intl}) => {
  const [lines, setLines] = useState(500)
  const [currentFile, setCurrentFile] = useState({key: 'nice.log', display: 'nice.log'})

  const conditionalString = `${currentFile.key}?lines=${lines}`

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // load file content on mount
  useEffect(() => {
    fetchFileContent(conditionalString)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchFileContent])

  const msg = id => intl.formatMessage({id})

  const options = data ? data.map(fileNames => ({key: fileNames, display: fileNames})) : null
  return (
    <LoadMask required={[data, fileContent]}>
      <StyledContainer>
        <StyledLogWrapper>
          <StyledHeader>
            <StyledLogFileStatedValue>
              <StatedValue label={msg('client.log.logfile')}>
                <EditableValue
                  type="single-select"
                  value={currentFile}
                  options={options ? {options} : null}
                  events={{onChange: setCurrentFile}}
                  id="fileSelectField"
                />
              </StatedValue>
            </StyledLogFileStatedValue>
            <StyledFileCountStatedValue>
              <StatedValue label={msg('client.log.filecount')}>
                <EditableValue type="integer" value={lines} events={{onChange: setLines}} id="fileCountField" />
              </StatedValue>
            </StyledFileCountStatedValue>
            <StyledFileCountStatedValue>
              <StatedValue label={msg('client.log.hostname')}>
                <EditableValue
                  value={fileContent ? fileContent.hostName : null}
                  type="string"
                  id="hostnameField"
                  readOnly
                />
              </StatedValue>
            </StyledFileCountStatedValue>
            <StyledButtonItem>
              <Button ink="primary" look="raised" onClick={() => fetchFileContent(conditionalString)}>
                <FormattedMessage id="client.log.reload" />
              </Button>
            </StyledButtonItem>
          </StyledHeader>
          <StyledTextAreaItem>
            <StyledTextarea value={fileContent ? fileContent.fileContent : null} readOnly={true} />
          </StyledTextAreaItem>
        </StyledLogWrapper>
      </StyledContainer>
    </LoadMask>
  )
}

Log.propTypes = {
  fetchData: PropTypes.required,
  fetchFileContent: PropTypes.required,
  data: PropTypes.array,
  fileContent: PropTypes.shape({
    fileContent: PropTypes.string,
    hostName: PropTypes.string
  }),
  intl: PropTypes.any
}

export default Log
