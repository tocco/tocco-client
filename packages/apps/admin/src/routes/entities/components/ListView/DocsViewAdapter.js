import {currentViewPropType} from '../../utils/propTypes'
import DocsView from '../DocsView'

const DocsViewAdapter = ({currentViewInfo}) => (
  <DocsView
    noLeftPadding={false}
    entityName={currentViewInfo.parentModel.name}
    entityKey={currentViewInfo.parentKey}
    showActions={true}
  />
)

DocsViewAdapter.propTypes = {
  currentViewInfo: currentViewPropType
}

export default DocsViewAdapter
