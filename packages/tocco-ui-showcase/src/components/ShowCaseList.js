import PropTypes from 'prop-types'
import React from 'react'

import ComponentShowCase from './ComponentShowCase'
import CodeShowCase from './CodeShowCase'

const ShowCaseList = props => {
  return (
    <div>
      {
        props.componentsTree.map(componentGroup => {
          return (
            <section key={componentGroup.category} id={componentGroup.category}>
              <h1>{componentGroup.category}</h1>
              {
                componentGroup.components.map(comp => (
                  <section key={comp.name} id={comp.name}>
                    {
                      (comp.raw)
                        ? <ComponentShowCase
                          componentName={comp.name}
                          componentRaw={comp.raw}
                          example={comp.example}
                        />
                        : <CodeShowCase
                          componentName={comp.name}
                          description={comp.description}
                          example={comp.example}
                        />
                    }

                  </section>
                )
                )
              }
            </section>
          )
        })
      }
    </div>
  )
}

ShowCaseList.propTypes = {
  componentsTree: PropTypes.array.isRequired
}

export default ShowCaseList
