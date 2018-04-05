import React from 'react'

export default getComponent => (
  class LazyLoadedComponent extends React.Component {
    static Component = null
    mounted = false

    state = {
      Component: LazyLoadedComponent.Component
    }

    componentWillMount() {
      if (this.state.Component === null) {
        getComponent().then(Component => {
          LazyLoadedComponent.Component = Component.default
          if (this.mounted) {
            this.setState({Component: Component.default})
          }
        })
      }
    }

    componentDidMount() {
      this.mounted = true
    }

    componentWillUnmount() {
      this.mounted = false
    }

    render() {
      const {Component} = this.state

      if (Component !== null) {
        return <Component {...this.props}/>
      }

      return null
    }
  }
)
