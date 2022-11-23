import PropTypes from 'prop-types'
import {useEffect, useState} from 'react'
import {FormattedMessage} from 'react-intl'
import {LoadingSpinner, Typography, StatedValue, EditableValue, Button, Layout, Panel} from 'tocco-ui'

import {StyledButtonWrapper} from './StyledComponents'

const Configuration = ({data, fetchData, intl, postData, isLoading}) => {
  useEffect(() => {
    fetchData()
  }, [fetchData])

  const [fields, setFields] = useState({})
  const msg = id => intl.formatMessage({id})

  if (data === undefined || isLoading) {
    return <LoadingSpinner />
  }
  if (data === null) {
    return (
      <Typography.P>
        <FormattedMessage id="client.actions.reload-configuration.fetchFailed" />
      </Typography.P>
    )
  }
  const content = data.map(({id}) => (
    <StatedValue label={msg(`client.actions.reload-configuration.${id}`)} key={id}>
      <EditableValue
        type="boolean"
        value={fields[id] || false}
        events={{onChange: isChecked => setFields(f => ({...f, [id]: isChecked}))}}
        id={`editable-value-${id}`}
      />
    </StatedValue>
  ))

  const postDataFields = selectedFields => {
    postData(Object.keys(selectedFields).filter(key => selectedFields[key] === true))
  }

  const reloadAll = () => {
    postData(data.map(item => item.id))
  }
  return (
    <>
      <Layout.Container>
        <Layout.Box>
          <Panel.Wrapper>
            <Panel.Header>
              <Typography.H4>
                <FormattedMessage id="client.actions.reload-configuration.subtitle" />
              </Typography.H4>
            </Panel.Header>
            <Panel.Body>{content}</Panel.Body>
          </Panel.Wrapper>
        </Layout.Box>
      </Layout.Container>
      <StyledButtonWrapper>
        <Button ink="base" look="raised" onClick={() => reloadAll()}>
          <FormattedMessage id="client.actions.reload-configuration.reload.all" />
        </Button>
        <Button ink="primary" look="raised" onClick={() => postDataFields(fields)} id="reload-selected-button">
          <FormattedMessage id="client.actions.reload-configuration.reload.chosen" />
        </Button>
      </StyledButtonWrapper>
    </>
  )
}

Configuration.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      key: PropTypes.number
    })
  ),
  fetchData: PropTypes.func.isRequired,
  intl: PropTypes.any,
  postData: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
}

export default Configuration
