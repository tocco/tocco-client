import _get from 'lodash/get'
import React from 'react'

export default {
  dataContainerProps: ({formField}) => ({
    tooltips: [formField.targetEntity],
    navigationStrategy: true
  }),
  getOptions: ({formField, formData}) => ({
    tooltips: _get(formData.tooltips, formField.targetEntity, null),
    loadTooltip: id => formData.loadTooltip(formField.targetEntity, id),
    DetailLink:
      formData.navigationStrategy && formData.navigationStrategy.DetailLink
        ? ({entityKey, children}) => (
            <formData.navigationStrategy.DetailLink entityName={formField.targetEntity} entityKey={entityKey}>
              {children}
            </formData.navigationStrategy.DetailLink>
          )
        : null
  })
}
