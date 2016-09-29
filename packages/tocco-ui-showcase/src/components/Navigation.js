import React from 'react'
import {Scrollspy} from 'react-scrollspy'

const Navigation = props => {
  const getComponentSections = (categoryName) => {
    const sections = []
    props.componentsTree.map((componentGroup) => {
      if (componentGroup.category === categoryName) {
        componentGroup.components.map((comp) => {
          sections.push(comp.name)
        })
      }
    })
    return sections
  }

  const getGroupSections = () => {
    const sections = []
    props.componentsTree.map((componentGroup) => {
      sections.push(componentGroup.category)
    })
    return sections
  }

  return (
    <nav className="navigation">
      <Scrollspy items={getGroupSections()} currentClassName="current-nav">
        {
          props.componentsTree.map((componentGroup) => {
            return (
              <li key={componentGroup.category}>
                <a href={'#' + componentGroup.category}>{componentGroup.category}</a>
                <Scrollspy items={getComponentSections(componentGroup.category)} currentClassName="current-nav">
                  {
                    componentGroup.components.map((comp) => {
                      return (
                        <li key={comp.name}>
                          <a href={'#' + comp.name}>
                            {comp.name}
                          </a>
                        </li>
                      )
                    })
                  }
                </Scrollspy>
              </li>
            )
          })
        }
      </Scrollspy>
    </nav>
  )
}

Navigation.propTypes = {
  componentsTree: React.PropTypes.array.isRequired
}

export default Navigation
