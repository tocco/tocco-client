import PropTypes from 'prop-types'
import {field} from 'tocco-app-extensions'
import {StatedValue} from 'tocco-ui'

const InputEditInformation = ({information}) => (
  <>
    {information.map(({id, type, label, value}) => {
      const Field = field.factory('readOnly', type)
      return (
        <StatedValue key={id} label={label} immutable={true} hasValue={true}>
          <Field formField={{dataType: type}} value={value} mappingType="readOnly" />
        </StatedValue>
      )
    })}
  </>
)

InputEditInformation.propTypes = {
  information: PropTypes.array.isRequired
}

export default InputEditInformation
