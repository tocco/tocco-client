import React from 'react'
export default {
  getOptions: ({formField, formData}) => ({
    DetailLink: formData.navigationStrategy && formData.navigationStrategy.DetailLink
      ? ({entityKey, children}) =>
        <formData.navigationStrategy.DetailLink
          entityName={formField.targetEntity}
          entityKey={entityKey}
        >
          {children}
        </formData.navigationStrategy.DetailLink>
      : null
  })

}
