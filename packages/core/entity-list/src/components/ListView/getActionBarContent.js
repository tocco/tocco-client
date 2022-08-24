import ActionContainer from '../../containers/ActionContainer'
import SelectionControllerContainer from '../../containers/SelectionControllerContainer'
import {getActionBar} from '../../util/api/forms'

export const getActionBarContent = ({
  dataLoadingInProgress,
  formDefinition,
  parent,
  showSelectionController,
  showActions
}) => {
  if (formDefinition) {
    const actionBar = getActionBar(formDefinition)
    const content = [
      ...(showSelectionController ? [<SelectionControllerContainer key="selectionController" />] : []),
      ...(showActions !== false && actionBar
        ? [
            <ActionContainer
              key={`listAction-${actionBar.id}`}
              definition={actionBar}
              parent={parent}
              disabled={dataLoadingInProgress}
            />
          ]
        : [])
    ]

    return {content, actionBar}
  }

  return null
}
