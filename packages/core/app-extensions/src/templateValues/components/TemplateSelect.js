import PropTypes from 'prop-types'
import {FormattedMessage} from 'react-intl'
import {Select, Panel, Typography, StatedValue, Layout} from 'tocco-ui'

const TemplateSelect = ({
  templateEntityName,
  templateOptions,
  setValuesFromTemplate,
  selectedTemplate,
  customTemplateFields,
  intl
}) => {
  return (
    <Layout.Container>
      <Panel.Wrapper isFramed={true} isOpen={true}>
        <Panel.Header>
          <Typography.H4>
            <FormattedMessage id="client.rest.action.template" />
          </Typography.H4>
        </Panel.Header>
        <Panel.Body>
          <StatedValue
            label={intl.formatMessage({id: `client.entities.${templateEntityName}`})}
            hasValue={!!selectedTemplate}
          >
            <Select
              options={templateOptions}
              onChange={value => setValuesFromTemplate(templateEntityName, value, customTemplateFields)}
              value={selectedTemplate}
            />
          </StatedValue>
        </Panel.Body>
      </Panel.Wrapper>
    </Layout.Container>
  )
}

TemplateSelect.propTypes = {
  templateEntityName: PropTypes.string.isRequired,
  templateOptions: PropTypes.arrayOf(
    PropTypes.shape({
      display: PropTypes.string,
      key: PropTypes.string
    })
  ),
  setValuesFromTemplate: PropTypes.func.isRequired,
  selectedTemplate: PropTypes.shape({
    display: PropTypes.string,
    key: PropTypes.string
  }),
  customTemplateFields: PropTypes.objectOf(PropTypes.func),
  intl: PropTypes.object.isRequired
}

export default TemplateSelect
