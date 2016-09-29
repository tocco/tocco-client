import React from 'react'

import ShowCase from './ShowCase'
import {parse} from 'react-docgen'

const ShowCaseList = props => {
  return (
    <div>
      {
        props.componentsTree.map(componentGroup => {
          return (
            <section key={componentGroup.category} id={componentGroup.category}>
              <h1>{componentGroup.category}</h1>
              {
                componentGroup.components.map(comp => {
                  const componentInfo = parse(comp.raw)
                  return (
                    <section key={comp.name} id={comp.name}>
                      <ShowCase componentName={comp.name} componentInfo={componentInfo} example={comp.example}/>
                    </section>)
                })
              }
            </section>
          )
        })
      }
    </div>
  )
}

ShowCaseList.propTypes = {
  componentsTree: React.PropTypes.array.isRequired
}

export default ShowCaseList
