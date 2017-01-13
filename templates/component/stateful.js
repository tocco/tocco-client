import React from 'react'
{{#ifIn 'toccoui' features}}
import * as ToccoUi from 'tocco-ui'
{{/ifIn}}

class {{pascalCase componentName}} extends React.Component {
  constructor(props) {
    super()
  }

  render() {
    const props = this.props

    return (
      <div>
        <h1>{{titleCase componentName}}</h1>
      </div>
    )
  }
}

{{pascalCase componentName}}.propTypes = {
  val: React.PropTypes.func.isRequired
}

export default {{pascalCase componentName}}
