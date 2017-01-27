import React from 'react'
{{#ifIn 'toccoui' features}}
import * as ToccoUi from 'tocco-ui'
{{/ifIn}}

const {{pascalCase componentName}} = props => {
  return (
    <div>
      <h1>{{titleCase componentName}}</h1>
    </div>
  )
}

{{pascalCase componentName}}.propTypes = {
}

export default {{pascalCase componentName}}
