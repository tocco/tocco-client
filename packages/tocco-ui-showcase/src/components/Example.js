import React from 'react'
import Highlight from 'react-highlight'
import 'highlight.js/styles/github.css'
import {extractExampleCode, extractRealImports, removeIndent} from './../util/ExampleParser'

const Example = (props) => {
  if (!props.example) {
    return <span/>
  }

  const imports = extractRealImports(props.example.raw)
  let exampleCode = extractExampleCode(props.example.raw)
  exampleCode = removeIndent(exampleCode)

  return (
    <div>
      <h1>Example</h1>
      <div className="list-group">
        <div className="list-group-item">
          {props.example.component()}
        </div>
        <div className="list-group-item">
          <Highlight className="javascript">{imports}</Highlight>
          <Highlight className="html">{exampleCode}</Highlight>
        </div>
      </div>
    </div>
  )
}

Example.propTypes = {
  example: React.PropTypes.object.isRequired
}

export default Example
