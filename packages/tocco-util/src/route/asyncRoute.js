import React from 'react'

export default function asyncRoute(getComponent) {
  return class AsyncComponent extends React.Component {
    static Component = null

    state = {
      Component: AsyncComponent.Component
    }

    componentDidMount() {
      this.mounted = true
      if (this.state.Component === null) {
        getComponent().then(Component => {
          AsyncComponent.Component = Component
          this.setState({Component})
        })
      }
    }

    render() {
      const {Component} = this.state

      if (Component !== null) {
        return <Component {...this.props}/>
      }

      return null
    }
  }
}
